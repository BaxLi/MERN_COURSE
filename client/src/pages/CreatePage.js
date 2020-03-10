import React, { useState, useEffect, useContext } from 'react'
import {useHistory} from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/auth.context'
export const CreatePage = () => {
  const [link, setlink] = useState('')
  const { request } = useHttp()
    const auth = useContext(AuthContext)
    const history=useHistory()

  useEffect(() => {
    // @ts-ignore
    window.M.updateTextFields()
  }, [])

  const pressHandler = async ev => {
     
    if (ev.key === 'Enter') {
      try {
        const data = await request(
            '/api/link/generate',
            'POST',
            { from: link },
            {Authorization:`Bearer ${auth.token}`})

            history.push(`/detail/${data.link._id}`)
        console.log('link ? =', data)
      } catch (error) {
        console.log("HZ error");
      }
    }
  }
  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
        <div className="input-field">
          <input
            placeholder="input link"
            id="link"
            type="text"
            value={link}
            onChange={e => setlink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">enter the link</label>
        </div>
      </div>
    </div>
  )
}

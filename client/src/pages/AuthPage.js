import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/auth.context'

export const AuthPage = () => {
  const auth = useContext(AuthContext)

  const message = useMessage()
  const { loading, error, request } = useHttp()

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    message(error)
  }, [error, message])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      message(data.message)
    } catch (error) {
      console.log('Err Authpage catched', error)
    }
  }

  //test user - q@mail.ru / pass = 1234qwer
  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId)
    } catch (error) {
      console.log('Err LOGIN  catched', error)
    }
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <div>sokratri ssilku</div>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorisation</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="email"
                  id="email"
                  type="text"
                  name="email"
                  value={form.email}
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="email">email</label>
              </div>
              <div className="input-field">
                <input placeholder="password"
                    id="password"
                    type="text"
                    name="password"
                    value={form.password}
                    onChange={changeHandler} 
                 />
                <label htmlFor="password">password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              disabled={loading}
              onClick={loginHandler}
            >
              LOGIN
            </button>
            <button className="btn grey lighten-1 black-text" onClick={registerHandler} disabled={loading}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

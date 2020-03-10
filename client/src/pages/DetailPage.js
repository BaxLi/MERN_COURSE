import React, { useState, useCallback, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/auth.context'
import Loader from '../components/Loader'
import { LinkCard } from '../components/LinkCard'

export const DetailPage = () => {
  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [link, setLink] = useState(null)
  // @ts-ignore
  const linkid = useParams().id
  const getLink = useCallback(async () => {
    try {
      console.log("getlink processed, linkid=",linkid);
      
      const fetched = await request(`/api/link/${linkid}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      // console.log("fetched", fetched);
      setLink(fetched)
    } catch (error) {}
  }, [token, linkid, request])

  useEffect(() => {
      getLink()
  }, [getLink])

  if (loading) {return <Loader/>}
  return (
    <div>
      { !loading && link && <LinkCard link={link} /> }
    </div>
  )
}

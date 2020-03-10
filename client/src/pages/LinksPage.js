import React, { useContext, useState, useCallback, useEffect } from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/auth.context'
import {LinksList} from '../components/LinksList'
import Loader from '../components/Loader'

export const LinksPage=()=>{
    const [links, setlinks] = useState([])
    const {loading, request}=useHttp()
    const {token} = useContext(AuthContext)
const fetchLInks=useCallback(async () => {
        try{
            const fetched=await request('/api/link', 'GET', null, {
                Authorization:`Bearer ${token}`
            })
            setlinks(fetched)
        }
        catch (e){
        }
    },
    [token, request])

    useEffect(() => {
        fetchLInks()
    }, [fetchLInks])

    if (loading) {return <Loader />}
    return (
        <div>
{!loading && <LinksList links={links} />} 
        </div>
    )
}
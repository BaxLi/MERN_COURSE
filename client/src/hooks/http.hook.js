import { useState, useCallback } from 'react'
// import { header } from 'express-validator'

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const request = useCallback(
      async (url, method = 'get', body = null, headers = {}) => {
        setLoading(true)
        console.log("inside useHTTP - request", `${method} + ${url}`);
    try {
        if (body) {
            body=JSON.stringify(body)
            headers['Content-Type']='application/json'
            // console.log("BODY=", body);
        }
      const response = await fetch(url, { method, body, headers })
      const data = await response.json()
      // console.log("dataFetch",data);
      setLoading(false)
      if (!response.ok) {
        throw new Error(data.message || 'smth wrong')
      }
      return data
    } catch (error) {
        setLoading(false)
        setError(error.message)
        throw error
    }
  }, [])

  const clearError=useCallback(()=>setError(null),[])

  return { loading, request, error, clearError }
}

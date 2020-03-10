import { useState, useCallback, useEffect } from 'react'

const localStorageName = 'userData'
export const useAuth = () => {
  const [token, settoken] = useState(null)
  const [ready, setReady] = useState(false)
  const [userId, setuserId] = useState(null)

  const login = useCallback((jwttoken, id) => {
    settoken(jwttoken)
    setuserId(id)
    localStorage.setItem(localStorageName, JSON.stringify({ userId: id, token: jwttoken }))
  }, [])
  const logout = useCallback(() => {
    settoken(null)
    setuserId(null)
    localStorage.removeItem(localStorageName)
  }, [])

  useEffect(() => {
    // TOD - TEMPORARY - NEED to understand how to use token if was saved >1h ago
    // localStorage.removeItem(localStorageName)
    const data = JSON.parse(localStorage.getItem(localStorageName))
    if (data && data.token) {
      login(data.token, data.userId)
    }
    setReady(true)
  }, [login])

  return { login, logout, token, userId, ready }
}

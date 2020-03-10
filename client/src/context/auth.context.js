import { createContext } from 'react'
function noop() {
  return null
}

export const AuthContext = createContext({
  login: noop(),
  logout: noop(),
  token: null,
  userId: null,
  isAuthenticated: false
})

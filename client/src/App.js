import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import {AuthContext } from './context/auth.context'
import 'materialize-css'
import { Navbar } from './components/navbar'
import Loader from './components/Loader'

function App() {
  const {login, logout, token, userId, ready }=useAuth()
  const isAuthenticated=!!token // convert token to boolean if token exist - so already identified 
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
   return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      login, logout, token, userId, isAuthenticated
      }}>
      <Router>
        {isAuthenticated && <Navbar/> }
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App

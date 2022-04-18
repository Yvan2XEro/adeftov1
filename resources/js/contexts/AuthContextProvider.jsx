import * as React from 'react'
import auth from '../services/auth'

export const AuthContext = React.createContext({
    isAuthenticated: false,
    user: null,
    setIsAuthenticated: (v) => {},
    isAdmin: false,
    setIsAdmin: (v) => {},
    setUser: (u) => {}
})

function AuthContextProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = React.useState(auth.isAuthenticated())
    const [user, setUser] = React.useState(null)
    const [isAdmin, setIsAdmin] = React.useState(false)

  return (
    <AuthContext.Provider value={{
        isAuthenticated,
        user,
        setIsAuthenticated,
        isAdmin,
        setIsAdmin,
        setUser
    }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider

import { createContext, useEffect, useState } from 'react'
import { AuthContextType, LoginRequest } from '../types/types'
import { checkSession, loginAction } from '../actions/authActions'
import axios from 'axios'
import { useNavigate } from 'react-router'

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  role: '',
  user: null,
  login: () => {},
  logout: () => {},
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [role, setRole] = useState('')
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    const authenticate = async () => {
      setIsLoading(true)
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        try {
          const res = await checkSession()
          setRole(res.data.role)
          setUser(res.data.userData)
          setIsAuthenticated(true)
        } catch (error) {
          console.error('Authentication failed', error)
        }
      }
      setIsLoading(false)
    }

    authenticate()
  }, [token])

  const login = async (data: LoginRequest) => {
    const res = await loginAction(data)
    if (res.status === 200) {
      const token = res.data.token
      localStorage.setItem('token', token)
      const decodedToken = JSON.parse(atob(token.split('.')[1]))
      setRole(decodedToken.role)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(res.data.userData)
      setRole(res.data.role)
      setIsAuthenticated(true)
      navigate('/')
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setToken('')
    setUser(null)
    setRole('')
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }

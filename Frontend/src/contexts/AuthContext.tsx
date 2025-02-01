import { createContext, useEffect, useState } from 'react'
import { AuthContextType, LoginRequest } from '../types/types'
import { checkSession, loginAction } from '../actions/authActions'
import { useNavigate } from 'react-router'
import axiosInstance from '../actions/axiosInstance.ts'
import { useQueryClient } from 'react-query'

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  role: '',
  user: null,
  login: async () => {
    return new Promise(() => {})
  },
  logout: () => {},
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [role, setRole] = useState('')
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(sessionStorage.getItem('token'))

  const storeUserDetails = (token: string, userData: any, role: string) => {
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('user', JSON.stringify(userData))
    sessionStorage.setItem('role', role)
  }

  const removeUserDetails = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('role')
  }

  useEffect(() => {
    const authenticate = async () => {
      setIsLoading(true)
      if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
        try {
          await checkSession()
          setRole(sessionStorage.getItem('role')!)
          setUser(JSON.parse(sessionStorage.getItem('user')!))
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
      const decodedToken = JSON.parse(atob(token.split('.')[1]))
      setRole(decodedToken.role)
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(res.data.userData)
      setRole(res.data.role)
      setIsAuthenticated(true)
      storeUserDetails(token, res.data.userData, res.data.role)
      navigate('/')
    }
    return res;
  }

  const logout = () => {
    setIsAuthenticated(false)
    setToken('')
    setUser(null)
    setRole('')
    removeUserDetails();
    delete axiosInstance.defaults.headers.common['Authorization'];
    queryClient.invalidateQueries();
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }

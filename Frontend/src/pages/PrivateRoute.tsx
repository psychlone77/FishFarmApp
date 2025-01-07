import { Navigate } from 'react-router'
import { checkSession } from '../actions/authActions'
import { useEffect, useState } from 'react'

interface PrivateRouteProps {
  element: JSX.Element
}

const isAuthenticated = async () => {
  try {
    const response = await checkSession()
    if (response.status === 200) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error('Error checking session:', error)
    return false
  }
}

export default function PrivateRoute({ element }: PrivateRouteProps) {
  const [auth, setAuth] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await isAuthenticated()
      setAuth(auth)
      setLoading(false)
    }
    checkAuth()
  }, [])

  if (loading === true) {
    return <div>Loading...</div> // or any loading indicator
  }

  return auth ? element : <Navigate to='/login' />
}

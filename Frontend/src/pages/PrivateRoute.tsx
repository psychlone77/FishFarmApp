import { Navigate } from 'react-router'
import { checkSession } from '../actions/authActions'
import { Box, CircularProgress } from '@mui/material'
import { useQuery } from 'react-query'

interface PrivateRouteProps {
  element: JSX.Element
}

const fetchAuthStatus = async () => {
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
  const { data: auth, isLoading } = useQuery('authStatus', fetchAuthStatus)

  if (isLoading) {
    return (
      <Box sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  return auth ? element : <Navigate to='/login' />
}

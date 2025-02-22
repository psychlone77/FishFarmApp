import { Box, CircularProgress } from '@mui/material'
import useAuth from '../hooks/useAuth'
import { Navigate } from 'react-router'

interface PrivateRouteProps {
  element: JSX.Element
}

export default function PrivateRoute({ element }: PrivateRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  if (isLoading) {
    return (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return isAuthenticated ? element : <Navigate to='/login' replace />
}

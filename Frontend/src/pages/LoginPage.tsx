import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material'
import { LoginRequest } from '../types/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginRequestSchema } from '../types/schemas'
import { login } from '../actions/authActions'
import { useNavigate } from 'react-router'
import { Phishing } from '@mui/icons-material'

export default function LoginPage() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({ resolver: zodResolver(LoginRequestSchema) })
  const mutation = useMutation({
    mutationFn: async (data: LoginRequest) => {
      const res = await login(data)
      if (res.status === 200) {
        setTimeout(() => {
          navigate('/')
        }, 1000)
      }
    },
  })

  const onSubmit = (data: LoginRequest) => {
    mutation.mutate(data)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
        <Phishing sx={{ display: { xs: 'none', md: 'flex' }, marginRight: 1, fontSize: 55 }} />
        <Typography
          variant='h2'
          noWrap
          sx={{
            marginRight: 2,
            display: { xs: 'none', md: 'flex' },
            fontWeight: 500,
            letterSpacing: '0.1rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Fish Farms
        </Typography>
      </Box>
      <Container maxWidth='sm'>
        <Box
          sx={{
            backgroundColor: '#f9f9f9',
            p: 6,
            borderRadius: 5,
            boxShadow: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant='h4' component='h1' gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label='Email'
              margin='normal'
              sx={{ backgroundColor: 'white' }}
              {...register('email', { required: 'Email is required' })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
            />
            <TextField
              fullWidth
              label='Password'
              type='password'
              margin='normal'
              sx={{ backgroundColor: 'white' }}
              {...register('password', { required: 'Password is required' })}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
            />
            {mutation.isError && (
              <Typography variant='body1' color='error'>
                Login Failed
              </Typography>
            )}
            {mutation.isSuccess && (
              <Typography variant='body1' color='success'>
                Logged in successfully
              </Typography>
            )}
            {mutation.isLoading ? (
              <CircularProgress
                size={30}
                sx={{
                  mt: 3,
                }}
              />
            ) : (
              <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                sx={{
                  mt: 3,
                  width: '60%',
                  height: 50,
                  fontSize: 20,
                  borderRadius: 5,
                }}
              >
                Login
              </Button>
            )}
          </form>
        </Box>
      </Container>
    </Box>
  )
}

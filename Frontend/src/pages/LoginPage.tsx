import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material'
import { LoginRequest } from '../types/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginRequestSchema } from '../types/schemas'
import { login } from '../actions/authActions'
import { useNavigate } from 'react-router'
import { Phishing } from '@mui/icons-material'
import { AxiosResponse } from 'axios'
import { useEffect, useRef } from 'react'

export default function LoginPage() {
  const navigate = useNavigate()
  const resultRef = useRef<AxiosResponse | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({ resolver: zodResolver(LoginRequestSchema) })
  const mutation = useMutation({
    mutationFn: async (data: LoginRequest) => {
      const res = await login(data)
      resultRef.current = res
    },
  })

  useEffect(() => {
    if (resultRef.current?.status === 200) {
      navigate('/')
    }
  }, [resultRef.current])

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
        backgroundImage:
          'url(https://cdn.prod.website-files.com/649c855c0f07ccf3e5f7970d/6501eceb415dfd2297c09cf6_iStock-1251358437.jpeg)',
        backgroundSize: 'cover',
      }}
    >
      <Container maxWidth='sm'>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 0,
            backdropFilter: 'blur(50px)',
            paddingX: 5,
            borderRadius: '10px',
          }}
        >
          <Phishing
            sx={{
              display: { xs: 'none', md: 'flex' },
              marginRight: 1,
              fontSize: 55,
              color: 'white',
            }}
          />
          <Typography
            variant='h2'
            noWrap
            sx={{
              marginRight: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 500,
              letterSpacing: '0.1rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            Fish Farms
          </Typography>
        </Box>
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

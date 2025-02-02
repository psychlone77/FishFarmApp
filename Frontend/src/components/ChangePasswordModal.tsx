import { Box, Modal, TextField, Button, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from 'react-query'
import { changeMyPassword } from '../actions/authActions'
import { notifySuccess } from '../contexts/ToastContext'
import { UpdatePasswordRequestSchema } from '../types/schemas'
import { UpdatePasswordRequest } from '../types/types'

export default function ChangePasswordModal({
  open,
  handleClose,
}: {
  open: boolean
  handleClose: () => void
}) {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordRequest>({ resolver: zodResolver(UpdatePasswordRequestSchema) })
  const mutation = useMutation(changeMyPassword)
  const onSubmit: SubmitHandler<UpdatePasswordRequest> = data => {
    mutation.mutate(data, {
      onSuccess: () => {
        queryClient.refetchQueries('user')
        notifySuccess('Password changed successfully')
        handleClose()
      },
    })
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 4,
          p: 2,
        }}
      >
        <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
          <Typography variant='h5' gutterBottom>
            Change Password
          </Typography>
          <TextField
            label='Old Password'
            type='password'
            fullWidth
            margin='normal'
            {...register('oldPassword')}
            error={!!errors.oldPassword}
            helperText={errors.oldPassword ? errors.oldPassword.message : ''}
          />
          <TextField
            label='New Password'
            type='password'
            fullWidth
            margin='normal'
            {...register('newPassword')}
            error={!!errors.newPassword}
            helperText={errors.newPassword ? errors.newPassword.message : ''}
          />
          <TextField
            label='Confirm Password'
            type='password'
            fullWidth
            margin='normal'
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
          />
          <Button variant='contained' color='primary' sx={{ mt: 2 }} type='submit'>
            Change Password
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

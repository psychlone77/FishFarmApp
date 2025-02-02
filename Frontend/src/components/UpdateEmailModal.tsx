import { Box, Modal, TextField, Button, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { UpdateEmail } from '../types/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateEmailRequestSchema } from '../types/schemas'
import { useMutation, useQueryClient } from 'react-query'
import { updateMyEmail } from '../actions/authActions'
import { notifySuccess } from '../contexts/ToastContext'

export default function UpdateEmailModal({
  email,
  open,
  handleClose,
}: {
  email: string
  open: boolean
  handleClose: () => void
}) {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateEmail>({ resolver: zodResolver(UpdateEmailRequestSchema) })
  const mutation = useMutation((data: UpdateEmail) => updateMyEmail(data))
  const onSubmit: SubmitHandler<UpdateEmail> = data => {
    mutation.mutate(data, {
      onSuccess: () => {
        queryClient.refetchQueries('user')
        notifySuccess('Email updated successfully')
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
          width: '500px',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 4,
          p: 2,
        }}
      >
        <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
          <Typography variant='h5' gutterBottom>
            Update Email
          </Typography>
          <TextField
            label='Email'
            fullWidth
            margin='normal'
            defaultValue={email}
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />
          <Button variant='contained' color='primary' sx={{ mt: 2 }} type='submit'>
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

import { Modal, Box, Typography, Button } from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'
import ImagePicker from './ImagePicker'
import { useMutation, useQueryClient } from 'react-query'
import { updateProfilePicture } from '../actions/authActions'
import { notifySuccess } from '../contexts/ToastContext'
import { UpdateImageFormValues, UpdateImageModalProps } from '../types/interfaces'

export default function UpdateImageModal({ open, handleClose, imageUrl }: UpdateImageModalProps) {
  const { control, handleSubmit, setValue } = useForm<UpdateImageFormValues>()
  const queryClient = useQueryClient()

  const mutation = useMutation((data: UpdateImageFormValues) => updateProfilePicture(data.image))

  const onSubmit: SubmitHandler<UpdateImageFormValues> = data => {
    mutation.mutate(data, {
      onSuccess: () => {
        queryClient.refetchQueries('user')
        notifySuccess('Image updated successfully')
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
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 4,
          p: 4,
        }}
      >
        <Typography variant='h5'>Update Image</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={2} mb={4}>
          <ImagePicker
            control={control}
            setValue={setValue}
            name='image'
            imageUrl={imageUrl}
            required
            avatar={true}
          />
        </Box>
        <Box mt={2} display='flex' justifyContent='space-between'>
          <Button variant='contained' color='primary' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='contained' color='primary' onClick={handleSubmit(onSubmit)}>
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import {
  TextField,
  Button,
  Box,
  Modal,
  IconButton,
  Typography,
  FormControlLabel,
  Checkbox,
  LinearProgress,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { FishFarmRequest } from '../types/types'
import { createFishFarm, deleteFishFarm, updateFishFarm } from '../actions/fishFarmActions'
import { FishFarmFormProps } from '../types/interfaces'
import { zodResolver } from '@hookform/resolvers/zod'
import { FishFarmRequestSchema } from '../types/schemas'
import { useNavigate } from 'react-router'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
}

export default function FishFarmForm({
  title,
  open,
  handleClose,
  notifySuccess,
  notifyError,
  initialValues,
}: FishFarmFormProps) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FishFarmRequest>({ resolver: zodResolver(FishFarmRequestSchema) })
  const mutation = useMutation({
    mutationFn: initialValues
      ? (farm: FishFarmRequest) => updateFishFarm(farm, initialValues.id)
      : createFishFarm,
  })
  const mutationSecondary = useMutation(() =>
    initialValues ? deleteFishFarm(initialValues?.id) : Promise.resolve(),
  )

  const onSubmit: SubmitHandler<FishFarmRequest> = data => {
    mutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(initialValues ? ['fishFarm', initialValues?.id] : 'fishFarms')
        notifySuccess(
          initialValues ? 'Fish farm updated successfully' : 'Fish farm added successfully',
        )
        handleClose()
      },
      onError: () => {
        notifyError(initialValues ? 'Error updating fish farm' : 'Error adding fish farm')
      },
    })
  }

  const handleSecondaryAction = () => {
    if (mutationSecondary) {
      mutationSecondary.mutate(undefined, {
        onSuccess: () => {
          queryClient.invalidateQueries('fishfarms')
          notifySuccess('Fish farm deleted successfully')
          handleClose()
          navigate('/')
        },
        onError: () => {
          notifyError('Error deleting fish farm')
        },
      })
    }
  }

  return (
    <Modal open={open} onClose={() => handleClose()}>
      <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={style}>
        <Box display='flex' alignItems='center' marginBottom={2}>
          <Box flexGrow={1}>
            <Typography variant='h5'>{title}</Typography>
          </Box>
          <Box>
            <IconButton onClick={handleClose}>
              <CloseIcon color='error' />
            </IconButton>
          </Box>
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label='Name'
            variant='outlined'
            defaultValue={initialValues?.name}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ''}
            {...register('name', { required: true })}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label='Latitude'
            variant='outlined'
            defaultValue={initialValues?.latitude}
            error={!!errors.latitude}
            helperText={errors.latitude ? errors.latitude.message : ''}
            {...register('latitude', { required: true, valueAsNumber: true })}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label='Longitude'
            variant='outlined'
            defaultValue={initialValues?.longitude}
            error={!!errors.longitude}
            helperText={errors.longitude ? errors.longitude.message : ''}
            {...register('longitude', { required: true, valueAsNumber: true })}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label='Cage Count'
            variant='outlined'
            defaultValue={initialValues?.cageCount}
            error={!!errors.cageCount}
            helperText={errors.cageCount ? errors.cageCount.message : ''}
            {...register('cageCount', { required: true, valueAsNumber: true })}
          />
        </Box>
        <Box mb={2}>
          <FormControlLabel
            control={
              <Checkbox defaultChecked={initialValues?.hasBarge} {...register('hasBarge')} />
            }
            label='Has Barge'
          />
          {errors.hasBarge && <Typography color='error'>{errors.hasBarge.message}</Typography>}
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label='Image URL'
            variant='outlined'
            defaultValue={initialValues?.imageURL}
            error={!!errors.imageURL}
            helperText={errors.imageURL ? errors.imageURL.message : ''}
            {...register('imageURL', { required: true })}
          />
        </Box>
        <Box display='flex' justifyContent='space-between' width={'100%'}>
          {mutation.isLoading || mutationSecondary.isLoading ? (
            <Box sx={{ width: '100%', height: 37, display: 'flex', alignItems: 'center' }}>
              <LinearProgress sx={{flexGrow: 1}}/>
            </Box>
          ) : (
            <>
          {initialValues && (
            <Button variant='outlined' color='error' onClick={handleSecondaryAction}>
              Delete Fish Farm
            </Button>
          )}
          <Button sx={{ marginLeft: 'auto' }} variant='contained' color='primary' type='submit'>
            {initialValues ? 'Update' : 'Add'}
          </Button>
            </>
          )}
        </Box>
      </Box>
    </Modal>
  )
}

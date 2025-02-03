import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import {
  TextField,
  Button,
  Box,
  Modal,
  IconButton,
  Typography,
  LinearProgress,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { FishFarmRequest } from '../../types/types'
import { createFishFarm, deleteFishFarm, updateFishFarm } from '../../actions/fishFarmActions'
import { FishFarmFormProps } from '../../types/interfaces'
import { zodResolver } from '@hookform/resolvers/zod'
import { FishFarmRequestSchema } from '../../types/schemas'
import { useNavigate } from 'react-router'
import ImagePicker from '../ImagePicker'
import { useToast } from '../../contexts/ToastContext'
import LocationPicker from '../Leaflet/CustomLocationPicker'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
}

export default function FishFarmForm({
  title,
  open,
  handleClose,
  initialValues,
}: FishFarmFormProps) {
  const queryClient = useQueryClient()
  const { notifySuccess } = useToast()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FishFarmRequest>({ resolver: zodResolver(FishFarmRequestSchema) })
  const mutation = useMutation({
    mutationFn: initialValues
      ? (farm: FishFarmRequest) => updateFishFarm(farm, initialValues.id)
      : createFishFarm,
  })

  const onSubmit: SubmitHandler<FishFarmRequest> = data => {
    mutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(initialValues ? ['fishFarm', initialValues?.id] : 'fishFarms')
        notifySuccess(
          initialValues ? 'Fish farm updated successfully' : 'Fish farm added successfully',
        )
        handleClose()
      },
    })
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
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ width: '500px' }}>
            <ImagePicker
              control={control}
              setValue={setValue}
              name='imageFile'
              imageUrl={initialValues?.imageURL}
              required={initialValues?.imageURL ? false : true}
            />
          </Box>
          <Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
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
                  label='Cage Count'
                  type='number'
                  variant='outlined'
                  defaultValue={initialValues?.cageCount}
                  error={!!errors.cageCount}
                  helperText={errors.cageCount ? errors.cageCount.message : ''}
                  {...register('cageCount', { required: true, valueAsNumber: true })}
                />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} mb={2}>
              {/* <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 2 }}>
                  <TextField
                    fullWidth
                    label='Latitude'
                    variant='outlined'
                    defaultValue={initialValues?.latitude}
                    error={!!errors.latitude}
                    helperText={errors.latitude ? errors.latitude.message : ''}
                    {...register('latitude', { required: true, valueAsNumber: true })}
                  />
                  <TextField
                    fullWidth
                    label='Longitude'
                    variant='outlined'
                    defaultValue={initialValues?.longitude}
                    error={!!errors.longitude}
                    helperText={errors.longitude ? errors.longitude.message : ''}
                    {...register('longitude', { required: true, valueAsNumber: true })}
                  />
                </Box> */}
              <LocationPicker
                initialLocation={
                  initialValues ? [initialValues?.latitude, initialValues?.longitude] : null
                }
                control={control}
                setValue={setValue}
              />
              {(errors.latitude || errors.longitude) && (
                <Box>
                  <Typography variant='body2' color='error'>
                    Please select a location on the map
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Box display='flex' justifyContent='space-between' width={'100%'}>
          {mutation.isLoading ? (
            <Box sx={{ width: '100%', height: 37, display: 'flex', alignItems: 'center' }}>
              <LinearProgress sx={{ flexGrow: 1 }} />
            </Box>
          ) : (
            <>
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

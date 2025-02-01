import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import {
  TextField,
  Button,
  Box,
  Modal,
  IconButton,
  Typography,
  MenuItem,
  LinearProgress,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { EmployeeRequest } from '../../types/types'
import { createEmployee, updateEmployee } from '../../actions/employeeActions'
import { EmployeeFormProps } from '../../types/interfaces'
import { zodResolver } from '@hookform/resolvers/zod'
import { EmployeePositionEnum, EmployeeRequestSchema } from '../../types/schemas'
import ImagePicker from '../ImagePicker'
import { useToast } from '../../contexts/ToastContext'

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

export default function EmployeeForm({
  title,
  open,
  handleClose,
  initialValues,
}: EmployeeFormProps) {
  const { notifySuccess } = useToast()
  const queryClient = useQueryClient()
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeRequest>({ resolver: zodResolver(EmployeeRequestSchema) })
  const mutation = useMutation(
    initialValues
      ? (employee: EmployeeRequest) => updateEmployee(employee, initialValues.id)
      : (employee: EmployeeRequest) => createEmployee(employee),
  )

  const onSubmit: SubmitHandler<EmployeeRequest> = data => {
    mutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(initialValues ? ['employee', initialValues?.id] : 'employees')
        notifySuccess(
          initialValues ? 'Employee updated successfully' : 'Employee added successfully',
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
        <Box mb={2}>
          <ImagePicker
            control={control}
            setValue={setValue}
            name='imageFile'
            imageUrl={initialValues?.imageURL}
            required={true}
          />
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
            label='Age'
            variant='outlined'
            defaultValue={initialValues?.age}
            error={!!errors.age}
            helperText={errors.age ? errors.age.message : ''}
            {...register('age', { required: true, valueAsNumber: true })}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label='Email'
            variant='outlined'
            defaultValue={initialValues?.email}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
            {...register('email', { required: true })}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label='Certified Until'
            variant='outlined'
            type='datetime-local'
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            defaultValue={initialValues?.certifiedUntil}
            error={!!errors.certifiedUntil}
            helperText={errors.certifiedUntil ? errors.certifiedUntil.message : ''}
            {...register('certifiedUntil', { required: true, valueAsDate: true })}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            select
            label='Employee Position'
            variant='outlined'
            defaultValue={initialValues?.employeePosition}
            error={!!errors.employeePosition}
            helperText={errors.employeePosition ? errors.employeePosition.message : ''}
            {...register('employeePosition', { required: true })}
          >
            {EmployeePositionEnum.options.map(position => (
              <MenuItem key={position} value={position}>
                {position}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box mb={2}>
          {initialValues === undefined && (
            <TextField
              fullWidth
              label='Default Password'
              variant='outlined'
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
              {...register('password', { required: true })}
            />
          )}
        </Box>
        <Box display='flex' justifyContent='space-between' width={'100%'}>
          {mutation.isLoading ? (
            <Box sx={{ width: '100%', height: 37, display: 'flex', alignItems: 'center' }}>
              <LinearProgress sx={{ flexGrow: 1 }} />
            </Box>
          ) : (
            <Button sx={{ marginLeft: 'auto' }} variant='contained' color='primary' type='submit'>
              {initialValues ? 'Update' : 'Add'}
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  )
}

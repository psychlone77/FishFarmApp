import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { TextField, Button, Box, Modal, IconButton, Typography, MenuItem } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { EmployeeRequest } from '../types/types'
import { createEmployee, deleteEmployee, updateEmployee } from '../actions/employeeActions'
import { EmployeeFormProps } from '../types/interfaces'
import { zodResolver } from '@hookform/resolvers/zod'
import { EmployeePositionEnum, EmployeeRequestSchema } from '../types/schemas'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

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
  fishFarmId,
  initialValues,
}: EmployeeFormProps) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeRequest>({ resolver: zodResolver(EmployeeRequestSchema) })
  const mutation = useMutation(
    initialValues
      ? (employee: EmployeeRequest) =>
          updateEmployee(employee, initialValues.employeeId, fishFarmId)
      : (employee: EmployeeRequest) => createEmployee(employee, fishFarmId),
  )
  const mutationSecondary = useMutation(() =>
    initialValues ? deleteEmployee(initialValues?.employeeId, fishFarmId) : Promise.resolve(),
  )

  const onSubmit: SubmitHandler<EmployeeRequest> = data => {
    mutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(
          initialValues ? ['employee', initialValues?.employeeId] : 'employees',
        )
        toast.success(
          initialValues ? 'Employee updated successfully' : 'Employee added successfully',
        )
        handleClose()
      }
    })
  }

  const handleSecondaryAction = () => {
    if (mutationSecondary) {
      mutationSecondary.mutate(undefined, {
        onSuccess: () => {
          queryClient.invalidateQueries('employees')
          toast.success('Employee deleted successfully')
          handleClose()
          navigate(`/fish-farms/${fishFarmId}`)
        },
        onError: () => {
          toast.error('Error deleting employee')
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
            label='Image URL'
            variant='outlined'
            defaultValue={initialValues?.imageURL}
            error={!!errors.imageURL}
            helperText={errors.imageURL ? errors.imageURL.message : ''}
            {...register('imageURL', { required: false })}
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
          <TextField
            fullWidth
            label='Password'
            variant='outlined'
            defaultValue={initialValues?.password}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
            {...register('password', { required: true })}
          />
        </Box>
        <Box display='flex' justifyContent='space-between'>
          {initialValues && (
            <Button variant='outlined' color='error' onClick={handleSecondaryAction}>
              Delete Employee
            </Button>
          )}
          <Button sx={{ marginLeft: 'auto' }} variant='contained' color='primary' type='submit'>
            {initialValues ? 'Update' : 'Add'}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

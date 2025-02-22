import { Modal, Box, Typography, Button } from '@mui/material'
import { useMutation, useQueryClient } from 'react-query'
import { unassignEmployee } from '../../actions/employeeActions'
import { useToast } from '../../contexts/ToastContext'
import { UnassignModalProps } from '../../types/interfaces'

export default function UnassignEmployeeModal({
  open,
  handleClose,
  employee,
  fishFarmId,
}: UnassignModalProps) {
  const queryClient = useQueryClient()
  const { notifySuccess } = useToast()
  const mutation = useMutation(() => unassignEmployee(fishFarmId, employee.id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['employees', fishFarmId, 'unassigned'])
      queryClient.invalidateQueries(['employees', fishFarmId])
      notifySuccess('Employee unassigned successfully')
    },
  })
  const handleConfirm = () => {
    mutation.mutate()
    handleClose()
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
        <Typography variant='h5'>Unassign this employee?</Typography>
        <Box mt={2} mb={4}>
          <Typography variant='body1'>
            {employee.name} - {employee.employeePosition}
          </Typography>
          <Typography variant='body1'>{employee.id}</Typography>
        </Box>
        <Box mt={2} display='flex' justifyContent='space-between'>
          <Button variant='contained' color='primary' onClick={handleClose}>
            No
          </Button>
          <Button variant='contained' color='secondary' onClick={handleConfirm}>
            Yes
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

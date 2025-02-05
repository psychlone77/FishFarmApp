import { Modal, Box, Typography, Button } from '@mui/material'
import { useMutation, useQueryClient } from 'react-query'
import { unassignAdmin } from '../../actions/adminActions'
import { useToast } from '../../contexts/ToastContext'
import { UnassignAdminModalProps } from '../../types/interfaces'

export default function UnassignAdminModal({
  open,
  handleClose,
  admin,
  fishFarmId,
}: UnassignAdminModalProps) {
  const queryClient = useQueryClient()
  const { notifySuccess } = useToast()
  const mutation = useMutation(() => unassignAdmin(fishFarmId, admin.id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['admins', fishFarmId, 'unassigned'])
      queryClient.invalidateQueries(['admins', fishFarmId])
      notifySuccess('Admin unassigned successfully')
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
        <Typography variant='h5'>Unassign this admin?</Typography>
        <Box mt={2} mb={4}>
          <Typography variant='body1'>
            {admin.name} - {admin.employeePosition}
          </Typography>
          <Typography variant='body1'>{admin.id}</Typography>
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

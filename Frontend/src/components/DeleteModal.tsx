import { Modal, Box, Typography, Button } from '@mui/material'
import { DeleteModalProps } from '../types/interfaces'

export default function DeleteModal({
  open,
  handleClose,
  handleDelete,
  entityName,
  warningText,
}: DeleteModalProps) {
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
        <Typography variant='h5'>Delete this {entityName}?</Typography>
        <Box mt={2} mb={4}>
          <Typography variant='body1'>{warningText}</Typography>
        </Box>
        <Box mt={2} display='flex' justifyContent='space-between'>
          <Button variant='contained' color='primary' onClick={handleClose}>
            No
          </Button>
          <Button variant='contained' color='error' onClick={handleDelete}>
            Yes
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

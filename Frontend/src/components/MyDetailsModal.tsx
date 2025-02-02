import { useState } from 'react'
import {
  Box,
  Modal,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
} from '@mui/material'
import { EmployeeResponse } from '../types/types'
import ChangePasswordModal from './ChangePasswordModal'
import UpdateEmailModal from './UpdateEmailModal'

export default function MyDetailsModal({
  open,
  handleClose,
  user,
}: {
  open: boolean
  handleClose: () => void
  user: EmployeeResponse | null
}) {
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)
  if (!user) return null
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            minHeight: '500px',
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 4,
            p: 2,
          }}
        >
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar alt={user.name} src={user.imageURL} sx={{ width: 60, height: 60}} />
              <Typography variant='h5'>
                {user.name}
              </Typography>
              <Typography variant='caption'>
                {user.employeePosition}
              </Typography>
            </Box>
            <List>
              <ListItem>
                <ListItemText primary='Email' secondary={user.email} />
              </ListItem>
              <ListItem>
                <ListItemText primary='Position' secondary={user.employeePosition} />
              </ListItem>
              <ListItem>
                <ListItemText primary='Age' secondary={user.age} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary='Certified Until'
                  secondary={new Date(user.certifiedUntil).toLocaleDateString()}
                />
              </ListItem>
            </List>
            <Button
              variant='outlined'
              onClick={() => setUpdateModalOpen(true)}
              sx={{ mt: 2, width: '100%' }}
            >
              Update Email
            </Button>
            <Button
              variant='outlined'
              onClick={() => setPasswordModalOpen(true)}
              sx={{ mt: 2, width: '100%' }}
            >
              Change Password
            </Button>
          </Box>
        </Box>
      </Modal>

      <UpdateEmailModal email={user.email} open={updateModalOpen} handleClose={() => setUpdateModalOpen(false)} />

      <ChangePasswordModal
        open={passwordModalOpen}
        handleClose={() => setPasswordModalOpen(false)}
      />
    </>
  )
}

import { useEffect, useState } from 'react'
import {
  Modal,
  Button,
  TextField,
  List,
  ListItemText,
  ListItemButton,
  Box,
  Typography,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { assignEmployee, getUnassignedEmployees } from '../../actions/employeeActions'
import { EmployeeResponse } from '../../types/types'
import { useToast } from '../../contexts/ToastContext'

export default function AssignEmployeeForm({
  open,
  handleClose,
  fishFarmId,
}: {
  open: boolean
  handleClose: () => void
  fishFarmId: string
}) {
  const queryClient = useQueryClient()
  const { notifySuccess } = useToast()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeResponse | null>(null)
  const [filteredEmployees, setFilteredEmployees] = useState<EmployeeResponse[]>([])

  const { data } = useQuery(
    ['employees', fishFarmId, 'unassigned'],
    () => getUnassignedEmployees(fishFarmId),
    {
      enabled: !!fishFarmId,
    },
  )

  const mutation = useMutation(() => assignEmployee(fishFarmId, selectedEmployee!.id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['employees', fishFarmId, 'unassigned'])
      queryClient.invalidateQueries(['employees', fishFarmId])
      notifySuccess('Employee assigned successfully')
      setSelectedEmployee(null)
    },
  })

  const handleAssign = () => {
    mutation.mutate()
  }

  useEffect(() => {
    if (data) {
      const filteredEmployees = data.filter(
        employee =>
          employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredEmployees(filteredEmployees)
    } else {
      setFilteredEmployees([])
    }
  }, [data, searchTerm])

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '40%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 4,
          p: 4,
        }}
      >
        <Box display='flex' alignItems='center' marginBottom={2}>
          <Box flexGrow={1}>
            <Typography variant='h5'>Assign Employees</Typography>
          </Box>
          <Box>
            <IconButton onClick={handleClose}>
              <CloseIcon color='error' />
            </IconButton>
          </Box>
        </Box>
        <TextField
          fullWidth
          placeholder='Search employees'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          margin='normal'
        />
        <Box sx={{ minHeight: '200px', maxHeight: '200px', overflowY: 'auto' }}>
          {data?.length === 0 ? (
            <Typography sx={{ marginTop: 2 }} variant='subtitle1' align='center'>
              No Employees to Assign
            </Typography>
          ) : filteredEmployees.length > 0 ? (
            <List>
              {filteredEmployees.map(employee => (
                <ListItemButton
                  key={employee.id}
                  onClick={() => setSelectedEmployee(employee)}
                  selected={selectedEmployee?.id === employee.id}
                  sx={{
                    backgroundColor:
                      selectedEmployee?.id === employee.id ? 'rgba(0, 0, 0, 0.08)' : 'inherit',
                    border:
                      selectedEmployee?.id === employee.id
                        ? '1px solid rgba(0, 0, 0, 0.2)'
                        : 'none',
                  }}
                >
                  <ListItemText
                    primary={`${employee.name} - ${employee.employeePosition}`}
                    secondary={employee.id}
                  />
                </ListItemButton>
              ))}
            </List>
          ) : (
            <Typography sx={{ marginTop: 2 }} variant='subtitle1' align='center'>
              No Matches Found
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button onClick={handleClose} style={{ marginRight: '10px' }}>
            Cancel
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={handleAssign}
            disabled={!selectedEmployee}
          >
            Assign '{selectedEmployee?.name}'
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

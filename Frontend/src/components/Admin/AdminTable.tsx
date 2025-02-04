import { useQuery } from 'react-query'
import { getAdmins } from '../../actions/adminActions'
import {
  Box,
  Button,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router'
import { Link, LinkOff, NavigateNext, Person } from '@mui/icons-material'
import { useState } from 'react'
import { EmployeeResponse as AdminResponse } from '../../types/types'
import AssignAdminForm from './AssignAdminForm'
import UnassignAdminModal from './UnassignAdminModal'

export default function AdminTable({ fishFarmId }: { fishFarmId: string | undefined }) {
  const navigate = useNavigate()
  const [showAssignAdminForm, setShowAssignAdminForm] = useState(false)
  const [showUnassignModal, setShowUnassignModal] = useState(false)
  const [unassignAdmin, setUnassignAdmin] = useState<AdminResponse | null>(null)
  const {
    data: admins,
    isLoading,
    isFetching,
  } = useQuery(['admins', fishFarmId], () => getAdmins(fishFarmId!), {
    enabled: !!fishFarmId,
  })
  return (
    <TableContainer
      sx={{
        border: 1,
        position: 'relative',
        borderColor: 'primary.main',
        width: '100%',
      }}
      component={Paper}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 2,
          padding: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Person
            sx={{
              display: 'flex',
              marginRight: 1,
              fontSize: 40,
            }}
          />
          <Typography variant='h5'>Assigned Admins</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'end', gap: 2 }}>
          <Button variant='contained' onClick={() => setShowAssignAdminForm(true)}>
            <Link />
            Assign Admin
          </Button>
        </Box>
      </Box>
      <Table sx={{ minWidth: 300 }}>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Employee Id</TableCell>
            <TableCell align='center'>Name</TableCell>
            <TableCell align='center'>Position</TableCell>
            <TableCell align='center'>Age</TableCell>
            <TableCell align='center'>Email</TableCell>
            <TableCell align='center'>Certified Until</TableCell>
            <TableCell align='center'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading
            ? [...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton variant='text' />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant='text' />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant='text' />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant='text' />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant='text' />
                  </TableCell>
                </TableRow>
              ))
            : null}
          {admins?.map(admin => (
            <TableRow
              key={admin.id}
              hover
              sx={{
                '&:hover': { cursor: 'pointer' },
                '&:last-child td, &:last-child th': { border: 0 },
              }}
              onClick={() => {
                navigate(`/employees/${admin.id}`)
              }}
            >
              <TableCell align='center'>{admin.id}</TableCell>
              <TableCell align='center'>{admin.name}</TableCell>
              <TableCell align='center'>{admin.employeePosition}</TableCell>
              <TableCell align='center'>{admin.age}</TableCell>
              <TableCell align='center'>{admin.email}</TableCell>
              <TableCell align='center'>
                {new Date(admin.certifiedUntil).toLocaleDateString()}
              </TableCell>
              <TableCell align='center'>
                <LinkOff
                  sx={{ marginRight: 2, '&:hover': { color: 'red' } }}
                  onClick={e => {
                    e.stopPropagation()
                    setUnassignAdmin(admin)
                    setShowUnassignModal(true)
                  }}
                />
                <NavigateNext />
              </TableCell>
            </TableRow>
          ))}
          {admins?.length === 0 && !isFetching && (
            <TableRow>
              <TableCell colSpan={6} align='center'>
                No admins assigned
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <AssignAdminForm
        open={showAssignAdminForm}
        handleClose={() => setShowAssignAdminForm(false)}
        fishFarmId={fishFarmId!}
      />
      {unassignAdmin && (
        <UnassignAdminModal
          admin={unassignAdmin!}
          fishFarmId={fishFarmId!}
          open={showUnassignModal}
          handleClose={() => setShowUnassignModal(false)}
        />
      )}
    </TableContainer>
  )
}

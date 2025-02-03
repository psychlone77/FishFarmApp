import { useQuery } from 'react-query'
import getEmployeesByFishFarm from '../../actions/employeeActions'
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
import { Edit, Link, LinkOff, Person } from '@mui/icons-material'
import { useState } from 'react'
import AssignEmployeeForm from './AssignEmployeeForm'
import UnassignEmployeeModal from './UnassignEmployeeModal'
import { EmployeeResponse } from '../../types/types'
import { checkAccess } from '../Authorize'

export default function EmployeeTable({ fishFarmId }: { fishFarmId: string | undefined }) {
  const navigate = useNavigate()
  const [showAssignEmployeeForm, setShowAssignEmployeeForm] = useState(false)
  const [showUnassignModal, setShowUnassignModal] = useState(false)
  const [unassignEmployee, setUnassignEmployee] = useState<EmployeeResponse | null>(null)
  const {
    data: employees,
    isLoading,
    isFetching,
  } = useQuery(['employees', fishFarmId], () => getEmployeesByFishFarm(fishFarmId!), {
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2, padding: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Person
            sx={{
              display: 'flex',
              marginRight: 1,
              fontSize: 40,
            }}
          />
          <Typography variant='h5'>Assigned Employees</Typography>
        </Box>
        <Box
          sx={{ display: 'flex', justifyContent: 'end', gap: 2 }}
        >
          <Button variant='contained' onClick={() => setShowAssignEmployeeForm(true)}>
            <Link />
            Assign Employee
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
          {employees?.map(employee => (
            <TableRow
              key={employee.id}
              {...checkAccess(1)
                ? {
                  hover: true,
                    sx: {
                      '&:hover': { cursor: 'pointer' },
                      '&:last-child td, &:last-child th': { border: 0 },
                    },
                    onClick:() => {
                      navigate(`/employees/${employee.id}`, {preventScrollReset: false})
                    },
                  }
                : {}
              }
            >
              <TableCell align='center'>{employee.id}</TableCell>
              <TableCell align='center'>{employee.name}</TableCell>
              <TableCell align='center'>{employee.employeePosition}</TableCell>
              <TableCell align='center'>{employee.age}</TableCell>
              <TableCell align='center'>{employee.email}</TableCell>
              <TableCell align='center'>
                {new Date(employee.certifiedUntil).toLocaleDateString()}
              </TableCell>
              <TableCell align='center'>
                <LinkOff
                  sx={{ marginRight: 2, '&:hover': { color: 'red', cursor: 'pointer' } }}
                  onClick={e => {
                    e.stopPropagation()
                    setUnassignEmployee(employee)
                    setShowUnassignModal(true)
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
          {employees?.length === 0 && !isFetching && (
            <TableRow>
              <TableCell colSpan={6} align='center'>
                No employees assigned
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <AssignEmployeeForm
        open={showAssignEmployeeForm}
        handleClose={() => setShowAssignEmployeeForm(false)}
        fishFarmId={fishFarmId!}
      />
      {unassignEmployee && (
        <UnassignEmployeeModal
          employee={unassignEmployee!}
          fishFarmId={fishFarmId!}
          open={showUnassignModal}
          handleClose={() => setShowUnassignModal(false)}
        />
      )}
    </TableContainer>
  )
}

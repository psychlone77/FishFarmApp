import { useQuery } from 'react-query'
import getEmployees from '../actions/employeeActions'
import {
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
import { Add, Edit } from '@mui/icons-material'
import { useState } from 'react'
import EmployeeForm from './EmployeeForm'

export default function EmployeeList({
  fishFarmId,
  notifySuccess,
  notifyError,
}: {
  fishFarmId: string | undefined
  notifySuccess: (message: string) => void
  notifyError: (message: string) => void
}) {
  const navigate = useNavigate()
  const [showEmployeeForm, setShowEmployeeForm] = useState(false)
  const {
    data: employees,
    isLoading,
    isFetching,
  } = useQuery(['employees', fishFarmId], () => getEmployees(fishFarmId!), {
    enabled: !!fishFarmId,
  })
  return (
    <TableContainer
      sx={{ position: 'relative', width: '95%', marginTop: 2, marginLeft: 5, marginRight: 5 }}
      component={Paper}
    >
      <Typography
        variant='h4'
        component='div'
        align='center'
        noWrap
        sx={{ marginTop: 2, marginBottom: 2 }}
      >
        Employees
      </Typography>
      <Button
        sx={{ position: 'absolute', right: 30, top: 30 }}
        variant='contained'
        onClick={() => setShowEmployeeForm(true)}
      >
        <Add />
        Add Employee
      </Button>
      <Table sx={{ minWidth: 300 }}>
        <TableHead>
          <TableRow>
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
              hover
              sx={{
                '&:hover': { cursor: 'pointer' },
                '&:last-child td, &:last-child th': { border: 0 },
              }}
              onClick={() => {
                navigate(`employees/${employee.id}`)
              }}
            >
              <TableCell align='center'>{employee.name}</TableCell>
              <TableCell align='center'>{employee.employeePosition}</TableCell>
              <TableCell align='center'>{employee.age}</TableCell>
              <TableCell align='center'>{employee.email}</TableCell>
              <TableCell align='center'>
                {new Date(employee.certifiedUntil).toLocaleDateString()}
              </TableCell>
              <TableCell align='center'>
                <Edit />
              </TableCell>
            </TableRow>
          ))}
          {employees?.length === 0 && !isFetching && (
            <TableRow>
              <TableCell colSpan={5} align='center'>
                No employees found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <EmployeeForm
        title='Add Employee'
        fishFarmId={fishFarmId!}
        open={showEmployeeForm}
        handleClose={() => setShowEmployeeForm(false)}
        notifySuccess={notifySuccess}
        notifyError={notifyError}
      />
    </TableContainer>
  )
}

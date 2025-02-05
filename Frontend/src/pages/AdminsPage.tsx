import { useState } from 'react'
import { useQuery } from 'react-query'
import {
  Avatar,
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
  TextField,
  Typography,
  TableSortLabel,
} from '@mui/material'
import { Add, Edit, Person } from '@mui/icons-material'
import { useNavigate } from 'react-router'
// import AdminForm from '../components/Admin/AdminForm'
import { EmployeeResponse } from '../types/types'
import { isDatePassed } from '../helpers/utils'
import { getAllAdmins } from '../actions/adminActions'
import AdminForm from '../components/Admin/AdminForm'

export default function AdminsPage() {
  const navigate = useNavigate()
  const [showAdminForm, setShowAdminForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<keyof EmployeeResponse | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const { data: admins, isLoading } = useQuery('admins', getAllAdmins)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSort = (field: keyof EmployeeResponse) => {
    const isAsc = sortField === field && sortOrder === 'asc'
    setSortOrder(isAsc ? 'desc' : 'asc')
    setSortField(field)
  }

  const filteredAdmins = admins?.filter(
    admin =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedAdmins = filteredAdmins?.sort((a, b) => {
    if (!sortField) return 0
    if (
      sortField &&
      a[sortField] !== undefined &&
      b[sortField] !== undefined &&
      a[sortField] < b[sortField]
    )
      return sortOrder === 'asc' ? -1 : 1
    if (
      sortField &&
      a[sortField] !== undefined &&
      b[sortField] !== undefined &&
      a[sortField] > b[sortField]
    )
      return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Person sx={{ marginRight: 1, fontSize: 40 }} />
          <Typography variant='h5'>Admins</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label='Search Admins'
            variant='outlined'
            value={searchTerm}
            onChange={handleSearch}
          />
          <Button variant='contained' onClick={() => setShowAdminForm(true)}>
            <Add />
            Add Admin
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Image</TableCell>
              <TableCell align='center'>
                <TableSortLabel
                  active={sortField === 'id'}
                  direction={sortField === 'id' ? sortOrder : 'asc'}
                  onClick={() => handleSort('id')}
                >
                  Admin Id
                </TableSortLabel>
              </TableCell>
              <TableCell align='center'>
                <TableSortLabel
                  active={sortField === 'name'}
                  direction={sortField === 'name' ? sortOrder : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell align='center'>
                <TableSortLabel
                  active={sortField === 'employeePosition'}
                  direction={sortField === 'employeePosition' ? sortOrder : 'asc'}
                  onClick={() => handleSort('employeePosition')}
                >
                  Position
                </TableSortLabel>
              </TableCell>
              <TableCell align='center'>
                <TableSortLabel
                  active={sortField === 'age'}
                  direction={sortField === 'age' ? sortOrder : 'asc'}
                  onClick={() => handleSort('age')}
                >
                  Age
                </TableSortLabel>
              </TableCell>
              <TableCell align='center'>
                <TableSortLabel
                  active={sortField === 'email'}
                  direction={sortField === 'email' ? sortOrder : 'asc'}
                  onClick={() => handleSort('email')}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell align='center'>
                <TableSortLabel
                  active={sortField === 'certifiedUntil'}
                  direction={sortField === 'certifiedUntil' ? sortOrder : 'asc'}
                  onClick={() => handleSort('certifiedUntil')}
                >
                  Certified Until
                </TableSortLabel>
              </TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? [...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton variant='circular' width={40} height={40} />
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
                    <TableCell>
                      <Skeleton variant='text' />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant='text' />
                    </TableCell>
                  </TableRow>
                ))
              : sortedAdmins?.map(admin => (
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
                    <TableCell sx={{ display: 'flex', justifyContent: 'center' }} align='center'>
                      <Avatar src={admin.imageURL} alt={admin.name} />
                    </TableCell>
                    <TableCell align='center'>{admin.id}</TableCell>
                    <TableCell align='center'>{admin.name}</TableCell>
                    <TableCell align='center'>{admin.employeePosition}</TableCell>
                    <TableCell align='center'>{admin.age}</TableCell>
                    <TableCell align='center'>{admin.email}</TableCell>
                    <TableCell
                      align='center'
                      sx={{ color: isDatePassed(admin.certifiedUntil) ? 'red' : 'inherit' }}
                    >
                      {new Date(admin.certifiedUntil).toLocaleDateString()}
                    </TableCell>
                    <TableCell align='center'>
                      <Edit />
                    </TableCell>
                  </TableRow>
                ))}
            {sortedAdmins?.length === 0 && !isLoading && (
              <TableRow>
                <TableCell colSpan={8} align='center'>
                  No admins found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <AdminForm
        title='Add Admin'
        open={showAdminForm}
        handleClose={() => setShowAdminForm(false)}
      />
    </Box>
  )
}

import { useNavigate, useParams } from 'react-router'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  Avatar,
  Box,
  Button,
  Card,
  Skeleton,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import {
  CalendarToday as CalendarTodayIcon,
  Email as EmailIcon,
  Verified as VerifiedIcon,
  NewReleases as NewReleasesIcon,
} from '@mui/icons-material'
import { EmployeeResponse } from '../types/types'
import { useState } from 'react'
import { deleteEmployee, getEmployee } from '../actions/employeeActions'
import EmployeeForm from '../components/Employee/EmployeeForm'
import EmployeeFishFarmsTable from '../components/Employee/EmployeeFishFarmsTable'
import { notifySuccess } from '../contexts/ToastContext'
import DeleteModal from '../components/DeleteModal'
// import EmployeeForm from '../components/EmployeeForm'

export default function EmployeePage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { employeeId } = useParams<{ employeeId: string }>()
  const [showEmployeeForm, setShowEmployeeForm] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const {
    data: employee,
    isLoading,
    isFetching,
    isError,
  } = useQuery<EmployeeResponse>(['employee', employeeId], () => getEmployee(employeeId!), {
    enabled: !!employeeId,
  })

  const mutationDelete = useMutation(() => deleteEmployee(employeeId!))

  const handleDelete = () => {
    if (mutationDelete) {
      mutationDelete.mutate(undefined, {
        onSuccess: () => {
          queryClient.invalidateQueries('employees')
          notifySuccess('Employee deleted successfully')
          navigate('/employees')
        },
      })
    }
  }

  const toggleEmployeeForm = (toggle: boolean) => {
    setShowEmployeeForm(toggle)
  }

  return (
    <>
      {isLoading || isFetching ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            padding: 2,
            paddingY: 4,
          }}
        >
          <Box maxWidth='sm'>
            <Skeleton animation='wave' variant='circular' width={300} height={300} />
          </Box>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              justifyContent: 'center',
              padding: 5,
              borderRadius: '10px',
              boxShadow: 1,
            }}
          >
            <Skeleton animation='wave' variant='text' width={200} height={40} />
            <Skeleton animation='wave' variant='text' width={100} height={30} />
            <Skeleton animation='wave' variant='text' width={200} height={30} />
            <Skeleton animation='wave' variant='text' width={150} height={30} />
            <Skeleton animation='wave' variant='text' width={250} height={30} />
          </Card>
          <Box sx={{ marginTop: 1, marginLeft: 2, position: 'absolute', right: 30, top: 30 }}>
            <Skeleton animation='wave' variant='rectangular' width={100} height={40} />
          </Box>
        </Box>
      ) : isError ? (
        <p>Error loading employee details.</p>
      ) : (
        employee && (
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              padding: 2,
              paddingY: 4,
            }}
          >
            <Box maxWidth='sm'>
              <Avatar
                src={employee.imageURL}
                alt={employee.name}
                sx={{ width: '300px', height: '300px' }}
              />
            </Box>
            <Typography variant='h3' component='div' noWrap>
              {employee.name}
            </Typography>
            <Typography variant='subtitle1'>{employee.id}</Typography>
            <Typography variant='subtitle1'>{employee.employeePosition}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, width: '100%' }}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  justifyContent: 'center',
                  padding: 5,
                  width: '100%',
                  maxWidth: 'sm',
                  border: 1,
                  borderColor: 'primary.main',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <List>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <CalendarTodayIcon color='primary' />
                    </ListItemIcon>
                    <ListItemText primary='Age' secondary={employee.age} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <EmailIcon color='primary' />
                    </ListItemIcon>
                    <ListItemText primary='Email' secondary={employee.email} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {new Date(employee.certifiedUntil) > new Date() ? (
                        <VerifiedIcon color='primary' />
                      ) : (
                        <NewReleasesIcon sx={{ color: 'red' }} />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary='Certified Until'
                      secondary={
                        new Date(employee.certifiedUntil) > new Date()
                          ? `${new Date(employee.certifiedUntil).toLocaleDateString()} (${Math.ceil(
                              (new Date(employee.certifiedUntil).getTime() - new Date().getTime()) /
                                (1000 * 60 * 60 * 24),
                            )} days left)`
                          : `${new Date(employee.certifiedUntil).toLocaleDateString()} (${Math.abs(
                              Math.ceil(
                                (new Date().getTime() -
                                  new Date(employee.certifiedUntil).getTime()) /
                                  (1000 * 60 * 60 * 24),
                              ),
                            )} days overdue)`
                      }
                    />
                  </ListItem>
                </List>
              </Card>
              <Box>
                <EmployeeFishFarmsTable employeeId={employeeId} />
              </Box>
            </Box>
            <Box sx={{ marginTop: 1, marginLeft: 2, position: 'absolute', right: 30, top: 30 }}>
              <Button sx={{ mr: 2 }} variant='contained' onClick={() => toggleEmployeeForm(true)}>
                Edit
              </Button>
              <Button variant='outlined' color='error' onClick={() => setShowDeleteModal(true)}>
                Delete Employee
              </Button>
            </Box>
          </Box>
        )
      )}
      {showEmployeeForm && employee && employeeId && (
        <EmployeeForm
          initialValues={employee}
          open={showEmployeeForm}
          title='Edit Employee'
          handleClose={() => toggleEmployeeForm(false)}
        />
      )}
      {showDeleteModal && employeeId && (
        <DeleteModal
          open={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          handleDelete={handleDelete}
          entityName='employee'
          warningText='This employee will removed from all fish farms, but will still remain in the system.'
        />
      )}
    </>
  )
}

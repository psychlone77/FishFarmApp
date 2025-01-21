import { useParams } from 'react-router'
import { useQuery } from 'react-query'
import { Avatar, Box, Button, Card, Skeleton, Typography, useTheme } from '@mui/material'
import { EmployeeResponse } from '../types/types'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { getEmployee } from '../actions/employeeActions'
import EmployeeForm from '../components/EmployeeForm'
// import EmployeeForm from '../components/EmployeeForm'

export default function EmployeePage() {
  const { fishFarmId, employeeId } = useParams<{ fishFarmId: string; employeeId: string }>()
  const theme = useTheme()
  const [showEmployeeForm, setShowEmployeeForm] = useState(false)

  const {
    data: employee,
    isLoading,
    isFetching,
    isError,
  } = useQuery<EmployeeResponse>(['employee', employeeId], () => getEmployee(fishFarmId!, employeeId!), {
    enabled: !!employeeId,
  })

  const toggleEmployeeForm = (toggle: boolean) => {
    setShowEmployeeForm(toggle)
  }

  const notifySuccess = (message: string) => {
    toast.success(message)
  }

  const notifyError = (message: string) => {
    toast.error(message)
  }

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme.palette.mode}
      />
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
            <Skeleton animation="wave" variant='circular' width={300} height={300} />
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
            <Skeleton animation="wave" variant='text' width={200} height={40} />
            <Skeleton animation="wave" variant='text' width={100} height={30} />
            <Skeleton animation="wave" variant='text' width={200} height={30} />
            <Skeleton animation="wave" variant='text' width={150} height={30} />
            <Skeleton animation="wave" variant='text' width={250} height={30} />
          </Card>
          <Box sx={{ marginTop: 1, marginLeft: 2, position: 'absolute', right: 30, top: 30 }}>
            <Skeleton animation="wave" variant='rectangular' width={100} height={40} />
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
              <Typography variant='h3' component='div' noWrap>
                {employee.name}
              </Typography>
              <Typography variant='subtitle1'>Age: {employee.age}</Typography>
              <Typography variant='subtitle1'>Email: {employee.email}</Typography>
              <Typography variant='subtitle1'>Position: {employee.employeePosition}</Typography>
              <Typography variant='subtitle1'>
                Certified Until: {new Date(employee.certifiedUntil).toLocaleDateString()}
              </Typography>
            </Card>
            <Box sx={{ marginTop: 1, marginLeft: 2, position: 'absolute', right: 30, top: 30 }}>
              <Button variant='contained' onClick={() => toggleEmployeeForm(true)}>
                Edit
              </Button>
            </Box>
          </Box>
        )
      )}
      {showEmployeeForm && employee && employeeId && (
        <EmployeeForm
          initialValues={{ ...employee, employeeId }}
          fishFarmId={fishFarmId!}
          open={showEmployeeForm}
          title='Edit Employee'
          handleClose={() => toggleEmployeeForm(false)}
          notifySuccess={notifySuccess}
          notifyError={notifyError}
        />
      )}
    </>
  )
}

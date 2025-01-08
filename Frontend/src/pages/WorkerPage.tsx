import { useParams } from 'react-router'
import { useQuery } from 'react-query'
import { Avatar, Box, Button, Card, Typography, useTheme } from '@mui/material'
import { WorkerResponse } from '../types/types'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { getWorker } from '../actions/workerActions'
import WorkerForm from '../components/WorkerForm'
// import WorkerForm from '../components/WorkerForm'

export default function WorkerPage() {
  const { fishFarmId, workerId } = useParams<{ fishFarmId: string; workerId: string }>()
  const theme = useTheme()
  const [showWorkerForm, setShowWorkerForm] = useState(false)

  const {
    data: worker,
    isLoading,
    isError,
  } = useQuery<WorkerResponse>(['worker', workerId], () => getWorker(fishFarmId!, workerId!), {
    enabled: !!workerId,
  })

  const toggleWorkerForm = (toggle: boolean) => {
    setShowWorkerForm(toggle)
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
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading worker details.</p>}
      {worker && (
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
              src={worker.imageURL}
              alt={worker.name}
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
              {worker.name}
            </Typography>
            <Typography variant='subtitle1'>Age: {worker.age}</Typography>
            <Typography variant='subtitle1'>Email: {worker.email}</Typography>
            <Typography variant='subtitle1'>Position: {worker.workerPosition}</Typography>
            <Typography variant='subtitle1'>
              Certified Until: {new Date(worker.certifiedUntil).toLocaleDateString()}
            </Typography>
          </Card>
          <Box sx={{ marginTop: 1, marginLeft: 2, position: 'absolute', right: 30, top: 30 }}>
            <Button variant='contained' onClick={() => toggleWorkerForm(true)}>
              Edit
            </Button>
          </Box>
        </Box>
      )}
      {showWorkerForm && worker && workerId && (
        <WorkerForm
          initialValues={{ ...worker, workerId }}
          fishFarmId={fishFarmId!}
          open={showWorkerForm}
          title='Edit Worker'
          handleClose={() => toggleWorkerForm(false)}
          notifySuccess={notifySuccess}
          notifyError={notifyError}
        />
      )}
    </>
  )
}

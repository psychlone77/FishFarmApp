import { useQuery } from 'react-query'
import getWorkers from '../actions/workerActions'
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
import { Add } from '@mui/icons-material'
import { useState } from 'react'
import WorkerForm from './WorkerForm'

export default function WorkerList({
  fishFarmId,
  notifySuccess,
  notifyError,
}: {
  fishFarmId: string | undefined
  notifySuccess: (message: string) => void
  notifyError: (message: string) => void
}) {
  const navigate = useNavigate()
  const [showWorkerForm, setShowWorkerForm] = useState(false)
  const {
    data: workers,
    isLoading,
    isFetching,
  } = useQuery(['workers', fishFarmId], () => getWorkers(fishFarmId!), {
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
        Workers
      </Typography>
      <Button
        sx={{ position: 'absolute', right: 30, top: 30 }}
        variant='contained'
        onClick={() => setShowWorkerForm(true)}
      >
        <Add />
        Add Worker
      </Button>
      <Table sx={{ minWidth: 300 }}>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Name</TableCell>
            <TableCell align='center'>Position</TableCell>
            <TableCell align='center'>Age</TableCell>
            <TableCell align='center'>Email</TableCell>
            <TableCell align='center'>Certified Until</TableCell>
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
          {workers?.map(worker => (
            <TableRow
              key={worker.id}
              hover
              sx={{
                '&:hover': { cursor: 'pointer' },
                '&:last-child td, &:last-child th': { border: 0 },
              }}
              onClick={() => {
                navigate(`workers/${worker.id}`)
              }}
            >
              <TableCell align='center'>{worker.name}</TableCell>
              <TableCell align='center'>{worker.workerPosition}</TableCell>
              <TableCell align='center'>{worker.age}</TableCell>
              <TableCell align='center'>{worker.email}</TableCell>
              <TableCell align='center'>
                {new Date(worker.certifiedUntil).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
          {workers?.length === 0 && !isFetching && (
            <TableRow>
              <TableCell colSpan={5} align='center'>
                No workers found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <WorkerForm
        title='Add Worker'
        fishFarmId={fishFarmId!}
        open={showWorkerForm}
        handleClose={() => setShowWorkerForm(false)}
        notifySuccess={notifySuccess}
        notifyError={notifyError}
      />
    </TableContainer>
  )
}

import { useQuery } from 'react-query'
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
import { Add, DirectionsBoat, Edit, Link } from '@mui/icons-material'
import { useState } from 'react'
import { getBoats } from '../actions/boatActions'
import BoatForm from './BoatForm'
import AssignBoatForm from './AssignBoatForm'
import Authorize from './Authorize'

export default function BoatTable({ fishFarmId }: { fishFarmId: string | undefined }) {
  const [showBoatForm, setShowBoatForm] = useState(false)
  const [showBoatEditForm, setShowBoatEditForm] = useState(false)
  const [showAssignBoatForm, setShowAssignBoatForm] = useState(false)
  const {
    data: boats,
    isLoading,
    isFetching,
  } = useQuery(['boats', fishFarmId], () => getBoats(fishFarmId!), {
    enabled: !!fishFarmId,
  })
  return (
    <TableContainer
      sx={{
        border: 1,
        position: 'relative',
        borderColor: 'primary.main',
        width: '100%',
        height: 'fit-content',
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
          <DirectionsBoat
            sx={{
              display: 'flex',
              marginRight: 1,
              fontSize: 40,
            }}
          />
          <Typography variant='h5'>Assigned Boats</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'end', gap: 2 }}>
          <Authorize requiredAccess={2}>
            <Button variant='contained' onClick={() => setShowAssignBoatForm(true)}>
              <Link />
              Assign Boat
            </Button>
            <AssignBoatForm
              open={showAssignBoatForm}
              handleClose={() => setShowAssignBoatForm(false)}
              fishFarmId={fishFarmId!}
            />
            <Button variant='contained' onClick={() => setShowBoatForm(true)}>
              <Add />
              Add Boat
            </Button>
            <BoatForm
              title='Add Boat'
              fishFarmId={fishFarmId!}
              open={showBoatForm}
              handleClose={() => setShowBoatForm(false)}
            />
          </Authorize>
        </Box>
      </Box>
      <Table sx={{ minWidth: 300 }}>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Boat Id</TableCell>
            <TableCell align='center'>Model</TableCell>
            <TableCell align='center'>Boat Type</TableCell>
            <Authorize requiredAccess={2}>
              <TableCell align='center'></TableCell>
            </Authorize>
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
                </TableRow>
              ))
            : null}
          {boats?.map(boat => (
            <TableRow
              key={boat.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
              // onClick={() => {
              //   navigate(`boats/${boat.id}`)
              // }}
            >
              <TableCell align='center'>{boat.id}</TableCell>
              <TableCell align='center'>{boat.model}</TableCell>
              <TableCell align='center'>{boat.boatType}</TableCell>
                <Authorize requiredAccess={2}>
              <TableCell align='center'>
                  <Edit
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { boxShadow: 2, borderRadius: 5, color: 'primary.main' }
                    }}
                    onClick={() => setShowBoatEditForm(true)}
                  />
                  <BoatForm
                    title='Edit Boat'
                    initialValues={boat}
                    fishFarmId={fishFarmId!}
                    open={showBoatEditForm}
                    handleClose={() => setShowBoatEditForm(false)}
                  />
              </TableCell>
                </Authorize>
            </TableRow>
          ))}
          {boats?.length === 0 && !isFetching && (
            <TableRow>
              <TableCell colSpan={4} align='center'>
                No boats assigned
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

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
import { useNavigate } from 'react-router'
import { Add, DirectionsBoat, Edit, Link, LinkOff } from '@mui/icons-material'
import { useState } from 'react'
import { Boat } from '../types/types'
import { getBoats } from '../actions/boatActions'
import BoatForm from './BoatForm'

export default function BoatTable({ fishFarmId }: { fishFarmId: string | undefined }) {
  const navigate = useNavigate()
  const [showBoatForm, setShowBoatForm] = useState(false)
  const [showAssignBoatForm, setShowAssignBoatForm] = useState(false)
  const [showUnassignModal, setShowUnassignModal] = useState(false)
  const [unassignBoat, setUnassignBoat] = useState<Boat | null>(null)
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2, padding: 2 }}>
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
          <Box
            sx={{ display: 'flex', justifyContent: 'end', gap: 2 }}
          >
            <Button variant='contained' onClick={() => setShowAssignBoatForm(true)}>
              <Link />
              Assign Boat
            </Button>
            <Button variant='contained' onClick={() => setShowBoatForm(true)}>
              <Add />
              Add Boat
            </Button>
          </Box>
      </Box>
      <Table sx={{ minWidth: 300 }}>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Boat Id</TableCell>
            <TableCell align='center'>Model</TableCell>
            <TableCell align='center'>Boat Type</TableCell>
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
                </TableRow>
              ))
            : null}
          {boats?.map(boat => (
            <TableRow
              key={boat.id}
              hover
              sx={{
                '&:hover': { cursor: 'pointer' },
                '&:last-child td, &:last-child th': { border: 0 },
              }}
              onClick={() => {
                navigate(`boats/${boat.id}`)
              }}
            >
              <TableCell align='center'>{boat.id}</TableCell>
              <TableCell align='center'>{boat.model}</TableCell>
              <TableCell align='center'>{boat.boatType}</TableCell>
              <TableCell align='center'>
                <LinkOff
                  sx={{ marginRight: 2, '&:hover': { color: 'red' } }}
                  onClick={e => {
                    e.stopPropagation()
                    setUnassignBoat(boat)
                    setShowUnassignModal(true)
                  }}
                />
                <Edit />
              </TableCell>
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
      <BoatForm
                title='Add Boat'
                fishFarmId={fishFarmId!}
                open={showBoatForm}
                handleClose={() => setShowBoatForm(false)}
            />
      {/*       <AssignBoatForm
                open={showAssignBoatForm}
                handleClose={() => setShowAssignBoatForm(false)}
                fishFarmId={fishFarmId!}
            />
            {unassignBoat && (
                <UnassignModal
                    boat={unassignBoat!}
                    fishFarmId={fishFarmId!}
                    open={showUnassignModal}
                    handleClose={() => setShowUnassignModal(false)}
                />
            )} */}
    </TableContainer>
  )
}

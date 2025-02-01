import { useQuery } from 'react-query'
import {
  Box,
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
import { getFishFarmsByEmployee } from '../../actions/employeeActions'
import { useNavigate } from 'react-router'

export default function EmployeeFishFarmsTable({ employeeId }: { employeeId: string | undefined }) {
  const navigate = useNavigate()
  const { data: fishFarms, isLoading } = useQuery(
    ['fishFarms', employeeId],
    () => getFishFarmsByEmployee(employeeId!),
    {
      enabled: !!employeeId,
    },
  )

  return (
    <TableContainer
      sx={{
        border: 1,
        position: 'relative',
        borderColor: 'primary.main',
        width: '100%',
        maxWidth: { xs: 300, sm: 500 },
      }}
      component={Paper}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 2,
          padding: 2,
        }}
      >
        <Typography variant='h5'>Assigned Fish Farms</Typography>
      </Box>
      <Table sx={{ minWidth: 300 }}>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Fish Farm Name</TableCell>
            <TableCell align='center'>Permission Level</TableCell>
            <TableCell align='center'>Assigned Date</TableCell>
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
                </TableRow>
              ))
            : fishFarms?.map(fishFarmUser => (
                <TableRow
                  key={fishFarmUser.fishFarmId}
                  onClick={() => navigate(`/fish-farms/${fishFarmUser.fishFarmId}`)}
                  sx={{
                    '&:hover': { cursor: 'pointer' },
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                  hover
                >
                  <TableCell align='center'>{fishFarmUser.fishFarm.name}</TableCell>
                  <TableCell align='center'>{fishFarmUser.permissionLevel}</TableCell>
                  <TableCell align='center'>
                    {new Date(fishFarmUser.assignedDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
          {fishFarms?.length === 0 && !isLoading && (
            <TableRow>
              <TableCell colSpan={4} align='center'>
                No fish farms assigned
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

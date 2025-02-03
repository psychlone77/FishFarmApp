import { useQuery } from 'react-query'
import FishFarmsGrid from '../components/FishFarm/FishFarmsGrid'
import { FishFarmResponse } from '../types/types'
import { getFishFarms } from '../actions/fishFarmActions'
import CustomMapContainer from '../components/Leaflet/CustomMapContainer'
import { Box, Typography } from '@mui/material'
import useAuth from '../hooks/useAuth'

export default function HomePage() {
  const { user } = useAuth()
  const { data, isLoading, isError } = useQuery<FishFarmResponse[]>('fishFarms', getFishFarms)
  return (
    <Box sx={{ position: 'relative', height: '93vh' }}>
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 1000,
          padding: 2,
          backgroundColor: 'white',
          borderRadius: 4,
        }}
      >
        <Typography variant='h4' color='primary.dark'>Welcome {user?.name}</Typography>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ height:'93vh', width: '30%' }}>
          <FishFarmsGrid data={data} isLoading={isLoading} isError={isError} />
        </Box>
        <Box sx={{ width: '100%', height: '100%'}}>
          {data && data.length === 0 && <p>No fish farms found</p>}
          {!isLoading && data && data.length > 0 && 
          <Box sx={{ width: '100%', height: '93vh'}}>
            <CustomMapContainer fishFarms={data} />
          </Box>
          }
        </Box>
      </Box>
    </Box>
  )
}

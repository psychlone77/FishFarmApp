import { useQuery } from 'react-query'
import { getFishFarms } from '../actions/fishFarmActions'
import { FishFarmResponse } from '../types/types'
import FishFarmGridCard from './FishFarmGridCard'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router'

export default function FishFarmsGrid() {
  const navigate = useNavigate()
  const { data, isLoading, isError } = useQuery<FishFarmResponse[]>('fishFarms', getFishFarms)
  return (
    <Box sx={{ padding: 2 }}>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading fish farms.</p>}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 3,
        }}
      >
        {data &&
          data.map(fishFarm => (
            <FishFarmGridCard
              onClick={() => navigate(`/fish-farms/${fishFarm.id}`)}
              key={fishFarm.id}
              fishFarm={fishFarm}
            />
          ))}
      </Box>
    </Box>
  )
}

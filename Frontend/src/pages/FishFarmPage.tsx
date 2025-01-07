import { useParams } from 'react-router'
import { FishFarmResponse } from '../types/types'
import { getFishFarm } from '../actions/fishFarmActions'
import { useQuery } from 'react-query'
import { Box, Container, Typography } from '@mui/material'

export default function FishFarmPage() {
  const { fishFarmId } = useParams<{ fishFarmId: string }>()
  const {
    data: fishFarm,
    isLoading,
    isError,
  } = useQuery<FishFarmResponse>('fishFarm', () => getFishFarm(fishFarmId!), {
    enabled: !!fishFarmId,
  })
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading fish farm details.</p>}
      {fishFarm && (
        <Box sx={{ display: 'flex', gap: 2, padding: 2 }}>
          {fishFarm.imageURL && (
            <Box maxWidth='sm'>
              <img
                src={fishFarm.imageURL}
                alt={fishFarm.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px 8px 8px 8px',
                }}
              />
            </Box>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant='h3' component='div' noWrap>
              {fishFarm.name}
            </Typography>
            <Typography variant='body1'>
              Location: {fishFarm.latitude}, {fishFarm.longitude}
            </Typography>
            <Typography variant='body1'>Cage Count: {fishFarm.cageCount}</Typography>
            <Typography variant='body1'>Has Barge: {fishFarm.hasBarge ? 'Yes' : 'No'}</Typography>
            <Typography variant='body1'>
              Created On: {new Date(fishFarm.createdOn).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  )
}

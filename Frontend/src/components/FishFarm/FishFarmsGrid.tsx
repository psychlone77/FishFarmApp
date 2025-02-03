import { FishFarmResponse } from '../../types/types'
import FishFarmGridCard from './FishFarmGridCard'
import { Box, Button, Card, CardContent, Skeleton, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { Add } from '@mui/icons-material'
import FishFarmForm from './FishFarmForm'
import Authorize from '../Authorize'

export default function FishFarmsGrid({
  data,
  isLoading,
  isError,
  setHoverId,
}: {
  data: FishFarmResponse[] | undefined
  isLoading: boolean
  isError: boolean
  setHoverId?: (id: string) => void
}) {
  const navigate = useNavigate()
  const theme = useTheme()
  const [showFishFarmForm, setShowFishFarmForm] = useState(false)

  return (
    <Box sx={{ position: 'relative', height: '100%', overflowY: 'auto' }}>
      <Box
        sx={{
          position: 'sticky',
          zIndex: 1000,
          top: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'transparent',
          backdropFilter: 'blur(10px)',
          padding: 2,
        }}
      >
        <Typography variant='h3'>Fish Farms</Typography>
        <Authorize requiredAccess={1}>
          <Button
            variant='contained'
            onClick={() => setShowFishFarmForm(true)}
            sx={{ marginLeft: 1, height: 40 }}
          >
            <Add />
            Add
          </Button>
        </Authorize>
      </Box>
      <Box>
        {isLoading && (
          <Box
            sx={{
              display: 'flex',
              // gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 3,
            }}
          >
            {Array.from(new Array(4)).map((_, index) => (
              <Card
                key={index}
                sx={{
                  maxWidth: 345,
                  height: 'fit-content',
                  borderRadius: 2,
                  boxShadow: 'none',
                  backgroundColor: theme.palette.grey[200],
                }}
              >
                <CardContent>
                  <Skeleton variant='rectangular' width='100%' height={150} />
                  <Skeleton variant='text' sx={{ fontSize: '1.5em', marginTop: 1 }} />
                  <Skeleton variant='text' sx={{ fontSize: '0.6em', marginTop: 0 }} />
                  <Skeleton variant='text' sx={{ fontSize: '0.6em', marginTop: 0 }} />
                  <Skeleton variant='text' sx={{ fontSize: '0.6em', marginTop: 0 }} />
                  <Skeleton variant='text' sx={{ fontSize: '0.6em', marginTop: 0 }} />
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
        {isError && <p>Error loading fish farms.</p>}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: 2,
            // gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 3,
            height: '100%',
            overflowY: 'auto',
          }}
        >
          {Array.isArray(data) &&
            data?.map(fishFarm => (
              <FishFarmGridCard
                onMouseEnter={() => setHoverId && setHoverId(fishFarm.id)}
                onClick={() => navigate(`/fish-farms/${fishFarm.id}`)}
                key={fishFarm.id}
                fishFarm={fishFarm}
              />
            ))}
        </Box>
      </Box>
      <FishFarmForm
        title='Add Fish Farm'
        open={showFishFarmForm}
        handleClose={() => setShowFishFarmForm(false)}
      />
    </Box>
  )
}

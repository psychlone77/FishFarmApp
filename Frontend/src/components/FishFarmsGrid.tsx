import { useQuery } from 'react-query'
import { getFishFarms } from '../actions/fishFarmActions'
import { FishFarmResponse } from '../types/types'
import FishFarmGridCard from './FishFarmGridCard'
import { Box, Button, Card, CardContent, Skeleton, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { Add } from '@mui/icons-material'
import FishFarmForm from './FishFarmForm'
import { toast, ToastContainer } from 'react-toastify'
import useAuth from '../hooks/useAuth'

export default function FishFarmsGrid() {
  const navigate = useNavigate()
  const { role } = useAuth()
  const theme = useTheme()
  const [showFishFarmForm, setShowFishFarmForm] = useState(false)
  const { data, isLoading, isError } = useQuery<FishFarmResponse[]>('fishFarms', getFishFarms)
  const notifySuccess = (message: string) => {
    toast.success(message)
  }

  const notifyError = (message: string) => {
    toast.error(message)
  }
  return (
    <Box sx={{ padding: 2 }}>
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h3'>Fish Farms</Typography>
        <Button
          variant='contained'
          onClick={() => setShowFishFarmForm(true)}
          sx={{ marginLeft: 2, display: role === 'SuperAdmin' ? 'flex' : 'none' }}
        >
          <Add />
          Add Fish Farm
        </Button>
      </Box>
      <Box sx={{ marginTop: 2 }}>
        {isLoading && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
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
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 3,
          }}
        >
          {Array.isArray(data) &&
            data?.map(fishFarm => (
              <FishFarmGridCard
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
        notifyError={notifyError}
        notifySuccess={notifySuccess}
      />
    </Box>
  )
}

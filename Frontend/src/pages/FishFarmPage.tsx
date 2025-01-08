import { useParams } from 'react-router'
import { FishFarmResponse } from '../types/types'
import { getFishFarm } from '../actions/fishFarmActions'
import { useQuery } from 'react-query'
import { Box, Button, Typography, useTheme } from '@mui/material'
import WorkerList from '../components/WorkerList'
import FishFarmForm from '../components/FishFarmForm'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

export default function FishFarmPage() {
  const theme = useTheme()
  const { fishFarmId } = useParams<{ fishFarmId: string }>()
  const [showFishFarmForm, setShowFishFarmForm] = useState(false)
  const {
    data: fishFarm,
    isLoading,
    isError,
  } = useQuery<FishFarmResponse>(['fishFarm', fishFarmId], () => getFishFarm(fishFarmId!), {
    enabled: !!fishFarmId,
  })

  const toggleFishFarmForm = (toggle: boolean) => {
    setShowFishFarmForm(toggle)
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
      {isError && <p>Error loading fish farm details.</p>}
      {/* TODO: Make the fishfarm details editable */}
      {fishFarm && (
        <Box sx={{ display: 'flex', gap: 2, padding: 2, paddingY: 4 }}>
          {fishFarm.imageURL && (
            <Box maxWidth='sm'>
              <img
                src={fishFarm.imageURL}
                alt={fishFarm.name}
                style={{
                    width: '100%',
                    height: '350px',
                    objectFit: 'cover',
                  borderRadius: '8px 8px 8px 8px',
                }}
              />
            </Box>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
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
          <Box sx={{ marginTop: 1, marginLeft: 2 }}>
            <Button variant='contained' onClick={() => toggleFishFarmForm(true)}>Edit</Button>
          </Box>
        </Box>
      )}
      {showFishFarmForm && fishFarm && fishFarmId && (
        <FishFarmForm
          initialValues={{ ...fishFarm, id: fishFarmId }}
          open={showFishFarmForm}
          title='Edit Fish Farm'
          handleClose={() => toggleFishFarmForm(false)}
          notifySuccess={notifySuccess}
          notifyError={notifyError}
        />
      )}
      {/* TODO: Add worker list component */}
      <WorkerList fishFarmId={fishFarmId} notifySuccess={notifySuccess} notifyError={notifyError}/>
    </>
  )
}

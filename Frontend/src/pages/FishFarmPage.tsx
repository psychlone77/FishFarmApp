import { useParams } from 'react-router'
import { FishFarmResponse } from '../types/types'
import { getFishFarm } from '../actions/fishFarmActions'
import { useQuery } from 'react-query'
import {
  Box,
  Button,
  Card, List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Typography
} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import EmployeeTable from '../components/Employee/EmployeeTable'
import FishFarmForm from '../components/FishFarm/FishFarmForm'
import { useState } from 'react'
import Authorize from '../components/Authorize'
import BoatTable from '../components/Boat/BoatTable'
import AdminTable from '../components/Admin/AdminTable'
import CustomMapContainer from '../components/CustomMapContainer'

export default function FishFarmPage() {
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

  return (
    <>
      {isLoading && (
        <Box sx={{ display: 'flex', gap: 2, padding: 2, paddingY: 4 }}>
          <Skeleton variant='rectangular' width={350} height={350} />
        </Box>
      )}
      {isError && <p>Error loading fish farm details.</p>}
      {fishFarm && (
        <>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              padding: 2,
              paddingY: 4,
              position: 'relative',
            }}
          >
            <Typography variant='h3' component='div' noWrap>
              {fishFarm.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box
                sx={{
                  backgroundImage: `url(${fishFarm.imageURL})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: 350,
                  width: '50%',
                  borderRadius: '8px',
                }}
              />
              <Box
                sx={{
                  border: 1,
                  position: 'relative',
                  borderColor: 'primary.main',
                  borderRadius: 2,
                  boxShadow: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  padding: 2,
                  flex: 1,
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <List>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <LocationOnIcon color='primary' />
                      </ListItemIcon>
                      <ListItemText
                        primary='Location'
                        secondary={`${fishFarm.latitude}, ${fishFarm.longitude}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <ViewModuleIcon color='primary' />
                      </ListItemIcon>
                      <ListItemText primary='Cage Count' secondary={fishFarm.cageCount} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <DirectionsBoatFilledIcon color='primary' />
                      </ListItemIcon>
                      <ListItemText
                        primary='Has Barge'
                        secondary={fishFarm.hasBarge ? 'Yes' : 'No'}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <CalendarTodayIcon color='primary' />
                      </ListItemIcon>
                      <ListItemText
                        primary='Created On'
                        secondary={new Date(fishFarm.createdOn).toLocaleDateString()}
                      />
                    </ListItem>
                  </List>
                </Box>
                <Authorize requiredAccess={2}>
                  <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                    <Button variant='contained' onClick={() => toggleFishFarmForm(true)}>
                      Edit
                    </Button>
                  </Box>
                </Authorize>
              </Box>
            </Box>
          </Card>
          <Box sx={{height: '300px', width: '100%'}}>
            <CustomMapContainer fishFarms={[fishFarm]} />
          </Box>
        </>
      )}
      {showFishFarmForm && fishFarm && fishFarmId && (
        <FishFarmForm
          initialValues={{ ...fishFarm, id: fishFarmId }}
          open={showFishFarmForm}
          title='Edit Fish Farm'
          handleClose={() => toggleFishFarmForm(false)}
        />
      )}
      <Box
        sx={{
          padding: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 3,
        }}
      >
        <Authorize requiredAccess={1}>
          <AdminTable fishFarmId={fishFarmId} />
        </Authorize>
        <Authorize requiredAccess={2}>
          <EmployeeTable fishFarmId={fishFarmId} />
        </Authorize>
        <BoatTable fishFarmId={fishFarmId} />
      </Box>
    </>
  )
}

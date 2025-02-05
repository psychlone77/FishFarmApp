import {
  Box,
  Button,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from '@mui/material'
import { getAllBoats, reassignBoat } from '../../actions/boatActions'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from 'react'
import { BoatFull } from '../../types/types'

export default function AssignBoatForm({
  open,
  handleClose,
  fishFarmId,
}: {
  open: boolean
  handleClose: () => void
  fishFarmId: string
}) {
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBoat, setSelectedBoat] = useState<BoatFull | null>(null)
  const [filteredBoats, setFilteredBoats] = useState<BoatFull[] | null>([])
  const { data } = useQuery(['boats', 'all'], () => getAllBoats())

  const mutation = useMutation(
    () => reassignBoat(selectedBoat!.id, selectedBoat!.fishFarm.id, fishFarmId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['boats', 'all'])
        queryClient.invalidateQueries(['boats', fishFarmId])
        setSelectedBoat(null)
        handleClose()
      },
    },
  )

  const handleAssign = () => {
    mutation.mutate()
  }

  useEffect(() => {
    if (data) {
      const filteredBoats = data.filter(
        boat =>
          boat.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          boat.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
          boat.boatType.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredBoats(filteredBoats)
    }
  }, [data, searchTerm, fishFarmId])
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '40%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 4,
          p: 4,
        }}
      >
        <Box display='flex' alignItems='center' marginBottom={2}>
          <Box flexGrow={1}>
            <Typography variant='h5'>Assign Boats</Typography>
          </Box>
          <Box>
            <IconButton onClick={handleClose}>
              <CloseIcon color='error' />
            </IconButton>
          </Box>
        </Box>
        <TextField
          fullWidth
          placeholder='Search Boats'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          margin='normal'
        />
        <Box sx={{ minHeight: '300px', maxHeight: '60%', overflowY: 'auto' }}>
          {data?.length === 0 ? (
            <Typography sx={{ marginTop: 2 }} variant='subtitle1' align='center'>
              No Boats Available
            </Typography>
          ) : (
            <List>
              {filteredBoats?.map(boat => (
                <ListItemButton
                  key={boat.id}
                  disabled={boat.fishFarm.id === fishFarmId}
                  onClick={() => setSelectedBoat(boat)}
                  sx={{
                    backgroundColor:
                      selectedBoat?.id === boat.id ? 'rgba(0, 0, 0, 0.08)' : 'inherit',
                    border: selectedBoat?.id === boat.id ? '1px solid rgba(0, 0, 0, 0.2)' : 'none',
                  }}
                >
                  <ListItemText primary={`${boat.id} - ${boat.model}`} secondary={boat.boatType} />
                  <Box sx={{ marginLeft: 'auto', textAlign: 'right' }}>
                    <Typography variant='body2'>{`${boat.fishFarm.name}`}</Typography>
                    {/* <Typography variant='body2'>{`Location: ${boat.fishFarm.location}`}</Typography> */}
                  </Box>
                </ListItemButton>
              ))}
            </List>
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Button onClick={handleClose} style={{ marginRight: '10px' }}>
            Cancel
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={handleAssign}
            disabled={!selectedBoat}
          >
            Assign {selectedBoat?.id}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

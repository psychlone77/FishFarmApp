import { useEffect, useState } from 'react'
import {
    Modal,
    Button,
    TextField,
    List,
    ListItemText,
    ListItemButton,
    Box,
    Typography,
    IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { assignAdmin, getUnassignedAdmins } from '../actions/adminActions'
import { EmployeeResponse } from '../types/types'
import { toast } from 'react-toastify'
import { notifyError, notifySuccess } from '../contexts/ToastContext'

export default function AssignAdminForm({
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
    const [selectedAdmin, setSelectedAdmin] = useState<EmployeeResponse | null>(null)
    const [filteredAdmins, setFilteredAdmins] = useState<EmployeeResponse[]>([])

    const { data } = useQuery(
        ['admins', fishFarmId, 'unassigned'],
        () => getUnassignedAdmins(fishFarmId),
        {
            enabled: !!fishFarmId,
        },
    )

    const mutation = useMutation(() => assignAdmin(fishFarmId, selectedAdmin!.id), {
        onSuccess: () => {
            queryClient.invalidateQueries(['admins', fishFarmId, 'unassigned'])
            queryClient.invalidateQueries(['admins', fishFarmId])
            notifySuccess('Admin assigned successfully')
            setSelectedAdmin(null)
        },
        onError: () => {
            notifyError('Failed to assign admin')
        },
    })

    const handleAssign = () => {
        mutation.mutate()
    }

    useEffect(() => {
        if (data) {
            const filteredAdmins = data.filter(
                admin =>
                    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    admin.id.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            setFilteredAdmins(filteredAdmins)
        } else {
            setFilteredAdmins([])
        }
    }, [data, searchTerm])

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
                        <Typography variant='h5'>Assign Admins</Typography>
                    </Box>
                    <Box>
                        <IconButton onClick={handleClose}>
                            <CloseIcon color='error' />
                        </IconButton>
                    </Box>
                </Box>
                <TextField
                    fullWidth
                    placeholder='Search admins'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    margin='normal'
                />
                <Box sx={{ minHeight: '200px', maxHeight: '200px', overflowY: 'auto' }}>
                    {data?.length === 0 ? (
                        <Typography sx={{ marginTop: 2 }} variant='subtitle1' align='center'>
                            No Admins to Assign
                        </Typography>
                    ) : filteredAdmins.length > 0 ? (
                        <List>
                            {filteredAdmins.map(admin => (
                                <ListItemButton
                                    key={admin.id}
                                    onClick={() => setSelectedAdmin(admin)}
                                    selected={selectedAdmin?.id === admin.id}
                                    sx={{
                                        backgroundColor:
                                            selectedAdmin?.id === admin.id ? 'rgba(0, 0, 0, 0.08)' : 'inherit',
                                        border:
                                            selectedAdmin?.id === admin.id
                                                ? '1px solid rgba(0, 0, 0, 0.2)'
                                                : 'none',
                                    }}
                                >
                                    <ListItemText primary={`${admin.name} - ${admin.employeePosition}`} secondary={admin.id}/>
                                </ListItemButton>
                            ))}
                        </List>
                    ) : (
                        <Typography sx={{ marginTop: 2 }} variant='subtitle1' align='center'>
                            No Matches Found
                        </Typography>
                    )}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <Button onClick={handleClose} style={{ marginRight: '10px' }}>
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        color='secondary'
                        onClick={handleAssign}
                        disabled={!selectedAdmin}
                    >
                        Assign '{selectedAdmin?.name}'
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}
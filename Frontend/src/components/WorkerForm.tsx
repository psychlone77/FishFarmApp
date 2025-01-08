import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import {
    TextField,
    Button,
    Box,
    Modal,
    IconButton,
    Typography,
    MenuItem,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { WorkerRequest } from '../types/types'
import { createWorker, deleteWorker, updateWorker } from '../actions/workerActions'
import { WorkerFormProps } from '../types/interfaces'
import { zodResolver } from '@hookform/resolvers/zod'
import { WorkerPositionEnum, WorkerRequestSchema } from '../types/schemas'
import { useNavigate } from 'react-router'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 4,
    p: 4,
}

export default function WorkerForm({
    title,
    open,
    handleClose,
    notifySuccess,
    notifyError,
    fishFarmId,
    initialValues,
}: WorkerFormProps) {
    const queryClient = useQueryClient()
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<WorkerRequest>({ resolver: zodResolver(WorkerRequestSchema) })
    const mutation = useMutation(
        initialValues
            ? (worker: WorkerRequest) => updateWorker(worker, initialValues.workerId, fishFarmId)
            : (worker: WorkerRequest) => createWorker(worker, fishFarmId)
    )
    const mutationSecondary = useMutation(() =>
        initialValues ? deleteWorker(initialValues?.workerId, fishFarmId) : Promise.resolve(),
    )

    const onSubmit: SubmitHandler<WorkerRequest> = data => {
        mutation.mutate(data, {
            onSuccess: () => {
                queryClient.invalidateQueries(initialValues ? ['worker', initialValues?.workerId] : 'workers')
                notifySuccess(
                    initialValues ? 'Worker updated successfully' : 'Worker added successfully',
                )
                handleClose();
            },
            onError: () => {
                notifyError(initialValues ? 'Error updating worker' : 'Error adding worker')
            },
        })
    }

    const handleSecondaryAction = () => {
        if (mutationSecondary) {
            mutationSecondary.mutate(undefined, {
                onSuccess: () => {
                    queryClient.invalidateQueries('workers')
                    notifySuccess('Worker deleted successfully')
                    handleClose()
                    navigate(`/fish-farms/${fishFarmId}`)
                },
                onError: () => {
                    notifyError('Error deleting worker')
                },
            })
        }
    }

    return (
        <Modal open={open} onClose={() => handleClose()}>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={style}>
                <Box display='flex' alignItems='center' marginBottom={2}>
                    <Box flexGrow={1}>
                        <Typography variant='h5'>{title}</Typography>
                    </Box>
                    <Box>
                        <IconButton onClick={handleClose}>
                            <CloseIcon color='error' />
                        </IconButton>
                    </Box>
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label='Name'
                        variant='outlined'
                        defaultValue={initialValues?.name}
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ''}
                        {...register('name', { required: true })}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label='Age'
                        variant='outlined'
                        defaultValue={initialValues?.age}
                        error={!!errors.age}
                        helperText={errors.age ? errors.age.message : ''}
                        {...register('age', { required: true, valueAsNumber: true })}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label='Email'
                        variant='outlined'
                        defaultValue={initialValues?.email}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ''}
                        {...register('email', { required: true })}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label='Image URL'
                        variant='outlined'
                        defaultValue={initialValues?.imageURL}
                        error={!!errors.imageURL}
                        helperText={errors.imageURL ? errors.imageURL.message : ''}
                        {...register('imageURL')}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label='Certified Until'
                        variant='outlined'
                        type='datetime-local'
                        slotProps={{
                            inputLabel: {
                              shrink: true,
                            },
                          }}
                        defaultValue={initialValues?.certifiedUntil}
                        error={!!errors.certifiedUntil}
                        helperText={errors.certifiedUntil ? errors.certifiedUntil.message : ''}
                        {...register('certifiedUntil', { required: true, valueAsDate: true })}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        select
                        label='Worker Position'
                        variant='outlined'
                        defaultValue={initialValues?.workerPosition}
                        error={!!errors.workerPosition}
                        helperText={errors.workerPosition ? errors.workerPosition.message : ''}
                        {...register('workerPosition', { required: true })}
                    >
                        {WorkerPositionEnum.options.map((position) => (
                            <MenuItem key={position} value={position}>
                                {position}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Box display='flex' justifyContent='space-between'>
                    {initialValues && (
                        <Button variant='outlined' color='error' onClick={handleSecondaryAction}>
                            Delete Worker
                        </Button>
                    )}
                    <Button sx={{ marginLeft: 'auto' }} variant='contained' color='primary' type='submit'>
                        {initialValues ? 'Update' : 'Add'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}
import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { TextField, Button, Box, Modal, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Boat } from '../../types/types'
import { createBoat, updateBoat } from '../../actions/boatActions'
import { BoatFormProps } from '../../types/interfaces'
import { zodResolver } from '@hookform/resolvers/zod'
import { BoatSchema } from '../../types/schemas'
import { toast } from 'react-toastify'

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

export default function BoatForm({
    title,
    open,
    handleClose,
    fishFarmId,
    initialValues,
}: BoatFormProps) {
    const queryClient = useQueryClient()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Boat>({ resolver: zodResolver(BoatSchema) })
    const mutation = useMutation(
        initialValues
            ? (boat: Boat) => updateBoat(boat, initialValues.id, fishFarmId)
            : (boat: Boat) => createBoat(boat, fishFarmId),
    )

    const onSubmit: SubmitHandler<Boat> = data => {
        mutation.mutate(data, {
            onSuccess: () => {
                queryClient.invalidateQueries(
                    initialValues ? ['boat', initialValues?.id] : 'boats',
                )
                notifySuccess(
                    initialValues ? 'Boat updated successfully' : 'Boat added successfully',
                )
                handleClose()
            }
        })
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
                        label='Boat ID'
                        variant='outlined'
                        defaultValue={initialValues?.id}
                        error={!!errors.id}
                        helperText={errors.id ? errors.id.message : ''}
                        {...register('id', { required: true })}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label='Boat Model'
                        variant='outlined'
                        defaultValue={initialValues?.model}
                        error={!!errors.model}
                        helperText={errors.model ? errors.model.message : ''}
                        {...register('model', { required: true })}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label='Boat Type'
                        variant='outlined'
                        defaultValue={initialValues?.boatType}
                        error={!!errors.boatType}
                        helperText={errors.boatType ? errors.boatType.message : ''}
                        {...register('boatType', { required: true })}
                    />
                </Box>
                <Box display='flex' justifyContent='space-between'>
                    <Button sx={{ marginLeft: 'auto' }} variant='contained' color='primary' type='submit'>
                        {initialValues ? 'Update' : 'Add'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}
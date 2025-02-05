import { Control, UseFormSetValue } from 'react-hook-form'
import { Boat, FishFarmResponse, EmployeeResponse } from './types'

export interface FishFarmFormProps {
  title: string
  open: boolean
  handleClose: () => void
  initialValues?: FishFarmResponse
}

export interface EmployeeFormProps {
  title: string
  open: boolean
  handleClose: () => void
  initialValues?: EmployeeResponse
}

export interface BoatFormProps {
  title: string
  open: boolean
  handleClose: () => void
  fishFarmId: string
  initialValues?: Boat
}

export interface DeleteModalProps {
  open: boolean
  handleClose: () => void
  handleDelete: () => void
  entityName: string
  warningText: string
}

export interface ImagePickerProps {
  control: Control<any>
  setValue: UseFormSetValue<any>
  name: string
  imageUrl?: string
  required?: boolean
  avatar?: boolean
}

export interface UpdateImageModalProps {
  open: boolean
  handleClose: () => void
  imageUrl?: string
}

export interface UpdateImageFormValues {
  image: File
}

export interface UnassignAdminModalProps {
  open: boolean
  handleClose: () => void
  admin: EmployeeResponse
  fishFarmId: string
}

export interface BoatTableProps {
  boats: Boat[] | undefined
  isLoading: boolean
  isFetching: boolean
  fishFarmId: string | undefined
}

export interface UnassignModalProps {
  open: boolean
  handleClose: () => void
  employee: EmployeeResponse
  fishFarmId: string
}

export interface CustomMapContainerProps {
  fishFarms: FishFarmResponse[]
  boats?: Boat[]
  hoverId?: string
  scrollWheelZoom?: boolean
}

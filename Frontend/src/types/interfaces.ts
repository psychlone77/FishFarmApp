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

import { FishFarmRequest, EmployeeRequest, Boat } from './types'

export interface FishFarmFormProps {
  title: string
  open: boolean
  handleClose: () => void
  initialValues?: FishFarmRequest & { id: string }
}

export interface EmployeeFormProps {
  title: string
  open: boolean
  handleClose: () => void
  fishFarmId: string
  initialValues?: EmployeeRequest & { employeeId: string }
}

export interface BoatFormProps {
  title: string
  open: boolean
  handleClose: () => void
  fishFarmId: string
  initialValues?: Boat
}

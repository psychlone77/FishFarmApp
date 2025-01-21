import { FishFarmRequest, EmployeeRequest } from './types'

export interface FishFarmFormProps {
  title: string
  open: boolean
  handleClose: () => void
  notifySuccess: (message: string) => void
  notifyError: (message: string) => void
  initialValues?: FishFarmRequest & { id: string }
}

export interface EmployeeFormProps {
  title: string
  open: boolean
  handleClose: () => void
  notifySuccess: (message: string) => void
  notifyError: (message: string) => void
  fishFarmId: string
  initialValues?: EmployeeRequest & { employeeId: string }
}

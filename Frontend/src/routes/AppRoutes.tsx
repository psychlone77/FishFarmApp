import { Route, Routes } from 'react-router'
import LoginPage from '../pages/LoginPage'
import LogoutPage from '../pages/LogoutPage'
import PrivateRoute from './PrivateRoute'
import Layout from '../layout'
import HomePage from '../pages/HomePage'
import FishFarmPage from '../pages/FishFarmPage'
import EmployeePage from '../pages/EmployeePage'
import NotFoundPage from '../pages/NotFoundPage'
import EmployeesPage from '../pages/EmployeesPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<PrivateRoute element={<Layout />} />}>
        <Route index element={<HomePage />} />
        <Route path='employees' element={<EmployeesPage />} />
        <Route path='fish-farms/:fishFarmId' element={<FishFarmPage />} />
        <Route path='employees/:employeeId' element={<EmployeePage />} />
      </Route>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/logout' element={<LogoutPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

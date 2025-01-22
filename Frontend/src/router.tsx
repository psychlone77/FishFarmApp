import { BrowserRouter, Route, Routes } from 'react-router'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import PrivateRoute from './pages/PrivateRoute'
import Layout from './layout'
import HomePage from './pages/HomePage'
import FishFarmPage from './pages/FishFarmPage'
import EmployeePage from './pages/EmployeePage'
import NotFoundPage from './pages/NotFoundPage'
import { AuthProvider } from './contexts/AuthContext'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<PrivateRoute element={<Layout />} />}>
            <Route index element={<HomePage />} />
            <Route path='fish-farms/:fishFarmId' element={<FishFarmPage />} />
            <Route path='fish-farms/:fishFarmId/employees/:employeeId' element={<EmployeePage />} />
          </Route>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/logout' element={<LogoutPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

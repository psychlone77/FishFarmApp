import { BrowserRouter, Route, Routes } from 'react-router'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import PrivateRoute from './pages/PrivateRoute'
import Layout from './layout'
import HomePage from './pages/HomePage'
import FishFarmPage from './pages/FishFarmPage'
import WorkerPage from './pages/WorkerPage'
import NotFoundPage from './pages/NotFoundPage'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PrivateRoute element={<Layout />} />}>
          <Route index element={<HomePage />} />
          <Route path='fish-farms/:fishFarmId' element={<FishFarmPage />} />
          <Route path='fish-farms/:fishFarmId/workers/:workerId' element={<WorkerPage />} />
        </Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/logout' element={<LogoutPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

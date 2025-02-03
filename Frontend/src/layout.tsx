import { Outlet } from 'react-router'
import CustomNavbar from './components/CustomNavbar'
import Footer from './components/Footer'
import { Box } from '@mui/material'

export default function Layout() {
  return (
    <main>
      <CustomNavbar />
      <div className='body'>
        <Outlet />
      </div>
      <div className='footer'>
        <Footer />
      </div>
    </main>
  )
}

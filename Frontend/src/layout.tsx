import { Outlet } from 'react-router'
import CustomNavbar from './components/CustomNavbar'

export default function Layout() {
  return (
    <>
      <CustomNavbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

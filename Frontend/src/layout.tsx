import { Outlet } from 'react-router'
import CustomNavbar from './components/CustomNavbar'
import Footer from './components/Footer'

export default function Layout() {
  return (
    <>
      <main>
        <CustomNavbar />
        <div style={{ marginBottom: '100px' }}>
          <Outlet />
        </div>
        <Footer />
      </main>
    </>
  )
}

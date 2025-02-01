import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { Phishing } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router'
import useAuth from '../hooks/useAuth'
import Authorize from './Authorize'
import MyDetailsModal from './MyDetailsModal'

function CustomNavbar() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const [openDetailsModal, setOpenDetailsModal] = React.useState(false)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const handleOpenDetails = () => {
    setOpenDetailsModal(true)
    handleCloseUserMenu()
  }
  const handleCloseDetails = () => {
    setOpenDetailsModal(false)
  }

  return (
    <>
      <AppBar position='static' sx={{ backgroundColor: 'primary.dark' }}>
        <Toolbar>
          <Link
            to='/'
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Phishing sx={{ marginRight: 1 }} />
            <Typography
              variant='h6'
              noWrap
              sx={{
                fontSize: 22,
                fontWeight: 500,
                letterSpacing: '0.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Fish Farms
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Authorize requiredAccess={1}>
              <Box sx={{ display: 'flex' }}>
                <Button
                  onClick={() => navigate('/employees')}
                  sx={{
                    fontSize: 16,
                    fontWeight: 300,
                    color: 'white',
                  }}
                >
                  Employees
                </Button>
                <Button
                  onClick={() => navigate('/admins')}
                  sx={{
                    fontSize: 16,
                    fontWeight: 300,
                    color: 'white',
                  }}
                >
                  Admins
                </Button>
              </Box>
            </Authorize>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', marginRight: 2 }}>
            <Typography variant='body1'>{user?.name}</Typography>
            <Typography variant='caption'>{user?.employeePosition}</Typography>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Remy Sharp' src={user?.imageURL} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleOpenDetails}>My Details</MenuItem>
              <MenuItem onClick={() => navigate('/logout')}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <MyDetailsModal open={openDetailsModal} handleClose={handleCloseDetails} user={user!} />
    </>
  )
}

export default CustomNavbar

import { useState, useContext } from 'react'
import { MenuItem, Tooltip, Button, Container, AppBar, Box, Toolbar, IconButton, Typography, Menu } from '@mui/material'
import { ModalUsers } from '../../drs/components'
import MenuIcon from '@mui/icons-material/Menu'
//import { apiRest } from '../../logic/constantes'

import { Link } from 'react-router-dom'
import { AuthContext } from '../../auth/context/AuthContext'

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [optionsModalUser, setOptionsModalUser] = useState('')
  const { user, logout, pages, menuUser, /* token */ } = useContext(AuthContext)
  

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const logoutLogin = () => {
    logout()
  }

  /* const fetchDataUserSelects = async (text) => {
    const request = {
      token
    }
    request.option = 'selectProfiles'
    request.controller = 'user'

    const requestOptions = {
      method: 'POST',
      //headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(request)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { type, message } = datas
        console.log("🚀 ~ file: ModalUsers.jsx:51 ~ fetchDataUser ~ datas:", datas)
        
        if (type === 'ok') {
          setOptionsModalUser(text)
          handleOpen()
        }

        if (type === 'error') {
          setAlertsOptions({
            types: type,
            message
          })
          setOpenAlerts(true)
          if (message === 'invalid token') {
            logout()
          }
        }
      })
      .catch(error => console.log(error))
  } */

  const handleCloseUserMenu = (text) => {
    setAnchorElUser(null)

    if (text === 'Create and Modify Users') {
      setOptionsModalUser(text)
      handleOpen()
    }
    if (text === 'Create and Modify Profiles') {
      //fetchDataUserSelects(text)
      setOptionsModalUser(text)
      handleOpen() 
    }
  }

  return (
    <AppBar position='fixed' style={{ backgroundColor: '#00A1E0' }}>
      <Container maxWidth={false} disableGutters style={{ height: '50px' }}>
        <Toolbar disableGutters style={{ height: '50px' }}>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            LOGO
          </Typography> */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }} >
            <img
              style={{ height: '40px', width: '150px',}}
              src='https://apdprinting.com/media/logo/stores/1/logo_apd.png'
              alt='DHL'
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', lg: 'none', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.menu__id} onClick={handleCloseNavMenu}>
                  <Link to={page.menu__url} style={{ textDecoration: 'none' }}>
                    <Typography textAlign='center'>
                      {page.menu__label}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component='a'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            LOGO
          </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, }} >
            <img
              style={{ height: '40px', width: '150px',}}
              src='https://apdprinting.com/media/logo/stores/1/logo_apd.png'
              alt='DSR'
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex', md: 'none' } }}>
            {pages.map((page) => (
              <Link to={page.menu__url} key={page.menu__id} style={{ textDecoration: 'none' }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block', fontSize: '13px' }}
                >
                  {page.menu__label}
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link to={page.menu__url} key={page.menu__id} style={{ textDecoration: 'none' }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block', fontSize: '10px' }}
                >
                  {page.menu__label}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Typography textAlign='center' style={{ color: 'white', paddingRight: '10px' }}>{user?.name}</Typography>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign='center'>Profile</Typography>
              </MenuItem> */}
              {menuUser.map((menu) => (
                <MenuItem key={menu.menu_profile__id} onClick={() => handleCloseUserMenu(menu.menu_profile__text)}>
                  <Typography textAlign='center'>{menu.menu_profile__text}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={logoutLogin}>
                <Typography textAlign='center'>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <ModalUsers
        open={open}
        handleClose={handleClose}
        optionsModalUser={optionsModalUser}
      />
    </AppBar>
  )
}

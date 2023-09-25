import { useEffect, useContext, useState } from 'react'
import { AuthContext } from '../../auth/context/AuthContext'
import { Menu, MenuItem } from '@mui/material'
import { apiRest } from '../../logic/constantes'


export const SimpleDialog = ({ anchorEl, open, onClose, setOpenAlerts, setAlertsOptions }) => {
  const [propiedades, setPropiedades] = useState([])

  const { token, logout } = useContext(AuthContext)

  const fetchDataTwo = async () => {
    const request = {
      token
    }
    request.option = 'ItemSearchLoad'
    request.controller = 'magento'

    const requestOptions = {
      method: 'POST',
      /* headers: { 'Content-Type': 'application/json' }, */
      body: JSON.stringify(request)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { type, message } = datas
        if (datas.length > 0) {
          setPropiedades(datas)
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
  }

  useEffect(() => {
    fetchDataTwo()
  }, [])
  return (
    <>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {propiedades.map((propiedad) => (
          <MenuItem key={propiedad.id} onClick={() => onClose(propiedad.fieldTable, propiedad.fieldSearch)}>{propiedad.fieldSearch}</MenuItem>
        ))}
      </Menu>
    </>
  )
}

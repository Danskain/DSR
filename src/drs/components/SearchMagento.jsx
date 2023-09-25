import { useRef, useState, useContext } from 'react'
import { AuthContext } from '../../auth/context/AuthContext'
import { Paper, InputBase, Divider, IconButton, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
import { SimpleDialog } from './SimpleDialog'
import { apiRest } from '../../logic/constantes'
import { Alerts } from '../components'


export const SearchMagento = ({ setRows, handleOpen, handleCloseLoading, setIdwebsite }) => {
  const inputRef = useRef()
  const [selectedValue, setSelectedValue] = useState('# Order')
  const [anchorEl, setAnchorEl] = useState(null)
  const [value, setValue] = useState('dsr__mg_order')
  const [alertsOptions, setAlertsOptions] = useState({})
  const [openAlerts, setOpenAlerts] = useState(false)

  const open = Boolean(anchorEl)

  const { token } = useContext(AuthContext)

  const handleClickOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (value, name) => {
    setAnchorEl(null)
    setValue(value)
    setSelectedValue(name)
  }

  const handleClickClear = () => {
    setSelectedValue('')
    inputRef.current.value = ''
  }

  const formatStringLocaton = (city, state, code) => {
    return `${city} ${state} ${code}`
  }

  const formatData = (data) => {
    const arrayResultMagento = data.map((da) => {
      //const transformJson = JSON.parse(da.dsr__product_options)
      //mapDataItemOrder(transformJson)
      setIdwebsite(da.website__id_website)
      return {
        id: da.dsr__id_dsr,
        order: da.dsr__mg_order,
        status: da.dsr__mg_status,
        create_date: da.dsr__create_date,
        company: da.dsr__company,
        location: formatStringLocaton(da.dsr__city, da.dsr__state, da.dsr__code_country),
        postal_code: da.dsr__postalcode,
        street: da.dsr__street,
        sales_executive: da.dsr__sales_executive,
        csr: da.dsr__csr,
        shipping_type: da.dsr__shipping_type,
        idWebsite: da.website__id_website
      }
    })
    setRows(arrayResultMagento)
    handleCloseLoading()
  }

  const fetchData = async () => {
    const request = {
      token,
      fieldTable: value,
      searchItem: inputRef.current.value
    }
    request.option = 'getSearchItem'
    request.controller = 'magento'

    const requestOptions = {
      method: 'POST',
      /* headers: { 'Content-Type': 'application/json' }, */
      body: JSON.stringify(request)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { data } = datas
        //formarSelects(datas)
        formatData(data)
        /* steRows(datas) */
      })
      .catch(error => console.log(error))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (value === null || selectedValue === '') {
      setAlertsOptions({
        types: 'error',
        message: 'search criteria missing'
      })
      setOpenAlerts(true)
      return
    }
    if (inputRef.current.value === '') {
      setAlertsOptions({
        types: 'error',
        message: 'search criteria missing'
      })
      setOpenAlerts(true)
      return
    }
    handleOpen()
    fetchData()
  }

  
  return (
    <form
      onSubmit={handleSubmit}
    >
      <Paper
        //component='form'
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', maxWidth: 450, marginBottom: '5px' }}
      >
        <IconButton
          sx={{ p: '10px' }}
          id='basic-button'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickOpen}
        >
          <MenuIcon />
        </IconButton>
        <SimpleDialog
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          setOpenAlerts={setOpenAlerts}
          setAlertsOptions={setAlertsOptions}
        />
        <Typography variant='h6' align='left' style={{ fontSize: '16px' }}>
          {selectedValue === 'backdropClick' ? '' : selectedValue}
        </Typography>
        <InputBase
          inputRef={inputRef}
          sx={{ ml: 1, flex: 1 }}
          placeholder='Search'
          inputProps={{ 'aria-label': 'search' }}
        />
        <IconButton type='submit' sx={{ p: '10px' }} aria-label='search' /* onClick={handleClick} */>
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
        <IconButton color='primary' sx={{ p: '10px' }} aria-label='directions' onClick={handleClickClear}>
          <CleaningServicesIcon />
        </IconButton>
      </Paper>
      <Alerts open={openAlerts} setOpen={setOpenAlerts} alertsOptions={alertsOptions} />
    </form>
  )
}

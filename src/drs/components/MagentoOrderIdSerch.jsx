import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../auth/context/AuthContext'
import { Paper, InputBase, Divider, IconButton } from '@mui/material'
/* import MenuIcon from '@mui/icons-material/Menu' */
import SearchIcon from '@mui/icons-material/Search'
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
//import { shadeTextFieldStylesHook } from '@mui-treasury/styles/textField/shade'
import { apiRest } from '../../logic/constantes'
import { Alerts } from '../components'


export const MagentoOrderIdSerch = ({dataMapping, validates}) => {
  //const inputRef = useRef()
  
  const [alertsOptions, setAlertsOptions] = useState({})
  const [openAlerts, setOpenAlerts] = useState(false)
  const [valueSerch, setValueSerch] = useState('')

  const { token } = useContext(AuthContext)

  const navigate = useNavigate()

  const validationSerch = (e) => {
    const validate = /^[0-9]+$/.test(e.target.value)

    if (e.target.value.length > 0) {
      if (!validate) {
        return
      }
    }
    setValueSerch(e.target.value)
  }

  const fetchData = async () => {
    const request = {
      token,
      fieldTable: 'dsr__mg_order',
      searchItem: valueSerch
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
        
        if (data.length !== 1 || data.length === 0) {
          setAlertsOptions({
            types: 'error',
            message: 'Cant find that order number'
          })
          setOpenAlerts(true)
          return  
        }
        //const newPathname = `/magento/${inputRef.current.value}/${data[0].dsr__id_website}`
        const newPathname = `/magento/${valueSerch}/${data[0].dsr__id_website}`
        navigate(newPathname)
        ///inputRef.current.value = ''
        setValueSerch('')
      })
      .catch(error => console.log(error))
  }

  const fetchDataUno = async () => {
    const request = {
      token,
      mgOrder: valueSerch
    }
    request.option = 'searchOrder'
    request.controller = 'dsr'

    const requestOptions = {
      method: 'POST',
      /* headers: { 'Content-Type': 'application/json' }, */
      body: JSON.stringify(request)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { data } = datas
        
        if (data.length !== 1 || data.length === 0) {
          setAlertsOptions({
            types: 'error',
            message: 'Cant find that order number'
          })
          setOpenAlerts(true)
          return  
        }
        dataMapping(data)
        setValueSerch('')
      })
      .catch(error => console.log(error))
  }

  const handleClickClear = () => {
    //inputRef.current.value = ''
    setValueSerch('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (valueSerch === '') {
      setAlertsOptions({
        types: 'error',
        message: 'there is no order to search'
      })
      setOpenAlerts(true)
      return
    }
    if (valueSerch.length <= 3) {
      setAlertsOptions({
        types: 'error',
        message: 'command cannot be three characters or less'
      })
      setOpenAlerts(true)
      return
    }

    if (validates) {
      fetchDataUno()
      return
    }

    fetchData()
  }

  
  return (
    <form
      onSubmit={handleSubmit}
    >
      <Paper
        //component='form'
        sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%', backgroundColor: '#0166C6', cursor: 'pointer' }}
        //className='boton-search'
      >
        <InputBase
          //inputRef={inputRef}
          value={valueSerch}
          onChange={validationSerch}
          sx={{ pl: 1, width: '100%', color: 'white', backgroundColor: '#A4B6CE', borderRadius: '5px', ml: '5px' }}
          placeholder='Search'
          inputProps={{ 'aria-label': 'search' }}
          //type='number'
          //InputLabelProps={{ shrink: true, classes: inputLabelStyles }}
          //InputProps={{ classes: inputBaseStyles, disableUnderline: true }}
        />
        <IconButton type='submit' sx={{ color: 'white', }} aria-label='search' /* onClick={handleClick} */>
          <SearchIcon sx={{ fontSize: '1rem', }}/>
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
        <IconButton sx={{ color: 'white' }} aria-label='directions' onClick={handleClickClear}>
          <CleaningServicesIcon sx={{ fontSize: '1rem', }} />
        </IconButton>
      </Paper>
      <Alerts open={openAlerts} setOpen={setOpenAlerts} alertsOptions={alertsOptions} />
    </form>
  )
}


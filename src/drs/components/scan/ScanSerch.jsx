import { useState, useContext } from 'react'
import { AuthContext } from '../../../auth/context/AuthContext'
import { Paper, InputBase, Divider, IconButton } from '@mui/material'
/* import MenuIcon from '@mui/icons-material/Menu' */
import SearchIcon from '@mui/icons-material/Search'
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
//import { shadeTextFieldStylesHook } from '@mui-treasury/styles/textField/shade'
import { apiRest } from '../../../logic/constantes'
import { Alerts } from '../../components'
import { ModalDsr } from '../modalDsrStatus'


export const ScanSerch = () => {
  //const inputRef = useRef()
  
  const [alertsOptions, setAlertsOptions] = useState({})
  const [openAlerts, setOpenAlerts] = useState(false)
  const [valueSerch, setValueSerch] = useState('')
  const [optionsModalDsr, setOptionsModalDsr] = useState({})
  const [openModal, setOpenModal] = useState(false)

  const { token, user } = useContext(AuthContext)

  const handleOpenModal = () => setOpenModal(true)
  /* const handleCloseModal = () => {
    setOpenModal(false)
  } */

  const handleCloseModal = (event, reason) => {
    if (reason === 'backdropClick') return
    setOpenModal(false);
  }

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
      mg_order: valueSerch,
      user_profile_id: user.idProfile,
    }
    request.option = 'changeStatusOperator'
    request.controller = 'dsr'
    
    console.log("🚀 ~ file: ScanSerch.jsx:38 ~ fetchData ~ request:", request)
    const requestOptions = {
      method: 'POST',
      /* headers: { 'Content-Type': 'application/json' }, */
      body: JSON.stringify(request)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { message, type } = datas
        console.log("datas:", datas)
        const optionsModalDsrResult = {...datas}
        optionsModalDsrResult.idOption = '4'
        optionsModalDsrResult.mgOrder = valueSerch
        ///inputRef.current.value = ''
        if (type === 'ok') {
          setOptionsModalDsr(optionsModalDsrResult)
          handleOpenModal()
          /* handleOpenModal()
          setAlertsOptions({
            types: 'success',
            message
          })
          setOpenAlerts(true) */  
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
      .catch(error => {
        console.error(error)
        const { message } = error
        setAlertsOptions({
          types: 'error',
          message
        })
        setOpenAlerts(true)
      })
      .finally(() => {
        setValueSerch('')
      })
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

    fetchData()
  }

  
  return (
    <form
      onSubmit={handleSubmit}
    >
      <Paper
        //component='form'
        sx={{ display: 'flex', alignItems: 'center', width: '110%', height: '100px', backgroundColor: '#0166C6', cursor: 'pointer' }}
        //className='boton-search'
      >
        <InputBase
          //inputRef={inputRef}
          value={valueSerch}
          onChange={validationSerch}
          sx={{ pl: 1, width: '100%', height: '90%', color: 'white', backgroundColor: '#A4B6CE', borderRadius: '15px', ml: '5px', fontSize: '50px' }}
          placeholder='Search'
          inputProps={{ 'aria-label': 'search' }}
          //type='number'
          //InputLabelProps={{ shrink: true, classes: inputLabelStyles }}
          //InputProps={{ classes: inputBaseStyles, disableUnderline: true }}
        />
        <IconButton type='submit' sx={{ color: 'white', }} aria-label='search' /* onClick={handleClick} */>
          <SearchIcon sx={{ fontSize: '4rem', }}/>
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
        <IconButton sx={{ color: 'white' }} aria-label='directions' onClick={handleClickClear}>
          <CleaningServicesIcon sx={{ fontSize: '4rem', }} />
        </IconButton>
      </Paper>
      <Alerts open={openAlerts} setOpen={setOpenAlerts} alertsOptions={alertsOptions} />
      <ModalDsr
        setOpenAlerts={setOpenAlerts}
        setAlertsOptions={setAlertsOptions}
        optionsModalDsr={optionsModalDsr}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
        /* idwebsite={params.row.dsr_websiteId}
        valueSelect={age}
        params={params}
        idButtonData={idButtonData}
        setValueEstado={setValueEstado} */
      />
    </form>
  )
}
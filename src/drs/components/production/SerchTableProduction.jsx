import { useState, useContext } from 'react'
import { AuthContext } from '../../../auth/context/AuthContext'
import SearchIcon from '@mui/icons-material/Search';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { DatePickerProdution } from '../production'
import { Paper, Divider, IconButton } from '@mui/material'
import { apiRest } from '../../../logic/constantes'
import { Alerts } from '../../components'

export const SerchTableProduction = ({setRows, handleOpen, handleCloseLoading}) => {
    const [dateStart, setDateStart] = useState(null)
    const [dateEnd, setDateEnd] = useState(null)

    const [alertsOptions, setAlertsOptions] = useState({})
    const [openAlerts, setOpenAlerts] = useState(false)
    
    
    const { token } = useContext(AuthContext)

    const handleClickClear = () => {
      setDateStart('')
      setDateEnd('')
    }

    const formartFecha = (dato) => {
      if (dato < 10) {
        return `0${dato.toString()}`
      }
      return `${dato.toString()}`
    }
    
    const farmatDate = (data) => {
      if (!data) {
        return null
      }
      const { $D, $M, $y } = data
      if (isNaN($D) || isNaN($D) || isNaN($y)) {
        return null
      }
      return `${$y}-${formartFecha($M + 1)}-${formartFecha($D)}` 
    }

    const handleChangeStartDate = (e) => {
        
      const valor = farmatDate(e)
      
      setDateStart(valor)
    }

    const handleChangeEndDate = (e) => {
        
      const valor = farmatDate(e)
        
      setDateEnd(valor)
    }

    const formatData = (data) => {
      const arrayResultMagento = data.map((da) => {
        return {
          ...da,
          idWebsite: da.inpress_data__id_website,
        }
      })
      setRows(arrayResultMagento)
      handleCloseLoading()
    }

    const fetchData = async () => {
        const request = {
          token,
          dateStart: dateStart,
          dateEnd: dateEnd,
        }
        request.option = 'listProduction'
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
            //formarSelects(datas)
            formatData(data)
            /* steRows(datas) */
          })
          .catch(error => console.log(error))
      }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (dateStart === null || dateEnd === null) {
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
            //component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 600, marginBottom: '5px' }}
        >
            <DatePickerProdution name='Select a Start Date' valor={dateStart} handleChange={handleChangeStartDate} />

              <Divider sx={{ height: 48, m: '0 10px 0 10px' }} orientation="vertical" />

            <DatePickerProdution name='Select a End Date' valor={dateEnd} handleChange={handleChangeEndDate} />

            <IconButton type='submit' sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={handleClickClear}>
              <CleaningServicesIcon />
            </IconButton>
        </Paper>
        <Alerts open={openAlerts} setOpen={setOpenAlerts} alertsOptions={alertsOptions} />
      </form>
    );
  }

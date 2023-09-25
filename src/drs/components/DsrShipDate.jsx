import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../auth/context/AuthContext'
import { Stack, IconButton, Typography, Box } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
//import { DsrDataBasic } from '../components'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { apiRest } from '../../logic/constantes'
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2'

export const DsrShipDate = ({params, name}) => {
  const [age, setAge] = useState(params.value)
  const [valor, setValor] = useState('')
  const [valueEstado, setValueEstado] = useState(true)
  const [styleColor] = useState(true)
  const [messageError, setMessageError] = useState(null)
  const [progress, setProgress] = useState(true)
  const { token } = useContext(AuthContext)

  //const endOfQ12022 = dayjs('2022-03-31T23:59:59.999');

  useEffect(() => {
    const { value } = params
    if (valor === '') {
      setValor(value)
    }
  }, [params])
  
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

  const handleChange = (e) => {
    setAge(farmatDate(e))
  }

  const handleChangeValue = () => {
    setAge(valor)
    setValueEstado(!valueEstado)
    setMessageError(null)
  }

  const handleChangeValueAbrir = () => {
    /* setValor(params.value)
    setAge(params.value) */
    setValueEstado(!valueEstado)
    setMessageError(null)
  }

  const fetchSaveShippingDate = async (requestMagento) => {
    requestMagento.token = token
    requestMagento.option = name
    requestMagento.controller = 'dsr'
    const requestOptions = {
      method: 'POST',
      /* headers: { 'Content-Type': 'application/json' }, */
      body: JSON.stringify(requestMagento)
    }
    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { type, message, snEmail } = datas
        if (type === 'ok') {
          //setAge(farmatDate(e))
          if (snEmail === 'true') {
            sweetalert2FunctionSaveEmail()
          }
          setValor(age)
          setAge(age)
          setMessageError(null)
          setValueEstado(true)
        }

        if (type === 'error') {
          setMessageError(message)
        } 
      })
      .catch(error => {
        console.log(error)
        const { message } = error
        setMessageError(message)
      })
      .finally(() => {
        setProgress(true)
      });
  }

  const fetchSendEmail = async (requestMagento) => {
    requestMagento.token = token
    requestMagento.option = 'sendEmailDates'
    requestMagento.controller = 'email'  
    const requestOptions = {
      method: 'POST',
      /* headers: { 'Content-Type': 'application/json' }, */
      body: JSON.stringify(requestMagento)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { type, message } = datas
        if (type === 'ok') {
          Swal.fire(
            'Email sent!',
            message,
            'success'
          )
        }

        /* if (type === 'error') {
          
        } */
      })
      .catch(error => {
        console.log(error)
        const { message } = error
        setMessageError(message)
      })
      .finally(() => {
        setProgress(true)
      });
  }

  const fetchSelect = () => {
    const requestSaveShippingDate = {
      date: age,
      order: params.row.dsr_order,
      idwebsite: params.row.dsr_websiteId,
    }
     
    fetchSaveShippingDate(requestSaveShippingDate)
    /* if (flag === 'packing') {
      fetchPacking(requestPacking)
      return
    } */
  }

  const fetchSelectEmail = () => {
    const requestSaveShippingDate = {
      order: params.row.dsr_order,
      idwebsite: params.row.dsr_websiteId,
    }
     
    fetchSendEmail(requestSaveShippingDate)
  }

  const sweetalert2FunctionSaveEmail = () => {
    Swal.fire({
      title: '',
      text: "Do you want to email an Update to the Customer?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        setProgress(false)
        fetchSelectEmail()
      }
    })
  }

  const handleCheckIcon = () => {
    /* if (validateCambioFecha) {
      sweetalert2FunctionSaveEmail()
      return
    }
    setValueEstado(true) */
    /* console.log("🚀 ~ file: DsrShipDate.jsx:190 ~ handleCheckIcon ~ token:", token)
    return */
    setProgress(false)
    fetchSelect()
  }
  return (
    <>
      {valueEstado
        ?
          <Box
            style={{
              height: '100%',
              overflowX: 'auto',
              whiteSpace: 'wrap',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'cencer',
              alignItems: 'center',
            }}
            onClick={handleChangeValueAbrir}
          >
            <Box 
              style={{
                width: '200px',
              }}
            >
              {
                progress ?
                  <Typography align='center' style={{ color: styleColor ? 'black' : 'white', cursor: 'pointer', fontSize: '16px' }}>
                    {valor}
                  </Typography>
                :
                  <CircularProgress  style={{marginLeft: '40%'}} />
              }
            </Box>
          </Box>
        : (
            <Box
             //style={{ width: '100%' }}
              style={{
                width: '100%',
                height: '100%',
                overflowX: 'auto',
                whiteSpace: 'wrap',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'cencer',
                alignItems: 'center',
              }}
            >
              {progress ?
                <Stack
                  direction='column'
                  justifyContent="center"
                  alignItems="center"
                  spacing={0}
                >
                  <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs} /* style={{ borderColor: 'white', color: 'white' }} */>
                      <DemoContainer
                        components={[
                          'DatePicker',
                        ]}
                        //style={{ borderColor: 'white', color: 'white' }}
                      >
                        <DatePicker
                          sx={{ border: messageError !== null ? 'red 3px solid' : 'white 1px solid', backgroundColor: '#CACFD2', borderRadius: '5px', }}
                            //style={{ width: '200px', }}
                          onChange={handleChange}
                          value={dayjs(age) || null}
                          slotProps={{
                            actionBar: {
                              actions: ['clear'],
                                /* name,
                                setName */
                            },
                              /* textField: {
                                helperText: messageError,
                              }, */
                          }}
                            //disableFuture={validateCambioFecha}
                            //minDate={startOfQ12022}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <p style={{ color: 'red', textAlign: 'center' }}>{messageError}</p>
                  </Box>  
                  <Stack
                    direction='row'
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={2}
                  >
                    <IconButton color='primary' aria-label='upload picture' component='label' onClick={handleCheckIcon}>
                      <CheckIcon style={{color: '#ff6319'}} />
                    </IconButton>
                    <IconButton onClick={handleChangeValue}  aria-label='upload picture' component='label'>
                      <CloseIcon style={{color: '#ff6319'}} />
                    </IconButton>
                  </Stack>
                </Stack>
                :
                <CircularProgress  style={{marginLeft: '40%'}} />
              }
            </Box>
          )
      }    
    </>
  )
}

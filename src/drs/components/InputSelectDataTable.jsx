import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../auth/context/AuthContext'
import { Stack, IconButton, Typography, Box } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { DsrSelect } from '../components'
import { apiRest } from '../../logic/constantes'
import { ModalDsr } from './modalDsrStatus'
import Swal from 'sweetalert2'

export const InputSelectDataTable = ({ dataInputSelect, params, flag, idButtonData, setOpenAlerts, setAlertsOptions }) => {
  //console.log("datasMapping:", datasMapping)
  
  const [age, setAge] = useState(params.value)
  const [valueEstado, setValueEstado] = useState(true)
  const [valueEstatus, setValueEstatus] = useState([])
  const [styleColor] = useState(true)
  const [valor, setValor] = useState('')
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


  useEffect(() => {
    const { row } = params

    const { status, delivery, packing } = dataInputSelect

    if (flag === 'status') {
      if (valor === '') {
        setValor(row.dsr_Name_status || row.issues__status_issues)
      }
      //setAge(row.dsr_Name_status || row.issues__status_issues)
      if (status) {
        const arrayResult = status.map((e) => {
          return {
            id: e.magento_status__id_magento_status,
            name: e.magento_status__tx_label,
            value: e.magento_status__id_magento_status
          }
        })
        setValueEstatus(arrayResult)
      }else{
        setValueEstatus([])
      } 
    }

    if (flag === 'delivery') {
      if (valor === '') {
        setValor(row.dsr_delivery)
      }
      //setAge(row.dsr_delivery)
      if (delivery) {
        const arrayResult = delivery.map((e) => {
          return {
            id: e.delivery__id,
            name: e.delivery__txt,
            value: e.delivery__txt
          }
        })
        setValueEstatus(arrayResult)
      } else {
        setValueEstatus([])
      }
    }

    if (flag === 'packing') {
      if (valor === '') {
        setValor(row.dsr_packing)
      }
      
      if (packing) {
        const arrayResult = packing.map((e) => {
          return {
            id: e.packing__id,
            name: e.packing__txt,
            value: e.packing__txt
          }
        })
        setValueEstatus(arrayResult)
      } else {
        setValueEstatus([])
      }
    }
    //document.getElementById(`tab-2`).click()
  }, [params])

  const handleChangeValue = () => {
    setValueEstado(!valueEstado)
  }

  const handleChange = (e) => {
    setAge(e.target.value)
    //setValor(e.target.value)
  }

  /* const resetDataTable = () => {
    const resultdatasMapping = [...datasMapping]
    
    const mapResultdatasMapping = resultdatasMapping.map((data) => {
      if (data.id === params.row.id) {
        if (flag === 'packing') {
          return {
            ...data,
            dsr_packing: age
            
          }
        }
        if (flag === 'delivery') {
          return {
            ...data,
            dsr_delivery: age
          }
        }
      }
      return data
    })
    setDataMapping(mapResultdatasMapping)
  } */

  const fetchDataEmail = async (requestMagento) => {
    requestMagento.token = token
    requestMagento.option = 'sendEmailStatus'
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

        if (type === 'error') {
          setAlertsOptions({
            types: 'error',
            message
          })
          setOpenAlerts(true)
        }
      
      })
      .catch(error => console.log(error))
  }

  const sweetalert2FunctionSave = () => {
    Swal.fire({
      title: '',
      text: "Do you want to send mail to the customer of the registration status?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        const ogj = {
          status: age,
          mgorder: params.row.dsr_order,
          idwebsite: params.row.dsr_websiteId,
          user: user.name
        }
        fetchDataEmail(ogj)
      }
    })
  }

  const fetchModal = async (requestMagento) => {
    requestMagento.token = token
    requestMagento.option = 'eventStatus'
    requestMagento.controller = 'dsr'  
    const requestOptions = {
      method: 'POST',
      /* headers: { 'Content-Type': 'application/json' }, */
      body: JSON.stringify(requestMagento)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { type, idOption, message, snEmail } = datas
        if (type === 'ok') {
          if (idOption === '' || !idOption) {
            if (snEmail) {
              sweetalert2FunctionSave()
            }
            setValueEstado(true)
            document.getElementById(`tab-${idButtonData}`).click()
            return
          }

          if (idOption !== '') {
            setOptionsModalDsr(datas)
            handleOpenModal()
            return
          }
        }

        if (type === 'error') {
          setAlertsOptions({
            types: type,
            message
          })
          setOpenAlerts(true)
        } 
      })
      .catch(error => console.log(error))
  }

  const fetchPacking = async (requestMagento) => {
    requestMagento.token = token
    requestMagento.option = 'savePacking'
    requestMagento.controller = 'dsr'  
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
          //console.log("idButtonData:", idButtonData)
          //resetDataTable()
          setValor(age)
          setValueEstado(true)
          /* setAlertsOptions({
            types: 'success',
            message
          })
          setOpenAlerts(true) */
          //document.getElementById(`tab-${idButtonData}`).click()
        }

        if (type === 'error') {
          setAlertsOptions({
            types: type,
            message
          })
          setOpenAlerts(true)
          document.getElementById(`tab-${idButtonData}`).click()
        } 
      })
      .catch(error => console.log(error))
  }

  const fetchDelivery = async (requestMagento) => {
    requestMagento.token = token
    requestMagento.option = 'saveDelivery'
    requestMagento.controller = 'dsr'  
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

          //resetDataTable()
          setValor(age)
          setValueEstado(true)
          /* setAlertsOptions({
            types: 'success',
            message
          })
          setOpenAlerts(true) */
          //document.getElementById(`tab-${idButtonData}`).click()
        }

        if (type === 'error') {
          setAlertsOptions({
            types: type,
            message
          })
          setOpenAlerts(true)
          document.getElementById(`tab-${idButtonData}`).click()
        } 
      })
      .catch(error => console.log(error))
  }

  const fetchSelect = () => {
    const requestMagento = {
      status: age,
      typeOption: 'select',
      arrayData: '',
      mgorder: params.row.dsr_order,
      idwebsite: params.row.dsr_websiteId,
      user: user.name
    }

    const requestPacking = {
      namePacking: age,
      mgOrder: params.row.dsr_order,
      idWebsite: params.row.dsr_websiteId
    }

    const requestDelivery = {
      nameDelivery: age,
      mgOrder: params.row.dsr_order,
      idWebsite: params.row.dsr_websiteId
    }
    
    if (flag === 'status') {
      fetchModal(requestMagento)
      return
    }

    if (flag === 'packing') {
      fetchPacking(requestPacking)
      return
    }

    if (flag === 'delivery') {
      fetchDelivery(requestDelivery)
      return
    }
    
    /* const objOrdanamiento = {
      status: fetchModal(requestMagento),
      packing: fetchPacking(requestPacking),
    }
  
      const COLORS_CELL_DEFAULT = ''
      return objOrdanamiento[flag] || COLORS_CELL_DEFAULT */
  }

  const handleCheckIcon = () => {
    
    fetchSelect()
      //setValueEstado(true)
  }

  const hidenOptionsImagesDeliveryPacking = (text) => {
    const objOrdanamiento = {
        'PICK UP': <img src='https://prestodemos.com/dsr/img/pickup.png' alt="" style={{ width: '100%', height:'100%', /* marginLeft: '14%' */ }} />,
        'UPS / CANPAR / PUROLATOR': <img src='https://prestodemos.com/dsr/img/ups.png' alt="" style={{ width: '70%', height:'70%', marginLeft: '15%' }} />,
        'DRIVER - DELIVERY TOMORROW': <img src='https://prestodemos.com/dsr/img/truck.png' alt="" style={{ width: '100%', height:'100%', /* marginLeft: '16%' */ }} />,
        'UPS OVERNIGHT EXPRESS LABEL': <img src='https://prestodemos.com/dsr/img/plain.png' alt="" style={{ width: '60%', height:'100%', marginLeft: '18%' }} />,
        'TRACK TO SHIP OVERNIGHT EXPRESS': <img src='https://prestodemos.com/dsr/img/plain.png' alt="" style={{ width: '60%', height:'100%', marginLeft: '18%' }} />,
        'Press Sheet Proof': <img src='https://prestodemos.com/dsr/img/preview_icon.png' alt="" style={{ width: '60%', height:'100%', marginLeft: '18%' }} />,
        'Press Sheet Proof Indigo': <img src='https://prestodemos.com/dsr/img/preview_icon.png' alt="" style={{ width: '60%', height:'100%', marginLeft: '18%' }} />,
        'Press Sheet Proof Jpress Plated': <img src='https://prestodemos.com/dsr/img/preview_icon.png' alt="" style={{ width: '60%', height:'100%', marginLeft: '18%' }} />,
        'Press Sheet Proof komori': <img src='https://prestodemos.com/dsr/img/preview_icon.png' alt="" style={{ width: '60%', height:'100%', marginLeft: '18%' }} />,
        'Press Sheet Proof Minolta': <img src='https://prestodemos.com/dsr/img/preview_icon.png' alt="" style={{ width: '60%', height:'100%', marginLeft: '18%' }} />,
        'Press Sheet Proof R500 Plated': <img src='https://prestodemos.com/dsr/img/preview_icon.png' alt="" style={{ width: '60%', height:'100%', marginLeft: '18%' }} />,
        'Press Sheet Proof Ricoh Plated': <img src='https://prestodemos.com/dsr/img/preview_icon.png' alt="" style={{ width: '60%', height:'100%', marginLeft: '18%' }} />,
        'Hard Copy Indigo': <img src='https://prestodemos.com/dsr/img/preview_icon.png' alt="" style={{ width: '60%', height:'100%', marginLeft: '18%' }} />,
        'Hard Copy Jpress Plated': <img src='https://prestodemos.com/dsr/img/preview_icon.png' alt="" style={{ width: '60%', height:'100%', marginLeft: '18%' }} />,
        'Hard Copy Komori': <img src='https://prestodemos.com/dsr/img/preview_icon.png' alt="" style={{ width: '60%', height:'100%', marginLeft: '18%' }} />,
        'Hard Copy Minolta': <img src='https://prestodemos.com/dsr/img/preview_icon.png' alt="" style={{ width: '60%', height:'100%', marginLeft: '18%' }} />,
        'Hard Copy Proof': <img src='https://prestodemos.com/dsr/img/preview_icon.png' alt="" style={{ width: '60%', height:'100%', marginLeft: '18%' }} />,
        'Hard Copy R500 Plated': <img src='https://prestodemos.com/dsr/img/preview_icon.png' alt="" style={{ width: '60%', height:'100%', marginLeft: '18%' }} />,
        'Hard Copy Ricoh Plated': <img src='https://prestodemos.com/dsr/img/preview_icon.png' alt="" style={{ width: '60%', height:'100%', marginLeft: '18%' }} />,
        'In Press Hard Copy Proof': <img src='https://prestodemos.com/dsr/img/preview_icon.png' alt="" style={{ width: '60%', height:'100%', marginLeft: '18%' }} />,
        'In Press Press Sheet': <img src='https://prestodemos.com/dsr/img/preview_icon.png' alt="" style={{ width: '60%', height:'100%', marginLeft: '18%' }} />,
      }
  
      const COLORS_CELL_DEFAULT = ''
      return objOrdanamiento[text] || COLORS_CELL_DEFAULT
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
          onClick={handleChangeValue}
        >
          <Box 
            style={{
              width: '200px',  
            }}
          >
            {
              hidenOptionsImagesDeliveryPacking(valor)
            }
            <Typography align='center' style={{ color: styleColor ? 'black' : 'white', cursor: 'pointer', fontSize: '12px' }}>
              {valor}
            </Typography>
          </Box>
        </Box>
        : (
          <Box style={{ width: '100%' }} >
            <DsrSelect valorData={valueEstatus} age={age} handleChange={handleChange} />
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
            <ModalDsr
              setOpenAlerts={setOpenAlerts}
              setAlertsOptions={setAlertsOptions}
              optionsModalDsr={optionsModalDsr}
              handleCloseModal={handleCloseModal}
              openModal={openModal}
              idwebsite={params.row.dsr_websiteId}
              valueSelect={age}
              params={params}
              idButtonData={idButtonData}
              setValueEstado={setValueEstado}
            />
          </Box>
          )}    
    </>
  )
}

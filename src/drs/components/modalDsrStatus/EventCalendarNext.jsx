import { useState, useContext } from 'react'
import { AuthContext } from '../../../auth/context/AuthContext'
import { Box, Typography, Stack, Button } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { apiRest } from '../../../logic/constantes'
import Swal from 'sweetalert2'

export const EventCalendarNext = ({optionsModalDsr, handleCloseModal, valueSelect, params, idButtonData, setValueEstado, setOpenAlerts, setAlertsOptions}) => {
  
  const [loadingSave, setLoadingSave] = useState(false)

  const { token, user } = useContext(AuthContext)

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
            types: type,
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
          status: params.row.dsr__mg_status,
          mgorder: params.row.dsr_order,
          idwebsite: params.row.dsr_websiteId,
          user: user.name
        }
        fetchDataEmail(ogj)
      }
    })
  }

  const saveModal = async (requestMagento) => {
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
        const { type, message, snEmail } = datas
        if (type === 'ok') {
          if (snEmail) {
            sweetalert2FunctionSave()
          }
          setAlertsOptions({
            types: 'success',
            message
          })
          setOpenAlerts(true)
          setLoadingSave(false)
          handleCloseModal()
          document.getElementById(`tab-${idButtonData}`).click()
          setValueEstado(true)
        }

        if (type === 'error') {
          setAlertsOptions({
            types: type,
            message
          })
          setOpenAlerts(true)
          setLoadingSave(false)
          handleCloseModal()
        } 
      
      })
      .catch(error => console.log(error))
  }

  const handelSaveModal = () => {

    const arrayData = [
      {
        status: {
          user: user.name, 
          idWebsite: params.row.dsr_websiteId, 
          mgOrder: params.row.dsr_order,
          qtyBoxes:"",
          qtyPerBox:"",
          qtyLastBox:"",
          missingQty: '',
          signedBy: '',
          csr: '',
          operator:"",
          approved:"",
          totalGoodS:"",
          totalWastedS:"",
          mode:"",
          comment: '',
          packing: params.row.dsr_packing
        },
        calendar: {
          measure:"",
          printType:"",
          dateEvent:"",
          idTransaction:"",
          scodix: ""
        }, 
      }
    ]

    const requestMagento = {
      status: valueSelect,
      typeOption: 'save',
      arrayData: arrayData
    }
    setLoadingSave(true)
    saveModal(requestMagento)
  }
  return (
    <Box style={{ backgroundColor: 'white', width: '400px', padding: '20px' }}>
      <Typography variant='h6' align='center' sx={{ fontSize: '17px' }}>
        {optionsModalDsr.arrayData.messange}
      </Typography>
      <Box style={{ padding: '20px 20px 0 20px' }}>
        <Stack
          direction='row'
          justifyContent='center'
          alignItems='center'
          spacing={2}
          sx={{ /* display: { lg: 'flex', md: 'none' },  */margin: '30px' }}
        >
          <LoadingButton
            style={{ backgroundColor: '#00A1E0' }}
            loading={loadingSave}
            variant="contained"
            onClick={handelSaveModal}
            disabled={false}
          >
            YES
          </LoadingButton>
          <Button
            style={{ backgroundColor: '#00A1E0' }} 
            variant='contained'
            onClick={handleCloseModal}
          >
            NO
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

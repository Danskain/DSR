import { useContext } from 'react'
import { AuthContext } from '../../../auth/context/AuthContext'
import { Box, Typography, Stack, Button } from '@mui/material'
import { Link } from '@mui/material'
/* import LoadingButton from '@mui/lab/LoadingButton'
import { apiRest } from '../../../logic/constantes'
import { SelectInput } from '../../components'
import { TextareaAutosize } from '@mui/base' */
import { apiRest } from '../../../logic/constantes'
import Swal from 'sweetalert2'

export const ReadyForPickup = ({valueSelect, handleClose, dataModalsPortially, handleCloseModal, idButtonData, params, setAlertsOptions, setOpenAlerts}) => {

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
          status: valueSelect,
          mgorder: params.row.dsr_order,
          idwebsite: params.row.dsr_websiteId,
          user: user.name
        }
        fetchDataEmail(ogj)
      }
    })
  }

   const close = () => {
    //if (snEmail) {
      sweetalert2FunctionSave()
    //}
    handleCloseModal()
    handleClose()
    document.getElementById(`tab-${idButtonData}`).click()
   }
    
  return (
    <Box style={{ backgroundColor: 'white', width: '400px' }}>
    <Typography variant='h6' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', fontSize: '20px' }}>
      DOWNLOAD FILE
    </Typography>
    <Typography variant='h6' align='center' sx={{ fontSize: '17px' }}>
      Please upload annd print this file
    </Typography>
    <Box style={{ padding: '20px 20px 0 20px' }}>
      <Stack
        direction='column'
        justifyContent='flex-start'
        alignItems='flex-start'
        spacing={0.5}
      >
        <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
          Link:
        </Typography>
        <Link href={dataModalsPortially.url} target="_blank" rel="noopener noreferrer">
          Download
        </Link>
      </Stack>
      <Stack
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={2}
        sx={{ /* display: { lg: 'flex', md: 'none' },  */margin: '30px' }}
      >

        <Button
          style={{ backgroundColor: '#00A1E0' }} 
          variant='contained'
          onClick={close}
        >
          Close
        </Button>
      </Stack>
    </Box>
  </Box>
  )
}

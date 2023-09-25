import { useContext } from 'react'
import { AuthContext } from '../../../auth/context/AuthContext'
import { Box, Typography, Stack, Button, Paper, styled, Link } from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import { apiRest } from '../../../logic/constantes'
import Swal from 'sweetalert2'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  width: 200,
  lineHeight: '60px',
}));

export const SendInformation = ({valueSelect, handleClose, dataModalsPortially, handleCloseModal, idButtonData, params, setAlertsOptions, setOpenAlerts}) => {

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
          <Typography variant='h6' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', fontSize: '14px' }}>
            Send Information To DHL
          </Typography>
        <Box style={{ padding: '20px 20px 0 20px' }}>
          <Typography variant='h6' align='left' sx={{ fontSize: '17px', marginBottom: '20px' }}>
            Tracking Number: {dataModalsPortially.trackingNumber}
          </Typography>
          <Item elevation={8}>
            <Stack
              direction='row '
              justifyContent='flex-start'
              alignItems='flex-start'
              spacing={2}
            >
              <Box style={{ margin: '8px 10px 0 10px', color: 'red' }}>
                <PictureAsPdfIcon />
              </Box>
              <Link href={dataModalsPortially.url} target="_blank" rel="noopener noreferrer">
                Thermal Label
              </Link>
            </Stack>
          </Item>
          <Stack
            direction='row'
            justifyContent='center'
            alignItems='center'
            spacing={2}
            sx={{ /* display: { lg: 'flex', md: 'none' },  */margin: '30px' }}
          >
            <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
               Tracking information of DHL
            </Typography>
    
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

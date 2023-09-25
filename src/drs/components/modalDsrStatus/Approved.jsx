import { useState, useContext, useRef } from 'react'
import { AuthContext } from '../../../auth/context/AuthContext'
import { Box, Typography, Stack, Button } from '@mui/material'
import { TextareaAutosize } from '@mui/base'
import LoadingButton from '@mui/lab/LoadingButton'
import { apiRest } from '../../../logic/constantes'
import { SelectInput } from '../../components'
import Swal from 'sweetalert2'

export const Approved = ({optionsModalDsr, handleCloseModal, valueSelect, params, idButtonData, setValueEstado, setOpenAlerts, setAlertsOptions}) => {
  const [value, setValue] = useState('')
  const [loadingSave, setLoadingSave] = useState(false)

  const { token, user } = useContext(AuthContext)

  const inputRefComment = useRef()

  const handleChangeSites = (e) => {
    setValue(e.target.value)
  }

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
        const { type, snEmail, message } = datas
        if (type === 'ok') {
          if (snEmail) {
            sweetalert2FunctionSave()
          }
          setAlertsOptions({
            types: 'success',
            message: 'it was saved correctly'
          })
          setOpenAlerts(true)
          setLoadingSave(false)
          handleCloseModal()
          document.getElementById(`tab-${idButtonData}`).click()
          setValueEstado(true)
        }

        if (type === 'error') {
           ({
            types: type,
            message
          })
          setOpenAlerts(true)
          setLoadingSave(false)
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
          csr: value,
          operator:"",
          approved:"",
          totalGoodS:"",
          totalWastedS:"",
          mode:"",
          comment: inputRefComment.current.value,
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
    <Box style={{ backgroundColor: 'white', width: '400px' }}>
      <Typography variant='h6' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', fontSize: '17px' }}>
        Detail about the change of status [ APPROVED ]
      </Typography>
      <Box style={{ padding: '20px 20px 0 20px' }}>
        <Stack
          direction='column'
          justifyContent='flex-start'
          alignItems='flex-start'
          spacing={0.5}
        >
          <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
            CSR
          </Typography>
          <SelectInput age={value} handleChange={handleChangeSites} valorData={optionsModalDsr.arrayData[0].csr} />
          <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
            Comment
          </Typography>
          <TextareaAutosize
            aria-label='minimum height'
            minRows={3}
            style={{ width: '100%', borderRadius: '5px' }}
            ref={inputRefComment}
          />
        </Stack>
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
            Save Status
          </LoadingButton>
          <Button
            style={{ backgroundColor: '#00A1E0' }} 
            variant='contained'
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

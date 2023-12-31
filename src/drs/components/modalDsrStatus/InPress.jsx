import { useState, useContext, useRef } from 'react'
import { AuthContext } from '../../../auth/context/AuthContext'
import { Box, Typography, Stack, Button, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel  } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { apiRest } from '../../../logic/constantes'
import { SelectInput } from '../../components'
import Swal from 'sweetalert2'

export const InPress = ({optionsModalDsr, handleCloseModal, valueSelect, params, idButtonData, setValueEstado, setOpenAlerts, setAlertsOptions}) => {
  const [valueOperator, setValueOperator] = useState('')
  const [valueApprovedBy, setValueApprovedBy] = useState('')
  const [loadingSave, setLoadingSave] = useState(false)
  const [mode, setMode] = useState('')
  const [operatorOther, setOperatorOther] = useState(false)
  const [approvedByOther, setApprovedByOther] = useState(false)

  const { token, user } = useContext(AuthContext)

  const inputRefGoodSheets = useRef()

  const inputRefWasteSheets = useRef()

  const inputRefOperatorOther = useRef()

  const inputRefApprovedByOther = useRef()

  const handleApprovedBy = (e) => {
    if (e.target.value === 'Other') setApprovedByOther(true)
    if (e.target.value !== 'Other') setApprovedByOther(false)
    setValueApprovedBy(e.target.value)
  }

  const handleOperator = (e) => {
    if (e.target.value === 'Other') setOperatorOther(true)
    if (e.target.value !== 'Other') setOperatorOther(false)
    setValueOperator(e.target.value)
    //console.log("🚀 ~ file: InPress.jsx:30 ~ handleOperator ~ e.target.value:", e.target.value)
  }

  const handleMode = (e) => {
    setMode(e.target.value)
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
          if (params) {
            document.getElementById(`tab-${idButtonData}`).click()
            setValueEstado(true)
          }
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
          idWebsite: params ? params.row.dsr_websiteId : optionsModalDsr.idwebsite, 
          mgOrder: params ? params.row.dsr_order : optionsModalDsr.mgOrder,
          qtyBoxes:"",
          qtyPerBox:"",
          qtyLastBox:"",
          missingQty:"",
          signedBy:"",
          csr: "",
          operator: operatorOther ? inputRefOperatorOther.current.value : valueOperator,
          approved: approvedByOther ? inputRefApprovedByOther.current.value : valueApprovedBy,
          totalGoodS: inputRefGoodSheets.current.value,
          totalWastedS: inputRefWasteSheets.current.value,
          mode: mode,
          comment: "",
          packing: params ? params.row.dsr_packing : optionsModalDsr.packing
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
      status: valueSelect ? valueSelect : optionsModalDsr.status,
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
            Operator:
          </Typography>
          <SelectInput age={valueOperator} handleChange={handleOperator} valorData={optionsModalDsr.arrayData ? optionsModalDsr.arrayData[0].operator :  optionsModalDsr.operator} />
          {operatorOther &&
            <>
              <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
                Other:
              </Typography>
              <TextField id="standard-basic" label="" variant="standard" type="text" inputRef={inputRefOperatorOther} fullWidth />
            </>
          }
          <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
            Approved By:
          </Typography>
          <SelectInput age={valueApprovedBy} handleChange={handleApprovedBy} valorData={optionsModalDsr.arrayData ? optionsModalDsr.arrayData[0].approved :  optionsModalDsr.approved} />
          {approvedByOther &&
            <>
              <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
                Other:
              </Typography>
              <TextField id="standard-basic" label="" variant="standard" type="text" inputRef={inputRefApprovedByOther} fullWidth />
            </>
          }
          <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
            Total Good Sheets:
          </Typography>
          <TextField id="standard-basic" label="" variant="standard" type="number" inputRef={inputRefGoodSheets} fullWidth />
          <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
            Total Waste Sheets:
          </Typography>
          <TextField id="standard-basic" label="" variant="standard" type="number" inputRef={inputRefWasteSheets} fullWidth />
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Mode: </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={handleMode}
              value={mode}
            >
              <FormControlLabel value='CMYK' control={<Radio />} label='CMYK' />
              <FormControlLabel value='EPM' control={<Radio />} label='EPM' />
            </RadioGroup>
          </FormControl>
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

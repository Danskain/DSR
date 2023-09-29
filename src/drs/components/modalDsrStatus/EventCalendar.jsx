import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../../auth/context/AuthContext'
import { Box, Typography, Stack, Button, Modal, Checkbox } from '@mui/material'
import { SelectInput, UploadButton } from '../../components'
import { DateBasic } from '../../../components'
import LoadingButton from '@mui/lab/LoadingButton'
import Swal from 'sweetalert2'
import { apiRest } from '../../../logic/constantes'


const style = {  
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 'auto', 
    overflow: 'auto',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderStyle: 'outset',
    borderRadius: '12px'
  }

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  
  function ChildModal({optionsModalDsr, valueSelect, params, idButtonData, setValueEstado, setOpenAlerts, setAlertsOptions}) {
    const [valueMeasure, setValueMeasure] = useState('')
    const [valuePrintType, setValuePrintType] = useState('')
    const [valueDate, setValueDate] = useState('')
    const [valueChecked, setValueChecked] = useState(false)
    const [open, setOpen] = useState(false);
    const [idTransactionies, setIdTransactionies] = useState('')
    const [selectedFile, setSelectedFile] = useState([])

    const [loadingSave, setLoadingSave] = useState(false)
    const [disabledInputs, setDisabledInputs] = useState(true)
    /* const [validationinputs, setValidationinputs] = useState(false)
    const [errosValidation, setErrosValidation] = useState({
      message: '',
      severitys: ''
    }) */

    useEffect(() => {
      if (idTransactionies !== '' && valueMeasure !== '' && valuePrintType !== '' &&  valueDate !== '' &&  valueDate !== null  ) {
        setDisabledInputs(false)
      }else{
        setDisabledInputs(true)
      }
      
    }, [idTransactionies, valueMeasure, valuePrintType, valueDate ])
    

    //const inputRefScodix = useRef()

    const { token, user } = useContext(AuthContext)

    const handleOpen = () => {
      setOpen(true)
    }
    const handleClose = () => {
      setOpen(false)
    }

    const handleValueMeasure = (e) => {
        setValueMeasure(e.target.value)
    }

    const handleValuePrintType = (e) => {
        setValuePrintType(e.target.value)
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

    const handleValueDate = (e) => {
        setValueDate(farmatDate(e))
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
              handleClose()
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
            } 
          
          })
          .catch(error => console.log(error))
      }

    const handleChange = (e) => {
      setValueChecked(e.target.checked)
    }  

    const handelSaveModal = () => {

        /* if (idTransactionies === '' || valueMeasure === '' || valuePrintType === '' ||  valueDate === ''  ) {
          setAlertsOptions({
            types: 'error',
            message: 'files cannot be empty'
          })
          setOpenAlerts(true)

          setValidationinputs(true)
          setErrosValidation({ message: 'Username and password field cannot be empty', severitys: 'error' })
          return
        } */

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
                measure: valueMeasure,
                printType: valuePrintType,
                dateEvent: valueDate,
                idTransaction: idTransactionies,
                scodix: valueChecked ? 'true' : 'false'
              }, 
            }
          ]
        /* console.log(arrayData, 'arrayData')
        return */
        const requestMagento = {
          status: valueSelect,
          typeOption: 'save',
          arrayData: arrayData
        }
        setLoadingSave(true)
        saveModal(requestMagento)
      }
  
    return (
      <>
        <Button onClick={handleOpen} variant='contained' style={{ backgroundColor: '#00A1E0', width: '50%', color: 'white' }} >Yes</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={style}>
            <Box style={{ backgroundColor: 'white', width: '400px' }}>
                <Typography variant='h6' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', fontSize: '17px' }}>
                  Detail events Calendar
                </Typography>
                <Box style={{ padding: '20px 20px 0 20px' }}>
                  <Stack
                    direction='column'
                    justifyContent='flex-start'
                    alignItems='flex-start'
                    spacing={0.5}
                  >
                    <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
                      measure:
                    </Typography>
                    <SelectInput age={valueMeasure} handleChange={handleValueMeasure} valorData={optionsModalDsr.arrayData[0].measure} />
                    <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
                      Print type:
                    </Typography>
                    <SelectInput age={valuePrintType} handleChange={handleValuePrintType} valorData={optionsModalDsr.arrayData[0].printType} />
                    <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
                      Scodix
                    </Typography>
                    <Checkbox {...label} checked={valueChecked} onChange={handleChange} />
                    <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
                      Date
                    </Typography>
                    <DateBasic age={valueDate} handleChange={handleValueDate} defaultChecked={false} />
                    <UploadButton selectedFile={selectedFile} setSelectedFile={setSelectedFile} option={2} nameButton={'ATTACH FILE'} setIdTransactionies={setIdTransactionies}/>
                  </Stack>
                  <br />
                  {/* {validationinputs &&
                    <AlertTop
                      message={errosValidation.message}
                      severitys={errosValidation.severitys}
                    />
                  } */}
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
                      disabled={disabledInputs}
                    >
                      Save Status
                    </LoadingButton>
                    <Button
                      style={{ backgroundColor: '#00A1E0' }} 
                      variant='contained'
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Box>
            </Box>
          </Box>
        </Modal>
      </>
    );
  }

export const EventCalendar = ({handleCloseModal, optionsModalDsr, valueSelect, idwebsite, params, idButtonData, setValueEstado, setOpenAlerts, setAlertsOptions}) => {
  return (
    <Box style={{ backgroundColor: 'white', width: '400px', padding: '20px' }}>
      <Typography variant='h6' align='center' sx={{ fontSize: '17px' }}>
        Do you want create a Event in Calendar?
      </Typography>
      <Box style={{ padding: '20px 20px 0 20px' }}>
        <Stack
          direction='row'
          justifyContent='center'
          alignItems='center'
          spacing={2}
          sx={{ /* display: { lg: 'flex', md: 'none' },  */margin: '30px' }}
        >
          <ChildModal optionsModalDsr={optionsModalDsr} valueSelect={valueSelect} idwebsite={idwebsite} params={params} idButtonData={idButtonData} setValueEstado={setValueEstado} setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions} />
          <Button
            style={{ backgroundColor: '#00A1E0', width: '50%' }} 
            variant='contained'
            onClick={handleCloseModal}
          >
            No
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}
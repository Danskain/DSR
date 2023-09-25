import { useState, useRef, useContext } from 'react'
import { AuthContext } from '../../../auth/context/AuthContext'
import { Box, Paper, Grid, styled,Typography, Stack, TextField, Button } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { DateBasic } from '../../../components'
import { TextareaAutosize } from '@mui/base'
import { SelectInput } from '../../components'
import { apiRest } from '../../../logic/constantes'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  border: 'none',
}))

export const ReadyForShipping = ({setDataModalsPortially, dataModalsPortially, params, handleClose, setOpenAlerts, setAlertsOptions}) => {
    const [valueDate, setValueDate] = useState(dataModalsPortially.date)
    const [valueVehicle, setValueVehicle] = useState(dataModalsPortially.selectVehicule.name)
    const [loadingSave, setLoadingSave] = useState(false)

    const inputRefDO = useRef()
    const inputRefAddress = useRef()
    const inputRefDeliverTo = useRef()
    const inputRefLastName = useRef()
    const inputRefAddCompany = useRef()
    const inputRefTrackNumber = useRef()
    const inputRefBoxes = useRef()
    const inputRefWeight = useRef()
    const inputRefInstrucctions = useRef()

    const { token } = useContext(AuthContext)

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

    const handleVehicle = (e) => {
      setValueVehicle(e.target.value)
    }

    const saveModal = async (requestMagento) => {
        requestMagento.token = token
        requestMagento.option = 'sendDetrack'
        requestMagento.controller = 'dsr'  
    
        const requestOptions = {
          method: 'POST',
          /* headers: { 'Content-Type': 'application/json' }, */
          body: JSON.stringify(requestMagento)
        }
    
        fetch(apiRest, requestOptions)
          .then(response => response.json())
          .then(datas => {
            const { type } = datas
            //setDataModalsPortially({type:"ok",idOption:"6",url:"https://dsrapi.1dayfolders.com/label_download/7.pdf"})
            if (type === 'ok') {
              setDataModalsPortially(datas)   
                /* setAlertsOptions({
                  types: 'success',
                  message
                })
                setOpenAlerts(true)
                setLoadingSave(false)
                document.getElementById(`tab-${idButtonData}`).click()
                handleClose() */
              
            }
    
            if (type === 'error') {
              setAlertsOptions({
                types: type,
                message: 'I dont keep'
              })
              setOpenAlerts(true)
              setLoadingSave(false)
            } 
          
          })
          .catch(error => console.log(error))
      }

    const sendTemplate = () => {
      const aray = [
        {
            date: valueDate,
            DO: inputRefDO.current.value,
            address: inputRefAddress.current.value,
            vehicule: valueVehicle,
            deliverTo: inputRefDeliverTo.current.value,
            lastName: inputRefLastName.current.value,
            Company: inputRefAddCompany.current.value,
            trackNumber: inputRefTrackNumber.current.value,
            boxes: inputRefBoxes.current.value,
            weight: inputRefWeight.current.value,
            comments: inputRefInstrucctions.current.value
        }
      ]  
      const obj = {
        mgOrder: params.row.dsr_order,
        idWebsite: params.row.dsr_websiteId,
        dataDetrack: aray
      }
      setLoadingSave(true)
      saveModal(obj)
    }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={2} sm={4} md={12}>
            <Typography variant='h5' align='left' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', paddingLeft: '10px', fontSize: '17px' }}>
              Detrack Form
            </Typography>
            <Item>
              <Box style={{ backgroundColor: 'white', borderRadius: '10px', borderStyle: 'outset' }}>
                <Typography variant='h6' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', fontSize: '14px' }}>
                  Detrack Required
                </Typography>
                <Box
                  style={{ padding: '10px 10px 10px 10px' }}
                >
                  <Stack
                    direction='column'
                    justifyContent='flex-start'
                    alignItems='flex-start'
                    spacing={0.5}
                  > 
                    <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                      Date:
                    </Typography>
                    <DateBasic age={valueDate} handleChange={handleValueDate} />
                    <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                      D.O #:
                    </Typography>
                    <TextField fullWidth id="stan" variant="standard" inputRef={inputRefDO} name='inputRefAddress' defaultValue={dataModalsPortially.DO} />
                    <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                      Address:
                    </Typography>
                    <TextareaAutosize
                      aria-label='minimum height'
                      minRows={3}
                      style={{ width: '100%', borderRadius: '5px' }}
                      ref={inputRefAddress}
                      defaultValue={dataModalsPortially.address}
                    />
                    <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                      Vehicle:
                    </Typography>
                    <SelectInput age={valueVehicle} handleChange={handleVehicle}  valorData={[dataModalsPortially.selectVehicule]} />
                  </Stack>  
                </Box>
              </Box>
              <Box style={{ backgroundColor: 'white', borderRadius: '10px', borderStyle: 'outset' }}>
                <Typography variant='h6' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', fontSize: '14px' }}>
                  Detrack Shipping
                </Typography>
                <Box
                  style={{ padding: '10px 10px 10px 10px' }}
                >
                  <Stack
                    direction='column'
                    justifyContent='flex-start'
                    alignItems='flex-start'
                    spacing={0.5}
                  > 
                    <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                      Deliver to / Collect from:
                    </Typography>
                    <TextField fullWidth id="stan" variant="standard" inputRef={inputRefDeliverTo} name='inputRefNameTemplate' defaultValue={dataModalsPortially.deliverTo} />
                    <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                      Last name:
                    </Typography>
                    <TextField fullWidth id="stan" variant="standard" inputRef={inputRefLastName} name='inputRefNameTemplate' defaultValue={dataModalsPortially.lastName} />
                    <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                      Address Company:
                    </Typography>
                    <TextField fullWidth id="stan" variant="standard" inputRef={inputRefAddCompany} name='inputRefNameTemplate' defaultValue={dataModalsPortially.addCompany} />
                    <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                      Tracking #:
                    </Typography>
                    <TextField fullWidth id="stan" variant="standard" inputRef={inputRefTrackNumber} name='inputRefNameTemplate' defaultValue={dataModalsPortially.trackNumber} />
                    <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                      Boxes:
                    </Typography>
                    <Stack
                      direction='column'
                      justifyContent='flex-start'
                      alignItems='flex-start'
                      spacing={0.5}
                    >
                      <TextField fullWidth id="stan" variant="standard" inputRef={inputRefBoxes} type='number' name='inputRefNameTemplate' defaultValue={parseInt(dataModalsPortially.boxes)} />
                      <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                        {dataModalsPortially.boxesLabel}
                      </Typography>
                    </Stack>
                    <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                      Weight:
                    </Typography>
                    <TextField fullWidth id="stan" variant="standard" inputRef={inputRefWeight} type='number' name='inputRefWeight' defaultValue={dataModalsPortially.weight} />
                    <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                      Instrucctions:
                    </Typography>
                    <TextareaAutosize
                      aria-label='minimum height'
                      minRows={3}
                      style={{ width: '100%', borderRadius: '5px' }}
                      ref={inputRefInstrucctions}
                    />
                  </Stack>  
                </Box>
              </Box>    
            </Item>
            <Stack
              direction='row'
              justifyContent='center'
              alignItems='center'
              spacing={2}
              sx={{ display: { lg: 'flex', md: 'none' }, margin: '0px 15px 15px 15px' }}
            >
            <LoadingButton
              style={{ backgroundColor: '#00A1E0' }}
              loading={loadingSave}
              variant="contained"
              onClick={sendTemplate}
            >
              Send
            </LoadingButton>
            <Button variant='contained' style={{ backgroundColor: '#00A1E0' }} onClick={handleClose}>
              Cancel
            </Button>
            </Stack>
            <Stack
              direction='row'
              justifyContent='center'
              alignItems='center'
              spacing={2}
              sx={{ display: { lg: 'none', md: 'flex' }, margin: '30px' }}
            >
              <LoadingButton
                style={{ backgroundColor: '#00A1E0' }}
                loading={loadingSave}
                variant="contained"
                onClick={sendTemplate}
              >
                Send
              </LoadingButton>
              <Button variant='contained' style={{ backgroundColor: '#00A1E0', fontSize: '10px' }} onClick={handleClose}>
                Cancel
              </Button>
            </Stack>
          </Grid>
      </Grid>
    </Box>
  );
}

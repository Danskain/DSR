import { useState, useRef, useContext, useEffect } from 'react'
import { AuthContext } from '../../../auth/context/AuthContext'
import { Box, Paper, Grid, styled, Typography, Stack, TextField, Button } from '@mui/material'
import { SelectInput } from '../../components'
import { DateBasic } from '../../../components'
import { TextareaAutosize } from '@mui/base'
import AddBoxIcon from '@mui/icons-material/AddBox'
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault'
import LoadingButton from '@mui/lab/LoadingButton'
import { apiRest } from '../../../logic/constantes'


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    border: 'none',
  }))

  
const Item2 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
    padding: theme.spacing(2),
    height: 600,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    border: 'none',
  }))  

// Obtener la fecha actual
const fechaActual = new Date();

// Obtener los componentes de la fecha
const dia = fechaActual.getDate();
const mes = fechaActual.getMonth() + 1; // Los meses se representan del 0 al 11, por lo tanto, se suma 1
const año = fechaActual.getFullYear();

const formartFecha = (dato) => {
  if (dato < 10) {
    return `0${dato.toString()}`
  }
  return `${dato.toString()}`
}

// Formatear la fecha en el formato deseado (dd/mm/aaaa)
const fechaFormateada = año + '-' + formartFecha(mes) + '-' + formartFecha(dia)

export const ReadyForShippingDHL = ({dataModalsPortially, params, handleClose, setDataModalsPortially, setOpenAlerts, setAlertsOptions, handleCloseModal}) => {
  const [valueCountry, setValueCountry] = useState(dataModalsPortially.billing.codCountry)
  const [valuebillingCountry, setValuebillingCountry] = useState(dataModalsPortially.shipping.codCountry)
  const [selectCountry, setSelectCountry] = useState([])
  const [selectbillingCountry, setSelectCbillingountry] = useState([])
  const [valueDate, setValueDate] = useState(fechaFormateada)
  const [arrayPackges, setArrayPackges] = useState(dataModalsPortially.package)
  const [loadingSave, setLoadingSave] = useState(false)
  const [footer, setFooter] = useState('1')
  const [validationDHL, setValidationDHL] = useState(true)
  const [validateImages, setValidateImages] = useState(false)
  const [imagesActive, setImagesActive] = useState(false)
  const [nextActive, setNextActive] = useState(true)
  const [dhl, setDhl] = useState({})

  const inputRefCompanyName = useRef()
  const inputRefAttention = useRef()
  const inputRefAddress = useRef()
  const inputRefAptSuite = useRef()
  const inputRefDepartment = useRef()
  const inputRefPostalCode = useRef()
  const inputRefCity = useRef()  
  const inputRefProvince = useRef()  
  const inputRefPhone = useRef()
  const inputRefExt = useRef()
  const inputRefTrackingEmails = useRef()

  const inputRefReceiverCompanyName = useRef()
  const inputRefReceiverAttention = useRef()
  const inputRefReceiverAddress = useRef()
  const inputRefReceiverAptSuite = useRef()
  const inputRefReceiverDepartment = useRef()
  const inputRefReceiverPostalCode = useRef()
  const inputRefReceiverCity = useRef()  
  const inputRefReceiverProvince = useRef()  
  const inputRefReceiverPhone = useRef()
  const inputRefReceiverExt = useRef()

  const inputRefReference = useRef()
  const inputRefDriverInstructions = useRef()

  const { token, user } = useContext(AuthContext)

  //const [inputValues, setInputValues] = useState([])
  /* const [objInputs, setObjInputs] = useState({
    length: '',
    width: '',
    height: '',
    weight: '',
    description: ''
}) */

  useEffect(() => {
    const arratbillingCountry = [
        {
            id: 1,
            value: dataModalsPortially.billing.codCountry,
            name: dataModalsPortially.billing.countryName
        }
    ]
    setSelectCountry(arratbillingCountry)
    const arratCountry = [
      {
          id: 1,
          value: dataModalsPortially.shipping.codCountry,
          name: dataModalsPortially.shipping.countryName
      }
    ]
    setSelectCbillingountry(arratCountry)
  }, [])

  const handelImage = () => {
    setImagesActive(true)
    setNextActive(false)
  }
  
  const handleCloseEvent = () => {
    
    handleClose()
    handleCloseModal()
  }
  const handleCloseImage = () => {
    setValidationDHL(true)
    setValidateImages(false)
  }

  const handleInputChange = (index, e) => {
    const newInputValues = [...arrayPackges]
    const result = newInputValues.map((obj, i) => {
      if (i === index) {
        let objResult = {...obj}
        objResult[e.target.name] = e.target.value
        return objResult      
      }
      return obj
    })
    setArrayPackges(result)
  };

  const handleCountry = (e) => {
    setValueCountry(e.target.value)
  }

  const handlebillingCountry = (e) => {
    setValuebillingCountry(e.target.value)
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

  const PreviusDhl = () => {
    setValidationDHL(true)
  }
  
  const saveModal = async (requestMagento) => {
    requestMagento.token = token
    requestMagento.option = 'rateDHL'
    requestMagento.controller = 'dsr'  

    const requestOptions = {
      method: 'POST',
      /* headers: { 'Content-Type': 'application/json' }, */
      body: JSON.stringify(requestMagento)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { type, rate_DHL } = datas
        if (type === 'ok') {
          //setDataModalsPortially(datas)
          setDhl(rate_DHL)
          setFooter('2')
          setValidationDHL(false)
          setLoadingSave(false)
        }

        if (type === 'error') {
          setAlertsOptions({
            types: type,
            message: 'I dont keepSSSSS'
          })
          setOpenAlerts(true)
          setLoadingSave(false)
        } 
      
      })
      .catch(error => console.log(error))
  }

  const saveDHL = async (requestMagento) => {
    requestMagento.token = token
    requestMagento.option = 'shipDHL'
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
        console.log(datas)
        if (type === 'ok') {
          const obj = {
            url: datas.url,
            trackingNumber: datas.trackingNumber,
            idOption: '9'
          }
          setDataModalsPortially(obj)
          setLoadingSave(false)
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

  const saveDHLTemplate = () => {
    const obj = {
        mgOrder: params.row.dsr_order,
        idWebsite: params.row.dsr_websiteId,
        user: user?.name,
        from: {
          name: inputRefCompanyName.current.value,
          attn: inputRefAttention.current.value.trimRight(),
          address: inputRefAddress.current.value,
          suite: inputRefAptSuite.current.value,
          city: inputRefCity.current.value,
          country: valueCountry,
          state: inputRefProvince.current.value,
          postal_code: inputRefPostalCode.current.value,
          phone: inputRefPhone.current.value,
          ext: inputRefExt.current.value
        },
        to: {
            name: inputRefReceiverCompanyName.current.value,
            attn: inputRefReceiverAttention.current.value, 
            address: inputRefReceiverAddress.current.value,
            suite: inputRefReceiverAptSuite.current.value,
            city: inputRefReceiverCity.current.value,
            country: valuebillingCountry,
            state: inputRefReceiverProvince.current.value,
            postal_code: inputRefReceiverPostalCode.current.value,
            phone: inputRefReceiverPhone.current.value,
            ext: inputRefReceiverExt.current.value			
        },
        packages:{
          items: arrayPackges
        },
        options: {
            shipping_date: `${valueDate}T13:37:31.120Z`/* "2023-07-01T13:37:31.120Z" */,
            reference: inputRefReference.current.value,
        },
        courier_code: dhl.courier_code,
        courier_desc: dhl.courier_desc,
        courier_name: dhl.courier_name,
        estimated_delivery_date: dhl.estimated_delivery_date/* "2023-07-05T23:59:00" */
    }
    /* console.log(obj)
    return */
    saveDHL(obj)
    setLoadingSave(true)
  }

  const nextTemplate = () => {
    if (validateImages) {
        saveDHLTemplate()
        return
    }
    
    const arrayarrayPackges = [...arrayPackges]
    const resultarrayPackges = arrayarrayPackges.map((array) => {
        return {
            width: array.width,
            height: array.height,
            length: array.length,
            weight: array.weight
        }
    })

    const obj = {
        mgOrder: params.row.dsr_order,
        idWebsite: params.row.dsr_websiteId,
        options: [{
            shipping_date: valueDate
        }],
        to: {
            postal_code:inputRefReceiverPostalCode.current.value,
            city:inputRefReceiverCity.current.value,
            country:valuebillingCountry		
        },
        packages:[
            {
              items: resultarrayPackges
            }
        ] 
    }
    /* console.log(obj, 'dasd')
    return */
    saveModal(obj)
    setLoadingSave(true)
  }

  const nextTemplateImgDhl = () => {
    setFooter('3')
    setValidationDHL(true)
    //validateImages, 
    setValidateImages(true)
    
  }

  const handleBoxesDelete = (numero) => {
    const newInputValues = [...arrayPackges]
    newInputValues.splice(numero, 1)
    setArrayPackges(newInputValues)
  }

  const handleBoxes = () => {
    const arrayResult = [...arrayPackges]
    
    const obj = {
      length: arrayResult[0].length,
      width: arrayResult[0].width,
      height: arrayResult[0].height,
      weight: arrayResult[0].weight,
      description: arrayResult[0].description
    }

    arrayResult.push(obj)

    setArrayPackges(arrayResult)
  }

  const textFooter = (text) => {
    const objFooter = {
        '1': 'New Shipment',
        '2': 'Get Best Courier Service',
        '3': 'Confirm Shipment',
    }

    const COLORS_CELL_DEFAULT = ''
    return objFooter[text] || COLORS_CELL_DEFAULT
  }

  const handleClosetttt = () => {
    /* console.log('falso')
    return */
    handleClose()
  }

  const handelvalidateImagesPrevius = () => {
    /* console.log('verdadero')
    return */
    setValidationDHL(false)
    setImagesActive(false)
    setNextActive(true)
  }

  return (
    <>
    {validationDHL
    ?
      <Box sx={{ flexGrow: 1, width: 1200}}>
    <Typography variant='h5' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', paddingLeft: '10px', fontSize: '17px' }}>
      Send Information To DHL
    </Typography>
  <Grid
    container
    spacing={{ xs: 2, md: 3 }}
    columns={{ xs: 4, sm: 8, md: 12 }}
    style={{ padding: '5px' }}
  >
    <Grid item xs={2} sm={4} md={3}>
      <Item>
        <Box style={{ backgroundColor: 'white', borderRadius: '10px', borderStyle: 'outset' }}>
          <Typography variant='h6' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', fontSize: '14px' }}>
            Shipper Information
          </Typography>
            <Box
              style={{ padding: '10px 10px 10px 10px' }}
            >
              <Stack
                direction='column'
                justifyContent='flex-start'
                alignItems='flex-start'
                spacing={0}
              > 
                <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  Company/Name:
                </Typography>
                <TextField fullWidth id="stan" variant="standard" inputRef={inputRefCompanyName} name='inputRefAddress' defaultValue={dataModalsPortially.billing.company} />
                <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  Attention:
                </Typography>
                <TextField fullWidth id="stan" variant="standard" inputRef={inputRefAttention} name='inputRefAddress' defaultValue={dataModalsPortially.billing.attention} />
                <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  Address:
                </Typography>
                <TextField fullWidth id="stan" variant="standard" inputRef={inputRefAddress} name='inputRefAddress' defaultValue={dataModalsPortially.billing.address} />
                <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  Apt./Suite #:
                </Typography>
                <TextField fullWidth id="stan" variant="standard" inputRef={inputRefAptSuite} name='inputRefAddress' defaultValue={dataModalsPortially.billing.suite} />
                <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  Department:
                </Typography>
                <TextField fullWidth id="stan" variant="standard" inputRef={inputRefDepartment} name='inputRefAddress' defaultValue={dataModalsPortially.billing.department} />
                <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  Country:
                </Typography>
                <SelectInput age={valueCountry} handleChange={handleCountry}  valorData={selectCountry} />
                <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  Postal Code:
                </Typography>
                <TextField fullWidth id="stan" variant="standard" inputRef={inputRefPostalCode} name='inputRefAddress' defaultValue={dataModalsPortially.billing.postalCode} />
                <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  City:
                </Typography>
                <TextField fullWidth id="stan" variant="standard" inputRef={inputRefCity} name='inputRefAddress' defaultValue={dataModalsPortially.billing.city} />
                <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  Province:
                </Typography>
                <TextField fullWidth id="stan" variant="standard" inputRef={inputRefProvince} name='inputRefAddress' defaultValue={dataModalsPortially.billing.province} />
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='flex-start'
                  spacing={11}
                >
                  <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                    Phone:
                  </Typography>
                  <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                    Ext:
                  </Typography>
                </Stack>
                <Stack
                  direction='row'
                  justifyContent='flex-start'
                  alignItems='flex-start'
                  spacing={1}
                >
                  <TextField fullWidth id="stan" variant="standard" inputRef={inputRefPhone} name='inputRefAddress' defaultValue={dataModalsPortially.billing.phone} />
                  <TextField fullWidth id="stan" variant="standard" inputRef={inputRefExt} name='inputRefAddress' defaultValue={dataModalsPortially.billing.ext} />  
                </Stack>
                <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  Tracking Emails:
                </Typography>
                <TextField fullWidth id="stan" variant="standard" inputRef={inputRefTrackingEmails} name='inputRefAddress' type='email' defaultValue={dataModalsPortially.emaitracking} />
              </Stack>  
            </Box>
        </Box>
      </Item>
    </Grid>
    <Grid item xs={2} sm={4} md={3}>
      <Item>
        <Box style={{ backgroundColor: 'white', borderRadius: '10px', borderStyle: 'outset' }}>
          <Typography variant='h6' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', fontSize: '14px' }}>
            Receiver Information
          </Typography>
            <Box
              style={{ padding: '10px 10px 10px 10px' }}
            >
              <Stack
                direction='column'
                justifyContent='flex-start'
                alignItems='flex-start'
                spacing={0.3}
              > 
                <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  Company/Name:
                </Typography>
                <TextField fullWidth id="stan" variant="standard" inputRef={inputRefReceiverCompanyName} name='inputRefAddress' defaultValue={dataModalsPortially.shipping.company} />
                <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  Attention:
                </Typography>
                <TextField fullWidth id="stan" variant="standard" inputRef={inputRefReceiverAttention} name='inputRefAddress' defaultValue={dataModalsPortially.shipping.attention} />
                <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  Address: <samp>(PO Boxes are not accepted)</samp>
                </Typography>
                <TextField fullWidth id="stan" variant="standard" inputRef={inputRefReceiverAddress} name='inputRefAddress' defaultValue={dataModalsPortially.shipping.address} />
                <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  Apt./Suite #:
                </Typography>
                <TextField fullWidth id="stan" variant="standard" inputRef={inputRefReceiverAptSuite} name='inputRefAddress' defaultValue={dataModalsPortially.shipping.suite} />
                <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  Department:
                </Typography>
                <TextField fullWidth id="stan" variant="standard" inputRef={inputRefReceiverDepartment} name='inputRefAddress' defaultValue={dataModalsPortially.shipping.department} />
                <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  Country:
                </Typography>
                <SelectInput age={valuebillingCountry} handleChange={handlebillingCountry}  valorData={selectbillingCountry} />
                <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  Postal Code:
                </Typography>
                <TextField fullWidth id="stan" variant="standard" inputRef={inputRefReceiverPostalCode} name='inputRefAddress' defaultValue={dataModalsPortially.shipping.postalCode} />
                <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  City:
                </Typography>
                <TextField fullWidth id="stan" variant="standard" inputRef={inputRefReceiverCity} name='inputRefAddress' defaultValue={dataModalsPortially.shipping.city} />
                <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  Province:
                </Typography>
                <TextField fullWidth id="stan" variant="standard" inputRef={inputRefReceiverProvince} name='inputRefAddress' defaultValue={dataModalsPortially.shipping.province} />
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='flex-start'
                  spacing={11}
                >
                  <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                    Phone:
                  </Typography>
                  <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                    Ext:
                  </Typography>
                </Stack>
                <Stack
                  direction='row'
                  justifyContent='flex-start'
                  alignItems='flex-start'
                  spacing={1}
                >
                  <TextField fullWidth id="stan" variant="standard" inputRef={inputRefReceiverPhone} name='inputRefAddress' defaultValue={dataModalsPortially.shipping.phone} />
                  <TextField fullWidth id="stan" variant="standard" inputRef={inputRefReceiverExt} name='inputRefAddress' defaultValue={dataModalsPortially.shipping.ext} />  
                </Stack>
              </Stack>  
            </Box>
        </Box>
      </Item>
    </Grid>
    <Grid item xs={2} sm={4} md={6}>
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={2} sm={4} md={12}>
          <Item>
            <Box style={{ backgroundColor: 'white', borderRadius: '10px', borderStyle: 'outset' }}>
              <Typography variant='h6' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', fontSize: '14px' }}>
                Options
              </Typography>
              <Box
                style={{ padding: '10px 10px 10px 10px', width: '100%' }}
              >
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='flex-start'
                  spacing={1}
                  useFlexGap
                  flexWrap="wrap"
                >
                  <Box style={{ textAlign: 'left' }}>
                    <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                        Shipment Date:
                    </Typography>
                    <DateBasic age={valueDate} handleChange={handleValueDate} />
                  </Box>
                  <Box style={{ textAlign: 'left' }}>
                    <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                        Reference:
                    </Typography>
                    <TextField fullWidth id="stan" variant="outlined" type='text' inputRef={inputRefReference} name='inputRefReference' style={{ marginTop: '8px' }} defaultValue={dataModalsPortially.reference} />
                  </Box>
                  <Box style={{ textAlign: 'left', width: '100%' }}>
                    <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                        Driver Instructions:
                    </Typography>
                    <TextareaAutosize
                        aria-label='minimum height'
                        minRows={3}
                        style={{ width: '100%', borderRadius: '5px' }}
                        ref={inputRefDriverInstructions}
                        //defaultValue={dataModalsPortially.address}
                    />
                  </Box>     
                </Stack>  
              </Box>
            </Box>  
          </Item>
        </Grid>
        <Grid item xs={2} sm={4} md={12}>
          <Item>
          <Box style={{ backgroundColor: 'white', borderRadius: '10px', borderStyle: 'outset' }}>
              <Typography variant='h6' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', fontSize: '14px' }}>
                Packges
              </Typography>
              <Box
                style={{ padding: '10px 10px 10px 10px' }}
              >
                
                  <Grid
                    container
                    spacing={{ xs: 2, md: 1 }}
                    columns={{ xs: 4, sm: 8, md: 16 }}
                  >
                    <Grid item xs={2} sm={4} md={3}>
                      <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                        Length
                      </Typography>
                    </Grid>
                    <Grid item xs={2} sm={4} md={3}>
                      <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                        Width
                      </Typography>
                    </Grid>
                    <Grid item xs={2} sm={4} md={3}>
                      <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                        Height
                      </Typography>
                    </Grid>
                    <Grid item xs={2} sm={4} md={3}>
                      <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                        Weight
                      </Typography>
                    </Grid>
                    <Grid item xs={2} sm={4} md={3}>
                      <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                        Description
                      </Typography>
                    </Grid>
                    <Grid item xs={2} sm={4} md={1}>
                        <AddBoxIcon onClick={handleBoxes} style={{ cursor: 'pointer' }} />
                    </Grid> 
                  </Grid>
                  {arrayPackges.map((elemento, index) => (
                    <Stack
                        key={index}
                        direction='row'
                        justifyContent='flex-start'
                        alignItems='center'
                        spacing={0.5}
                    > 
                    
                        <TextField size="small" type="number" name='length' value={elemento.length || ''} onChange={(e) => handleInputChange(index, e)}  /* defaultValue={elemento.length} */ style={{ width: '20%' }} />
                        <TextField size="small" type="number" name="width" value={elemento.width || ''} onChange={(e) => handleInputChange(index, e)} /* defaultValue={elemento.with} */ style={{ width: '20%' }} />
                        <TextField size="small" type="number" name="height" value={elemento.height || ''} onChange={(e) => handleInputChange(index, e)} /* defaultValue={elemento.height} */ style={{ width: '20%' }} />
                        <TextField size="small" type="number" name="weight" value={elemento.weight || ''} onChange={(e) => handleInputChange(index, e)} /* defaultValue={elemento.weight} */ style={{ width: '20%' }} /> 
                        <TextField size="small" type="text" name="description" value={elemento.description || ''} onChange={(e) => handleInputChange(index, e)} /* defaultValue={elemento.description} */ style={{ width: '20%' }} /> 
                        <DisabledByDefaultIcon onClick={() => handleBoxesDelete(index)} style={{ cursor: 'pointer' }} />
                    </Stack>
                  ))}
              </Box>
            </Box>
          </Item>
        </Grid>
        {validateImages &&
          <Grid item xs={2} sm={4} md={12}>
            <Box
                className='ContainerImageDhl'
              >
                <div className='imageDhl'>
                  <img
                    src='https://prestodemos.com/dsr/img/DHL.png'
                    alt='DHL'
                  />
                </div>
                <div className='textDos'>
                  <p>{dhl.courier_name}</p>
                  <p>{dhl.courier_desc}</p>
                  <p>{dhl.courier_code}</p>
                  <span className='estimated'>Estimated Delivery Date: {dhl.estimated_delivery_date}</span>
                  <p>Transit Time: {dhl.transit_time}</p>
                  <label>${dhl.price}</label>
                </div>
              </Box>
          </Grid>
        }
      </Grid>
    </Grid>
    <Grid item xs={2} sm={4} md={12}>
      <Stack
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={2}
        sx={{ display: { lg: 'flex', md: 'none' }, margin: '0px 15px 15px 15px' }}
      >
        <Button variant='contained' style={{ backgroundColor: '#00A1E0' }} onClick={validateImages ? handelvalidateImagesPrevius : handleClosetttt}>
          Previus
        </Button>
        <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
          {textFooter(footer)}
        </Typography>
        <LoadingButton
          style={{ backgroundColor: '#00A1E0' }}
          loading={loadingSave}
          variant="contained"
          onClick={nextTemplate}
        >
          Next
        </LoadingButton>
        <Button variant='contained' style={{ backgroundColor: '#00A1E0' }} onClick={handleCloseEvent}>
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
        <Button variant='contained' style={{ backgroundColor: '#00A1E0' }} onClick={validateImages ? handelvalidateImagesPrevius : handleClosetttt}>
          Previus
        </Button>
        <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
          {textFooter(footer)}
        </Typography>
        <LoadingButton
          style={{ backgroundColor: '#00A1E0' }}
          loading={loadingSave}
          variant="contained"
          onClick={nextTemplate}
        >
          Next
        </LoadingButton>
        <Button variant='contained' style={{ backgroundColor: '#00A1E0', fontSize: '10px' }} onClick={handleCloseEvent}>
          Cancel
        </Button>
      </Stack>                        
    </Grid>
  </Grid>
      </Box>
    :
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >  
          <Grid item xs={2} sm={4} md={12} >
            <Item2>
              <Box
                className={imagesActive ? 'ContainerImageDhlAtive' : 'ContainerImageDhl'}
              >
                <div className='imageDhl'>
                  <img
                    src='/src/assets/DHL.png'
                    alt='DHL'
                  />
                </div>
                <div className={'text'} onClick={handelImage}>
                  <p>{dhl.courier_name}</p>
                  <p>{dhl.courier_desc}</p>
                  <p>Delivery Date: {dhl.estimated_delivery_date}</p>
                  <p>Transit Time: {dhl.transit_time}</p>
                  <label>${dhl.price}</label>
                </div>
              </Box>
            </Item2>
          </Grid>
          <Grid item xs={2} sm={4} md={12} >
            <Item>
              <Stack
                direction='row'
                justifyContent='center'
                alignItems='center'
                spacing={2}
                sx={{ display: { lg: 'flex', md: 'none' }, margin: '0px 15px 15px 15px' }}
              >
                <Button variant='contained' style={{ backgroundColor: '#00A1E0' }} onClick={PreviusDhl}>
                  Previus
                </Button>
                <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  {textFooter(footer)}
                </Typography>
                <LoadingButton
                  style={{ backgroundColor: '#00A1E0' }}
                  loading={loadingSave}
                  variant="contained"
                  onClick={nextTemplateImgDhl}
                  disabled={nextActive}
                >
                  Next
                </LoadingButton>
                <Button variant='contained' style={{ backgroundColor: '#00A1E0' }} onClick={handleCloseEvent}>
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
                <Button variant='contained' style={{ backgroundColor: '#00A1E0' }} onClick={handleCloseImage}>
                  Previus
                </Button>
                <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                  {textFooter(footer)}
                </Typography>
                <LoadingButton
                  style={{ backgroundColor: '#00A1E0' }}
                  loading={loadingSave}
                  variant="contained"
                  onClick={nextTemplateImgDhl}
                  disabled={nextActive}
                >
                  Next
                </LoadingButton>
                <Button variant='contained' style={{ backgroundColor: '#00A1E0', fontSize: '10px' }} onClick={handleCloseEvent}>
                  Cancel
                </Button>
              </Stack>
            </Item>
          </Grid>  
        </Grid>
      </Box>
    }
    </>
  )
}
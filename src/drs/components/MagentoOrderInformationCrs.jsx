import { useState, useRef, useContext } from 'react'
import { AuthContext } from '../../auth/context/AuthContext'
import { Box, Grid, Stack, styled, Paper } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import {MagentoOrderInformationCrsModal, Alerts, UploadButton, OrderInformationArraies, OrderInformationAddress, OrderInformationDie, OrderInformationCommentTemplate, OrderInformationDoketHeader, OrderInfomationComment, OrderInformationEmailSettings } from '../components'
import { arrayCommutationTrue, arrayCommutationFalse, arrayCommutationTrueCancel, arrayCommutationFalseId, arrayCommutationFalseIdConfirmation } from '../../logic/functions'
import Swal from 'sweetalert2'
import { apiRest } from '../../logic/constantes'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  border: 'none',
}));

export const MagentoOrderInformationCrs = ({
  arraySelectOrderInformation,
  setArraySelectOrderInformation,
  saveStatusCancelArraySelectOrderInformation,
  setSaveStatusCancelArraySelectOrderInformation,
  backupAddress,
  setBackupAddress,
  arrayshippingAddressArray,
  setArrayshippingAddressArray,
  dieResultArray,
  setDieResultArray,
  selectCommentTemplate,
  setSelectCommentTemplate,
  selectDocketHeader,
  setSelectDocketHeader,
  selectCommentTemplateDocket,
  templateArray,
  csrResultArray,
  orderWebsite,
  formarSelects,
  arrayItemOrder,
  hidemImages,
  setHidemImages,
  selectedFile,
  setSelectedFile,
  selectedFileEmail,
  setSelectedFileEmail
}) => {

  const inputRefComment = useRef()
  const [hidenAddress, setHidenAddress] = useState(false)
  const [valorDataSelectDocketHeader, setValorDataSelectDocketHeader] = useState('')
  const [valorDataSelectCommentTemplate, setValorDataSelectCommentTemplate] = useState('')
  //const [selectedFile, setSelectedFile] = useState([])
  const [idTransactionies, setIdTransactionies] = useState('')
  const [idTransactioniesEmail, setIdTransactioniesEmail] = useState('')
  //
  const [loadingSave, setLoadingSave] = useState(false)
  const [loadingDocket, setloadingDocket] = useState(false)
  const [alertsOptions, setAlertsOptions] = useState({})
  const [openAlerts, setOpenAlerts] = useState(false)

  const { token, user } = useContext(AuthContext)

  
  const handleImageError = () => {
    setHidemImages(`https://prestodemos.com/dsr/img/big.png`)
  }

  const haidenSelectEventOrder = (id) => {
    const arrayResultSprid = [...arraySelectOrderInformation]
    const avent = false
    const arrayResult = arrayCommutationFalse(id, arrayResultSprid, avent)
    setArraySelectOrderInformation(arrayResult)
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

  const validateLetraT = (texto) => {
    return texto.includes("T");
  }

  const formateFechaNormal = (date) => {
    if (validateLetraT(date)) {
      const arraySeparado = date.split('T');
      return arraySeparado[0]
    }
    return date
  }

  const farmatDateTime = (date, time) => {
    if (!time) {
      return null
    }
    const { $H, $m } = time
    if (isNaN($H) || isNaN($m)) {
      return null
    }
    return `${formateFechaNormal(date)}T${$H}:${$m}` 
  }

  const handleChangeOrderDate = (e, id) => {
    
    const arrayResultSprid = [...arraySelectOrderInformation]
    const avent = false
    let valor = ''
    if (id === 7) { 
      valor = farmatDateTime(arrayResultSprid[6].value, e)
    } else {
      valor = farmatDate(e)
    }
    const arrayResult = arrayCommutationFalseId(id, arrayResultSprid, avent, valor)
    setArraySelectOrderInformation(arrayResult)
  }

  const sweetalert2Function = (e, id, arrayResultSprid) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "As the shipping Method is in-store Pickup, the Estimated Delivery Date field will be empty. Would you like to continue?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, modify it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Modified!',
          'Your date has been Modified.',
          'success'
        )
        OrderSelectInformationConfirmation(e, id, arrayResultSprid)
      }
    })
  }

  const OrderSelectInformationConfirmation = (e, id, arrayResultSprid) => {
    const avent = false
    const valor = e.target.value
    const arrayResult = arrayCommutationFalseIdConfirmation(id, arrayResultSprid, avent, valor)
    setSaveStatusCancelArraySelectOrderInformation(arrayResult)
    setArraySelectOrderInformation(arrayResult)
  }

  const fetchDataShippingMethod = async (e, id, arrayResultSprid, requestShippingMethod) => {
    requestShippingMethod.token = token
    requestShippingMethod.option = 'calculateDeliveryDate'
    requestShippingMethod.controller = 'magento'  

    const requestOptions = {
      method: 'POST',
      /* headers: { 'Content-Type': 'application/json' }, */
      body: JSON.stringify(requestShippingMethod)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { type, DeliveryDate, message } = datas
        if (type === 'ok') {
          OrderSelectInformation(e, id, arrayResultSprid, DeliveryDate)
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

  const OrderSelectInformation = (e, id, arrayResultSprid, DeliveryDate) => {
    const avent = false
    const valor = e.target.value
    const arrayResult = arrayCommutationFalseId(id, arrayResultSprid, avent, valor, DeliveryDate)
    setArraySelectOrderInformation(arrayResult)
  }

  const handleChangeOrder = (e, id) => {
    const arrayResultSprid = [...arraySelectOrderInformation]
    const arrayAddress = [...arrayshippingAddressArray]
  
    const objOrderInformation = {
      nameCompany: arrayAddress[3].value,
      name: `${arrayAddress[1].value} ${arrayAddress[2].value}`,
      address: arrayAddress[4].value,
      city: arrayAddress[5].value,
      codCountry: arrayAddress[8].value,
      state: arrayAddress[6].value,
      postalCode: arrayAddress[7].value,
      phone: ''
    }

    if (id === 10 && e.target.value === 'In-Store Pickup' && arrayResultSprid[4].value !== '0000-00-00') {
      sweetalert2Function(e, id, arrayResultSprid)
      return
    }
    if (id === 10) {
      const requestShippingMethod = {
        shipping:[objOrderInformation],
        shippingDate:  arrayResultSprid[2].value,
        shippingMethod: e.target.value,
        mgorder: orderWebsite.order,
        idwebsite: orderWebsite.website
      }
      fetchDataShippingMethod(e, id, arrayResultSprid, requestShippingMethod)
      return
    }
    const requestShippingMethod = ''
    OrderSelectInformation(e, id, arrayResultSprid, requestShippingMethod)
  }

  const haidenCancel = (id) => {
    const arrayResultSprid = [...saveStatusCancelArraySelectOrderInformation]
    const avent = true
    const arrayResult = arrayCommutationTrueCancel(id, arrayResultSprid, avent)
    setArraySelectOrderInformation(arrayResult)
  }

  const checkValueOrder = (id) => {
    const arrayResultSprid = [...arraySelectOrderInformation]
    const avent = true
    const arrayResult = arrayCommutationTrue(id, arrayResultSprid, avent)
    setSaveStatusCancelArraySelectOrderInformation(arrayResult)
    setArraySelectOrderInformation(arrayResult)
  }

  const checkValueAddress = () => {
    const arrayResultSprid = [...arrayshippingAddressArray]
    const arrayResult = arrayResultSprid.map((array) => {
      if (array.id !== 0) {
        return {
          id: array.id,
          label: array.label,
          typeCtrl: array.label,
          event: true,
          value: array.value,
        }
      }
      return array
    })
    setBackupAddress([])
    setArrayshippingAddressArray(arrayResult)
    setHidenAddress(false)
  }

  const haidenCancelAddress = () => {
    const arrayResultSprid = [...backupAddress]
    setHidenAddress(false)
    setArrayshippingAddressArray(arrayResultSprid)  
  }

  const haidenSelectEventAddress = (id) => {
    const arrayResultSprid = [...arrayshippingAddressArray]
    const arrayResult = arrayResultSprid.map((array) => {
      if (array.id !== id) {
        return {
          id: array.id,
          label: array.label,
          typeCtrl: array.label,
          event: false,
          value: array.value,
        }
      }
      return array
    })
    setBackupAddress(arrayResultSprid) 
    setArrayshippingAddressArray(arrayResult)
    setHidenAddress(true)
  }

  const handleChangeAddress = (e, id) => {
    const arrayResultSprid = [...arrayshippingAddressArray]
    const arrayResult = arrayResultSprid.map((array) => {
      if (array.id === id) {
        return {
          id: array.id,
          label: array.label,
          typeCtrl: array.label,
          event: false,
          value: e.target.value,
        }
      }
      return array
    })

    setArrayshippingAddressArray(arrayResult)
  }

  const haidenSelectEventDie = (id) => {
    const arrayResultSprid = [...dieResultArray]
    const avent = false
    const arrayResult = arrayCommutationFalse(id, arrayResultSprid, avent)
    setDieResultArray(arrayResult)
  }

  const handleChangeDie = (e, id) => {
    const validate = /^[a-zA-Z0-9]+$/.test(e.target.value)
    
    if (e.target.value.length > 0) {
      if (!validate && id === 0) {
        return
      }
    }
    const arrayResultSprid = [...dieResultArray]
    const avent = false
    const valor = e.target.value
    const arrayResult = arrayCommutationFalseId(id, arrayResultSprid, avent, valor)
    setDieResultArray(arrayResult)
  }
  
  const haidenCancelDie = (id) => {
    const arrayResultSprid = [...dieResultArray]
    const avent = true
    const arrayResult = arrayCommutationTrue(id, arrayResultSprid, avent)
    setDieResultArray(arrayResult)
  }

  const checkValueDie = (id) => {
    const arrayResultSprid = [...dieResultArray]
    const avent = true
    const arrayResult = arrayCommutationTrue(id, arrayResultSprid, avent)
    setDieResultArray(arrayResult)
  }

  const mapSaveMagento = (arrays) => {
    const arrayResult = arrays.map((array) => {
        return {
          label: array.label,
          value: array.value
        }
    })
    return arrayResult
  }

  const dieTrackingNumberCarrierFormart = (arrays) => {
    const arrayResult = arrays.map((array) => {
      if (array.label === 'Carrier:') {
        return {
          label: 'carrier:',
          value: array.value
        }
      }

      if (array.label !== 'Carrier:') {
        return {
          label: 'Tracking number:',
          value: array.value
        }
      }
    })
    return arrayResult
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
          status: arraySelectOrderInformation[1].value,
          mgorder:orderWebsite.order,
          idwebsite:orderWebsite.website,
          user: user.name
        }
        fetchDataEmail(ogj)
      }
    })
  }

  const fetchDatas = async (requestMagento) => {
    requestMagento.token = token
    requestMagento.option = 'saveOrder'
    requestMagento.controller = 'magento'  

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
            message: 'Changes have been saved successfully'
          })
          setOpenAlerts(true)
          formarSelects(datas)
          setSelectedFile([])
          setIdTransactionies('')
          //setViewFile(false)
        }

        if (type === 'error') {
          setAlertsOptions({
            types: type,
            message
          })
          setOpenAlerts(true)
        } 
        setLoadingSave(false)
      
      })
      .catch(error => console.log(error))
  }

  const fetchDatasDocket = async (requestMagento) => {
    requestMagento.token = token
    requestMagento.option = 'generateDocketInvoice'
    requestMagento.controller = 'magento'  

    const requestOptions = {
      method: 'POST',
      /* headers: { 'Content-Type': 'application/json' }, */
      body: JSON.stringify(requestMagento)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {

        const { type, message, url } = datas
        if (type === 'ok') {
          window.open(url, '_blank')
          setloadingDocket(false)
        }

        if (type === 'error') {
          setAlertsOptions({
            types: type,
            message
          })
          setOpenAlerts(true)
          setloadingDocket(false)
        } 
      
      })
      .catch(error => console.log(error))

    /* try {
      const response = await fetch(apiRest, requestOptions);
      console.log("🚀 ~ file: MagentoOrderInformationCrs.jsx:390 ~ fetchDatasDocket ~ response:", response)
      const blob = await response.blob()
    
       // Crear una URL del objeto Blob
      const url = URL.createObjectURL(blob)

       // Abrir una nueva pestaña con el PDF
      const newWindow = window.open();
       newWindow.location.href = url;
 
       // Descargar el PDF
      const link = document.createElement('a');
      link.href = url;
      link.download = 'archivo.pdf';
      link.click();
 
       // Limpiar la URL creada
      URL.revokeObjectURL(url);
      setloadingDocket(false)
    } catch (error) {
      console.error('Error al obtener el PDF:', error)
      setAlertsOptions({
        types: type,
        message: 'Error getting the PDF'
      })
      setOpenAlerts(true)
      setloadingDocket(false)
    } */
  }

  const invoceDocketMagento = (number) => {
    const requestInvoice = {
      mg_order: orderWebsite.order,
      id_website: orderWebsite.website,
      optionGenerate: number 
    }
    fetchDatasDocket(requestInvoice)
    setloadingDocket(true)
  }

  const saveMagento = () => {    
    const arrayItemOrderResult = [...arrayItemOrder]
    const arraySelectOrderInformationResult = [...arraySelectOrderInformation]
    const arrayshippingAddressArrayResult = [...arrayshippingAddressArray]
    const dieResultArrayResult = [...dieResultArray]
    const arrayselectCommentTemplate = [...selectCommentTemplate]
    const arrayselectDocketHeader = [...selectDocketHeader]

    const objCommentTemplate = {
      value: valorDataSelectCommentTemplate,
      arrayResultselect: arrayselectCommentTemplate
    }
    
    const objDocketHeader = {
      value: valorDataSelectDocketHeader,
      arrayResultselect: arrayselectDocketHeader
    }

    const requestMagento = {
      itemOrder: mapSaveMagento(arrayItemOrderResult),
      selectOrderInformation: mapSaveMagento(arraySelectOrderInformationResult),
      shippingAddress: mapSaveMagento(arrayshippingAddressArrayResult),
      dieTrackingNumberCarrier: mapSaveMagento(dieTrackingNumberCarrierFormart(dieResultArrayResult)),
      commentTemplate: objCommentTemplate,
      docketHeader: objDocketHeader,
      comment: inputRefComment.current.value,
      dsr__mg_order: orderWebsite.order,
      dsr__id_website: orderWebsite.website,
      user: user.name
    }
    setLoadingSave(true)
    fetchDatas(requestMagento)
  }

  const [openModal, setOpenModal] = useState(false)
  const [arrayModalCsr, setArrayModalCsr] = useState([])

  const handleOpenModal = () => {
    setOpenModal(true)
  }
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenModalImage = () => {
    const result = [...arrayItemOrder]
    const resultArrayItemOrder = result.map((re) => {
      return { 
        label: re.label,
        value: re.value
      }
    })
    setArrayModalCsr(resultArrayItemOrder)
    handleOpenModal()
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 0 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4} sm={8} md={7}>
          <Item>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 2, md: 1.5 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <Grid item xs={4} sm={8} md={12} /* key={index} */>
                  <Box
                    sx={{ backgroundColor: 'white', borderStyle: 'outset', borderRadius: '10px 10px 10px 10px', width: '100%' }}
                  >
                    <OrderInformationArraies arraySelectOrderInformation={arraySelectOrderInformation} haidenSelectEventOrder={haidenSelectEventOrder} handleChangeOrderDate={handleChangeOrderDate} handleChangeOrder={handleChangeOrder} haidenCancel={haidenCancel} checkValueOrder={checkValueOrder} />
                  </Box>
                </Grid>
                <Grid item xs={4} sm={4} md={6} /* key={index} */>
                  <Box sx={{  height: '380px', width: '100%' }}>
                    <Stack
                      direction="column"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={0}
                      style={{height: '100%', width: '100%'}}
                    >
                      <Box
                        sx={{ backgroundColor: 'white', borderStyle: 'outset', borderRadius: '10px 10px 10px 10px', width: '100%', overflowX: 'auto', whiteSpace: 'nowrap' }}
                      >
                        <OrderInformationAddress checkValueAddress={checkValueAddress} haidenCancelAddress={haidenCancelAddress} arrayshippingAddressArray={arrayshippingAddressArray} haidenSelectEventAddress={haidenSelectEventAddress} handleChangeAddress={handleChangeAddress} hidenAddress={hidenAddress} />
                      </Box>
                    
                    
                      <Box
                        sx={{ backgroundColor: 'white', borderStyle: 'outset', borderRadius: '10px 10px 10px 10px', width: '100%' }}
                      >
                        <OrderInformationCommentTemplate selectCommentTemplate={selectCommentTemplate} setSelectCommentTemplate={setSelectCommentTemplate} valorDataSelectCommentTemplate={valorDataSelectCommentTemplate} setValorDataSelectCommentTemplate={setValorDataSelectCommentTemplate} inputRefComment={inputRefComment} />
                      </Box>
                    </Stack>    
                  </Box>    
                </Grid>
                <Grid item xs={4} sm={4} md={6} /* key={index} */>
                  <Box sx={{ height: '380px', width: '100%' }}>
                    <Stack
                      direction="column"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={0}
                      style={{height: '100%', width: '100%'}}
                    >
                      <Box
                        sx={{ backgroundColor: 'white', borderStyle: 'outset', borderRadius: '10px 10px 10px 10px', width: '100%' }}
                      >
                        <OrderInformationDie dieResultArray={dieResultArray} haidenSelectEventDie={haidenSelectEventDie} handleChangeDie={handleChangeDie} haidenCancelDie={haidenCancelDie} checkValueDie={checkValueDie} />
                      </Box>
                      <Box
                        sx={{ backgroundColor: 'white', borderStyle: 'outset', borderRadius: '10px 10px 10px 10px', width: '100%' }}
                      >
                        <OrderInformationDoketHeader valorDataSelectDocketHeader={valorDataSelectDocketHeader} setValorDataSelectDocketHeader={setValorDataSelectDocketHeader} selectDocketHeader={selectDocketHeader} setSelectDocketHeader={setSelectDocketHeader}/>
                      </Box>
                      <Box
                        sx={{ backgroundColor: 'white', borderStyle: 'outset', borderRadius: '10px 10px 10px 10px', width: '100%' }}
                      >
                        <OrderInfomationComment selectCommentTemplateDocket={selectCommentTemplateDocket} inputRefComment={inputRefComment}/>
                      </Box>
                    </Stack>  
                  </Box>
                </Grid>
                <Grid item xs={4} sm={8} md={12} /* key={index} */>
                  <Box
                    sx={{ backgroundColor: 'white', borderStyle: 'outset', borderRadius: '10px 10px 10px 10px', width: '100%', p: '5px' }}
                  >
                    <UploadButton setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions} selectedFile={selectedFile} idTransactionies={idTransactionies} setSelectedFile={setSelectedFile} option={1} nameButton={'Upload'} setIdTransactionies={setIdTransactionies}/>
                  </Box>
                </Grid>
                <Grid item xs={4} sm={8} md={12}>
                  <Box
                    sx={{ backgroundColor: 'white', borderStyle: 'outset', borderRadius: '10px 10px 10px 10px', width: '100%' }}
                  >
                    <Stack
                      direction='row'
                      justifyContent='center'
                      alignItems='center'
                      spacing={4}
                      style={{ padding: '10px' }}
                    >
                      <LoadingButton
                        style={{ backgroundColor: '#00A1E0', fontSize: '18px' }}
                        loading={loadingSave}
                        variant="contained"
                        onClick={saveMagento}
                      >
                        SAVE
                      </LoadingButton>
                      <LoadingButton
                        style={{ backgroundColor: '#00A1E0', fontSize: '18px' }}
                        loading={loadingDocket}
                        variant="contained"
                        onClick={() => invoceDocketMagento('2')}
                      >
                        INVOICE
                      </LoadingButton>
                      <LoadingButton
                        style={{ backgroundColor: '#00A1E0', fontSize: '18px' }}
                        loading={loadingDocket}
                        variant="contained"
                        onClick={() => invoceDocketMagento('1')}
                      >
                        DOCKET
                      </LoadingButton>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={4} sm={8} md={5} /* key={index} */>
          <Item>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 2, md: 1.5 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <Grid item xs={4} sm={8} md={12} /* key={index} */>
                  <Box
                    sx={{ borderRadius: '10px 10px 10px 10px', width: '100%' }}
                  >
                    <OrderInformationEmailSettings templateArray={templateArray} csrResultArray={csrResultArray} selectedFile={selectedFileEmail} setSelectedFile={setSelectedFileEmail} idTransactionies={idTransactioniesEmail} setIdTransactionies={setIdTransactioniesEmail} orderWebsite={orderWebsite} />
                  </Box>
                </Grid>
                <Grid item xs={4} sm={8} md={12} /* key={index} */>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0}
                  >
                    <Box
                      sx={{ width: '50%', height: '50%', backgroundColor: 'white', borderStyle: 'double', borderRadius: '5px'}}
                    >
                        <Box
                          className='ContainerImageCsr'
                        >
                          <div className='imageCsr'>
                            <img
                              src={ hidemImages }
                              alt=''
                              onError={handleImageError}
                            />
                          </div>
                          <div className='textIconCsr' onClick={handleOpenModalImage}>
                            <RemoveRedEyeIcon style={{ fontSize: '90px' }}/>
                          </div>
                        </Box>
                      
                    </Box>
                  </Stack>  
                </Grid>
              </Grid>    
            </Box>    
          </Item>
        </Grid>
      </Grid>
      <Alerts open={openAlerts} setOpen={setOpenAlerts} alertsOptions={alertsOptions} />
      <MagentoOrderInformationCrsModal
        arrayModalCsr={arrayModalCsr}
        hidemImages={hidemImages}
        setHidemImages={setHidemImages}
        handleCloseModal={handleCloseModal}
        openModal={openModal}  
      />
    </Box>
  )
}

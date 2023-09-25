import { useState, useContext, useRef } from 'react'
import { AuthContext } from '../../auth/context/AuthContext'
/* import Grid from '@mui/material/Unstable_Grid2' */
/* import Paper from '@mui/material/Paper' */
import { Stack, Button, Box, TextField, Typography, Grid, styled, Paper, Select, MenuItem, FormControl, IconButton } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import { OrderInformationCommentDocket, Alerts, UploadButton, SelectInput, ItemOrder, Modals, TableOrderInformationMagento, OrderInformationHistorialPayment, OrderInformationPayment, OrderInformationArraies, OrderInformationAddress, OrderInformationDie, Tiptap, ModalEmail } from '../components'
import EditIcon from '@mui/icons-material/Edit'
import { TextareaAutosize } from '@mui/base'
import { arrayCommutationTrue, arrayCommutationFalse, arrayCommutationTrueCancel, arrayCommutationFalseId, arrayCommutationFalseIdConfirmation } from '../../logic/functions'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import { apiRest } from '../../logic/constantes'
import Swal from 'sweetalert2'

/* import batman from '../../assets/heroes/dc-batman.jpg' */

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#433F3F' : '#433F3F',
  ...theme.typography.body2,
  padding: '10px 10px 0 10px',
}));

const ItemDos = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#DEDEDE',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
}));

const ItemTres = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#DEDEDE',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  width: '100%'
}));


export const OrderInformation = ({ formarSelects, setViewFile, orderWebsite, selectCommentTemplateDocket, dieResult, dataItemOrder, infoShippingResult, selectOrderInformation, shippingAddressArray, paymentInformation, historyOrder, csrResult, logEmailResult, setesArray, template, ordersCustomerResilt, infoBillingResult }) => {
  /* const [hideenEvento, setHideenEvento] = useState(true) */
  /* const [values, setValue] = useState('') */
  const [arrayItemOrder, setArrayItemOrder] = useState(dataItemOrder)
  const [arraySelectOrderInformation, setArraySelectOrderInformation] = useState(selectOrderInformation)
  const [arrayshippingAddressArray, setArrayshippingAddressArray] = useState(shippingAddressArray)
  const [paymentInformationResult] = useState(paymentInformation)
  const [historyOrderRender] = useState(historyOrder)
  const [setesArrayResult] = useState(setesArray)
  const [logEmailResultResult] = useState(logEmailResult)
  const [valorDataSelectCommentTemplate, setValorDataSelectCommentTemplate] = useState('')
  const [valorDataSelectDocketHeader, setValorDataSelectDocketHeader] = useState('')
  const [selectCommentTemplate, setSelectCommentTemplate] = useState(selectCommentTemplateDocket.commentTemplate)
  const [selectDocketHeader, setSelectDocketHeader] = useState(selectCommentTemplateDocket.docketHeader)
  const [setesArrayValue, setSetesArrayValue] = useState('')
  const [templateValor, setTemplateValor] = useState('')
  const [templateArray] = useState(template) 
  const [csrResultArray] = useState(csrResult) 
  const [orderCustomer] = useState(ordersCustomerResilt) 
  const [csrResultArrayValue, setCsrResultArrayValue] = useState('')
  const [backupAddress, setBackupAddress] = useState([])
  const [dieResultArray, setDieResultArray] = useState(dieResult)
  const [hidenAddress, setHidenAddress] = useState(false)
  const [open, setOpen] = useState(false);
  const [openAlerts, setOpenAlerts] = useState(false)
  const [alertsOptions, setAlertsOptions] = useState({})
  const [hidemEmail, setHidemEmail] = useState(true)
  const [hidemCommentTemplate, setHidemCommentTemplate] = useState(true)
  const [hidemDocketHeader, sethidemDocketHeader] = useState(true)
  const [valueEmailTemplate, setValueEmailTemplate] =useState('')
  const [alterTemplateData, setAlterTemplateData] =useState({})
  const [hidemImages, setHidemImages] = useState(`https://prestodemos.com/dsr/img/big/${orderWebsite.website}_${orderWebsite.order}.png`);
  const [saveStatusCancelArraySelectOrderInformation, setSaveStatusCancelArraySelectOrderInformation] = useState(selectOrderInformation)
  const [selectedFile, setSelectedFile] = useState([])
  const [openModalEmail, setOpenModalEmail] = useState(false)
  const [dataPreview, setDataPreview] = useState('')
  /* const [pdfContent, setPdfContent] = useState('') */
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleOpenModalEmail = () => setOpenModalEmail(true);
  const handleCloseModalEmail = () => setOpenModalEmail(false);
  const [loading, setLoading] = useState(false)
  const [loadingSave, setLoadingSave] = useState(false)
  const [loadingDocket, setloadingDocket] = useState(false)
  const [loadPreviewEmail, setLoadPreviewEmail] = useState(false)
  const inputRefCommentTemplate = useRef()
  const inputRef = useRef()
  const inputRefDocketHeader = useRef()
  const inputRefComment = useRef()
  const inputRefNameTemplate = useRef()
  const inputRefSubject = useRef()
  const inputRefSenderEmail = useRef()
  const inputRefPasswordEmail = useRef()
  const inputRefCC = useRef()
  const inputRefBCC = useRef()
  const inputRefCampaign = useRef()
  const inputRefTiptapValue = useRef()
  const inputRefNote = useRef()

  const { token, user } = useContext(AuthContext)

  const handelCancelEmail = () => {
    cleanInputsEmail()
    setHidemEmail(true)
  }

  const haidenSelectEventCommentTemplate = () => {
    setHidemCommentTemplate(false)
  }

  const checkValueCommentTemplate = () => {
    const arrayResult = [...selectCommentTemplate]
    arrayResult.push(inputRefCommentTemplate.current.value)
    setSelectCommentTemplate(arrayResult)
    setHidemCommentTemplate(true)
  }

  const haidenCancelCommentTemplate = () => {
    inputRefCommentTemplate.current.value = ''
    setHidemCommentTemplate(true)
  }

  const haidenSelectEventDocketHeader = () => {
    sethidemDocketHeader(false)
  }

  const checkValueDocketHeader = () => {
    const arrayResult = [...selectDocketHeader]
    arrayResult.push(inputRefDocketHeader.current.value)
    setSelectDocketHeader(arrayResult)
    sethidemDocketHeader(true)
  }

  const haidenCancelDocketHeader = () => {
    inputRefDocketHeader.current.value = ''
    sethidemDocketHeader(true)
  }

  
  const fetchCreateEmail = async (requestMagento) => {
    requestMagento.token = token
    requestMagento.option = 'saveTemplateEmail'
    requestMagento.controller = 'magento'  

    const requestOptions = {
      method: 'POST',
      /* headers: { 'Content-Type': 'application/json' }, */
      body: JSON.stringify(requestMagento)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        console.log(datas)
        const { type, message } = datas
        if (type === 'ok') {
          setAlertsOptions({
            types: 'success',
            message
          })
          setOpenAlerts(true)
          cleanInputsEmail()
          setHidemEmail(true)
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
  
  const saveTemmplateCreateEmail = () => {
    const dataTemplate = [
      {
        email_template__id_website: orderWebsite.website,
        email_template__name_template: inputRefNameTemplate.current.value,
        email_template__subject: inputRefSubject.current.value
      }
    ]
    const requestSaveTemplate = {
      idOption: '2',
      idwebsite: orderWebsite.website,
      idtemplate: templateValor,
      dataTemplate,
      email_template__email_body: formatEmailTemplateBody(inputRefTiptapValue.current.value),
      emailSender: inputRefSenderEmail.current.value,
      emailPsw: inputRefPasswordEmail.current.value,
      cc: inputRefCC.current.value,
      bcc: inputRefBCC.current.value,
      campaign: inputRefCampaign.current.value
    }
    setLoadingSave(true)
    fetchCreateEmail(requestSaveTemplate)
  }
  

  const handelAceptEmail = () => {
    setHidemEmail(false)
  }
  
  const fetchData = async (numero) => {
   
    const request = {
      token,
      id_website: setesArrayValue,
      email: inputRef.current.value,
      typePsw: numero
    }
    request.option = 'changePasswordCustomer'
    request.controller = 'magento'

    const requestOptions = {
      method: 'POST',
      /* headers: { 'Content-Type': 'application/json' }, */
      body: JSON.stringify(request)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { type, message } = datas
        if (type === 'ok') {
          setAlertsOptions({
            types: 'success',
            message
          })
          setOpenAlerts(true)
        }

        if (type === 'error') {
          setAlertsOptions({
            types: type,
            message
          })
          setOpenAlerts(true)
        }
         
        setLoading(false)
      })
      .catch(error => console.log(error))
  }

  const habdleClickChence = (numero) => {
    setLoading(true)
    fetchData(numero)
  }

  const handleChangeSites = (e) => {
    setSetesArrayValue(e.target.value)
  }

  const handleChangeTemplate = (e) => {
    setTemplateValor(e.target.value)
  }

  const handleChangeCsrResul = (e) => {
    setCsrResultArrayValue(e.target.value)
  }

  const handleChangeSelectCommentTemplate = (e) => {
    const valorComent = inputRefComment.current.value
    inputRefComment.current.value = `${valorComent} ${e.target.value}`
    setValorDataSelectCommentTemplate(e.target.value)
  }

  const handleChangeSelectDocketHeader = (e) => {
    setValorDataSelectDocketHeader(e.target.value)
  }

  const renderHTML = (renders) => {
    const render =  renders

    return <Box style={{ fontSize: '12px' }} dangerouslySetInnerHTML={{ __html: render }} />;
  }

  const haidenCancel = (id) => {
    const arrayResultSprid = [...saveStatusCancelArraySelectOrderInformation]
    const avent = true
    const arrayResult = arrayCommutationTrueCancel(id, arrayResultSprid, avent)
    setArraySelectOrderInformation(arrayResult)
  }

  const haidenCancelAddress = () => {
    const arrayResultSprid = [...backupAddress]
    setHidenAddress(false)
    setArrayshippingAddressArray(arrayResultSprid)  
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

  const haidenCancelItemOrdered = (id) => {
    const arrayResultSprid = [...arrayItemOrder]
    const avent = true
    const arrayResult = arrayCommutationTrue(id, arrayResultSprid, avent)
    setArrayItemOrder(arrayResult)
  }

  const haidenCancelDie = (id) => {
    const arrayResultSprid = [...dieResultArray]
    const avent = true
    const arrayResult = arrayCommutationTrue(id, arrayResultSprid, avent)
    setDieResultArray(arrayResult)
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

  const handleChange = (e, id) => {
    const arrayResultSprid = [...arrayItemOrder]
    const avent = false
    const valor = e.target.value
    const arrayResult = arrayCommutationFalseId(id, arrayResultSprid, avent, valor)
    setArrayItemOrder(arrayResult)
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

  const handleChangeDie = (e, id) => {
    const arrayResultSprid = [...dieResultArray]
    const avent = false
    const valor = e.target.value
    const arrayResult = arrayCommutationFalseId(id, arrayResultSprid, avent, valor)
    setDieResultArray(arrayResult)
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

  const OrderSelectInformation = (e, id, arrayResultSprid) => {
    const avent = false
    const valor = e.target.value
    const arrayResult = arrayCommutationFalseId(id, arrayResultSprid, avent, valor)
    setArraySelectOrderInformation(arrayResult)
  }

  const handleChangeOrder = (e, id) => {
    const arrayResultSprid = [...arraySelectOrderInformation]
    if (id === 10 && e.target.value === 'In-Store Pickup' && arrayResultSprid[4] !== '0000-00-00') {
      sweetalert2Function(e, id, arrayResultSprid)
    } else {
      OrderSelectInformation(e, id, arrayResultSprid)
    }
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

  const handleChangeOrderDate = (e, id) => {
    const arrayResultSprid = [...arraySelectOrderInformation]
    const avent = false
    const valor = farmatDate(e)
    const arrayResult = arrayCommutationFalseId(id, arrayResultSprid, avent, valor)
    setArraySelectOrderInformation(arrayResult)
  }

  const checkValue = (id) => {
    const arrayResultSprid = [...arrayItemOrder]
    const avent = true
    const arrayResult = arrayCommutationTrue(id, arrayResultSprid, avent)
    setArrayItemOrder(arrayResult)
  }

  const checkValueDie = (id) => {
    const arrayResultSprid = [...dieResultArray]
    const avent = true
    const arrayResult = arrayCommutationTrue(id, arrayResultSprid, avent)
    setDieResultArray(arrayResult)
  }

  const checkValueOrder = (id) => {
    const arrayResultSprid = [...arraySelectOrderInformation]
    const avent = true
    const arrayResult = arrayCommutationTrue(id, arrayResultSprid, avent)
    setSaveStatusCancelArraySelectOrderInformation(arrayResult)
    setArraySelectOrderInformation(arrayResult)
  }

  const haidenSelectEvent = (id) => {
    const arrayResultSprid = [...arrayItemOrder]
    const avent = false
    const arrayResult = arrayCommutationFalse(id, arrayResultSprid, avent)
    setArrayItemOrder(arrayResult)
  }

  const haidenSelectEventOrder = (id) => {
    const arrayResultSprid = [...arraySelectOrderInformation]
    const avent = false
    const arrayResult = arrayCommutationFalse(id, arrayResultSprid, avent)
    setArraySelectOrderInformation(arrayResult)
  }

  const haidenSelectEventDie = (id) => {
    const arrayResultSprid = [...dieResultArray]
    const avent = false
    const arrayResult = arrayCommutationFalse(id, arrayResultSprid, avent)
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
        const { type, message } = datas
        if (type === 'ok') {
          setAlertsOptions({
            types: 'success',
            message: 'Changes have been saved successfully'
          })
          setOpenAlerts(true)
          formarSelects(datas)
          setViewFile(false)
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

    try {
      const response = await fetch(apiRest, requestOptions);
      const blob = await response.blob();
    
       // Crear una URL del objeto Blob
      const url = URL.createObjectURL(blob)
       /* setPdfContent(url); */

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
    }
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
      dieTrackingNumberCarrier: mapSaveMagento(dieResultArrayResult),
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

  const handleMouseEnter = (order) => {
    setHidemImages(`https://prestodemos.com/dsr/img/big/${orderWebsite.website}_${order}.png`)
  }
  const handleMouseLeave = () => {
    setHidemImages(`https://prestodemos.com/dsr/img/big/${orderWebsite.website}_${orderWebsite.order}.png`)
  }

  const handleImageError = () => {
    setHidemImages(`https://prestodemos.com/dsr/img/big.png`);
  };

  const descomprimirBase64 = (base64String) => {
    var decodedString = atob(base64String);
    var decompressedString = decodeURIComponent(escape(decodedString));
    return decompressedString;
  }

  const transicionDataMap = (data) => {
    
    const { bcc, campaign, cc, dataTemplate, emailPsw, emailSender } = data
    const [cero] = dataTemplate
    
    setAlterTemplateData({
      NameTemplate: cero.email_template__name_template,
      Subject: cero.email_template__subject,
      SenderEmail: emailSender,
      PasswordEmail: emailPsw,
      CC: cc,
      BCC: bcc,
      Campaign: campaign
    })

    setValueEmailTemplate(descomprimirBase64(cero.email_template__email_body))
  }

  const fetchDataTemplate = async (requestMagento) => {
    requestMagento.token = token
    requestMagento.option = 'alterTemplateEmail'
    requestMagento.controller = 'magento'  

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
          setHidemEmail(false)
          transicionDataMap(datas)
          //setOpenAlerts(true)
          /* formarSelects(datas)
          setViewFile(false) */
        }

        if (type === 'error') {
          setAlertsOptions({
            types: type,
            message
          })
          setOpenAlerts(true)
        } 
        //setLoadingSave(false)
      
      })
      .catch(error => console.log(error))
  }

  const handelAlterTemplate = () => {
    if (!templateValor) {
      setAlertsOptions({
        types: 'error',
        message: 'The email template cannot be empty'
      })
      setOpenAlerts(true)
      return
    }

    const requestMagento = {
      idwebsite: orderWebsite.website,
      idtemplate: templateValor
    }

    fetchDataTemplate(requestMagento)
  }

  const cleanInputsEmail = () => {
    inputRefNameTemplate.current.value = ''
    inputRefSubject.current.value = ''
    inputRefSenderEmail.current.value = ''
    inputRefPasswordEmail.current.value = ''
    inputRefCC.current.value = ''
    inputRefBCC.current.value = ''
    inputRefCampaign.current.value = ''
    setValueEmailTemplate('')
    inputRefTiptapValue.current.value = ''

    setAlterTemplateData({
      NameTemplate: '',
      Subject: '',
      SenderEmail: '',
      PasswordEmail: '',
      CC: '',
      BCC: '',
      Campaign: ''
    })
  }

  const fetchSaveTemplate = async (requestMagento) => {
    requestMagento.token = token
    requestMagento.option = 'saveTemplateEmail'
    requestMagento.controller = 'magento'  

    const requestOptions = {
      method: 'POST',
      /* headers: { 'Content-Type': 'application/json' }, */
      body: JSON.stringify(requestMagento)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        console.log(datas)
        const { type, message } = datas
        if (type === 'ok') {
          setAlertsOptions({
            types: 'success',
            message
          })
          setOpenAlerts(true)
          cleanInputsEmail()
          setHidemEmail(true)
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

  const formatEmailTemplateBody = (texto) => {
    const encodedText = encodeURIComponent(texto)
    const base64 = btoa(encodedText)
    console.log()
    return base64
  }

  const saveTemplate = () => {
    if (alterTemplateData.NameTemplate.length === 0) {
      saveTemmplateCreateEmail()
      return
    }
    const dataTemplate = [
      {
        email_template__id_template: templateValor,
        email_template__id_website: orderWebsite.website,
        email_template__name_template: inputRefNameTemplate.current.value,
        email_template__subject: inputRefSubject.current.value
      }
    ]
    const requestSaveTemplate = {
      idOption: '1',
      idwebsite: orderWebsite.website,
      idtemplate: templateValor,
      dataTemplate,
      email_template__email_body: formatEmailTemplateBody(inputRefTiptapValue.current.value),
      emailSender: inputRefSenderEmail.current.value,
      emailPsw: inputRefPasswordEmail.current.value,
      cc: inputRefCC.current.value,
      bcc: inputRefBCC.current.value,
      campaign: inputRefCampaign.current.value
    }
    setLoadingSave(true)
    fetchSaveTemplate(requestSaveTemplate)
  }

  const formartPreviewEmail = (data) => {
    const result = descomprimirBase64(data)
    console.log(result, 'resultresultresultresultresultresult')
    setDataPreview(result)
  }

  const fetchPreviewEmail = async (requestMagento) => {
    requestMagento.token = token
    requestMagento.option = 'sendEmailMagento'
    requestMagento.controller = 'email'  
    console.log(requestMagento, 'requestMagentorequestMagento') 
    const requestOptions = {
      method: 'POST',
      /* headers: { 'Content-Type': 'application/json' }, */
      body: JSON.stringify(requestMagento)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        //const data = JSON.parse(datas)
        const { type, message, data } = datas
        if (type === 'ok') {
          formartPreviewEmail(data)
          handleOpenModalEmail()
          /* setAlertsOptions({
            types: 'success',
            message
          }) */
          /* setOpenAlerts(true) */
          inputRefNote.current.value = ''
        }

        if (type === 'error') {
          setAlertsOptions({
            types: type,
            message
          })
          setOpenAlerts(true)
        } 
        setLoadPreviewEmail(false)
      
      })
      .catch(error => console.log(error))
  }

  const handelPreviewEmail = () => {
    const nameFilesResult = [...selectedFile]
    const nameFiles = nameFilesResult.map((file) => {
      return {
        name: file.name
      }
    })
    const requestPreviewEmail = {
      idWebsite: orderWebsite.website,
      mg_order: orderWebsite.order,
      idCsr: csrResultArrayValue,
      idTemplate: templateValor,
      snUploadFiles: nameFiles.length.toString(),
      nameFiles,
      note: inputRefNote.current.value,
      idOption:'2'
    }
    fetchPreviewEmail(requestPreviewEmail)
    setLoadPreviewEmail(true)
  }

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid xs={3}>
          <Item>
            <ItemOrder  arrayItemOrder={arrayItemOrder} haidenSelectEvent={haidenSelectEvent} handleChange={handleChange} haidenCancelItemOrdered={haidenCancelItemOrdered} checkValue={checkValue}/>
          </Item>
        </Grid>
        <Grid xs={9}>
          <Item>
            <Typography variant='h6' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white' }}>
              Order Information {orderWebsite.order} WSPF
            </Typography>
            <Box sx={{ width: '100%', height: '100vh', overflow: 'auto', backgroundColor: '#DEDEDE' }}>
              <Grid container spacing={0}>
                <Grid sm={7}>
                  <ItemDos>
                    <Box sx={{ width: '100%', borderStyle: 'outset', borderRadius: '10px', backgroundColor: 'white' }}>
                      <OrderInformationArraies arraySelectOrderInformation={arraySelectOrderInformation} haidenSelectEventOrder={haidenSelectEventOrder} handleChangeOrderDate={handleChangeOrderDate} handleChangeOrder={handleChangeOrder} haidenCancel={haidenCancel} checkValueOrder={checkValueOrder} />
                    </Box>
                    <Box sx={{ width: '100%', backgroundColor: '#DEDEDE' }}>
                      <Grid
                        container
                        spacing={0}          
                      >
                        <Grid
                          xs={6}
                        >
                          <OrderInformationAddress checkValueAddress={checkValueAddress} haidenCancelAddress={haidenCancelAddress} arrayshippingAddressArray={arrayshippingAddressArray} haidenSelectEventAddress={haidenSelectEventAddress} handleChangeAddress={handleChangeAddress} hidenAddress={hidenAddress} />
                          <OrderInformationDie dieResultArray={dieResultArray} haidenSelectEventDie={haidenSelectEventDie} handleChangeDie={handleChangeDie} haidenCancelDie={haidenCancelDie} checkValueDie={checkValueDie} />
                        </Grid>
                        <Grid
                          xs={6}
                        >
                          <OrderInformationPayment paymentInformationResult={paymentInformationResult} />
                          <OrderInformationHistorialPayment historyOrderRender={historyOrderRender} renderHTML={renderHTML}/>
                        </Grid>
                        <Stack
                          direction='row'
                          justifyContent='flex-start'
                          alignItems='flex-start'
                          spacing={4}
                          style={{ width: '100%', borderStyle: 'outset', borderRadius: '10px', padding: '10px 10px 20px 10px', backgroundColor: 'white' }}
                        >
                          <Grid xs={12}>
                            <Stack
                              direction='row'
                              justifyContent='flex-start'
                              alignItems='center'
                              spacing={1}
                            >
                              <Typography variant='h6'>
                                Comment Template
                              </Typography>
                              {hidemCommentTemplate
                              ? <IconButton sx={{ color: 'red' }} aria-label='upload picture' component='label' onClick={haidenSelectEventCommentTemplate}><EditIcon style={{ fontSize: '15px' }}/></IconButton>
                              : ''}
                            </Stack>
                            {hidemCommentTemplate
                            ? <FormControl variant='standard' fullWidth>
                                <Select
                                  labelId='demo-simple-select-standard-label'
                                  id='demo-simple-select-standard'
                                  value={valorDataSelectCommentTemplate}
                                  onChange={handleChangeSelectCommentTemplate}
                                  label='Status'
                                >
                                  {selectCommentTemplate.map((da) => (
                                    <MenuItem key={da} value={da}>{da}</MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            : <OrderInformationCommentDocket inputRef={inputRefCommentTemplate} checkValueCommentTemplate={checkValueCommentTemplate} haidenCancelCommentTemplate={haidenCancelCommentTemplate} />}
                          </Grid>
                          <Grid xs={12}>
                            <Stack
                              direction='row'
                              justifyContent='flex-start'
                              alignItems='center'
                              spacing={1}
                            >
                              <Typography variant='h6'>
                                Docket Header
                              </Typography>
                              {hidemDocketHeader
                              ? <IconButton sx={{ color: 'red' }} aria-label='upload picture' component='label' onClick={haidenSelectEventDocketHeader}><EditIcon style={{ fontSize: '15px' }}/></IconButton>
                              : ''}
                            </Stack>
                            {hidemDocketHeader
                            ? <FormControl variant='standard' fullWidth>
                                <Select
                                  labelId='demo-simple-select-standard-label'
                                  id='demo-simple-select-standard'
                                  value={valorDataSelectDocketHeader}
                                  onChange={handleChangeSelectDocketHeader}
                                  label='Status'
                                >
                                  {selectDocketHeader.map((da) => (
                                    <MenuItem key={da} value={da}>{da}</MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            : <OrderInformationCommentDocket inputRef={inputRefDocketHeader} checkValueCommentTemplate={checkValueDocketHeader} haidenCancelCommentTemplate={haidenCancelDocketHeader} />}
                          </Grid>  
                        </Stack>
                        <Stack
                          direction='column'
                          justifyContent='flex-start'
                          alignItems='flex-start'
                          spacing={0}
                          style={{ width: '100%', borderStyle: 'outset', borderRadius: '10px', padding: '10px', backgroundColor: 'white' }}
                        >
                          <Typography variant='h6'>
                            Comment
                          </Typography>  
                          <TextareaAutosize
                            aria-label='minimum height'
                            minRows={4}
                            defaultValue={selectCommentTemplateDocket.comment}
                            style={{ width: '100%', height: '90px', borderRadius: '5px' }}
                            ref={inputRefComment}
                          />
                        </Stack>
                        <Stack
                          direction='column'
                          justifyContent='flex-start'
                          alignItems='flex-start'
                          spacing={0}
                          style={{ width: '100%', height: 'auto', borderStyle: 'outset', borderRadius: '10px', padding: '10px', backgroundColor: 'white' }}
                        >
                          <UploadButton />
                        </Stack>
                        <Box style={{ width: '100%' }}>
                          <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                          >
                            
                              <Box sx={{ width: '100%', height: '313px', backgroundColor: 'white', borderStyle: 'double', borderRadius: '5px',}}>
                                <img
                                  src={ hidemImages }
                                  alt=""
                                  style={{ width: '100%', height: '100%' }}
                                  onError={handleImageError}
                                />
                              </Box>
                            
                            
                              <Box sx={{ width: '100%', height: '313px', backgroundColor: '#DFDFDF', overflow: 'auto', borderStyle: 'outset', borderRadius: '10px 10px 0 0' }}>
                                <Typography variant='h6' align='center' sx={{ width: '100%', backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', fontSize: '15px' }}>
                                  Item Ordered
                                </Typography>
                                <Stack
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  spacing={0}
                                >
                                  {orderCustomer.map((order, index) => (
                                    <Box key={order.increment_id} style={{ backgroundColor: index % 2 === 0 ? '#828282' : '#DFDFDF', width: '100%', height: '45px', textAlign: 'center', paddingTop: '3px' }} >
                                      <Button
                                        style={{ backgroundColor: '#00A1E0' }} 
                                        variant='contained'
                                        startIcon={<FindInPageIcon />}
                                        onMouseEnter={() => handleMouseEnter(order.increment_id)}
                                        onMouseLeave={handleMouseLeave}
                                      >
                                        {order.increment_id}
                                      </Button>
                                    </Box>
                                  ))}
                                </Stack>
                              </Box>
                                 
                          </Stack>
                        </Box>
                        <Stack
                          direction='row'
                          justifyContent='center'
                          alignItems='center'
                          spacing={1}
                          style={{ width: '100%', height: '100px', borderStyle: 'outset', borderRadius: '10px', padding: '10px', backgroundColor: 'white' }}
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
                      </Grid>
                    </Box>
                  </ItemDos>
                </Grid>
                <Grid sm={5}>
                  <ItemTres>
                    <Grid sm={12}>
                      <Box style={{ backgroundColor: 'white', borderRadius: '10px', borderStyle: 'outset' }}>
                        <Typography variant='h6' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white' }}>
                          Change Customer Password
                        </Typography>
                        <Box style={{ padding: '20px 20px 0 20px' }}>
                          <Stack
                            direction='column'
                            justifyContent='flex-start'
                            alignItems='flex-start'
                            spacing={0.5}
                          >
                            <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
                              Sites
                            </Typography>
                            <SelectInput age={setesArrayValue} handleChange={handleChangeSites} valorData={setesArrayResult} />
                            <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
                              Email
                            </Typography>
                            <TextField fullWidth id="standard-basic" variant="standard" inputRef={inputRef} name='Change' />
                          </Stack>
                          <Stack
                            direction='row'
                            justifyContent='center'
                            alignItems='center'
                            spacing={2}
                            sx={{ display: { lg: 'flex', md: 'none' }, margin: '30px' }}
                          >
                            <LoadingButton
                              style={{ backgroundColor: '#00A1E0' }}
                              loading={loading}
                              variant="contained"
                              onClick={() => habdleClickChence(1)}
                            >
                              Chence Password
                            </LoadingButton>
                            <LoadingButton
                              style={{ backgroundColor: '#00A1E0' }}
                              loading={loading}
                              variant="contained"
                              onClick={() => habdleClickChence(2)}
                            >
                              Login Customer
                            </LoadingButton>
                          </Stack>
                          <Stack
                            direction='row'
                            justifyContent='center'
                            alignItems='center'
                            spacing={2}
                            sx={{display: { md: 'flex', lg: 'none' }, margin: '30px' }}
                          >
                            <Button variant='contained' style={{ backgroundColor: '#00A1E0', fontSize: '10px' }} onClick={() => habdleClickChence(1)}>
                              Chence Password
                            </Button>
                            <Button variant='contained' style={{ backgroundColor: '#00A1E0', fontSize: '10px' }} onClick={() => habdleClickChence(2)}>
                              Login Customer
                            </Button>
                          </Stack>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid sm={12}>
                      <Box style={{ backgroundColor: 'white', borderRadius: '10px', paddingBottom: '5px', borderStyle: 'outset' }}>
                        <Typography variant='h6' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white' }}>
                          Account information
                        </Typography>
                        <Box style={{ padding: '20px 20px 0 20px' }}>
                          <Stack
                            direction='column'
                            justifyContent='flex-start'
                            alignItems='flex-start'
                            spacing={0}
                            style={{ width: '100%' }}
                          >
                            <Stack
                              direction='row'
                              justifyContent='flex-start'
                              alignItems='flex-start'
                              spacing={0.5}
                              sx={{ display: { lg: 'flex', md: 'none' } }}
                            >
                              <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                Customer Name:
                              </Typography>
                              <Typography variant='string' style={{ fontSize: '15px' }}>
                                {infoBillingResult.firstname} {infoBillingResult.lastname}
                              </Typography>
                            </Stack>
                            <Stack
                              direction='column'
                              justifyContent='flex-start'
                              alignItems='flex-start'
                              spacing={0.5}
                              sx={{ display: { md: 'flex', lg: 'none' } }}
                            >
                              <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                Customer Name:
                              </Typography>
                              <Typography variant='string' style={{ fontSize: '15px' }}>
                                {infoBillingResult.firstname} {infoBillingResult.lastname}
                              </Typography>
                            </Stack>
                            <Stack
                              direction='row'
                              justifyContent='flex-start'
                              alignItems='flex-start'
                              spacing={0.5}
                              sx={{ display: { lg: 'flex', md: 'none' } }}
                            >
                              <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                Email:
                              </Typography>
                              <Typography variant='string' style={{ fontSize: '15px' }}>
                                {infoBillingResult.email}
                              </Typography>
                            </Stack>
                            <Stack
                              direction='column'
                              justifyContent='flex-start'
                              alignItems='flex-start'
                              spacing={0.5}
                              sx={{ display: { md: 'flex', lg: 'none' } }}
                            >
                              <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                Email:
                              </Typography>
                              <Typography variant='string' style={{ fontSize: '15px' }}>
                                {infoBillingResult.email}
                              </Typography>
                            </Stack>
                          </Stack>
                          <Stack
                            direction='row'
                            justifyContent='center'
                            alignItems='center'
                            spacing={2}
                            sx={{ display: { lg: 'flex', md: 'none' }, margin: '30px' }}
                          >
                            <Button variant='contained' style={{ backgroundColor: '#00A1E0' }} onClick={handleOpen}>
                              More Information
                            </Button>
                          </Stack>
                          <Stack
                            direction='row'
                            justifyContent='center'
                            alignItems='center'
                            spacing={2}
                            sx={{ display: { md: 'flex', lg: 'none' }, margin: '30px' }}
                          >
                            <Button variant='contained' style={{ backgroundColor: '#00A1E0', fontSize: '10px' }} onClick={handleOpen}>
                              More Information
                            </Button>
                          </Stack>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid sm={12}>
                      {hidemEmail
                      ?
                        <Box style={{ backgroundColor: 'white', borderRadius: '10px', borderStyle: 'outset' }}>
                          <Typography variant='h6' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white' }}>
                            Emmail Settings
                          </Typography>
                          <Box style={{ padding: '20px 20px 0 20px' }}>
                            <Stack
                              direction='column'
                              justifyContent='flex-start'
                              alignItems='flex-start'
                              spacing={0.5}
                            >
                              <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                Email Template
                              </Typography>
                              <SelectInput age={templateValor} handleChange={handleChangeTemplate} valorData={templateArray} />
                              <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                CSR
                              </Typography>
                              <SelectInput age={csrResultArrayValue} handleChange={handleChangeCsrResul} valorData={csrResultArray} />
                            </Stack>
                            <Stack
                              direction='column'
                              justifyContent='space-evenly'
                              alignItems='flex-start'
                              spacing={0.5}
                            >
                              <Stack
                                direction='column'
                                justifyContent='flex-start'
                                alignItems='flex-start'
                                spacing={0.5}
                                style={{ width: '100%' }}
                              >
                                <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                  NOTE
                                </Typography>
                                <TextareaAutosize
                                  aria-label='minimum height'
                                  minRows={3}
                                  style={{ width: '100%', borderRadius: '5px' }}
                                  ref={inputRefNote}
                                />
                              </Stack>
                              <Stack
                                direction='column'
                                justifyContent='flex-start'
                                alignItems='flex-start'
                                spacing={0.5}
                                style={{ width: '100%' }}
                              >
                                <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                  CC
                                </Typography>
                                <TextareaAutosize
                                  aria-label='minimum height'
                                  minRows={3}
                                  style={{ width: '100%', borderRadius: '5px' }}
                                />
                              </Stack>
                              <Stack
                                direction='column'
                                justifyContent='flex-start'
                                alignItems='flex-start'
                                spacing={0.5}
                                style={{ width: '100%' }}
                              >
                                <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                  BCC
                                </Typography>
                                <TextareaAutosize
                                  aria-label='minimum height'
                                  minRows={3}
                                  style={{ width: '100%', borderRadius: '5px' }}
                                />
                              </Stack>
                              <Stack
                                direction='column'
                                justifyContent='flex-start'
                                alignItems='flex-start'
                                spacing={0.5}
                                style={{ width: '100%' }}
                              >
                                <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                  Campaign
                                </Typography>
                                <TextareaAutosize
                                  aria-label='minimum height'
                                  minRows={3}
                                  style={{ width: '100%', borderRadius: '5px' }}
                                />
                              </Stack>
                            </Stack>
                          </Box>
                          <Typography variant='h6' style={{ marginTop: '20px', paddingLeft: '20px' }}>
                            Log Email Sended
                          </Typography>
                          <Box sx={{ height: '400px' }}>
                            <TableOrderInformationMagento logEmailResultResult={logEmailResultResult}/>
                          </Box>
                          <UploadButton selectedFile={selectedFile} setSelectedFile={setSelectedFile}/>
                          <Stack
                            direction='row'
                            justifyContent='center'
                            alignItems='center'
                            spacing={1}
                            sx={{ display: { lg: 'flex', md: 'none' }, margin: '20px' }}
                          >
                            <Button variant='contained' style={{ backgroundColor: '#00A1E0', fontSize: '12px' }} onClick={handelAceptEmail}>
                              CREATE TEMPLATE
                            </Button>
                            <Button variant='contained' style={{ backgroundColor: '#00A1E0', fontSize: '12px' }} onClick={handelAlterTemplate}>
                              ALTER TEMPLATE
                            </Button>
                            <LoadingButton
                              style={{ backgroundColor: '#00A1E0', fontSize: '12px' }}
                              loading={loadPreviewEmail}
                              variant="contained"
                              onClick={handelPreviewEmail}
                            >
                              PREVIEW EMAIL
                            </LoadingButton>
                            <Button variant='contained' style={{ backgroundColor: '#00A1E0', fontSize: '12px' }} onClick={handelAceptEmail}>
                              SEND EMAIL
                            </Button>
                          </Stack>
                          <Stack
                            direction='column'
                            justifyContent='center'
                            alignItems='center'
                            spacing={1}
                            sx={{ display: { md: 'flex', lg: 'none' }, marginTop: '20px', marginBottom: '20px' }}
                          >
                            <Button variant='contained' style={{ backgroundColor: '#00A1E0', fontSize: '12px', width: 200 }} onClick={handelAceptEmail}>
                              CREATE TEMPLATE
                            </Button>
                            <Button variant='contained' style={{ backgroundColor: '#00A1E0', fontSize: '12px', width: 200 }} onClick={handelAlterTemplate}>
                              ALTER TEMPLATE
                            </Button>
                            <Button variant='contained' style={{ backgroundColor: '#00A1E0', fontSize: '12px', width: 200 }} onClick={handelAceptEmail}>
                              PREVIEW EMAIL
                            </Button>
                            <Button variant='contained' style={{ backgroundColor: '#00A1E0', fontSize: '12px', width: 200 }} onClick={handelAceptEmail}>
                              SEND EMAIL
                            </Button>
                          </Stack>
                        </Box>
                      :
                        <Box style={{ backgroundColor: '#DFDFDF', borderRadius: '10px', borderStyle: 'outset' }}>
                          <Typography variant='h6' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white' }}>
                            Emmail Template
                          </Typography>
                          <Box
                            style={{ padding: '20px 20px 0 20px' }}
                          >
                            <Stack
                              direction='column'
                              justifyContent='flex-start'
                              alignItems='flex-start'
                              spacing={0.5}
                            >
                              <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                Name Template
                              </Typography>
                              <TextField fullWidth id="stan" variant="standard" inputRef={inputRefNameTemplate} name='inputRefNameTemplate' defaultValue={alterTemplateData.NameTemplate} />
                              <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                Subject
                              </Typography>
                              <TextField fullWidth id="standard-basic" variant="standard" inputRef={inputRefSubject} name='inputRefSubject' defaultValue={alterTemplateData.Subject}/>
                              <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                Sender Email
                              </Typography>
                              <TextField fullWidth id="standard-basic" variant="standard" inputRef={inputRefSenderEmail} name='inputRefSenderEmail' defaultValue={alterTemplateData.SenderEmail}/>
                              <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                Password Email
                              </Typography>
                              <TextField fullWidth id="standard-basic" variant="standard" inputRef={inputRefPasswordEmail} name='inputRefPasswordEmail' defaultValue={alterTemplateData.PasswordEmail}/>
                              <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                CC
                              </Typography>
                              <TextField fullWidth id="standard-basic" variant="standard" inputRef={inputRefCC} name='inputRefCC' defaultValue={alterTemplateData.CC}/>
                              <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                BCC
                              </Typography>
                              <TextField fullWidth id="standard-basic" variant="standard" inputRef={inputRefBCC} name='inputRefBCC' defaultValue={alterTemplateData.BCC}/>
                              <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                Campaign
                              </Typography>
                              <TextField fullWidth id="standard-basic" variant="standard" inputRef={inputRefCampaign} name='inputRefCampaign' defaultValue={alterTemplateData.Campaign}/>
                            </Stack>
                            <Typography variant='h6' style={{ marginTop: '20px' }}>
                              Email Template Text
                            </Typography>
                            <Box sx={{ width: '100%', height: '400px', borderStyle: 'outset', borderRadius: '10px' }}>
                              <Tiptap valueEmailTemplate={valueEmailTemplate} inputRefTiptapValue={inputRefTiptapValue}/>
                            </Box>
                            <Stack
                              direction='row'
                              justifyContent='center'
                              alignItems='center'
                              spacing={2}
                              sx={{ display: { lg: 'flex', md: 'none' }, margin: '30px' }}
                            >
                              <LoadingButton
                                style={{ backgroundColor: '#00A1E0' }}
                                loading={loadingSave}
                                variant="contained"
                                onClick={saveTemplate}
                              >
                                Save template
                              </LoadingButton>
                              <Button variant='contained' style={{ backgroundColor: '#00A1E0' }} onClick={handelCancelEmail}>
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
                              <Button variant='contained' style={{ backgroundColor: '#00A1E0', fontSize: '10px' }} >
                                Save template
                              </Button>
                              <Button variant='contained' style={{ backgroundColor: '#00A1E0', fontSize: '10px' }} onClick={handelCancelEmail}>
                                Cancel
                              </Button>
                            </Stack>  
                          </Box>
                        </Box>
                      }
                    </Grid>
                  </ItemTres>
                </Grid>
              </Grid>
            </Box>
          </Item>
        </Grid>
      </Grid>
      <Modals open={open} handleClose={handleClose} infoBillingResult={infoBillingResult} infoShippingResult={infoShippingResult}/>
      <ModalEmail openModalEmail={openModalEmail} handleCloseModalEmail={handleCloseModalEmail} dataPreview={dataPreview} renderHTML={renderHTML}/>
      <Alerts open={openAlerts} setOpen={setOpenAlerts} alertsOptions={alertsOptions} />
    </Box>
  )
}

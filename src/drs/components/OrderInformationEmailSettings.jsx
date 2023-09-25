import { useState, useContext, useRef, useEffect } from 'react'
import { AuthContext } from '../../auth/context/AuthContext'
import { Stack, Typography, Box, Button, TextField } from '@mui/material'
import { UploadButton, SelectInput, Tiptap, Alerts, ModalEmail } from '../components'
import LoadingButton from '@mui/lab/LoadingButton'
import { TextareaAutosize } from '@mui/base'
import { apiRest } from '../../logic/constantes'

export const OrderInformationEmailSettings = ({templateArray, csrResultArray, selectedFile, setSelectedFile, orderWebsite, idTransactionies, setIdTransactionies }) => {

  const [hidemEmail, setHidemEmail] = useState(true)

  const [templateValor, setTemplateValor] = useState('')
  const [csrResultArrayValue, setCsrResultArrayValue] = useState('')
  const [alertsOptions, setAlertsOptions] = useState({})
  const [openAlerts, setOpenAlerts] = useState(false)
  const [alterTemplateData, setAlterTemplateData] =useState({})
  const [loadPreviewEmail, setLoadPreviewEmail] = useState(false)
  const [loadSendEmail, setLoadSendEmail] = useState(false)
  const [dataPreview, setDataPreview] = useState('')
  const [valueEmailTemplate, setValueEmailTemplate] =useState('')
  const [loadingSave, setLoadingSave] = useState(false)
  const [openModalEmail, setOpenModalEmail] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [emailCC, setEmailCC] = useState('')
  
  
  const inputRefNameTemplate = useRef()
  const inputRefSubject = useRef()
  const inputRefSenderEmail = useRef()
  const inputRefPasswordEmail = useRef()
  const inputRefCC = useRef()
  const inputRefBCC = useRef()
  const inputRefCampaign = useRef()
  const inputRefTiptapValue = useRef()
  const inputRefNote = useRef()
  //const inputRefEmailCC = useRef()

  const { token } = useContext(AuthContext)

  useEffect(() => {
    if (orderWebsite) {
      setUserEmail(orderWebsite.userEmail)
      setEmailCC(orderWebsite.websiteCC)
    }
  }, [orderWebsite]);

  const chanceEmailCC = (e) => {
    ///const patronCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    //const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    //const patronCorreoN = /^[^()<>@,;:"[\]ç%&]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const forbiddenChars = /[()<>,;:"[\]ç%&]/;
    if (forbiddenChars.test(e.nativeEvent.data)) {
      return
    }
    
    let stringResultEmailCC = emailCC

    if (e.nativeEvent.data === ' ') {
      
      let string = e.target.value.trimEnd();
      
      let lastCharacter = string[string.length - 1];

      if (lastCharacter === ';') {
        return
      }
      
      stringResultEmailCC += `; `
      setEmailCC(stringResultEmailCC)
      return
    }
    setEmailCC(e.target.value)
  }

  const chanceUseremail = (e) => {
    setUserEmail(e.target.value)
  }

  const renderHTML = (renders) => {
    const render =  renders

    return <Box style={{ fontSize: '12px' }} dangerouslySetInnerHTML={{ __html: render }} />;
  }


  const handleChangeCsrResul = (e) => {
    setCsrResultArrayValue(e.target.value)
  }

  const handleChangeTemplate = (e) => {
    setTemplateValor(e.target.value)
  }

  const handelAceptEmail = () => {
    setAlterTemplateData({
      NameTemplate: '',
      Subject: '',
      SenderEmail: orderWebsite.websiteSender,
      PasswordEmail: orderWebsite.websitePassword,
      CC: orderWebsite.websiteCC,
      BCC: orderWebsite.websiteBCC,
      Campaign: orderWebsite.websiteCampaign
    })
    setHidemEmail(false)
  }

  const handleOpenModalEmail = () => setOpenModalEmail(true);
  const handleCloseModalEmail = () => setOpenModalEmail(false);

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

  const formartPreviewEmail = (data) => {
    const result = descomprimirBase64(data)
    setDataPreview(result)
  }

  const clearEmail = () => {
    setTemplateValor('')
    setCsrResultArrayValue('')
    inputRefNote.current.value = ''
    setSelectedFile([])
    setIdTransactionies('')
  }

  const fetchPreviewEmail = async (requestMagento) => {
    requestMagento.token = token
    requestMagento.option = 'sendEmailMagento'
    requestMagento.controller = 'email'
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
          if (message) {
            //location.reload();
            setAlertsOptions({
              types: 'success',
              message
            })
            setOpenAlerts(true)
            setLoadSendEmail(false)
            clearEmail()
            //setSelectedFile([])
            return
          }
          formartPreviewEmail(data)
          handleOpenModalEmail()
          /* setAlertsOptions({
            types: 'success',
            message
          }) */
          /* setOpenAlerts(true) */
          //inputRefNote.current.value = ''
        }

        if (type === 'error') {
          setAlertsOptions({
            types: type,
            message
          })
          setOpenAlerts(true)
          setLoadSendEmail(false)
        } 
        setLoadPreviewEmail(false)
      
      })
      .catch(error => console.log(error))
  }

  const formarEmailCCT = (text) => {
    let elminarEspacios = text.replace(/\s/g, '')
    let ultimaLetra = elminarEspacios.charAt(elminarEspacios.length - 1)
    if (ultimaLetra === ';') {
      return elminarEspacios.slice(0, -1)
    }
    return elminarEspacios
  }

  const validateEmails = (text) => {
    const arrayEmails = text.split(';');
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return arrayEmails.find(item => regex.test(item) === false)
  }

  const handelPreviewEmail = (idT) => {

    const requestPreviewEmail = {
      idWebsite: orderWebsite.website,
      mg_order: orderWebsite.order,
      idCsr: csrResultArrayValue,
      idTemplate: templateValor,
      note: inputRefNote.current.value,
      cc: formarEmailCCT(emailCC),
      mailto: userEmail,
      idOption: idT,
      idTransaction: idTransactionies
    }

    const validate = validateEmails(formarEmailCCT(emailCC))

    if (validate !== undefined) {
      setAlertsOptions({
        types: 'error',
        message: `the email: "${validate}" is not valid`
      })
      setOpenAlerts(true)
      return
    }
    fetchPreviewEmail(requestPreviewEmail)

    if (idT === '1') {
      setLoadSendEmail(true)
    } else {
      setLoadPreviewEmail(true)
    }

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
      .catch(error => {
        setAlertsOptions({
          types: 'error',
          message: error
        })
        setOpenAlerts(true)
        setLoadingSave(false)
        console.log(error)
      })
  }

  const saveTemmplateCreateEmail = () => {
    const dataTemplate = [
      {
        email_template__id_website: orderWebsite.website,
        email_template__name_template: inputRefNameTemplate.current.value,
        email_template__subject: inputRefSubject.current.value,
        email_template__email_body: formatEmailTemplateBody(inputRefTiptapValue.current.value),
      }
    ]
    const requestSaveTemplate = {
      idOption: '2',
      idwebsite: orderWebsite.website,
      idtemplate: templateValor,
      dataTemplate,
      emailSender: inputRefSenderEmail.current.value,
      emailPsw: inputRefPasswordEmail.current.value,
      cc: inputRefCC.current.value,
      bcc: inputRefBCC.current.value,
      campaign: inputRefCampaign.current.value
    }
    setLoadingSave(true)
    fetchCreateEmail(requestSaveTemplate)
  }

  const formatEmailTemplateBody = (texto) => {
    //const encodedText = encodeURIComponent(texto)
    const base64 = btoa(texto)
    return base64
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

  const handelCancelEmail = () => {
    cleanInputsEmail()
    setHidemEmail(true)
  }

  const saveTemplate = () => {
    if (alterTemplateData.NameTemplate.length === 0) {
      saveTemmplateCreateEmail()
      return
    }
    //console.log('si')
    const dataTemplate = [
      {
        email_template__id_template: templateValor,
        email_template__id_website: orderWebsite.website,
        email_template__name_template: inputRefNameTemplate.current.value,
        email_template__subject: inputRefSubject.current.value,
        email_template__email_body: formatEmailTemplateBody(inputRefTiptapValue.current.value),
      }
    ]
    const requestSaveTemplate = {
      idOption: '1',
      idwebsite: orderWebsite.website,
      idtemplate: templateValor,
      dataTemplate,
      emailSender: inputRefSenderEmail.current.value,
      emailPsw: inputRefPasswordEmail.current.value,
      cc: inputRefCC.current.value,
      bcc: inputRefBCC.current.value,
      campaign: inputRefCampaign.current.value
    }
    setLoadingSave(true)
    fetchSaveTemplate(requestSaveTemplate)
  }

  return (
    <>
    {hidemEmail
    ?
      <Box style={{ backgroundColor: 'white', borderRadius: '10px', borderStyle: 'outset' }}>
        <Typography variant='h6' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', fontSize: '15px' }}>
          Email Settings
        </Typography>
        <Box style={{ padding: '20px 20px 0 20px' }}>
          <Stack
            direction='column'
            justifyContent='flex-start'
            alignItems='flex-start'
            spacing={0.5}
          >
            <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
              Email Template
            </Typography>
            <SelectInput age={templateValor} handleChange={handleChangeTemplate} valorData={templateArray} />
            <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
              CSR
            </Typography>
            <SelectInput age={csrResultArrayValue} handleChange={handleChangeCsrResul} valorData={csrResultArray} />
            <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
              customer email
            </Typography>
            <TextField fullWidth  variant="standard" name='userEmail' type='email' value={userEmail} onChange={chanceUseremail} />
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
              <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
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
              <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                CC
              </Typography>
              <TextareaAutosize
                aria-label='minimum height'
                minRows={3}
                style={{ width: '100%', borderRadius: '5px' }}
                value={emailCC}
                onChange={chanceEmailCC}
                /* defaultValue={orderWebsite.websiteCC}
                ref={inputRefEmailCC} */
              />
            </Stack>
            <Stack
              direction='column'
              justifyContent='flex-start'
              alignItems='flex-start'
              spacing={0.5}
              style={{ width: '100%' }}
            >
              <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                BCC
              </Typography>
              <TextareaAutosize
                aria-label='minimum height'
                minRows={3}
                style={{ width: '100%', borderRadius: '5px' }}
                defaultValue={orderWebsite.websiteBCC}
                disabled
              />
            </Stack>
            <Stack
              direction='column'
              justifyContent='flex-start'
              alignItems='flex-start'
              spacing={0.5}
              style={{ width: '100%' }}
            >
              <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '12px' }}>
                Campaign
              </Typography>
              <TextareaAutosize
                aria-label='minimum height'
                minRows={3}
                style={{ width: '100%', borderRadius: '5px' }}
                defaultValue={orderWebsite.websiteCampaign}
                disabled
              />
            </Stack>
          </Stack>
        </Box>
        <Typography variant='h6' style={{ marginTop: '10px', paddingLeft: '20px', fontSize: '15px' }}>
          Log Email Sended
        </Typography>
        {/* <Box sx={{ height: '400px' }}>
          <TableOrderInformationMagento logEmailResultResult={logEmailResultResult}/>
        </Box> */}
          <UploadButton setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions} selectedFile={selectedFile} setSelectedFile={setSelectedFile} option={2} nameButton={'ATTACH FILE'} idTransactionies={idTransactionies} setIdTransactionies={setIdTransactionies}/>
        <Stack
          direction='row'
          justifyContent='center'
          alignItems='center'
          spacing={1}
          sx={{ /* display: { lg: 'flex', md: 'none' }, */width: '90%', margin: '20px', overflow: 'auto', /* whiteSpace: 'nowrap' */ }}
        >
          <Button variant='contained' style={{ backgroundColor: '#00A1E0', fontSize: '1rem' }} onClick={handelAceptEmail}>
            CREATE TEMPLATE
          </Button>
          <Button variant='contained' style={{ backgroundColor: '#00A1E0', fontSize: '1rem' }} onClick={handelAlterTemplate}>
            ALTER TEMPLATE
          </Button>
          <LoadingButton
            style={{ backgroundColor: '#00A1E0', fontSize: '1rem' }}
            loading={loadPreviewEmail}
            variant="contained"
            onClick={() => handelPreviewEmail('2')}
          >
            PREVIEW EMAIL
          </LoadingButton>
          <LoadingButton
            style={{ backgroundColor: '#00A1E0', fontSize: '1rem' }}
            loading={loadSendEmail}
            variant="contained"
            onClick={() => handelPreviewEmail('1')}
          >
            SEND EMAIL
          </LoadingButton>
        </Stack>
        {/* <Stack
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
          <LoadingButton
            style={{ backgroundColor: '#00A1E0', fontSize: '12px' }}
            loading={loadPreviewEmail}
            variant="contained"
            onClick={() => handelPreviewEmail('2')}
          >
            PREVIEW EMAIL
          </LoadingButton>
          <LoadingButton
            style={{ backgroundColor: '#00A1E0', fontSize: '12px' }}
            loading={loadSendEmail}
            variant="contained"
            onClick={() => handelPreviewEmail('1')}
          >
            SEND EMAIL
          </LoadingButton>
        </Stack> */}
      </Box>
    :
      <Box style={{ backgroundColor: 'white', borderRadius: '10px', borderStyle: 'outset' }}>
        <Typography variant='h6' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white' }}>
          Email Template
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
            <LoadingButton
              style={{ backgroundColor: '#00A1E0' }}
              loading={loadingSave}
              variant="contained"
              onClick={saveTemplate}
            >
              Save template
            </LoadingButton>
            <Button variant='contained' style={{ backgroundColor: '#00A1E0', fontSize: '10px' }} onClick={handelCancelEmail}>
              Cancel
            </Button>
          </Stack>  
        </Box>
      </Box>
    }
      <ModalEmail openModalEmail={openModalEmail} handleCloseModalEmail={handleCloseModalEmail} dataPreview={dataPreview} renderHTML={renderHTML}/>
      <Alerts open={openAlerts} setOpen={setOpenAlerts} alertsOptions={alertsOptions} />
    </>
  )
}

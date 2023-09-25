import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../auth/context/AuthContext'
import { experimentalStyled as styled } from '@mui/material/styles'
//import { Prueba } from '../components'
import { apiRest } from '../../logic/constantes'
import { Box, Typography, Paper, Grid, CircularProgress, Stack  } from '@mui/material'
import { MagentoOrderInformationCrs, ItemOrder, MagentoOrderInformationSales, MagentoOrderInformationLogs, MagentoOrderIdSerch } from '../components'
import { arrayCommutationTrue, arrayCommutationFalse, arrayCommutationFalseId } from '../../logic/functions'
import { useLocation  } from 'react-router-dom'


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    height: '100vh',
    borderRadius: '0',
    color: theme.palette.text.secondary,
  }));

const Item2 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  height: '100vh',
  borderRadius: '0',
  color: theme.palette.text.secondary,
}))

export const MagentoOrderId = () => {
    const [navOrderInformation, setNavOrderInformation] = useState('CSR')
    const [activeMenu, setActiveMenu] = useState('CSR')
    const [loading, setLoading] = useState(true)

    const [dataItemOrder, setDataItemOrder] = useState([])
    const [selectOrderInformation, setSelectOrderInformation] = useState([])
    
    const [saveStatusCancelArraySelectOrderInformation, setSaveStatusCancelArraySelectOrderInformation] = useState([])

    const [backupAddress, setBackupAddress] = useState([])

    const [selectCommentTemplate, setSelectCommentTemplate] = useState([])
    const [selectDocketHeader, setSelectDocketHeader] = useState([])

    const [shippingAddressArray, setShippingAddressArray] = useState([])
    const [paymentInformation, setPaymentInformation] = useState([])
    const [historyOrder, setHistoryOrder] = useState([])
    const [setesArray, setSetesArray] = useState([])
    const [template, setTemplate] = useState([])
    const [csrResult, setCsrResult] = useState([])
    const [logEmailResult, setLogEmailResult] = useState([])
    const [ordersCustomerResilt, setOrdersCustomerResul] = useState([])
    const [infoBillingResult, setInfoBillingResult] = useState({})
    const [infoShippingResult, setInfoShippingResult] = useState({})
    const [selectCommentTemplateDocket, setSelectCommentTemplateDocket] = useState({
      commentTemplate: [],
      comment: '',
      docketHeader: []
    })
    const { id, idwebsite } = useParams()
    const [hidemImages, setHidemImages] = useState(`https://prestodemos.com/dsr/img/big/${idwebsite}_${id}.png`)
    const [orderWebsite, setOrderWebsite] = useState({
      order : id,
      userEmail: '',
      website : idwebsite ,
      websiteAbbreviation : '',
      websiteSender: '',
      websitePassword: '',
      websiteCC: '',
      websiteBCC: '',
      websiteCampaign: '',
    }) 
    const [dieResult, setDieResult] = useState([])
    const [selectedFile, setSelectedFile] = useState([])
    const [selectedFileEmail, setSelectedFileEmail] = useState([])
    //const [idwebsite, setIdwebsite] = useState(null)

    const location = useLocation();

    useEffect(() => {
      fetchData()
      hidenOptionsOrdersInformation('CSR')
      hidenOrderInformation('CSR')
      funLoag('CSR')
      setHidemImages(`https://prestodemos.com/dsr/img/big/${idwebsite}_${id}.png`)
      setSelectedFile([])
      setSelectedFileEmail([])
    }, [location]);

    const { token, logout } = useContext(AuthContext)

    const fetchData = async () => {
      const request = {
        token,
        mg_order: id,
        id_website: idwebsite
      }
      request.option = 'mgOrderSelect'
      request.controller = 'magento'
  
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(request)
      }
  
      fetch(apiRest, requestOptions)
        .then(response => response.json())
        .then(datas => {
          const {type, message} = datas
          if (type === 'ok') {
            formarSelects(datas)
          }
  
          if (type === 'error') {
            if (message === 'invalid token') {
              logout()
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
        /* .finally(() => {
          setLoading(false)
        }) */
    }
  
    const shippingAddress = (cero) => {
      const array = ['','','','','','','','','']
      const { dsr__firstname, dsr__lastname, dsr__company, dsr__street, dsr__city, dsr__state, dsr__postalcode, dsr__code_country } = cero
      
      const arrayResult = array.map((_, index) => {
        if (index === 0) {
          return {
            id: index,
            label: 'Shiping Address:',
            typeCtrl: 'butoon',
            event: true,
            value: '',
          }
        }
        if (index === 1) {
          return {
            id: index,
            label: 'Name:',
            typeCtrl: 'input',
            event: true,
            value: dsr__firstname,
          }
        }
        if (index === 2) {
          return {
            id: index,
            label: 'Lastname:',
            typeCtrl: 'input',
            event: true,
            value: dsr__lastname,
          }
        }
        if (index === 3) {
          return {
            id: index,
            label: 'Company:',
            typeCtrl: 'input',
            event: true,
            value: dsr__company,
          }
        }
        if (index === 4) {
          return {
            id: index,
            label: 'Street:',
            typeCtrl: 'input',
            event: true,
            value: dsr__street,
          }
        }
        if (index === 5) {
          return {
            id: index,
            label: 'City:',
            typeCtrl: 'input',
            event: true,
            value: dsr__city,
          }
        }
        if (index === 6) {
          return {
            id: index,
            label: 'State:',
            typeCtrl: 'input',
            event: true,
            value: dsr__state,
          }
        }
        if (index === 7) {
          return {
            id: index,
            label: 'Postal Code:',
            typeCtrl: 'input',
            event: true,
            value: dsr__postalcode,
          }
        }
        if (index === 8) {
          return {
            id: index,
            label: 'Country:',
            typeCtrl: 'input',
            event: true,
            value: dsr__code_country,
          }
        }
      })
      setShippingAddressArray(arrayResult)
    }
  
    const mapDataItemOrder = (transformJson) => {
      const resultMapDataItemOrder = transformJson.map((e) => {
        return {
          id: e.id,
          label: e.label,
          typeCtrl: e.typeCtrl,
          value: e.value,
          event: true,
          arraySelect: typeof e.arraySelect === "string" ? JSON.parse(e.arraySelect) : e.arraySelect 
        }
      })
      setDataItemOrder(resultMapDataItemOrder)
    }
  
    const paymentInformationArray = (paymentInformation) => {
      if (paymentInformation) {
        const [cero] = paymentInformation
        if (cero.additional_information === null) {
          setPaymentInformation([])
          return
        }
        const arregloDeClavesYValores = Object.entries(JSON.parse(cero.additional_information))
        const arrayResult = []
        arregloDeClavesYValores.forEach((arreglo) => {
          const [cero, uno] = arreglo
          const objPaymentInformation = {
            name: cero,
            value: uno
          }
          arrayResult.push(objPaymentInformation)
        })
        setPaymentInformation(arrayResult)
      } else {
        setPaymentInformation([])
      }
    }
  
    const historyOrderArray = (historyOrder) => {
      setHistoryOrder(historyOrder)
    }
  
    const setSetesArrayFuction = (selectSites) => {
      setSetesArray(selectSites)
    }
  
    const selectTemplateArray = (SelectTemplate) => {
      setTemplate(SelectTemplate)
    }
  
    const SelectCsrFuction = (selectCsrEmail) => {
      setCsrResult(selectCsrEmail)
    }
  
    const logEmailFunction = (logEmail) => {
      setLogEmailResult(logEmail)
    }
  
    const ordersCustomerFuction = (ordersCustomer) => {
      setOrdersCustomerResul(ordersCustomer)
    }
  
    const infoShippingResultFuction = (InfoShipping) => {
      if (InfoShipping !== null) {
        const [cero] = InfoShipping
        setInfoShippingResult(cero)
      }else{
        setInfoShippingResult([])
      }
    }
  
    const infoBillingResultFuction = (InfoBilling) => {
      
      if (InfoBilling !== null) {
        const [cero] = InfoBilling
        setInfoBillingResult(cero)
      }else{
        setInfoBillingResult([])
      }
    }
  
    const dieResultFunction = (cero) => {
      const array = ['', '']
      const arrayResult = array.map((_, index) => {
        if (index === 0) {
          return {
            id: index,
            label: 'Tracking Number:',
            typeCtrl: 'input',
            event: true,
            value: cero.dsr__shipping_traking_number,
            arraySelect: []
          }
        }
        if (index === 1) {
          return {
            id: index,
            label: 'Carrier:',
            typeCtrl: 'input',
            event: true,
            value: cero.dsr__shipping_services_name,
            arraySelect: []
          }
        }
      })
      setDieResult(arrayResult)  
    }
  
    /* const formartDate = (data) => {
      const stringResult = 'T00:00'
      if(!data) {
        return '0000-00-00T00:00'
      }
      if (data.length === 10) {
        return `${data}${stringResult}`
      }
      return data
    } */
  
    const selectCommentTemplateDocketFuction = (dsr__comment, templateComment, SelectDocketHeader) => {
      setSelectCommentTemplateDocket({
        commentTemplate: templateComment,
        comment: dsr__comment,
        docketHeader: SelectDocketHeader
      })

      setSelectCommentTemplate(templateComment)
      setSelectDocketHeader(SelectDocketHeader)
    }
  
    const orderWebsiteFunntion = (cero, InfoShipping) => {
      setOrderWebsite({
        order : cero.dsr__mg_order,
        userEmail: InfoShipping[0].email,
        website : cero.dsr__id_website,
        websiteAbbreviation : cero.website__abbreviation,
        websiteSender: cero.website__emailSales,
        websitePassword: cero.website__pswEmailSales,
        websiteCC: cero.website__cc,
        websiteBCC: cero.website__bcc,
        websiteCampaign: cero.website__campaign,
      })
    }
  
    const formarSelects = (datas) => {
      const array = ['','','','','','','','','','','','',''];
      const { templateComment, SelectDocketHeader, selectStatus, SelectCsr, SelectUrgency, selectShipping, SelectPress, shippingandHandling, data, paymentInformation, historyOrder, selectSites, SelectTemplate, selectCsrEmail, logEmail, ordersCustomer, InfoShipping, InfoBilling } = datas
      const [cero] = data
      const transformJson = JSON.parse(cero.dsr__product_options)
      orderWebsiteFunntion(cero, InfoShipping)
      selectCommentTemplateDocketFuction(cero.dsr__comment, templateComment, SelectDocketHeader)
      dieResultFunction(cero)
      selectTemplateArray(SelectTemplate)
      mapDataItemOrder(transformJson)
      shippingAddress(cero)
      paymentInformationArray(paymentInformation)
      historyOrderArray(historyOrder)
      setSetesArrayFuction(selectSites)
      SelectCsrFuction(selectCsrEmail)
      logEmailFunction(logEmail)
      ordersCustomerFuction(ordersCustomer)
      infoShippingResultFuction(InfoShipping)
      infoBillingResultFuction(InfoBilling)
      const arrayResult = array.map((e, index) => {
        if (index === 0) {
          return {
            id: index,
            label: 'Order Date:',
            typeCtrl: 'none',
            value: cero.dsr__create_date,
            event: true,
            arraySelect: []
          }
        }
        if (index === 1) {
          return {
            id: index,
            label: 'Order Status:',
            typeCtrl: 'select',
            value: cero.dsr__mg_status,
            event: true,
            arraySelect: selectStatus
          }
        }
        if (index === 2) {
          return {
            id: index,
            label: 'Estimated Shipping (or Pickup) Date:',
            typeCtrl: 'dateBasic',
            value: cero.dsr__est_shipping_date,
            event: true,
            arraySelect: []
          }
        }
        if (index === 3) {
          return {
            id: index,
            label: 'CSR',
            typeCtrl: 'select',
            value: cero.dsr__csr,
            event: true,
            arraySelect: SelectCsr
          }
        }
        if (index === 4) {
          return {
            id: index,
            label: 'Estimated Delivery Date:',
            typeCtrl: 'dateBasic',
            value: cero.dsr__est_delivery_date,
            event: true,
            arraySelect: []
          }
        }
        if (index === 5) {
          return {
            id: index,
            label: 'Sample:',
            typeCtrl: 'input',
            value: cero.dsr__time,
            event: true,
            arraySelect: []
          }
        }
        if (index === 6) {
          return {
            id: index,
            label: 'Approval Date:',
            typeCtrl: 'dateBasic',
            value: cero.dsr__approval_date,
            event: true,
            arraySelect: []
          }
        }
        if (index === 7) {
          return {
            id: index,
            label: 'Approval Time:',
            typeCtrl: 'dateTime',
            value: cero.dsr__approval_time,
            event: true,
            arraySelect: []
          }
        }
        if (index === 8) {
          return {
            id: index,
            label: 'Urgency:',
            typeCtrl: 'select',
            value: cero.dsr__csr_comment,
            event: true,
            arraySelect: SelectUrgency
          }
        }
        if (index === 9) {
          return {
            id: index,
            label: 'Press:',
            typeCtrl: 'select',
            value: cero.dsr__press,
            event: true,
            arraySelect: SelectPress
          }
        }
        if (index === 10) {
          return {
            id: index,
            label: 'Shipping Method:',
            typeCtrl: 'select',
            value: cero.dsr__shipping,
            event: true,
            arraySelect: selectShipping
          }
        }
        if (index === 11) {
          return {
            id: index,
            label: 'Shipping & Handling Information',
            typeCtrl: 'none',
            value: shippingandHandling,
            event: true,
            arraySelect: []
          }
        }
        if (index === 12) {
          return {
            id: index,
            label: 'Die:',
            typeCtrl: 'input',
            event: true,
            value: cero.dsr__dieused,
            arraySelect: []
          }
        }
      })
      setSelectOrderInformation(arrayResult)
      setSaveStatusCancelArraySelectOrderInformation(arrayResult)
    }
    
    //////////////////////////////////////////////////////////////////////////

    const hidenOrderInformation = (text) => {
        if (text === 'LOGS') {
          setTimeout(() => {
            setNavOrderInformation(text)
          }, 500);
        }else{
          setNavOrderInformation(text)
        }
      }
    
      const renderHTML = (renders) => {
        const render =  renders
    
        return <Box style={{ fontSize: '12px' }} dangerouslySetInnerHTML={{ __html: render }} />;
      }
    
      const hidenOptionsOrdersInformation = (text) => {
        const objOrdanamiento = {
            CSR: <MagentoOrderInformationCrs
                   arraySelectOrderInformation={selectOrderInformation}
                   setArraySelectOrderInformation={setSelectOrderInformation}
                   saveStatusCancelArraySelectOrderInformation={saveStatusCancelArraySelectOrderInformation}
                   setSaveStatusCancelArraySelectOrderInformation={setSaveStatusCancelArraySelectOrderInformation}
                   backupAddress={backupAddress}
                   setBackupAddress={setBackupAddress}
                   arrayshippingAddressArray={shippingAddressArray}
                   setArrayshippingAddressArray={setShippingAddressArray}
                   dieResultArray={dieResult}
                   setDieResultArray={setDieResult}
                   selectCommentTemplate={selectCommentTemplate}
                   setSelectCommentTemplate={setSelectCommentTemplate}
                   selectDocketHeader={selectDocketHeader}
                   setSelectDocketHeader={setSelectDocketHeader}
                   selectCommentTemplateDocket={selectCommentTemplateDocket}
                   templateArray={template}
                   csrResultArray={csrResult}
                   orderWebsite={orderWebsite}
                   formarSelects={formarSelects}
                   arrayItemOrder={dataItemOrder}
                   hidemImages={hidemImages}
                   setHidemImages={setHidemImages}
                   selectedFile={selectedFile}
                   setSelectedFile={setSelectedFile}
                   selectedFileEmail={selectedFileEmail}
                   setSelectedFileEmail={setSelectedFileEmail}
                 />,
            SALES: <MagentoOrderInformationSales
                     setesArrayResult={setesArray}
                     infoBillingResult={infoBillingResult}
                     infoShippingResult={infoShippingResult}
                     paymentInformationResult={paymentInformation}
                   />,
            LOGS: <MagentoOrderInformationLogs
                    logEmailResultResult={logEmailResult}
                    historyOrderRender={historyOrder}
                    renderHTML={renderHTML}
                    orderWebsite={orderWebsite}
                    orderCustomer={ordersCustomerResilt}
                    setLoading={setLoading}
                  />
          }
      
          const COLORS_CELL_DEFAULT = ''
          return objOrdanamiento[text] || COLORS_CELL_DEFAULT
      }
    
      const haidenSelectEvent = (id) => {
        const arrayResultSprid = [...dataItemOrder]
        const avent = false
        const arrayResult = arrayCommutationFalse(id, arrayResultSprid, avent)
        setDataItemOrder(arrayResult)
      }
    
      const handleChange = (e, id) => {
        const arrayResultSprid = [...dataItemOrder]
        const avent = false
        const valor = e.target.value
        const arrayResult = arrayCommutationFalseId(id, arrayResultSprid, avent, valor)
        setDataItemOrder(arrayResult)
      }
    
      const haidenCancelItemOrdered = (id) => {
        const arrayResultSprid = [...dataItemOrder]
        const avent = true
        const arrayResult = arrayCommutationTrue(id, arrayResultSprid, avent)
        setDataItemOrder(arrayResult)
      }
    
      const checkValue = (id) => {
        const arrayResultSprid = [...dataItemOrder]
        const avent = true
        const arrayResult = arrayCommutationTrue(id, arrayResultSprid, avent)
        setDataItemOrder(arrayResult)
      }
    
      const funLoag = (text) => {
        setActiveMenu(text)
        if (activeMenu === 'LOGS') {
          return
        }
        if (text === 'LOGS') {
          setLoading(false)
        } 
      }
  return (
    <Box sx={{ flexGrow: 1, p: 1 }}>
      <Grid
        container
        spacing={{ xs: 1, md: 1 }}
        columns={{ xs: 12, sm: 12, md: 12 }}
      >
        <Grid item xs={12} sm={5} md={4}>
          <Typography variant='h6' align='center' sx={{  height: '36px', paddingTop: '4px', fontSize: '1rem', backgroundColor: '#0166C6', borderRadius: '10px 10px 0 0', color: 'white' }}>
            Item Ordered
          </Typography>
            <Item2>
              <Box sx={{ width: '100%', height: '100vh', backgroundColor: 'white', overflow: 'auto', whiteSpace: 'nowrap' }}>
                <ItemOrder  arrayItemOrder={dataItemOrder} haidenSelectEvent={haidenSelectEvent} handleChange={handleChange} haidenCancelItemOrdered={haidenCancelItemOrdered} checkValue={checkValue}/>
              </Box>
            </Item2>
        </Grid>
        <Grid item xs={12} sm={7} md={8}>
          <Box sx={{ flexGrow: 1, }}>
            <Grid
                container
                spacing={{ xs: 0, md: 0 }}
                columns={{ xs: 4, sm: 12, md: 12, lg:12 }}
            >
              <Grid item xs={4} sm={2} md={2} lg={2}>
                <Box
                    className={activeMenu === 'CSR' ? 'botones-magento-active' : 'botones-magento'}
                    //sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 80px 5px 0px', color: 'blue', width: '100%' }}
                    onMouseDown={() => funLoag('CSR')}
                    onMouseUp={() => hidenOrderInformation('CSR')}
                    sx={{ height: '100%', paddingTop: '4px' }}
                >
                  <Typography variant='h6' align='center' sx={{ fontSize: '1rem', }}>
                    CSR
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4} sm={2} md={2} lg={2}>
                <Box
                    className={activeMenu === 'SALES' ? 'botones-magento-active' : 'botones-magento'}
                    onMouseDown={() => funLoag('SALES')}
                    onMouseUp={() => hidenOrderInformation('SALES')}
                    sx={{ height: '100%', paddingTop: '4px' }}
                >  
                  <Typography variant='h6' align='center' sx={{ fontSize: '1rem', }}>
                    SALES
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4} sm={2} md={2} lg={2}>
                <Box
                    className={activeMenu === 'LOGS' ? 'botones-magento-active' : 'botones-magento'}
                    onMouseDown={() => funLoag('LOGS')}
                    onMouseUp={() => hidenOrderInformation('LOGS')}
                    sx={{ height: '100%', paddingTop: '4px' }}
                >
                  <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                  >
                    {loading 
                      ?
                        <Typography variant='h6' align='center' sx={{ fontSize: '1rem', }}>
                          LOGS
                        </Typography>
                      :
                        <CircularProgress color="inherit" size={25} style={{ marginLeft: '50%', marginRight: '50%', color: '#0166C6' }}/>
                    }
                  </Stack>
                </Box>
              </Grid>
              <Grid item xs={4} sm={6} md={3.8} lg={4}>
                <Box
                    sx={{ backgroundColor: '#0166C6', borderRadius: '10px 0px 0px 0px',  paddingTop: '4px', color: 'blue', width: '100%', height: '100%', overflow: 'auto', whiteSpace: 'nowrap' }}
                >
                  <Typography variant='h6' align='center' sx={{ fontSize: '1rem', color: 'white' }}>
                    {orderWebsite.order} - {orderWebsite.websiteAbbreviation}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4} sm={12} md={2.2} lg={2}>
                <Box
                    /* className={activeMenu === 'LOGS' ? 'botones-magento-active' : 'botones-magento'}
                    onMouseDown={() => funLoag('LOGS')}
                    onMouseUp={() => hidenOrderInformation('LOGS')} */
                    sx={{ width: '100%', height: '100%' }}
                >
                  <MagentoOrderIdSerch />
                </Box>
              </Grid>    
            </Grid>
          </Box>
          <Item>
            <Box sx={{ width: '100%', height: '100vh', backgroundColor: 'white', overflow: 'auto' }}>
              {hidenOptionsOrdersInformation(navOrderInformation)}
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  )
}

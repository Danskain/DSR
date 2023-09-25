import { useState } from 'react'
import { experimentalStyled as styled } from '@mui/material/styles'
import { Box, Typography, Paper, Grid, CircularProgress  } from '@mui/material'
import { MagentoOrderInformationCrs, ItemOrder, MagentoOrderInformationSales, MagentoOrderInformationLogs } from '../components'
import { arrayCommutationTrue, arrayCommutationFalse, arrayCommutationFalseId } from '../../logic/functions'

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
  }));


export const Prueba = ({setesArray, logEmailResult, ordersCustomerResilt, historyOrder, setViewFile, dataItemOrder, paymentInformation, selectOrderInformation, shippingAddressArray, dieResult, selectCommentTemplateDocket, template, csrResult, orderWebsite, formarSelects, infoBillingResult, infoShippingResult}) => {
  
  const [navOrderInformation, setNavOrderInformation] = useState('CSR')
  const [activeMenu, setActiveMenu] = useState('CSR')
  const [loading, setLoading] = useState(true)
  const [arrayItemOrder, setArrayItemOrder] = useState(dataItemOrder)
  const [arraySelectOrderInformation, setArraySelectOrderInformation] = useState(selectOrderInformation)
  const [saveStatusCancelArraySelectOrderInformation, setSaveStatusCancelArraySelectOrderInformation] = useState(selectOrderInformation)
  const [backupAddress, setBackupAddress] = useState([])
  const [arrayshippingAddressArray, setArrayshippingAddressArray] = useState(shippingAddressArray)
  const [dieResultArray, setDieResultArray] = useState(dieResult)
  const [selectCommentTemplate, setSelectCommentTemplate] = useState(selectCommentTemplateDocket.commentTemplate)
  const [selectDocketHeader, setSelectDocketHeader] = useState(selectCommentTemplateDocket.docketHeader)
  const [templateArray] = useState(template)
  const [csrResultArray] = useState(csrResult)
  const [setesArrayResult] = useState(setesArray)
  const [paymentInformationResult] = useState(paymentInformation) 
  const [logEmailResultResult] = useState(logEmailResult)
  const [historyOrderRender] = useState(historyOrder)
  const [orderCustomer] = useState(ordersCustomerResilt)

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
               arraySelectOrderInformation={arraySelectOrderInformation}
               setArraySelectOrderInformation={setArraySelectOrderInformation}
               saveStatusCancelArraySelectOrderInformation={saveStatusCancelArraySelectOrderInformation}
               setSaveStatusCancelArraySelectOrderInformation={setSaveStatusCancelArraySelectOrderInformation}
               backupAddress={backupAddress}
               setBackupAddress={setBackupAddress}
               arrayshippingAddressArray={arrayshippingAddressArray}
               setArrayshippingAddressArray={setArrayshippingAddressArray}
               dieResultArray={dieResultArray}
               setDieResultArray={setDieResultArray}
               selectCommentTemplate={selectCommentTemplate}
               setSelectCommentTemplate={setSelectCommentTemplate}
               selectDocketHeader={selectDocketHeader}
               setSelectDocketHeader={setSelectDocketHeader}
               selectCommentTemplateDocket={selectCommentTemplateDocket}
               templateArray={templateArray}
               csrResultArray={csrResultArray}
               orderWebsite={orderWebsite}
               formarSelects={formarSelects}
               arrayItemOrder={arrayItemOrder}
               setViewFile={setViewFile}
             />,
        SALES: <MagentoOrderInformationSales
                 setesArrayResult={setesArrayResult}
                 infoBillingResult={infoBillingResult}
                 infoShippingResult={infoShippingResult}
                 paymentInformationResult={paymentInformationResult}
               />,
        LOGS: <MagentoOrderInformationLogs
                logEmailResultResult={logEmailResultResult}
                historyOrderRender={historyOrderRender}
                renderHTML={renderHTML}
                orderWebsite={orderWebsite}
                orderCustomer={orderCustomer}
                setLoading={setLoading}
              />
      }
  
      const COLORS_CELL_DEFAULT = ''
      return objOrdanamiento[text] || COLORS_CELL_DEFAULT
  }

  const haidenSelectEvent = (id) => {
    const arrayResultSprid = [...arrayItemOrder]
    const avent = false
    const arrayResult = arrayCommutationFalse(id, arrayResultSprid, avent)
    setArrayItemOrder(arrayResult)
  }

  const handleChange = (e, id) => {
    const arrayResultSprid = [...arrayItemOrder]
    const avent = false
    const valor = e.target.value
    const arrayResult = arrayCommutationFalseId(id, arrayResultSprid, avent, valor)
    setArrayItemOrder(arrayResult)
  }

  const haidenCancelItemOrdered = (id) => {
    const arrayResultSprid = [...arrayItemOrder]
    const avent = true
    const arrayResult = arrayCommutationTrue(id, arrayResultSprid, avent)
    setArrayItemOrder(arrayResult)
  }

  const checkValue = (id) => {
    const arrayResultSprid = [...arrayItemOrder]
    const avent = true
    const arrayResult = arrayCommutationTrue(id, arrayResultSprid, avent)
    setArrayItemOrder(arrayResult)
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
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4} sm={4} md={4}>
          <Typography variant='h6' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white' }}>
            Item Ordered
          </Typography>
            <Item2>
              <Box sx={{ width: '100%', height: '100vh', backgroundColor: 'white', overflow: 'auto' }}>
                <ItemOrder  arrayItemOrder={arrayItemOrder} haidenSelectEvent={haidenSelectEvent} handleChange={handleChange} haidenCancelItemOrdered={haidenCancelItemOrdered} checkValue={checkValue}/>
              </Box>
            </Item2>
        </Grid>
        <Grid item xs={4} sm={4} md={8}>
          <Box sx={{ flexGrow: 1, }}>
            <Grid
                container
                spacing={{ xs: 2, md: 0 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={4} sm={4} md={2}>
                <Box
                    className={activeMenu === 'CSR' ? 'botones-magento-active' : 'botones-magento'}
                    //sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 80px 5px 0px', color: 'blue', width: '100%' }}
                    onMouseDown={() => funLoag('CSR')}
                    onMouseUp={() => hidenOrderInformation('CSR')}
                >
                  <Typography variant='h6' align='center' /* onClick={() => santafe('CSR')} */>
                    CSR
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4} sm={4} md={2} /* key={index} */>
                <Box
                    className={activeMenu === 'SALES' ? 'botones-magento-active' : 'botones-magento'}
                    onMouseDown={() => funLoag('SALES')}
                    onMouseUp={() => hidenOrderInformation('SALES')}
                >  
                  <Typography variant='h6' align='center' /* onClick={() => santafe('SALES')} */>
                    SALES
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4} sm={4} md={2} /* key={index} */>
                <Box
                    className={activeMenu === 'LOGS' ? 'botones-magento-active' : 'botones-magento'}
                    onMouseDown={() => funLoag('LOGS')}
                    onMouseUp={() => hidenOrderInformation('LOGS')}
                >
                  {loading 
                    ?
                      <Typography variant='h6' align='center'>
                        LOGS
                      </Typography>

                    :
                      <CircularProgress color="inherit" size={25} style={{ marginLeft: '40%', marginRight: '40%', color: 'black' }}/>
                  }
                </Box>
              </Grid>
              <Grid item xs={4} sm={4} md={6} /* key={index} */>
                <Box
                    sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0px 0px', color: 'blue', width: '100%', /* height: '150px' */ }}
                >
                  <Typography variant='h6' align='center' sx={{ /* backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', */ color: 'white' }}>
                    {orderWebsite.order} - {orderWebsite.websiteAbbreviation}
                  </Typography>
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

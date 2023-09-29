import { useState, useRef, useContext } from 'react'
import { AuthContext } from '../../auth/context/AuthContext'

import { Alerts, SelectInput, OrderInformationPayment } from '../components'
import { Box, Grid, experimentalStyled as styled, Paper, Typography, Stack, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { apiRest } from '../../logic/constantes'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    border: 'none',
  }));

const Item2 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    border: 'none',
  }));  


export const MagentoOrderInformationSales = ({setesArrayResult, infoBillingResult, infoShippingResult, paymentInformationResult }) => {
  const [setesArrayValue, setSetesArrayValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [alertsOptions, setAlertsOptions] = useState({})
  const [openAlerts, setOpenAlerts] = useState(false)

  const info = infoBillingResult
  const infos = infoShippingResult 

  const { token } = useContext(AuthContext)


  const inputRef = useRef()
  

  const handleChangeSites = (e) => {
    setSetesArrayValue(e.target.value)
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

  return (
    <Box sx={{ flexGrow: 1, p: '20px' }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4} sm={8} md={6}>
          <Box
            sx={{ borderRadius: '10px 10px 10px 10px', width: '100%' }}
          >
            <Item>
              <Box style={{ backgroundColor: 'white', borderRadius: '10px', borderStyle: 'outset' }}>
                <Typography variant='h6' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', fontSize: '18px' }}>
                  Change Customer Password
                </Typography>
                <Box style={{ padding: '20px 20px 0 20px' }}>
                  <Stack
                    direction='column'
                    justifyContent='flex-start'
                    alignItems='flex-start'
                    spacing={0.5}
                  >
                    <Typography variant='h6' className='texto-con-relieve'>
                      Sites
                    </Typography>
                    <SelectInput age={setesArrayValue} handleChange={handleChangeSites} valorData={setesArrayResult} />
                    <Typography variant='h6' className='texto-con-relieve'>
                      Email
                    </Typography>
                    <TextField fullWidth id="standard-basic" variant="standard" inputRef={inputRef} name='Change' />
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
                      loading={loading}
                      variant="contained"
                      onClick={() => habdleClickChence(1)}
                    >
                      Change Password
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
                </Box>
              </Box>
            </Item>
          </Box>
        </Grid>
        <Grid item xs={4} sm={8} md={6} >    
          <Box
            sx={{ borderRadius: '10px 10px 10px 10px', width: '100%',  }}
          >
            <Item>
              <Box style={{ backgroundColor: 'white', borderRadius: '10px', borderStyle: 'outset', height: '260px' }}>
                  <Typography variant='h6' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 8px 0 0', color: 'white', fontSize: '18px' }}>
                    Shipping Information
                  </Typography>
                  
                    <Stack
                      direction='column'
                      justifyContent='center'
                      alignItems='flex-start'
                      spacing={1}
                      style={{ margin: '20px' }}
                    >
                      
                        <Typography variant='h6' className='texto-con-relieve'>
                          {info.firstname} {info.lastname}
                        </Typography>
                      
                      
                        <Typography variant='h6' className='texto-con-relieve'>
                          {info.company}
                        </Typography>
                      
                        <Typography variant='h6' className='texto-con-relieve'>
                          {info.street}
                        </Typography>
                      
                        <Typography variant='h6' className='texto-con-relieve'>
                          {info.city}, {info.region}, {info.postcode}
                        </Typography>
                      
                        <Typography variant='h6' className='texto-con-relieve'>
                          {info.telephone}
                        </Typography>
                      
                    </Stack>
                  
              </Box>
            </Item>
          </Box> 
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
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
                  <Item2>
                    <OrderInformationPayment paymentInformationResult={paymentInformationResult}/>
                  </Item2>
               </Box>
              </Grid>
              <Grid item xs={4} sm={8} md={12}>
                <Box
                  sx={{ borderRadius: '10px 10px 10px 10px', width: '100%' }}
                >
                  <Item2>
                    <Box style={{ backgroundColor: 'white', borderRadius: '10px', borderStyle: 'outset' }}>
                      <Typography variant='h6' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', fontSize: '18px' }}>
                        Account Information
                      </Typography>
                      <Box style={{ padding: '20px 20px 20px 20px' }}>
                        <Stack
                          direction='column'
                          justifyContent='flex-start'
                          alignItems='flex-start'
                          spacing={0.5}
                        >
                          <Typography variant='h6' className='texto-con-relieve'>
                          Customer Name:
                          </Typography>
                          <Typography variant='string' className='texto-con-relieve-value'>
                            {infoBillingResult.firstname} {infoBillingResult.lastname}
                          </Typography>
                          <Typography variant='h6' className='texto-con-relieve'>
                            Email:
                          </Typography>
                          <Typography variant='string' className='texto-con-relieve-value'>
                            {infoBillingResult.email}
                          </Typography>
                        </Stack>
                      </Box>
                    </Box>
                  </Item2>
                </Box>
              </Grid>
            </Grid>    
          </Box>
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <Item>
            <Box style={{ backgroundColor: 'white', borderRadius: '10px', borderStyle: 'outset', height: '260px' }}>
              <Typography variant='h6' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', fontSize: '18px' }}>
                Billing Information
              </Typography>
              <Stack
                direction='column'
                justifyContent='center'
                alignItems='flex-start'
                spacing={1}
                style={{ margin: '20px' }}
              >
                
                  <Typography variant='h6' className='texto-con-relieve'>
                    {infos.firstname} {info.lastname}
                  </Typography>
                
                
                  <Typography variant='h6' className='texto-con-relieve'>
                    {infos.company}
                  </Typography>
                
                  <Typography variant='h6' className='texto-con-relieve'>
                    {infos.street}
                  </Typography>
                
                  <Typography variant='h6' className='texto-con-relieve'>
                    {infos.city}, {infos.region}, {infos.postcode}
                  </Typography>
                
                  <Typography variant='h6' className='texto-con-relieve'>
                    {infos.telephone}
                  </Typography>
              </Stack>
            </Box>  
          </Item>
        </Grid>
      </Grid>
      <Alerts open={openAlerts} setOpen={setOpenAlerts} alertsOptions={alertsOptions} />
    </Box>
  )
}

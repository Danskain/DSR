import { useState, useEffect } from 'react'
import { experimentalStyled as styled, Box, Paper, Grid, Typography, Stack, Button } from '@mui/material'
import { TableOrderInformationMagento, OrderInformationHistorialPayment } from '../components'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import { useNavigate  } from 'react-router-dom'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    border: 'none',
}));

export const MagentoOrderInformationLogs = ({setLoading, logEmailResultResult, historyOrderRender, renderHTML, orderWebsite, orderCustomer}) => {
  //const navigate = useNavigate()
  //const history = useHistory();
  const navigate = useNavigate();
  //const location = useLocation();
  
  useEffect(() => {
    performance.mark('startRender');
    setLoading(true)

    /* return () => {
      performance.mark('endRender');
      performance.measure('renderTime', 'startRender', 'endRender')
      //const measures = performance.getEntriesByName('renderTime')
      
          setLoading(true)
      
    } */
  }, [])

  /* useEffect(() => {
    // Lógica para obtener los nuevos datos basados en la URL actualizada
    //const newData = obtenerNuevosDatos(location.pathname);

    // Actualizar los datos en el componente o hacer cualquier acción necesaria
    console.log(location, 'newData')
  }, [location]); */

  const [hidemImages, setHidemImages] = useState(``)

  const handleMouseEnter = (order) => {
    setHidemImages(`https://prestodemos.com/dsr/img/big/${orderWebsite.website}_${order}.png`)
  }
  const handleMouseLeave = () => {
    setHidemImages(`https://prestodemos.com/dsr/img/big.png`)
  }

  const handleImageError = () => {
    setHidemImages(`https://prestodemos.com/dsr/img/big.png`)
  }
  
  const handelButoon = (order) => {
    //navigate(`${order}/${orderWebsite.website}`, { replace: true })
    //const newURL = `${orderWebsite.order}/${orderWebsite.website}`
    //history.push(newURL)
    //navigate(newURL)
    //const newParams = { id: order, idwebsite: orderWebsite.website };
    //navigate({ search: `?${new URLSearchParams(newParams).toString()}` });
    //const params = new URLSearchParams(location.search);
    //params.set('param1', order);
    //params.set('param2', orderWebsite.website)
    //navigate(`?${params.toString()}`);
    const newPathname = `/magento/${order}/${orderWebsite.website}`
    //const loca = `/magento/${order}/${orderWebsite.website}`
    navigate(newPathname);
    //console.log(location, 'locationlocation')
    //console.log(window.location, 'window.location')
    //window.location.pathname = newPathname;
    //console.log(`${order}/${orderWebsite.website}`)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 0 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4} sm={8} md={8}>
          <Item>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 1, md: 3 }}
                columns={{ xs: 2, sm: 8, md: 12 }}
              >
                <Grid item xs={2} sm={8} md={12}>
                  <Box
                    sx={{ backgroundColor: 'white', borderStyle: 'outset', borderRadius: '10px 10px 10px 10px', width: '100%', height: '400px' }}
                  >
                    <TableOrderInformationMagento logEmailResultResult={logEmailResultResult}/>
                  </Box>
                </Grid>
                <Grid item xs={2} sm={4} md={6}>
                  <Box
                    sx={{ backgroundColor: 'white', borderStyle: 'double', borderRadius: '5px', width: '100%', height: '300px', display: { xs: 'none', md: 'flex' }, }}
                  >
                    <img
                      src={ hidemImages }
                      alt=""
                      style={{ width: '100%', height: '100%' }}
                      onError={handleImageError}
                    />
                  </Box>
                  <Box
                    sx={{ backgroundColor: 'white', borderStyle: 'double', borderRadius: '5px', width: '100%', height: '170px', display: { xs: 'flex', md: 'none' }, }}
                  >
                    <img
                      src={ hidemImages }
                      alt=""
                      style={{ width: '100%', height: '100%' }}
                      onError={handleImageError}
                    />
                  </Box>
                </Grid>
                <Grid item xs={2} sm={4} md={6}>
                  <Box
                    sx={{ backgroundColor: 'white', borderStyle: 'outset', width: '100%', height: '300px', borderRadius: '10px 10px 0 0', display: { xs: 'none', md: 'block' }, }}
                  >
                    <Typography variant='h6' align='center' sx={{ width: '100%', backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', fontSize: '15px' }}>
                        Item Ordered
                    </Typography>
                    <Box
                      sx={{
                        width: '100%',
                        height: '92%',
                        overflowX: 'auto',
                      }}
                    >
                      <Stack
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                          spacing={0}
                      >
                          {orderCustomer.map((order, index) => (
                            <Box
                              key={order.increment_id}
                              style={{
                                backgroundColor: index % 2 === 0 ? '#E5F0FB' : '#DFDFDF',
                                width: '100%',
                                height: '45px',
                                textAlign: 'center',
                                paddingTop: '3px',
                              }}
                            >
                              <Button
                                style={{ backgroundColor: '#00A1E0' }} 
                                variant='contained'
                                startIcon={<FindInPageIcon />}
                                onMouseEnter={() => handleMouseEnter(order.increment_id)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handelButoon(order.increment_id)}
                              >
                                {order.increment_id}
                              </Button>
                            </Box>
                          ))}
                      </Stack>
                    </Box>
                  </Box>
                  <Box
                    sx={{ backgroundColor: 'white', borderStyle: 'outset', width: '100%', height: '170px', borderRadius: '10px 10px 0 0', display: { xs: 'block', md: 'none' }, }}
                  >
                    <Typography variant='h6' align='center' sx={{ width: '100%', height: '20px', backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', fontSize: '15px' }}>
                        Item Ordered
                    </Typography>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={0}
                        sx={{ width: '100%', height: '85%', overflow: 'auto', mt: '2px'}}
                    >
                        {orderCustomer.map((order, index) => (
                          <Box key={order.increment_id} style={{ backgroundColor: index % 2 === 0 ? '#E5F0FB' : '#DFDFDF', width: '100%', height: '45px', textAlign: 'center', paddingTop: '3px' }} >
                            <Button
                              style={{ backgroundColor: '#00A1E0' }} 
                              variant='contained'
                              startIcon={<FindInPageIcon />}
                              onMouseEnter={() => handleMouseEnter(order.increment_id)}
                              onMouseLeave={handleMouseLeave}
                              onTouchStart={() => handleMouseEnter(order.increment_id)}
                              onTouchEnd={handleMouseLeave}
                              onClick={() => handelButoon(order.increment_id)}
                            >
                              {order.increment_id}
                            </Button>
                          </Box>
                        ))}
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={4} sm={8} md={4}>
          <Item>
            <Box
              sx={{ backgroundColor: 'white', borderStyle: 'outset', borderRadius: '10px 10px 10px 10px', width: '100%', height: '724px', overflow: 'auto' }}
            >
              <OrderInformationHistorialPayment historyOrderRender={historyOrderRender} renderHTML={renderHTML}/>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  )
}

import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../auth/context/AuthContext'
import { apiRest } from '../logic/constantes'
import { Box, Paper, Grid, styled,Typography, Stack, Link } from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  border: 'none',
}))

/* const Item2 = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  margin: theme.spacing(4),
  height: 60,
  width: 200,
  lineHeight: '60px',
  border: 'black 1px solid'
})); */

export const MostrarArchivos = ({hidemImages, setHidemImages, params}) => {
  const [dataLinks, setDataLinks] = useState([])
  const { token } = useContext(AuthContext)

  const fetchDataArchivosPDF = async (requestMagento) => {
    requestMagento.token = token
    requestMagento.option = 'linksFilesCalendar'
    requestMagento.controller = 'dsr'  

    const requestOptions = {
      method: 'POST',
      /* headers: { 'Content-Type': 'application/json' }, */
      body: JSON.stringify(requestMagento)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { type, message, data } = datas
        
        if (type === 'ok') {
          if (data.length === 0) {
            setDataLinks(data)
            return
          }
          const [cero] = data
          setDataLinks(cero)
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

  useEffect(() => {
    const ogj = {
      idWebsite: params.row.dsr_websiteId, 
      mgOrder: params.row.dsr_order
    }
    fetchDataArchivosPDF(ogj)
  }, [])

  const handleImageError = () => {
    setHidemImages(`https://prestodemos.com/dsr/img/big.png`);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant='h5' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', paddingLeft: '10px', fontSize: '17px' }}>
        Enlarged image
      </Typography>
      <Grid container spacing={{ xs: 2, md: 0 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={2} sm={4} md={6}>
            <Item>
              <Box style={{ backgroundColor: 'white', borderRadius: '10px', borderStyle: 'outset' }}>
                
                  <Stack
                    direction='column'
                    justifyContent='flex-start'
                    alignItems='flex-start'
                  >
                    <Box
                      sx={{ width: '100%', height: '400px', backgroundColor: 'white', borderStyle: 'double', borderRadius: '5px'}}
                    >
                        <img
                          src={ hidemImages }
                          alt=""
                          style={{ width: '100%', height: '100%' }}
                          onError={handleImageError}
                        />
                      
                    </Box>
                   
                  </Stack>  
                </Box>
            </Item>
          </Grid>
          <Grid item xs={2} sm={4} md={6}>
            <Item>
              <Box style={{ backgroundColor: 'white', borderRadius: '10px', borderStyle: 'outset', height: '100%' }}>
                <Typography variant='h6' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', fontSize: '14px' }}>
                  Product Detalis
                </Typography>
                <Box
                  style={{ padding: '10px 10px 10px 10px', width: '100%', height: '375px', overflow: 'auto', whiteSpace: 'nowrap' }}
                >
                  <Stack
                    direction='column'
                    justifyContent='flex-start'
                    alignItems='flex-start'
                    spacing={0.5}
                  > 
                    {params.row.dsr_product_options.map((da, index) => (
                      <Box key={index}>
                        <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
                          {`${da.label}:`} 
                        </Typography>
                        <Typography variant='string' style={{ fontSize: '12px', marginLeft: '5px' }}>
                          {da.value}
                        </Typography>
                      </Box> 
                    ))}
                  </Stack>  
                </Box>
              </Box>    
            </Item>
          </Grid>
          <Grid item xs={2} sm={4} md={12}>
          <Item>
          <Box
            sx={{ backgroundColor: 'white', borderRadius: '10px 10px 10px 10px', width: '100%', overflowX: 'auto', whiteSpace: 'nowrap' }}
          >
            <Stack
              direction='row '
              justifyContent='flex-start'
              alignItems='flex-start'
              spacing={2}
            >
              {dataLinks.map((da, index) => (
                <Box key={index} style={{border: 'black 1px solid', margin: '2px', borderRadius: '5px 5px 5px 5px', padding: '5px'}} >
                  <Stack
                    direction='row '
                    justifyContent='center'
                    alignItems='center'
                    spacing={2}
                  >
                    <Box style={{ margin: '8px 10px 0 10px', color: 'red' }}>
                      <PictureAsPdfIcon />
                    </Box>
                    <Link href={da.link} target="_blank" rel="noopener noreferrer">
                      {da.title}
                    </Link>
                  </Stack>
                </Box>
               ))}
            </Stack>
          </Box>
            </Item>  
          </Grid>
      </Grid>
    </Box>
  )
}

/* import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../auth/context/AuthContext'
import { apiRest } from '../logic/constantes' */
import { Box, Paper, Grid, styled,Typography, Stack } from '@mui/material'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  border: 'none',
}))

export const MostrarProductDie = ({hidemImages}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant='h5' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', paddingLeft: '10px', fontSize: '17px' }}>
        Image
      </Typography>
      <Grid container spacing={{ xs: 2, md: 0 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={2} sm={4} md={12}>
            <Item>
              {/* <Box style={{ backgroundColor: 'white', borderRadius: '10px', borderStyle: 'outset' }}> */}
                
                  <Stack
                    direction='column'
                    justifyContent='flex-start'
                    alignItems='flex-start'
                  >
                    <Box
                      sx={{ width: '100%', height: '700px', backgroundColor: 'white', borderStyle: 'double', borderRadius: '5px'}}
                    >
                        <img
                          src={ hidemImages.Url }
                          alt=""
                          style={{ width: '100%', height: '100%' }}
                          //onError={handleImageError}
                        />
                      
                    </Box>
                   
                  </Stack>  
                {/* </Box> */}
            </Item>
          </Grid>
          {/* <Grid item xs={2} sm={4} md={12}>
            <Item>
                <Box
                    sx={{ backgroundColor: 'white', borderRadius: '10px 10px 10px 10px', width: '100%', overflowX: 'auto', whiteSpace: 'nowrap' }}
                >
                    <Stack
                    direction='row '
                    justifyContent='center'
                    alignItems='center'
                    spacing={2}
                    >
                    
                    <Button variant="contained" startIcon={<DeleteIcon />} style={{ backgroundColor: '#00A1E0' }} onClick={() => deleteImageIssues(params.row.id, hidemImages.nameImage)} >
                        Delete
                    </Button>
                        
                    </Stack>
                </Box>
            </Item>  
          </Grid> */}
      </Grid>
    </Box>
  )
}

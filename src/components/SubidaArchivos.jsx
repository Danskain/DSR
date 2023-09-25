import { Box, styled, Grid, Typography, Paper } from '@mui/material'
import { UploadButtonDsr } from '../drs/components'
import { useState } from 'react'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  border: 'none',
}))

export const SubidaArchivos = ({params, dataMapping, handleCloseModal}) => {
  const [selectedFile, setSelectedFile] = useState([])
  const [idTransactionies, setIdTransactionies] = useState('')
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant='h5' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', paddingLeft: '10px', fontSize: '17px' }}>
        UPLOAD image png
      </Typography>
      <Grid container spacing={{ xs: 2, md: 0 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={2} sm={4} md={12}>
            <Item>
              <Box
                sx={{ backgroundColor: 'white', borderStyle: 'outset', borderRadius: '10px 10px 10px 10px', width: '100%', p: '5px' }}
              >
                <UploadButtonDsr handleCloseModal={handleCloseModal} dataMapping={dataMapping} params={params} idTransactionies={idTransactionies} selectedFile={selectedFile} setSelectedFile={setSelectedFile} option={1} nameButton={'Select image to upload'} setIdTransactionies={setIdTransactionies}/>
              </Box>
            </Item>
          </Grid>
          {/* <Grid item xs={2} sm={4} md={12}>
            <Item2 elevation={8}>
              <Stack
                direction='row '
                justifyContent='flex-start'
                alignItems='flex-start'
                spacing={2}
              >
                <Box style={{ margin: '8px 10px 0 10px', color: 'red' }}>
                  <PictureAsPdfIcon />
                </Box>
                <Link href={'#'} target="_blank" rel="noopener noreferrer">
                  Thermal Label
                </Link>
              </Stack>
            </Item2>
          </Grid> */}
      </Grid>
    </Box>
  )
}

import { DsrUploadButton } from '../components'
import { Box, Typography, Stack, Button } from '@mui/material'
export const DsrSubirImages = ({saveImageData, selectedFile, setSelectedFile, option, nameButton, setIdTransactionies, params, handleCloseModal}) => {
  //const [activityDisabled, setActivityDisabled] = useState(true)
  return (
    <Box style={{ backgroundColor: 'white', width: '400px' }}>
    <Typography variant='h6' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', fontSize: '17px' }}>
      Upload images
    </Typography>
    <Box style={{ padding: '20px 20px 0 20px' }}>
      <Stack
        direction='column'
        justifyContent='flex-start'
        alignItems='flex-start'
        spacing={0.5}
      >
        <DsrUploadButton saveImageData={saveImageData} params={params} selectedFile={selectedFile} setSelectedFile={setSelectedFile} setIdTransactionies={setIdTransactionies} option={option} nameButton={nameButton} />
      </Stack>
      <Stack
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={2}
        sx={{ /* display: { lg: 'flex', md: 'none' },  */margin: '30px' }}
      >
        <Button
          style={{ backgroundColor: '#00A1E0' }} 
          variant='contained'
          onClick={handleCloseModal}
          //disabled={activityDisabled}
        >
          Close
        </Button>
      </Stack>
    </Box>
  </Box>
  )
}

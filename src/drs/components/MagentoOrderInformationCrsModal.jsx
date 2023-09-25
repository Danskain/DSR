import { Box, Paper, Grid, styled,Typography, Stack, Modal } from '@mui/material'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    border: 'none',
  }))

  const style = {  
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '800px', 
    overflow: 'auto',
    maxWidth: '800px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderStyle: 'outset',
    borderRadius: '12px'
  }

export const MagentoOrderInformationCrsModal = ({
    hidemImages,
    setHidemImages,
    handleCloseModal,
    openModal,
    arrayModalCsr
  }) => {
    
  const handleImageError = () => {
    setHidemImages(`https://prestodemos.com/dsr/img/big.png`);
  }
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition={true}
    >
      <Box sx={style}>
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
                        {arrayModalCsr.map((da, index) => (
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
        </Grid>
        </Box>
      </Box>
    </Modal>
  )
}

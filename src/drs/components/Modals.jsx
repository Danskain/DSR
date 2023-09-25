import { Grid, Backdrop, Box, Modal, Fade, Typography, Stack } from '@mui/material'
/* import Grid from '@mui/material/Unstable_Grid2' */
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  borderColor: '#9C9C9C',
  border: '2px solid #000',
  boxShadow: 24,
  p: 0.5,
  borderRadius: '10px 10px 0 0'
};

export const Modals = ({ open, handleClose, infoBillingResult, infoShippingResult }) => {
  /* const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); */
  const info = infoBillingResult
  const infos = infoShippingResult 
  return (
    <>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
                timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Grid container spacing={0}>
                <Grid xs={6}>
                  <Typography variant='h6' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', marginRight: '8px' }}>
                    Shipping Information
                  </Typography>
                  <Box sx={{ width: '98%', backgroundColor: '#DEDEDE', overflow: 'auto' }}>
                    <Stack
                      direction='column'
                      justifyContent='flex-start'
                      alignItems='flex-start'
                      spacing={0}
                      style={{ marginLeft: '10px' }}
                    >
                      
                        <Typography variant='h6' style={{ fontSize: '19px' }}>
                          {info.firstname} {info.lastname}
                        </Typography>
                      
                      
                        <Typography variant='h6' style={{ fontSize: '19px' }}>
                          {info.company}
                        </Typography>
                      
                        <Typography variant='h6' style={{ fontSize: '19px' }}>
                          {info.street}
                        </Typography>
                      
                        <Typography variant='h6' style={{ fontSize: '19px' }}>
                          {info.city}, {info.region}, {info.postcode}
                        </Typography>
                      
                        <Typography variant='h6' style={{ fontSize: '19px' }}>
                          {info.telephone}
                        </Typography>
                      
                    </Stack>
                  </Box>
                </Grid>
                <Grid xs={6}>
                  <Typography variant='h6' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white' }}>
                    Billing Information
                  </Typography>
                  <Box sx={{ width: '100%', backgroundColor: '#DEDEDE', overflow: 'auto' }}>
                    <Stack
                      direction='column'
                      justifyContent='flex-start'
                      alignItems='flex-start'
                      spacing={0}
                      style={{ marginLeft: '10px' }}
                    >
                      
                        <Typography variant='h6' style={{ fontSize: '19px' }}>
                          {infos.firstname} {info.lastname}
                        </Typography>
                      
                      
                        <Typography variant='h6' style={{ fontSize: '19px' }}>
                          {infos.company}
                        </Typography>
                      
                        <Typography variant='h6' style={{ fontSize: '19px' }}>
                          {infos.street}
                        </Typography>
                      
                        <Typography variant='h6' style={{ fontSize: '19px' }}>
                          {infos.city}, {infos.region}, {infos.postcode}
                        </Typography>
                      
                        <Typography variant='h6' style={{ fontSize: '19px' }}>
                          {infos.telephone}
                        </Typography>
                    </Stack>
                  </Box>
                </Grid>  
              </Grid>
            </Box>
          </Fade>
        </Modal>
    </>
  )
}

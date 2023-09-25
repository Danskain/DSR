//import { useState } from 'react'

import { Box, Backdrop, Typography, Modal, Fade, TextField, Grid, styled, Paper, FormControl, Stack } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px 10px 10px',
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  //textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  border: 'none',
}));

export const AddModify = ({openModal, handleCloseModal}) => {

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 1000,
          },
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <Typography variant='h5' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', paddingLeft: '10px', fontSize: '22px' }}>
              Add New
            </Typography>
            <Box
              style={{ padding: 15 }}
            >
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={2} sm={4} md={4} >
                  <Item>
                    <Stack
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="stretch"
                      spacing={3}
                    >
                      <FormControl>
                        <Typography id="transition-modal-title" variant="string" component="h4">
                          Name
                        </Typography>
                        <TextField id="outlined-basic" variant="standard" fullWidth />
                      </FormControl>
                      <FormControl>
                        <Typography id="transition-modal-title" variant="string" component="h4">
                          Labels
                        </Typography>
                        <TextField id="outlined-basic" variant="standard" fullWidth />
                      </FormControl>
                      <FormControl>
                        <Typography id="transition-modal-title" variant="string" component="h4">
                          Minumurn Stock Count
                        </Typography>
                        <TextField id="outlined-basic" variant="standard" fullWidth />
                      </FormControl>
                      <FormControl>
                        <Typography id="transition-modal-title" variant="string" component="h4">
                          Quantity
                        </Typography>
                        <TextField id="outlined-basic" variant="standard" fullWidth />
                      </FormControl>
                    </Stack>
                  </Item>
                </Grid>
                <Grid item xs={2} sm={4} md={4} >
                  <Item>
                    <Stack
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="stretch"
                      spacing={3}
                    >
                      <FormControl>
                        <Typography id="transition-modal-title" variant="string" component="h4">
                          SKU
                        </Typography>
                        <TextField id="outlined-basic" variant="standard" fullWidth />
                      </FormControl>
                      <FormControl>
                        <Typography id="transition-modal-title" variant="string" component="h4">
                          Area
                        </Typography>
                        <TextField id="outlined-basic" variant="standard" fullWidth />
                      </FormControl>
                      <FormControl>
                        <Typography id="transition-modal-title" variant="string" component="h4">
                          Transaction Date
                        </Typography>
                        <TextField id="outlined-basic" variant="standard" fullWidth />
                      </FormControl>
                      <FormControl>
                        <Typography id="transition-modal-title" variant="string" component="h4">
                          Unit Cost ($)
                        </Typography>
                        <TextField id="outlined-basic" variant="standard" fullWidth />
                      </FormControl>
                    </Stack>
                  </Item>
                </Grid>
                <Grid item xs={2} sm={4} md={4} >
                  <Item>
                    <Stack
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="stretch"
                      spacing={3}
                    >
                      <FormControl>
                        <Typography id="transition-modal-title" variant="string" component="h4">
                          Summary
                        </Typography>
                        <TextField id="outlined-basic" variant="standard" fullWidth />
                      </FormControl>
                      <FormControl>
                        <Typography id="transition-modal-title" variant="string" component="h4">
                          Manufacturer
                        </Typography>
                        <TextField id="outlined-basic" variant="standard" fullWidth />
                      </FormControl>
                      <FormControl>
                        <Typography id="transition-modal-title" variant="string" component="h4">
                          Comments
                        </Typography>
                        <TextField id="outlined-basic" variant="standard" fullWidth />
                      </FormControl>
                    </Stack>
                  </Item>
                </Grid>
                <Grid item xs={2} sm={4} md={12} >
                  <Item>
                    <Stack
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="stretch"
                      spacing={3}
                    >
                      <LoadingButton
                        style={{ backgroundColor: '#00A1E0' }}
                        //loading={loadingSave}
                        variant="contained"
                        //onClick={nextTemplate}
                      >
                        save
                      </LoadingButton>
                    </Stack>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
//import { useState } from 'react'

import { Box, Backdrop, Typography, Modal, Fade, TextField, Grid, styled, Paper, FormControl, Stack, Select, MenuItem } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { TextareaAutosize } from '@mui/base'
//import { SelectInput } from '../../components'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
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

export const ModalAddDie = ({openModal, handleCloseModal}) => {

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
                <Grid item xs={2} sm={4} md={6} >
                  <Item>
                    <Stack
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="stretch"
                      spacing={3}
                    >
                      <FormControl>
                        <Typography id="transition-modal-title" variant="string" component="h3" style={{ marginBottom: '5px' }} >
                          Type Die
                        </Typography>
                        <Select
                          labelId='demo-simple-select-standard-label'
                          id='demo-simple-select-standard'
                          //value={age}
                          //onChange={handleChange}
                          //label='Status'
                          variant="standard"
                          style={{fontSize: '12px'}}
                        >
                          {/* {valorData.map((da) => (
                            <MenuItem key={da.id} value={da.value}>{da.name}</MenuItem>
                          ))} */}
                          <MenuItem value={'david'}>Dia</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <Typography id="transition-modal-title" variant="string" component="h3">
                          Code
                        </Typography>
                        <TextField id="outlined-basic" variant="standard" fullWidth />
                      </FormControl>
                      <FormControl>
                        <Typography id="transition-modal-title" variant="string" component="h3">
                          Open Size
                        </Typography>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={0.5}
                        >
                         <TextField id="outlined-basic" variant="standard" fullWidth />
                         <TextField id="outlined-basic" variant="standard" fullWidth />
                        </Stack>
                      </FormControl>
                      <FormControl>
                        <Typography id="transition-modal-title" variant="string" component="h3">
                          Labels
                        </Typography>
                        <TextField id="outlined-basic" variant="standard" fullWidth />
                      </FormControl>
                    </Stack>
                  </Item>
                </Grid>
                <Grid item xs={2} sm={4} md={6} >
                  <Item>
                    <Stack
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="stretch"
                      spacing={3}
                    >
                      <FormControl>
                        <Typography id="transition-modal-title" variant="string" component="h3" style={{ marginBottom: '5px' }} >
                          Qty. Pockets
                        </Typography>
                        <Select
                          labelId='demo-simple-select-standard-label'
                          id='demo-simple-select-standard'
                          //value={age}
                          //onChange={handleChange}
                          //label='Status'
                          variant="standard"
                          style={{fontSize: '12px'}}
                        >
                          {/* {valorData.map((da) => (
                            <MenuItem key={da.id} value={da.value}>{da.name}</MenuItem>
                          ))} */}
                          <MenuItem value={'david'}>Dia</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <Typography id="transition-modal-title" variant="string" component="h3">
                          Area
                        </Typography>
                        <TextField id="outlined-basic" variant="standard" fullWidth />
                      </FormControl>
                      <FormControl>
                        <Typography id="transition-modal-title" variant="string" component="h3">
                          Labels
                        </Typography>
                        <TextField id="outlined-basic" variant="standard" fullWidth />
                      </FormControl>
                      <FormControl>
                        <Typography id="transition-modal-title" variant="string" component="h3">
                          Labels
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
                      <FormControl>
                        <Typography id="transition-modal-title" variant="string" component="h3">
                          SKU
                        </Typography>
                        <TextareaAutosize
                          aria-label='minimum height'
                          minRows={3}
                          style={{ width: '100%', borderRadius: '5px' }}
                          name='description'
                          //value={emailCC}
                          //onChange={chanceEmailCC}
                          /* defaultValue={orderWebsite.websiteCC}
                          ref={inputRefEmailCC} */
                        />
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
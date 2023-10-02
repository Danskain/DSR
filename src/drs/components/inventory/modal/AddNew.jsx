
import { Box, Typography, TextField, Grid, styled, Paper, FormControl, Stack } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
  padding: theme.spacing(0),
  //textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  border: 'none',
}))

export const AddNew = () => {
  return (
    <div>
        <Typography variant='h5' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', paddingLeft: '10px', fontSize: '22px' }}>
              Add Inventory
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
                          Area
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
                          Manufacturer
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
                          Minimum Stock Count
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
    </div>
  )
}

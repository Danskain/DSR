import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../auth/context/AuthContext'
import { Box, Fade, Modal, Backdrop } from '@mui/material'
import { ModalUsersCrud, Alerts, ModalUsersProfiles } from '../components'
import { apiRest } from '../../logic/constantes'

//import AdbIcon from '@mui/icons-material/Adb'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  //width: 660,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '10px',
  //p: 1
};

export const ModalUsers = ({
  open,
  handleClose,
  optionsModalUser
}) => {

  const [openAlerts, setOpenAlerts] = useState(false)
  const [alertsOptions, setAlertsOptions] = useState({})
  const [dataUserProfile, setDataUserProfile] = useState([])
  const [dataUserInformation, setDataUserInformation] = useState([])

  const { token } = useContext(AuthContext)

  const fetchDataUser = async () => {
    const request = {
      token
    }
    request.option = 'dataUser'
    request.controller = 'user'

    const requestOptions = {
      method: 'POST',
      //headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(request)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { type, message, dataProfile, dataUsers } = datas
        
        if (type === 'ok') {
          setDataUserProfile(dataProfile)
          setDataUserInformation(dataUsers)
        }

        if (type === 'error') {
          setAlertsOptions({
            types: type,
            message
          })
          setOpenAlerts(true)
          if (message === 'invalid token') {
            logout()
          }
        }
      })
      .catch(error => console.log(error))
  }

  /* const fetchDataProfiles = async () => {
    const request = {
      token
    }
    request.option = 'dataProfiles'
    request.controller = 'user'

    const requestOptions = {
      method: 'POST',
      //headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(request)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { type, message } = datas
        console.log("🚀 ~ file: ModalUsers.jsx:51 ~ fetchDataUser ~ datas:", datas)
        
        if (type === 'ok') {
          setDataUserProfile(dataProfile)
          setDataUserInformation(dataUsers)
        }

        if (type === 'error') {
          setAlertsOptions({
            types: type,
            message
          })
          setOpenAlerts(true)
          if (message === 'invalid token') {
            logout()
          }
        }
      })
      .catch(error => console.log(error))
  } */

  useEffect(() => {
    //fetchDataUserSelects()
    fetchDataUser()
    //fetchDataProfiles()
  }, [])

  const renderModals = (text) => {
    const objOrdanamiento = {
      'Create and Modify Users': <ModalUsersCrud fetchDataUser={fetchDataUser} setAlertsOptions={setAlertsOptions} setOpenAlerts={setOpenAlerts} dataUserProfile={dataUserProfile} dataUserInformation={dataUserInformation} />,
      'Create and Modify Profiles': <ModalUsersProfiles fetchDataUser={fetchDataUser} setAlertsOptions={setAlertsOptions} setOpenAlerts={setOpenAlerts} dataUserProfile={dataUserProfile} dataUserInformation={dataUserInformation} />,
    }
    const COLORS_CELL_DEFAULT = ''
    return objOrdanamiento[text] || COLORS_CELL_DEFAULT
  }

  
  return (
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
            {/* <Box style={{ backgroundColor: 'white', borderRadius: '10px', borderStyle: 'outset' }}>
              <Typography variant='h6' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', fontSize: '15px' }}>            
                Users Management
              </Typography>
              <Box style={{ padding: '20px 20px 0 20px' }}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={2} sm={4} md={12}>
                    <Item>
                      {newM &&
                        <div style={{ width: '100%', padding: '0 20% 0 20%' }}>
                          <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '14px' }}>
                            Users Data
                          </Typography>
                          <TextField
                            id="standard-select-currency"
                            select
                            fullWidth
                            //label="Select"
                            //defaultValue="EUR"
                            //helperText="Please select your currency"
                            name='selectDataUser'
                            value={selectDataUser}
                            onChange={handleChangeTemplate}
                            variant="filled"
                          >
                            {dataUserInformation.map((option) => (
                              <MenuItem key={option.user__email} value={option.user__user}>
                                {option.user__name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </div>
                      }
                    </Item>
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <Item>
                      <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '14px' }}>
                        User
                      </Typography>
                      <TextField
                        style={{ marginBottom: '8px' }}
                        id="standard-basic"
                        variant="standard"
                        fullWidth
                        name='user'
                        value={objInputs.user}
                        onChange={handleChange}
                      />
                      <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '14px' }}>
                        Lastname
                      </Typography>
                      <TextField
                        style={{ marginBottom: '8px' }}
                        id="standard-basic"
                        variant="standard"
                        fullWidth
                        name='lastname'
                        value={objInputs.lastname}
                        onChange={handleChange}
                      />
                      <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '14px' }}>
                        Enabled/Disabled
                      </Typography>
                      <br />
                      <Checkbox
                        {...label}
                        name='userd'
                        checked={objInputs.userd}
                        //value={objInputs.userd}
                        onChange={handleChange}
                      />
                    </Item>
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <Item>
                      <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '14px' }}>
                        Name
                      </Typography>
                      <TextField
                        style={{ marginBottom: '8px' }}
                        id="standard-basic"
                        variant="standard"
                        fullWidth
                        name='name'
                        value={objInputs.name}
                        onChange={handleChange}
                      />
                      <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '14px' }}>
                        Email
                      </Typography>
                      <TextField
                        style={{ marginBottom: '8px' }}
                        id="standard-basic"
                        variant="standard"
                        fullWidth
                        type='email'
                        name='email'
                        value={objInputs.email}
                        onChange={handleChange}
                      />
                      <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '14px' }}>
                        Users Profiles
                      </Typography>
          
                      <TextField
                        id="standard-select-currency"
                        select
                        fullWidth
                        //label="Select"
                        //defaultValue="EUR"
                        //helperText="Please select your currency"
                        name='usersProfiles'
                        value={objInputs.usersProfiles}
                        onChange={handleChange}
                        variant="standard"
                      >
                        {dataUserProfile.map((option) => (
                          <MenuItem key={option.profile__id} value={option.profile__name}>
                            {option.profile__name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Item>
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <Item>
                      <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '14px' }}>
                        Menu items
                      </Typography>
                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={0}
                      >
                        <FormGroup>
                          <FormControlLabel control={<Checkbox size="small" name='dsr' checked={objInputs.dsr} onChange={handleChangeChecked} />} label={<span className="custom-label" >Dsr</span>} />
                          <FormControlLabel control={<Checkbox size="small" name='detrack' checked={objInputs.detrack} onChange={handleChangeChecked} />} label={<span className="custom-label" >Detrack</span>}/>
                          <FormControlLabel control={<Checkbox size="small" name='flagship' checked={objInputs.flagship} onChange={handleChangeChecked} />} label={<span className="custom-label" >Flagship</span>}/>
                          <FormControlLabel control={<Checkbox size="small" name='dhl' checked={objInputs.dhl} onChange={handleChangeChecked} />} label={<span className="custom-label" >Dhl</span>}/>
                          <FormControlLabel control={<Checkbox size="small" name='magento' checked={objInputs.magento} onChange={handleChangeChecked} />} label={<span className="custom-label" >Magento</span>}/>
                          <FormControlLabel control={<Checkbox size="small" name='accounting' checked={objInputs.accounting} onChange={handleChangeChecked} />} label={<span className="custom-label" >Accounting</span>}/>
                        </FormGroup>
                        <FormGroup>
                          <FormControlLabel control={<Checkbox size="small" name='links' checked={objInputs.links} onChange={handleChangeChecked} />} label={<span className="custom-label" >Links</span>}/>
                          <FormControlLabel control={<Checkbox size="small" name='productDie' checked={objInputs.productDie} onChange={handleChangeChecked} />} label={<span className="custom-label" >Product Die</span>}/>
                          <FormControlLabel control={<Checkbox size="small" name='production' checked={objInputs.production} onChange={handleChangeChecked} />} label={<span className="custom-label" >Production</span>}/>
                          <FormControlLabel control={<Checkbox size="small" name='templateEmailStatus' checked={objInputs.templateEmailStatus} onChange={handleChangeChecked} />} label={<span className="custom-label" >Template Email Status</span>}/>
                          <FormControlLabel control={<Checkbox size="small" name='historyIssues' checked={objInputs.historyIssues} onChange={handleChangeChecked} />} label={<span className="custom-label" >History Issues</span>}/>
                        </FormGroup>
                      </Stack>
                    </Item>
                  </Grid>
                  <Grid item xs={2} sm={4} md={6}>
                    <Item>
                      <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '14px' }}>
                        Tabs items
                      </Typography>
                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={0}
                      >
                        <FormGroup>
                          <FormControlLabel control={<Checkbox size="small" name='urgents' checked={objInputs.urgents} onChange={handleChangeChecked} />} label={<span className="custom-label" >Urgents</span>} />
                          <FormControlLabel control={<Checkbox size="small" name='deliveryToday' checked={objInputs.deliveryToday} onChange={handleChangeChecked} />} label={<span className="custom-label" >Delivery Today</span>} />
                          <FormControlLabel control={<Checkbox size="small" name='shipToday' checked={objInputs.shipToday} onChange={handleChangeChecked} />} label={<span className="custom-label" >Ship Today</span>} />
                          <FormControlLabel control={<Checkbox size="small" name='hardCopyProf' checked={objInputs.hardCopyProf} onChange={handleChangeChecked} />} label={<span className="custom-label" >Hard Copy Prof</span>} />
                          <FormControlLabel control={<Checkbox size="small" name='sampleKit' checked={objInputs.sampleKit} onChange={handleChangeChecked} />} label={<span className="custom-label" >Sample Kit</span>} />
                          <FormControlLabel control={<Checkbox size="small" name='prelimTomorrow' checked={objInputs.prelimTomorrow} onChange={handleChangeChecked} />} label={<span className="custom-label" >Prelim. Tomorrow</span>} />
                        </FormGroup>
                        <FormGroup >
                          <FormControlLabel control={<Checkbox size="small" name='prelim2ndDat' checked={objInputs.prelim2ndDat} onChange={handleChangeChecked} />} label={<span className="custom-label" >Prelim.2nd Dat</span>} />
                          <FormControlLabel control={<Checkbox size="small" name='prelimAfter2Days' checked={objInputs.prelimAfter2Days} onChange={handleChangeChecked} />} label={<span className="custom-label" >Prelim. After 2 Days</span>} />
                          <FormControlLabel control={<Checkbox size="small" name='dsrGeneral' checked={objInputs.dsrGeneral} onChange={handleChangeChecked} />} label={<span className="custom-label" >Dsr General</span>} />
                          <FormControlLabel control={<Checkbox size="small" name='whithoutDate' checked={objInputs.whithoutDate} onChange={handleChangeChecked} />} label={<span className="custom-label" >Whithout Date</span>} />
                          <FormControlLabel control={<Checkbox size="small" name='completedOrders' checked={objInputs.completedOrders} onChange={handleChangeChecked} />} label={<span className="custom-label" >Completed Orders</span>} />
                          <FormControlLabel control={<Checkbox size="small" name='skToFollow' checked={objInputs.skToFollow} onChange={handleChangeChecked} />} label={<span className="custom-label" >Sk To Follow</span>} />
                          <FormControlLabel control={<Checkbox size="small" name='issues' checked={objInputs.issues} onChange={handleChangeChecked} />} label={<span className="custom-label" >Issues</span>} />
                        </FormGroup>
                      </Stack>
                    </Item>
                  </Grid>
                </Grid>
                <Stack
                  direction='row'
                  justifyContent='center'
                  alignItems='center'
                  spacing={2}
                  sx={{ display: { lg: 'flex', md: 'none' }, margin: '30px' }}
                >
                  <LoadingButton
                    style={{ backgroundColor: '#00A1E0' }}
                    loading={loadingSaveModified}
                    variant="contained"
                    onClick={saveModifiedTemplate}
                  >
                    {newM ? 'modified' : 'save'}
                  </LoadingButton>
                  <Button
                    variant='contained'
                    style={{ backgroundColor: '#00A1E0' }}
                    onClick={handelNew}
                  >
                    {newM ? 'new' : 'cancel'}
                  </Button>
                </Stack>
              </Box>
            </Box> */}
            {renderModals(optionsModalUser)}
            <Alerts open={openAlerts} setOpen={setOpenAlerts} alertsOptions={alertsOptions} />
          </Box>
        </Fade>
      </Modal>
  )
}

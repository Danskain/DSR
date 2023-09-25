import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../auth/context/AuthContext'
//import { SelectInput } from '../../drs/components'
import LoadingButton from '@mui/lab/LoadingButton'
/* import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff' */
import { Button, Box, Typography, Stack, Checkbox, FormGroup, FormControlLabel, styled, Paper, Grid, TextField, MenuItem } from '@mui/material'
import { apiRest } from '../../logic/constantes'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  //textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  border: 'none',
}));

const ItemDos = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  border: 'none',
}));

export const ModalUsersProfiles = ({
  fetchDataUser,
  setAlertsOptions,
  setOpenAlerts,
  dataUserProfile,
  dataUserInformation
}) => {

  const [dataMenuR, setDataMenuR] = useState([])
  const [dataTabsR, setDataTabsR] = useState([])

  const [newM, setNewM] = useState(true)

  /* const [objInputs, setObjInputs] = useState({
    'DSR': false,
    'DETRACK': false,
    'FLAGSHIP': false,
    'DHL': false,
    'MAGENTO': false,
    'ACCOUNTING': false,
    'LINKS': false,
    'PRODUCT DIE': false,
    'PRODUCTION': false,
    'TEMPLATE EMAIL STATUS': false,
    'HISTORY ISSUES': false,
    'Urgents': false,
    'Delivery Today': false,
    'Ship Today': false,
    'Hard Copy Prof': false,
    'Sample Kit': false,
    'Prelim. Tomorrow': false,
    'Prelim.2nd Day': false,
    'Prelim. 3nd Day': false,
    'Prelim. After 3 Days': false,
    'DSR General': false,
    'Without date': false,
    'Completed Orders': false,
    'SK to Follow': false,
    'Issues': false,
  }) */

  const [selectDataUser, setSelectDataUser] = useState('')
  const [dataProfile, setDataProfile] = useState('')
  const [newProfiles, setNewProfiles] = useState('')
  const [loadingSaveModified, setLoadingSaveModified] = useState(false)
  const [ejecutarSave, setEjecutarSave] = useState(true)

  const { token, user } = useContext(AuthContext)

  const handleChangenewProfiles = (e) => {
    setNewProfiles(e.target.value)
  }

  const formartTabsMnus = (dato) => {
    if (dato === 1) {
      return true
    }
    return false
  }

  const formartData = (dato) => {
    const arrayResultDataMenu = dato.map((data) => {
      return {
        ...data,
        sn_check: formartTabsMnus(data.sn_check)
      }
    })
    return arrayResultDataMenu
  }

  const formartDataNuw = (dato) => {
    const arrayResultDataMenu = dato.map((data) => {
      return {
        ...data,
        sn_check: false
      }
    })
    return arrayResultDataMenu
  }

  const fetchOrofilexItems = async (idProfile) => {
    const request = {
      token
    }
    request.option = 'profilexItems'
    request.controller = 'user'
    request.idProfile = idProfile

    const requestOptions = {
      method: 'POST',
      //headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(request)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { type, message, dataMenu, dataTabs } = datas
        if (type === 'ok') {
          /* const arrayResultDataMenu = dataMenu.map((data) => {
            return {
              ...data,
              sn_check: formartTabsMnus(data.sn_check)
            }
          })
          console.log("arrayResultDataMenu:", arrayResultDataMenu) */
          setDataMenuR(formartData(dataMenu))
          setDataTabsR(formartData(dataTabs))
          /* setObjInputs({
            [arregloCombinado[0].menu__label]: formartTabsMnus(arregloCombinado[0].sn_check),
            [arregloCombinado[1].menu__label]: formartTabsMnus(arregloCombinado[1].sn_check),
            [arregloCombinado[2].menu__label]: formartTabsMnus(arregloCombinado[2].sn_check),
            [arregloCombinado[3].menu__label]: formartTabsMnus(arregloCombinado[3].sn_check),
            [arregloCombinado[4].menu__label]: formartTabsMnus(arregloCombinado[4].sn_check),
            [arregloCombinado[5].menu__label]: formartTabsMnus(arregloCombinado[5].sn_check),
            [arregloCombinado[6].menu__label]: formartTabsMnus(arregloCombinado[6].sn_check),
            [arregloCombinado[7].menu__label]: formartTabsMnus(arregloCombinado[7].sn_check),
            [arregloCombinado[8].menu__label]: formartTabsMnus(arregloCombinado[8].sn_check),
            [arregloCombinado[9].menu__label]: formartTabsMnus(arregloCombinado[9].sn_check),
            [arregloCombinado[10].menu__label]: formartTabsMnus(arregloCombinado[10].sn_check),
            [arregloCombinado[11].dsr_tab__label]: formartTabsMnus(arregloCombinado[11].sn_check),
            [arregloCombinado[12].dsr_tab__label]: formartTabsMnus(arregloCombinado[12].sn_check),
            [arregloCombinado[13].dsr_tab__label]: formartTabsMnus(arregloCombinado[13].sn_check),
            [arregloCombinado[14].dsr_tab__label]: formartTabsMnus(arregloCombinado[14].sn_check),
            [arregloCombinado[15].dsr_tab__label]: formartTabsMnus(arregloCombinado[15].sn_check),
            [arregloCombinado[16].dsr_tab__label]: formartTabsMnus(arregloCombinado[16].sn_check),
            [arregloCombinado[17].dsr_tab__label]: formartTabsMnus(arregloCombinado[17].sn_check),
            [arregloCombinado[18].dsr_tab__label]: formartTabsMnus(arregloCombinado[18].sn_check),
            [arregloCombinado[19].dsr_tab__label]: formartTabsMnus(arregloCombinado[19].sn_check),
            [arregloCombinado[20].dsr_tab__label]: formartTabsMnus(arregloCombinado[20].sn_check),
            [arregloCombinado[21].dsr_tab__label]: formartTabsMnus(arregloCombinado[21].sn_check),
            [arregloCombinado[22].dsr_tab__label]: formartTabsMnus(arregloCombinado[22].sn_check),
            [arregloCombinado[23].dsr_tab__label]: formartTabsMnus(arregloCombinado[23].sn_check),
            [arregloCombinado[24].dsr_tab__label]: formartTabsMnus(arregloCombinado[24].sn_check),
          }) */
        }

        if (type === 'error') {
          setLoadingSaveModified(false)
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

  useEffect(() => {
    const arrayResultP = [...dataUserProfile]
    const arrayResult = [...dataUserInformation]
    if (newM) {
      let stringUser = ''
      if (dataProfile === '') {
        arrayResult.forEach((element) => {
          if (element.user__name === user.name) {
            stringUser = element.profile__name
            setSelectDataUser(element.profile__name)
          }
        })
      } else {
        stringUser = dataProfile
        setSelectDataUser(stringUser)
      }
      const even = arrayResultP.filter(e => stringUser === e.profile__name)
      fetchOrofilexItems(even[0].profile__id)
      return
    }
    
    const dataMenu = [...dataMenuR] 
    const dataTabs = [...dataTabsR]
    setDataMenuR(formartDataNuw(dataMenu))
    setDataTabsR(formartDataNuw(dataTabs))
    setNewProfiles('')
    setEjecutarSave(true)
  }, [newM, dataUserProfile, dataProfile, ejecutarSave]);

  const handelNew = () => {
    fetchDataUser()
    setNewM(!newM)
  }

  const handleChangeCheckedMenu = (e, id) => {
    const dataMenuResult = [...dataMenuR]
    const formartDataMenuResult = dataMenuResult.map((data) => {
      if (data.menu__id === id) {
        return {
          ...data,
          sn_check: e.target.checked === true ? formartTabsMnus(1) : formartTabsMnus(e.target.checked)
        }
      }
      return data
    })
    setDataMenuR(formartDataMenuResult)
    /* setObjInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked
    })) */
  }
  
  const handleChangeCheckedTabs = (e, id) => {
    const dataMenuResult = [...dataTabsR]
    const formartDataMenuResult = dataMenuResult.map((data) => {
      if (data.dsr_tab__id === id) {
        return {
          ...data,
          sn_check: e.target.checked === true ? formartTabsMnus(1) : formartTabsMnus(e.target.checked)
        }
      }
      return data
    })
    setDataTabsR(formartDataMenuResult)
    /* setObjInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked
    })) */
  }  
  
  const handleChangeTemplate = (e) => {
    setDataProfile(e.target.value)
  }

  const fetchUpdateUser = async (request) => {
    request.token = token
    request.option = 'saveProfile'
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
        
        if (type === 'ok') {
          fetchDataUser()
          setAlertsOptions({
            types: 'success',
            message
          })
          setOpenAlerts(true)
          if (!newM) {
            setEjecutarSave(false)
          }
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
      .finally(() => {
        setLoadingSaveModified(false)
      });
  }

  const formaterIdProfileMenu = (datas) => {
    const dataresult = datas
      .filter(data => data.sn_check === true) // Filtrar mayores de 18
      .map(data => {return { menu__id:data.menu__id}})
    return dataresult
  }

  const formaterIdProfileTab = (datas) => {
    const dataresult = datas
      .filter(data => data.sn_check === true) // Filtrar mayores de 18
      .map(data => {return { dsr_tab__id:data.dsr_tab__id}})
    return dataresult
  }

  const validateArrayMenuTabas = (datas) => {
    const contieneNumeroPar = datas.some(data => data.sn_check === true)
    return contieneNumeroPar
  }

  const saveModifiedTemplate = () => {
    const arrayResultDataMenuR = [...dataMenuR]
    const arrayResultDataTabsR = [...dataTabsR]

    if (!newM) {
      if (newProfiles === '') {
        setAlertsOptions({
          types: 'error',
          message: 'the profile must have a name' 
        })
        setOpenAlerts(true)
        return
      }
    }
    
    if (!validateArrayMenuTabas(arrayResultDataMenuR)) {
      setAlertsOptions({
        types: 'error',
        message: 'please select a Menu' 
      })
      setOpenAlerts(true)
      return
    }

    if (!validateArrayMenuTabas(arrayResultDataTabsR)) {
      setAlertsOptions({
        types: 'error',
        message: 'please select a tab' 
      })
      setOpenAlerts(true)
      return
    }

    const request = {
      newProfile: newM ? '0' : '1',
      profile: newM ?  selectDataUser : newProfiles,
      menuSelected: formaterIdProfileMenu(arrayResultDataMenuR),
      tabSelected: formaterIdProfileTab(arrayResultDataTabsR),
    }
    
    setLoadingSaveModified(true)
    fetchUpdateUser(request)
  }

  return (
    <Box style={{ width: '550px', backgroundColor: 'white', borderRadius: '10px', borderStyle: 'outset' }}>
      <Typography variant='h6' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', fontSize: '15px' }}>            
        Profiles Management
      </Typography>
      <Box style={{ padding: '20px 20px 0 20px' }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={12}>
            <Item>
              {newM ?
                <div style={{ width: '100%', padding: '0 20% 0 20%' }}>
                  <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '17px' }}>
                    Profiles Data
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
                    {dataUserProfile.map((option) => (
                        <MenuItem key={option.profile__id} value={option.profile__name}>
                        {option.profile__name}
                        </MenuItem>
                    ))}
                  </TextField>
                </div>
                :
                <div style={{ width: '100%', padding: '0 20% 0 20%' }}>
                  <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '17px' }}>
                    New Profiles
                  </Typography>
                  <TextField
                    id="standard-select-currency"
                    //select
                    fullWidth
                    //label="Select"
                    //defaultValue="EUR"
                    //helperText="Please select your currency"
                    name='newProfiles'
                    value={newProfiles}
                    onChange={handleChangenewProfiles}
                    variant="filled"
                  /> 
                </div>
              }
            </Item>
          </Grid>
          <Grid item xs={2} sm={4} md={6}>
            <ItemDos>
                <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '17px' }}>
                  Menus items
                </Typography>
                <Box
                  sx={{ width: '100%', height: '300px', overflow: 'auto', whiteSpace: 'nowrap' }}
                >
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0}
                    //sx={{ width: 'calc(100% + 17px)', height: '100%', overflowY: 'scroll', /* whiteSpace: 'nowrap' */ paddingRight: '17px',  boxSizing: 'content-box' }}
                  >
                    {/* <FormGroup>
                        <FormControlLabel control={<Checkbox name='DSR' checked={objInputs['DSR']} onChange={handleChangeChecked} />} label={<span className="custom-label" >Dsr</span>} />
                        <FormControlLabel control={<Checkbox name='DETRACK' checked={objInputs['DETRACK']} onChange={handleChangeChecked} />} label={<span className="custom-label" >Detrack</span>}/>
                        <FormControlLabel control={<Checkbox name='FLAGSHIP' checked={objInputs['FLAGSHIP']} onChange={handleChangeChecked} />} label={<span className="custom-label" >Flagship</span>}/>
                        <FormControlLabel control={<Checkbox name='DHL' checked={objInputs['DHL']} onChange={handleChangeChecked} />} label={<span className="custom-label" >Dhl</span>}/>
                        <FormControlLabel control={<Checkbox name='MAGENTO' checked={objInputs['MAGENTO']} onChange={handleChangeChecked} />} label={<span className="custom-label" >Magento</span>}/>
                        <FormControlLabel control={<Checkbox name='ACCOUNTING' checked={objInputs['ACCOUNTING']} onChange={handleChangeChecked} />} label={<span className="custom-label" >Accounting</span>}/>
                        <FormControlLabel control={<Checkbox name='LINKS' checked={objInputs['LINKS']} onChange={handleChangeChecked} />} label={<span className="custom-label" >Links</span>}/>
                        <FormControlLabel control={<Checkbox name='PRODUCT DIE' checked={objInputs['PRODUCT DIE']} onChange={handleChangeChecked} />} label={<span className="custom-label" >Product Die</span>}/>
                        <FormControlLabel control={<Checkbox name='PRODUCTION' checked={objInputs['PRODUCTION']} onChange={handleChangeChecked} />} label={<span className="custom-label" >Production</span>}/>
                        <FormControlLabel control={<Checkbox name='TEMPLATE EMAIL STATUS' checked={objInputs['TEMPLATE EMAIL STATUS']} onChange={handleChangeChecked} />} label={<span className="custom-label" >Template Email Status</span>}/>
                        <FormControlLabel control={<Checkbox name='HISTORY ISSUES' checked={objInputs['HISTORY ISSUES']} onChange={handleChangeChecked} />} label={<span className="custom-label" >History Issues</span>}/>
                    </FormGroup> */}
                    <FormGroup>
                      {dataMenuR.map((menu) => (
                        <FormControlLabel key={menu.menu__id} control={<Checkbox name={menu.menu__label} checked={menu.sn_check} onChange={(e) => handleChangeCheckedMenu(e, menu.menu__id)} />} label={<span className="custom-label" >{menu.menu__label}</span>} />
                      ))}
                    </FormGroup>
                  </Stack>
                </Box>
            </ItemDos>
          </Grid>
          <Grid item xs={2} sm={4} md={6}>
            <ItemDos>
              <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '17px' }}>
                Tabs items
              </Typography>
              <Box
                sx={{ width: '100%', height: '300px', overflow: 'auto', whiteSpace: 'nowrap' }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={0}
                  //sx={{ width: 'calc(100% + 17px)', height: '100%', overflowY: 'scroll', paddingRight: '17px',  boxSizing: 'content-box' }}
                >
                  {/* <FormGroup>
                    <FormControlLabel control={<Checkbox name='Urgents' checked={objInputs['Urgents']} onChange={handleChangeChecked} />} label={<span className="custom-label" >Urgents</span>} />
                    <FormControlLabel control={<Checkbox name='Delivery Today' checked={objInputs['Delivery Today']} onChange={handleChangeChecked} />} label={<span className="custom-label" >Delivery Today</span>} />
                    <FormControlLabel control={<Checkbox name='Ship Today' checked={objInputs['Ship Today']} onChange={handleChangeChecked} />} label={<span className="custom-label" >Ship Today</span>} />
                    <FormControlLabel control={<Checkbox name='Hard Copy Prof' checked={objInputs['Hard Copy Prof']} onChange={handleChangeChecked} />} label={<span className="custom-label" >Hard Copy Prof</span>} />
                    <FormControlLabel control={<Checkbox name='Sample Kit' checked={objInputs['Sample Kit']} onChange={handleChangeChecked} />} label={<span className="custom-label" >Sample Kit</span>} />
                    <FormControlLabel control={<Checkbox name='Prelim. Tomorrow' checked={objInputs['Prelim. Tomorrow']} onChange={handleChangeChecked} />} label={<span className="custom-label" >Prelim. Tomorrow</span>} />
                    <FormControlLabel control={<Checkbox name='Prelim.2nd Day' checked={objInputs['Prelim.2nd Day']} onChange={handleChangeChecked} />} label={<span className="custom-label" >Prelim.2nd Dat</span>} />
                    <FormControlLabel control={<Checkbox name='Prelim. 3nd Day' checked={objInputs['Prelim. 3nd Day']} onChange={handleChangeChecked} />} label={<span className="custom-label" >Prelim. 3nd Day</span>} />
                    <FormControlLabel control={<Checkbox name='Prelim. After 3 Days' checked={objInputs['Prelim. After 3 Days']} onChange={handleChangeChecked} />} label={<span className="custom-label" >Prelim. After 3 Days</span>} />
                    <FormControlLabel control={<Checkbox name='DSR General' checked={objInputs['DSR General']} onChange={handleChangeChecked} />} label={<span className="custom-label" >DSR General</span>} />
                    <FormControlLabel control={<Checkbox name='Without date' checked={objInputs['Without date']} onChange={handleChangeChecked} />} label={<span className="custom-label" >Without date</span>} />
                    <FormControlLabel control={<Checkbox name='Completed Orders' checked={objInputs['Completed Orders']} onChange={handleChangeChecked} />} label={<span className="custom-label" >Completed Orders</span>} />
                    <FormControlLabel control={<Checkbox name='SK to Follow' checked={objInputs['SK to Follow']} onChange={handleChangeChecked} />} label={<span className="custom-label" >SK to Follow</span>} />
                    <FormControlLabel control={<Checkbox name='Issues' checked={objInputs['Issues']} onChange={handleChangeChecked} />} label={<span className="custom-label" >Issues</span>} />
                  </FormGroup> */}
                  <FormGroup>
                    {dataTabsR.map((menu) => (
                      <FormControlLabel key={menu.dsr_tab__id} control={<Checkbox name={menu.dsr_tab__label} checked={menu.sn_check} onChange={(e) => handleChangeCheckedTabs(e, menu.dsr_tab__id)} />} label={<span className="custom-label" >{menu.dsr_tab__label}</span>} />
                    ))}
                  </FormGroup>
                </Stack>
              </Box>
            </ItemDos>
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
    </Box>
  )
}

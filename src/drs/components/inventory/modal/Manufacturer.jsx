import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../../../auth/context/AuthContext'
import { Box, Typography, TextField, Grid, styled, Paper, FormControl, Stack, MenuItem, Button } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { apiRest } from '../../../../logic/constantes'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
  padding: theme.spacing(0),
  //textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  border: 'none',
}))

export const Manufacturer = ({dataModalInventory, setAlertsOptions, setOpenAlerts, fetchDataManufactorer}) => {
  const  [newEditManufacture, setNewEditManufacture] = useState(true)
  const  [selectDataManufacture, setSelectDataManufacture] = useState('')
  const [loadingSaveModified, setLoadingSaveModified] = useState(false)
  const  [valueInput, setValueInput] = useState({
    manufacturer__name: '',
    manufacturer__address: '',
    manufacturer__phone: ''
  })

  const { token, logout } = useContext(AuthContext)

  const limpearInputs = () => {
    setSelectDataManufacture('')
    setValueInput(
      {
        manufacturer__name: '',
        manufacturer__address: '',
        manufacturer__phone: ''
      } 
    )
  }

  const handelNewCancel = () => {
    limpearInputs()
    setNewEditManufacture(!newEditManufacture)
  }

  const fetchDataManufactorerT = async () => {
    const request = {
      token
    }
    request.option = 'selectManufacturer'
    request.controller = 'inventory'
    request.manufacturer__id = selectDataManufacture
    //request.optionIssues = '2'

    const requestOptions = {
      method: 'POST',
      //headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { dataSelect, message, type } = datas
        
        if (type === 'ok') {
          const [cero] = dataSelect
          setValueInput(cero)
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
      /* .finally(() => {
        handleClose()
      }) */
  }

  useEffect(() => {
    if (selectDataManufacture !== '') {
      fetchDataManufactorerT()
    }
  }, [selectDataManufacture])


  const handelInputsManufacture = (e) => {
    setValueInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handelSelectDataManufacture = (e) => {
    setSelectDataManufacture(e.target.value)
  }

  const fetchUpdateManufacture = async (request) => {
    request.token = token
    request.option = newEditManufacture ? 'updateManufacturer' : 'saveManufacturer'
    request.controller = 'inventory'
    if (newEditManufacture) {
      request.manufacturerId = selectDataManufacture
    }

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
          //setCargarDataSelectBooleam(true)
          setAlertsOptions({
            types: 'success',
            message
          })
          setOpenAlerts(true)
          fetchDataManufactorer()
          if (!newEditManufacture) {
            limpearInputs()
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

  const saveModifiedTemplate = () => {
    
    const objResult = {...valueInput}
    //const propiedades = Object.keys(objResult)

    const entradas = Object.entries(objResult);

    const contieneNumeroPar = entradas.some(entrada => entrada[1] === '');

    if (contieneNumeroPar) {
      setAlertsOptions({
        types: 'error',
        message: 'no input can be empty' 
      })
      setOpenAlerts(true)
      return
    }

    const request = {
      name: valueInput.manufacturer__name,
      address: valueInput.manufacturer__address,
      phone: valueInput.manufacturer__phone,
    }
    setLoadingSaveModified(true)
    fetchUpdateManufacture(request)
  }

  return (
    <div>
        <Typography variant='h5' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', paddingLeft: '10px', fontSize: '22px' }}>
          Manufacturer
        </Typography>
            <Box
              style={{ padding: 15 }}
            >
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <Grid item xs={2} sm={4} md={12}>
                  <Item>
                    {newEditManufacture &&
                      <div style={{ width: '100%', padding: '0 20% 0 20%' }}>
                        <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '14px' }}>
                          
                        </Typography>
                        <TextField
                          id="standard-select-currency"
                          select
                          fullWidth
                          //label="Select"
                          //defaultValue="EUR"
                          //helperText="Please select your currency"
                          name='selectDataManufacture'
                          value={selectDataManufacture}
                          onChange={handelSelectDataManufacture}
                          variant="filled"
                        >
                          {dataModalInventory.dataManufacturer.map((option) => (
                            <MenuItem key={option.manufacturer__id} value={option.manufacturer__id}>
                              {`${option.manufacturer__name}`}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                    }
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
                        <Typography id="transition-modal-title" variant="string" component="h4">
                          Name
                        </Typography>
                        <TextField
                          id="outlined-basic"
                          variant="standard"
                          fullWidth
                          name='manufacturer__name'
                          value={valueInput.manufacturer__name}
                          onChange={handelInputsManufacture}
                        />
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
                        <Typography id="transition-modal-title" variant="string" component="h4">
                          Phone
                        </Typography>
                        <TextField
                          id="outlined-basic"
                          variant="standard"
                          fullWidth
                          name='manufacturer__phone'
                          value={valueInput.manufacturer__phone}
                          onChange={handelInputsManufacture}
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
                      <FormControl>
                        <Typography id="transition-modal-title" variant="string" component="h4">
                          Address
                        </Typography>
                        <TextField
                          id="outlined-basic"
                          variant="standard"
                          fullWidth
                          name='manufacturer__address'
                          value={valueInput.manufacturer__address}
                          onChange={handelInputsManufacture}
                        />
                      </FormControl>
                    </Stack>
                  </Item>
                </Grid>
                <Grid item xs={2} sm={4} md={12} >
                  <Item>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={3}
                    >
                      <LoadingButton
                        style={{ backgroundColor: '#00A1E0' }}
                        loading={loadingSaveModified}
                        variant="contained"
                        onClick={saveModifiedTemplate}
                      >
                        {newEditManufacture ? 'modified' : 'save'}
                      </LoadingButton>
                      <Button
                        variant='contained'
                        style={{ backgroundColor: '#00A1E0' }}
                        onClick={handelNewCancel}
                      >
                        {newEditManufacture ? 'new' : 'cancel'}
                      </Button>
                    </Stack>
                  </Item>
                </Grid>
              </Grid>
            </Box>
    </div>
  )
}

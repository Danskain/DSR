import { useState, useContext } from 'react'
import { Typography, TextField, Box, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { INITIALVALUE } from '../../logic/constantes'
import { ButtonLoading } from '../../components/ButtonLoading'
import { Link } from 'react-router-dom'
import { AlertTop } from '../../components/AlertTop'
import { emptyValidation } from '../../logic/functions'
import { AuthContext } from '../context/AuthContext'
import { apiRest } from '../../logic/constantes'

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [objInputs, setObjInputs] = useState(INITIALVALUE)
  const [loading, setLoading] = useState(false)
  const [validationinputs, setValidationinputs] = useState(false)
  const [errosValidation, setErrosValidation] = useState({
    message: '',
    severitys: ''
  })

  const { logins } = useContext(AuthContext)

  /* const navigate = useNavigate() */

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleChange = (e) => {
    setObjInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const fetchData = async () => {
    const request = objInputs
    request.option = 'login'
    request.controller = 'login'

    const requestOptions = {
      method: 'POST',
      /* headers: { 'Content-Type': 'application/json' }, */
      body: JSON.stringify(request)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { type, data } = datas

        if (type !== 'ok') {
          const { message } = datas
          setValidationinputs(true)
          setErrosValidation({ message, severitys: type })
          setLoading(false)
          return
        }

        if (data) {
          const { dataUser, token, dataMenuUser } = datas
          const { navbar, tabs } = data
          const [cero] = dataUser
          setLoading(false)
          logins(cero.user__name, navbar, tabs, token, dataMenuUser)
        }
      })
      .catch(error => console.log(error))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    /* const lastPath = window.localStorage.getItem('lastPath') || '/' */
    if (emptyValidation(objInputs)) {
      setValidationinputs(true)
      setErrosValidation({ message: 'Username and password field cannot be empty', severitys: 'error' })
      setLoading(false)
      return
    }

    fetchData()
    /* navigate('/', {
      replace: true
    }) */
  }
  return (
    <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
      <Box border={1} p={7} borderRadius={2} width='360px' sx={{ backgroundColor: '#FFFAF9', boxShadow: 10 }}>
        <Typography variant='h2' component='h2' align='center'>
          DSR
        </Typography>
        {validationinputs &&
          <AlertTop
            message={errosValidation.message}
            severitys={errosValidation.severitys}
          />}
        <form onSubmit={handleSubmit}>
          <FormControl>
            <TextField
              error={validationinputs}
              sx={{ boxShadow: 2 }}
              label='Username'
              margin='normal'
              name='user'
              value={objInputs.user}
              onChange={handleChange}
            />
            <FormControl margin='normal' variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-password' error={validationinputs}>Password</InputLabel>
              <OutlinedInput
                error={validationinputs}
                sx={{ boxShadow: 2 }}
                id='outlined-adornment-password'
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={objInputs.password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label='Password'
              />
            </FormControl>
            <Link to='emailreset' style={{ textDecoration: 'none' }}>
              <Typography variant='string' component='p' align='left' sx={{ color: 'blue', fontSize: '12px' }}>
                Forgot your password?
              </Typography>
            </Link>
            <ButtonLoading
              variant='contained'
              size='small'
              text='Sign in'
              positionloading='end'
              color='#F25B19'
              loading={loading}
            />
            {/* <Button type='submit' variant='contained' size='small' sx={{ backgroundColor: '#F25B19', marginTop: '10px' }} endIcon={<SendIcon />}>Sign in</Button> */}
          </FormControl>
        </form>
      </Box>
    </Box>
  )
}

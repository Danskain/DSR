import React from 'react'
import { Typography, Box, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { ButtonLoading } from '../../components/ButtonLoading'
import { AlertTop } from '../../components/AlertTop'
import { emptyValidation } from '../../logic/functions'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export const ResetUser = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [objInputs, setObjInputs] = React.useState({
    password: '',
    confirmpassword: ''
  })
  const [loading, setLoading] = React.useState(false)
  const [validationinputs, setValidationinputs] = React.useState(false)
  const [errosValidation, setErrosValidation] = React.useState({
    message: '',
    severitys: ''
  })
  
  const { token } = useParams()
   
  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleChange = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    // setTodo({ ...todo, [e.target.name]: e.target.value });
    // utilizando el callback
    setObjInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const fetchData = async () => {
    const request = {}
    request.option = 'loginRecoveryPsw'
    request.controller = 'login'
    request.token = token
    request.password = objInputs.password
    /* delete request.confirmpassword */
    
    const requestOptions = {
      method: 'POST',
      /* headers: { 'Content-Type': 'application/json' }, */
      body: JSON.stringify(request)
    }

    fetch('https://dsr.prestodemos.com/api.php', requestOptions)
      .then(response => response.json())
      .then(datas => {
        console.log(datas)
        const { type, message } = datas
        if (type !== 'ok') {
          setValidationinputs(true)
          setErrosValidation({ message: `the password was not reset because ${message}`, severitys: type })
          return
        }
        navigate('/', {
          replace: true
        })
      })
      /* const { navbar } = data
        console.log(navbar) */
      /* window.localStorage.setItem('navbar', JSON.stringify(navbar)) */
      .catch(error => console.log(error))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    //console.log(token)

    if (emptyValidation(objInputs)) {
      setValidationinputs(true)
      setErrosValidation({ message: 'passwords cannot be empty', severitys: 'error' })
      return
    }
    if (objInputs.password !== objInputs.confirmpassword) {
      setValidationinputs(true)
      setErrosValidation({ message: 'the passwords are not the same', severitys: 'error' })
      return
    }

    setLoading(true)
    fetchData()
    setLoading(false)
  }
  return (
    <Box display='flex' justifyContent='center' alignItems='center' height='100vh' sx={{ backgroundColor: '#433F3F' }}>
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
            <FormControl margin='normal' variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-password' error={validationinputs}>Confirm Password</InputLabel>
              <OutlinedInput
                error={validationinputs}
                sx={{ boxShadow: 2 }}
                id='outlined-adornment-password2'
                type={showPassword ? 'text' : 'password'}
                name='confirmpassword'
                value={objInputs.confirmpassword}
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
            {/* <Link to='/emailreset' style={{ textDecoration: 'none' }}>
              <Typography variant='string' component='p' align='left' sx={{ color: 'blue', fontSize: '12px' }}>
                Forgot your password?
              </Typography>
            </Link> */}
            <ButtonLoading
              variant='contained'
              size='small'
              text='Sign in'
              positionloading='end'
              loading={loading}
            />
            {/* <Button type='submit' variant='contained' size='small' sx={{ backgroundColor: '#F25B19', marginTop: '10px' }} endIcon={<SendIcon />}>Sign in</Button> */}
          </FormControl>
        </form>
      </Box>
    </Box>
  )
}

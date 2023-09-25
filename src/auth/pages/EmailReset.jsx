import React from 'react'
import { Typography, TextField, Box } from '@mui/material'
import { ButtonLoading } from '../../components/ButtonLoading'
import { Link } from 'react-router-dom'
import { AlertTop } from '../../components/AlertTop'
import { emptyValidation } from '../../logic/functions'
import { emailRegex } from '../../logic/constantes'
import { apiRest } from '../../logic/constantes'

export const EmailReset = () => {
  const [objInputs, setObjInputs] = React.useState({
    email: ''
  })
  const [loading, setLoading] = React.useState(false)
  const [validationinputs, setValidationinputs] = React.useState(false)
  const [errosValidation, setErrosValidation] = React.useState({
    message: '',
    severitys: ''
  })

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
    const request = objInputs
    request.option = 'recoveryPsw'
    request.controller = 'email'
    console.log(request)
    const requestOptions = {
      method: 'POST',
      /* headers: { 'Content-Type': 'application/json' }, */
      body: JSON.stringify(request)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        console.log(datas)
        const { type, message } = datas
        if (type !== 'ok') {
          setValidationinputs(true)
          setErrosValidation({ message, severitys: type })
          return
        }
        setValidationinputs(true)
        setErrosValidation({ message, severitys: 'success' })
      })
      .catch(error => console.log(error))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(objInputs)
    if (emptyValidation(objInputs)) {
      setValidationinputs(true)
      setErrosValidation({ message: 'Email field cannot be empty', severitys: 'error' })
      return
    }

    if (!emailRegex.test(objInputs.email)) {
      setValidationinputs(true)
      setErrosValidation({ message: 'it is not a valid email', severitys: 'error' })
      return
    }
    setLoading(true)
    fetchData()
    setLoading(false)
  }
  return (
    <Box display='flex' justifyContent='center' alignItems='center' height='100vh' sx={{ backgroundColor: '#433F3F' }}>
      <Box border={1} p={7} borderRadius={2} sx={{ backgroundColor: '#FFFAF9', width: '500px' }}>
        {validationinputs &&
          <AlertTop
            message={errosValidation.message}
            severitys={errosValidation.severitys}
          />}
        <Typography variant='string' component='p' align='center' sx={{ color: '#B3B4B1', mt: '10px' }}>
          Enter your email address.You will receive an email with a link to reset your password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            error={validationinputs}
            sx={{ boxShadow: 2 }}
            fullWidth
            type='email'
            label='Email address'
            margin='normal'
            name='email'
            value={objInputs.email}
            onChange={handleChange}
          />
          <ButtonLoading
            variant='contained'
            size='small'
            text='Send'
            positionloading='end'
            loading={loading}
          />
          <Link to='/' style={{ textDecoration: 'none' }}>
            <Typography variant='string' component='p' align='left' href='/' sx={{ color: 'blue', fontSize: '12px', mt: '20px' }}>
              Back to Sing in
            </Typography>
          </Link>
          {/* <Button type='submit' variant='contained' size='small' sx={{ backgroundColor: '#F25B19', marginTop: '10px' }} endIcon={<SendIcon />}>Sign in</Button> */}
        </form>
      </Box>
    </Box>
  )
}

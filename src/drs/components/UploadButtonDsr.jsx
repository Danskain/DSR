import { useState, useContext } from 'react'
import { AuthContext } from '../../auth/context/AuthContext'
import { Button, Box, Stack } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { LinearProgressWithLabel } from '../components'
//import axios from 'axios'
import { apiRestUploadFileDsr } from '../../logic/constantes'
import { apiRest } from '../../logic/constantes'

export const UploadButtonDsr = ({ handleCloseModal, params, setOpenAlerts, setAlertsOptions, selectedFile, setSelectedFile, option, nameButton, dataMapping}) => {
  //const [progress, setProgress] = useState(5)
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(5)
  /* const [valueResponse, setValueResponse] = useState({
    verdadero: '#00FF00',
    falso: '#FF0000'
  }) */

  const { token } = useContext(AuthContext)

  


  /* const validationFileUpload = async (IdTransaction, intervalId) => {
    const requestMagento = {
      idTransaction: IdTransaction
    }
    
    requestMagento.token = token
    requestMagento.option = 'ftpConfirm'
    requestMagento.controller = 'magento'  

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(requestMagento)
    }
    
    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { data,type, message } = datas
        
        if (!type) {
          const dataResult = data.map((da) => {
            const partes = da.field.split('{')
            return {
              texto: partes[0],
              objeto: JSON.parse(`{${partes[1]}`)
            }
          })  
          console.log(dataResult)
          clearInterval(intervalId)
          setProgress(100)
        }

        if (type === 'error') {
          setAlertsOptions({
            types: type,
            message
          })
          setOpenAlerts(true)
          clearInterval(intervalId)
          setProgress(95)
        }
        
      })
      .catch(error => {
        console.error('Error de red:', error);
        setProgress(95)
      });
  } */
  const fetchDataUno = async () => {
    const request = {
      token,
      mgOrder: params.value
    }
    request.option = 'searchOrder'
    request.controller = 'dsr'

    const requestOptions = {
      method: 'POST',
      /* headers: { 'Content-Type': 'application/json' }, */
      body: JSON.stringify(request)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { data } = datas
        
        if (data.length !== 1 || data.length === 0) {
          setAlertsOptions({
            types: 'error',
            message: 'Cant find that order number'
          })
          setOpenAlerts(true)
          return  
        }
        dataMapping(data)
        handleCloseModal()
      })
      .catch(error => console.log(error))
  }

  const uploadFile = async (formData, intervalId) => {
    fetch(apiRestUploadFileDsr, {
      method: 'POST',
      body: formData,
      mode: 'no-cors',
      dataType: 'multipart/form-data',
    })
      .then(response => response)
      .then((data) => {
        // Aquí puedes manejar la respuesta de la API
        if (data) {
          clearInterval(intervalId)
          setProgress(100)
          fetchDataUno()
          //validationFileUpload(IdTransaction, intervalId)
        } else {
          console.error('error uploading files to server');
          clearInterval(intervalId)
          setProgress(25)
        }
      })
      .catch(error => {
        console.error('Error de red:', error);
        clearInterval(intervalId)
        setProgress(25)
      });
  };

  const sumarArreglo = (arr) => {
    const suma = arr.reduce((acumulador, elemento) => acumulador + elemento, 0);
    return suma;
  }

  const handleFileInputChange = (event) => {
    setProgress(0)
    const files = Array.from(event.target.files)
    //console.log("🚀 ~ file: UploadButton.jsx:91 ~ handleFileInputChange ~ files:", files)
    if (validateFiles(files)) {
      return
    }
    const sizeFiles = files.map((file) => {
      return file.size
    })
    const sumSize = sumarArreglo(sizeFiles)
    const resultSize = sumSize / 500
    //console.log(sizeFiles)
    //console.log(resultSize)
    const intervalId = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 5 : prevProgress + 5
      )
    }, resultSize > 1000 ? resultSize : 900)

    /* setTimeout(() => {
      clearInterval(intervalId);
    }, 8100); */
        
    let validate = true
    if (selectedFile.length === 0) {
      validate = false
    }
    const arrayResultSelectedFile = [...selectedFile]
    files.forEach((file) => {
      arrayResultSelectedFile.push(file)
    })
    
    setSelectedFile(arrayResultSelectedFile)
    handleFileUpload(files, intervalId, validate)
    setOpen(true)
  }

  const validateFiles = (files) => {
    const array = []
    files.forEach((file) => {
      selectedFile.forEach((filese) => {
         if (file.name === filese.name) {
          array.push(file.name)
         }
      })
    })
    
    //console.log("🚀 ~ file: UploadButton.jsx:127 ~ validateFiles ~ array.length:", array.length)
    if (array.length === 0) {

      return false
    }else{
      setAlertsOptions({
        types: 'error',
        message: `the ${array[0]} file is already saved`
      })
      setOpenAlerts(true)
      setProgress(25)
      return true
    }
  }

  const handleFileUpload = (files, intervalId) => {
    //console.log("🚀 ~ file: UploadButton.jsx:130 ~ handleFileUpload ~ files:", files)
    if (files) {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append('file[]', file)
      })
      //const dateId = new Date()
      
      //let IdTransaction = ''
      /* if (!validate) {
        IdTransaction = dateId.getDate()+''+(dateId.getMonth()+1)+''+dateId.getFullYear()+''+dateId.getHours()+''+dateId.getMinutes()+''+dateId.getSeconds()
        setIdTransactionies(IdTransaction)
        formData.append('IdTransaction', IdTransaction)
      }else{
        IdTransaction = idTransactionies
        formData.append('IdTransaction', IdTransaction)
      } */
      formData.append('idOption', option)
      formData.append('idwebsite', parseInt(params.row.dsr_websiteId))
      formData.append('mgorder', parseInt(params.value))
      
    console.log("files:", parseInt(params.row.dsr_websiteId))
      // Aquí puedes llamar a la función que realiza la solicitud a la API
      uploadFile(formData, intervalId)
    }
  }
  return (
    <Box style={{ width: '100%', maxHeight:'280px', padding: '15px', border: '1px dashed black', overflow: 'auto', whiteSpace: 'nowrap' }}>
      <Stack
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={2}
        //sx={{ display: { lg: 'flex', md: 'none' } }}
      >
        <Button
          style={{ backgroundColor: '#00A1E0' }}
          variant='contained'
          color='primary'
          startIcon={<CloudUploadIcon />}
          component='label'
          /* onClick={handleFileUpload} */
          /* disabled={!fileSelected} */
        >
          {nameButton}
          <input type='file' hidden multiple onChange={handleFileInputChange} accept="pdf/*" />
        </Button>
        {/* <Typography variant='h6' style={{ color: 'rgb(192,192,192)' }}>
          Drag & Drop Files
        </Typography> */}
      </Stack>
      {/* <Stack
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={2}
        sx={{ display: { md: 'flex', lg: 'none' } }}
      >
        <Button
          style={{ backgroundColor: '#00A1E0', fontSize: '10px' }}
          variant='contained'
          color='primary'
          startIcon={<CloudUploadIcon />}
          component='label'
        >
          {nameButton}
          <input type='file' hidden multiple onChange={handleFileInputChange} />
        </Button>
      </Stack> */}
      {open &&
        selectedFile.map((file, index) => (
          <div key={index}>
            <LinearProgressWithLabel progress={progress} name={file.name} size={file.size} index={index}/>
          </div>
        ))
      }
    </Box>
  )
}

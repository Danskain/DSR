import { useState, useContext } from 'react'
import { AuthContext } from '../../auth/context/AuthContext'
import { Button, Box, Stack } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { LinearProgressWithLabel } from '../components'
//import axios from 'axios'
import { apiRest, apiRestUploadFile } from '../../logic/constantes'


export const DsrUploadButton = ({saveImageData, selectedFile, setSelectedFile, option, nameButton, setIdTransactionies, params }) => {
  const [progress, setProgress] = useState(5)
  const [open, setOpen] = useState(false)
  /* const [valueResponse, setValueResponse] = useState({
    verdadero: '#00FF00',
    falso: '#FF0000'
  }) */

  const { token } = useContext(AuthContext)


  const validationFileUpload = async (IdTransaction, intervalId, files) => {
    const requestMagento = {
      idTransaction: IdTransaction,
      mgOrder: params.row.dsr_order
    }
    
    requestMagento.token = token
    requestMagento.option = 'issuesSaveFiles'
    requestMagento.controller = 'dsr'  

    const requestOptions = {
      method: 'POST',
      /* headers: { 'Content-Type': 'application/json' }, */
      body: JSON.stringify(requestMagento)
    }
    
    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { type } = datas
        console.log("🚀 ~ file: DsrUploadButton.jsx:41 ~ validationFileUpload ~ datas:", datas)

        if (type === 'ok') {
          saveImageData(params.row.id, files)
          clearInterval(intervalId)
          setProgress(100)
        }
        // Aquí puedes manejar la respuesta de la API
        if (type === 'error') {
          setProgress(90)
        }
        
      })
      .catch(error => {
        console.error('Error de red:', error);
      });
  }

  const uploadFile = async (formData, intervalId, IdTransaction, files) => {
    fetch(apiRestUploadFile, {
      method: 'POST',
      body: formData,
      mode: 'no-cors',
      dataType: 'multipart/form-data',
    })
      .then(response => response)
      .then((data) => {
        // Aquí puedes manejar la respuesta de la API
        if (data) {
          validationFileUpload(IdTransaction, intervalId, files)
        } else {
          console.error('error uploading files to server');
        }
      })
      .catch(error => {
        console.error('Error de red:', error);
      });
  };

  const sumarArreglo = (arr) => {
    const suma = arr.reduce((acumulador, elemento) => acumulador + elemento, 0);
    return suma;
  }

  const handleFileInputChange = (event) => {

    const files = Array.from(event.target.files)
    const sizeFiles = files.map((file) => {
      return file.size
    })
    const sumSize = sumarArreglo(sizeFiles)
    const resultSize = sumSize / 500
    
    const intervalId = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 5 : prevProgress + 5
      )
    }, resultSize > 1000 ? resultSize : 900)

    setSelectedFile(files)
    handleFileUpload(files, intervalId)
    setOpen(true)
  }

  const handleFileUpload = (files, intervalId) => {
    if (files) {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append('file[]', file)
      })
      const dateId = new Date()

      const IdTransaction = dateId.getDate()+''+(dateId.getMonth()+1)+''+dateId.getFullYear()+''+dateId.getHours()+''+dateId.getMinutes()+''+dateId.getSeconds()
      setIdTransactionies(IdTransaction)
      formData.append('mgorder', params.row.dsr_order);
      formData.append('IdTransaction', IdTransaction)
      formData.append('idOption', option)

      // Aquí puedes llamar a la función que realiza la solicitud a la API
      uploadFile(formData, intervalId, IdTransaction, files)
    }
  }
  return (
    

      <Box style={{ width: '100%', height: '100%', padding: '15px', border: '1px dashed black' }}>
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
            <input type='file' hidden multiple onChange={handleFileInputChange} accept="image/*" />
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
            <input type='file' hidden onChange={handleFileInputChange} />
          </Button>
          <Typography variant='h6' style={{ color: 'rgb(192,192,192)', fontSize: '12px' }}>
            Drag & Drop Files
          </Typography>
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

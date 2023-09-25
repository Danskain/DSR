import { useState } from 'react'
import { Box, IconButton } from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { ModalHistorialIssues } from './ModalHistorialIssues'

export const PhotosHistoryIssues = ({params}) => {
  const [hidemImages, setHidemImages] = useState({})  
  const [optionsModalDsr, setOptionsModalDsr] = useState({})
  const [openModal, setOpenModal] = useState(false)  
  const { value } = params 
  
  const handleOpenModal = (string, Url, nameImage) => {
    setHidemImages({
      Url,
      nameImage
    })
    setOptionsModalDsr({
      idOption: string
    })
    setOpenModal(true)
  }
  //const handleCloseModal = () => setOpenModal(false);

  const handleCloseModal = (/* event, reason */) => {
    //if (reason === 'backdropClick') return
    setOpenModal(false);
  }

  return (
    <div
      
      style={{width: '100%', height: '100%', overflowX: 'auto' }}
    >
      {value.map((data, index) => (
        <Box
          className='ContainerImageDelete'
          key={index}
        >
            <div className='imageDelete'>
                <img
                    src={`${params.row.url}${params.row.issues__mg_order}/${data.img.trimStart()}`}
                    alt=''
                    //onError={handleImageError}
                />
            </div>
            <div className='textIconDelete'>
                <IconButton
                  aria-label='upload picture'
                  component='label'
                  onClick={() => handleOpenModal('mostrarHistoryIssues', `${params.row.url}${params.row.issues__mg_order}/${data.img.trimStart()}`, data.img.trimStart() )}  
                >
                  <RemoveRedEyeIcon style={{ fontSize: '100px' }}/>
                </IconButton>
            </div>
        </Box>
      ))}
      <ModalHistorialIssues
         hidemImages={hidemImages}
         optionsModalDsr={optionsModalDsr}
         handleCloseModal={handleCloseModal}
         openModal={openModal}
         params={params}
      />
    </div>
  )
}

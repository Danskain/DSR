
import { useState } from 'react'
import { Box, IconButton } from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { ModalProductDie } from './ModalProductDie'

export const ImageProductDie = ({params}) => {
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
      
        <Box
          className='ContainerImageDelete'
        >
            <div className='imageDelete'>
                <img
                    src={`https://prestodemos.com/dsr/${value}`}
                    alt=''
                    //onError={handleImageError}
                />
            </div>
            <div className='textIconDelete'>
                <IconButton
                  aria-label='upload picture'
                  component='label'
                  onClick={() => handleOpenModal('MostrarProductDie', `https://prestodemos.com/dsr/${value}`, value.trimStart() )}  
                >
                  <RemoveRedEyeIcon style={{ fontSize: '100px' }}/>
                </IconButton>
            </div>
        </Box>
      
      <ModalProductDie
         hidemImages={hidemImages}
         optionsModalDsr={optionsModalDsr}
         handleCloseModal={handleCloseModal}
         openModal={openModal}
         params={params}
      />
    </div>
  )
}
import { useState } from 'react'
import { Box, IconButton } from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { ModalImage } from '../components'

export const Image = ({ dataMapping, params, setOpenAlerts, setAlertsOptions, idButtonData }) => {
  const [hidemImages, setHidemImages] = useState(`https://prestodemos.com/dsr/img/big/${params.row.dsr_websiteId}_${params.value}.png`)
  const [hidem, setHidem] = useState(true)
  const [optionsModalDsr, setOptionsModalDsr] = useState({})
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = (string) => {
    setOptionsModalDsr({
      idOption: string
    })
    setOpenModal(true)
  }
  const handleCloseModal = () => setOpenModal(false);

  const handleImageError = () => {
    setHidemImages(`https://prestodemos.com/dsr/img/big.png`)
    setHidem(false)
  }

  return (
    <Box
      className='ContainerImage'
    >
      <div className='image'>
        <img
          src={ hidemImages }
          alt=''
          onError={handleImageError}
        />
      </div>
      <div className='textIcon'>
        {hidem
        ?
          <IconButton aria-label='upload picture' component='label' onClick={() => handleOpenModal('mostrar')}><RemoveRedEyeIcon style={{ fontSize: '90px' }}/></IconButton>
        :
          <IconButton aria-label='upload picture' component='label' onClick={() => handleOpenModal('subida')}><AddAPhotoIcon style={{ fontSize: '80px' }}/></IconButton>
        }
      </div>
      <ModalImage
        dataMapping={dataMapping}
        hidemImages={hidemImages}
        setHidemImages={setHidemImages}
        setOpenAlerts={setOpenAlerts}
        setAlertsOptions={setAlertsOptions}
        optionsModalDsr={optionsModalDsr}
        handleCloseModal={handleCloseModal}
        openModal={openModal}
        idwebsite={params.row.dsr_websiteId}
        params={params}
        idButtonData={idButtonData}
      />
    </Box>
  )
}

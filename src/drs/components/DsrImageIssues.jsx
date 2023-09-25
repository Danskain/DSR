import { useState } from 'react'
import { Box, IconButton } from '@mui/material'
import { ModalImage } from '../../components'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'

export const DsrImageIssues = ({saveImageData, params, setOpenAlerts, setAlertsOptions, idButtonData}) => {
    const [hidemImages, setHidemImages] = useState(`${params.value}${params.row.dsr_websiteId}_${params.row.dsr_order}.png`)
    const [optionsModalDsr, setOptionsModalDsr] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const [selectedFile, setSelectedFile] = useState([])
    const [idTransactionies, setIdTransactionies] = useState('')
  
    const handleOpenModal = (string) => {
      setOptionsModalDsr({
        idOption: string
      })
      setOpenModal(true)
    }
    //const handleCloseModal = () => setOpenModal(false);

    const handleCloseModal = (/* event, reason */) => {
      /* if (reason === 'backdropClick') return */
      setOpenModal(false);
    }
  
    const handleImageError = () => {
      setHidemImages(`https://prestodemos.com/dsr/img/big.png`)
    }
  
    return (
        <Box
          className='ContainerImagePhotos'
        >
          <div className='imagePhotos'>
            <img
              src={ hidemImages }
              alt=''
              onError={handleImageError}
            />
          </div>
          <div className='textIconPhotos'>
            {/* <Button variant="contained" onClick={() => handleOpenModal('mostrarIssues')}>UPLOAD IMAGES</Button> */}
            <IconButton aria-label='upload picture' component='label' onClick={() => handleOpenModal('mostrarIssues')}><AddPhotoAlternateIcon style={{ fontSize: '120px' }}/></IconButton>
          </div>
          <ModalImage
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
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            idTransactionies={idTransactionies}
            setIdTransactionies={setIdTransactionies}
            saveImageData={saveImageData}
          />
        </Box>
    )
}

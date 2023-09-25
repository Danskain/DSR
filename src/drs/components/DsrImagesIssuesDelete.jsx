import { useState } from 'react'
import { Box, IconButton } from '@mui/material'
import { ModalImage } from '../../components'
import FolderDeleteIcon from '@mui/icons-material/FolderDelete'
export const DsrImagesIssuesDelete = ({params, setOpenAlerts, setAlertsOptions, idButtonData, deleteImageIssues}) => {
  
  const [hidemImages, setHidemImages] = useState({})
  const [optionsModalDsr, setOptionsModalDsr] = useState({})
  const [openModal, setOpenModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState([])
  const [idTransactionies, setIdTransactionies] = useState('')
  const { value } = params
  /* useEffect(() => {
    const { value } = params
    const objeto = JSON.parse(value)
    console.log("🚀 ~ file: DsrImagesIssuesDelete.jsx:15 ~ useEffect ~ objeto:", objeto)
    
    if (objeto === null) {
        setDataImages([])
    }else{
        setDataImages()
    }
  }, []) */
  
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

  /* const handleImageError = () => {
    setHidemImages(`https://prestodemos.com/dsr/img/big.png`)
  } */
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
                    src={`${params.row.url}${params.row.dsr_order}/${data.img.trimStart()}`}
                    alt=''
                    //onError={handleImageError}
                />
            </div>
            <div className='textIconDelete'>
                <IconButton
                  aria-label='upload picture'
                  component='label'
                  onClick={() => handleOpenModal('mostrarIssuesDelete', `${params.row.url}${params.row.dsr_order}/${data.img.trimStart()}`, data.img.trimStart() )}  
                >
                  <FolderDeleteIcon style={{ fontSize: '100px' }}/>
                </IconButton>
            </div>
        </Box>
      ))}
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
              deleteImageIssues={deleteImageIssues}
            />
    </div>
  )
}

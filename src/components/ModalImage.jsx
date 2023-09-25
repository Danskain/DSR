import { Modal, Box } from '@mui/material'
import { MostrarArchivos, SubidaArchivos } from '../components'
import { DsrSubirImages, DsrDeletemages } from '../drs/components'

const style = {  
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxHeight: '800px', 
  overflow: 'auto',
  maxWidth: '800px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderStyle: 'outset',
  borderRadius: '12px'
}

export const ModalImage = ({dataMapping, deleteImageIssues, saveImageData, optionsModalDsr, handleCloseModal, openModal, hidemImages, setHidemImages, params, selectedFile, setSelectedFile, setIdTransactionies }) => {
  const renderModalsStatusDsr = (text) => {
    const objOrdanamiento = {
      'mostrar': <MostrarArchivos hidemImages={hidemImages} setHidemImages={setHidemImages} params={params} /* idButtonData={idButtonData} setValueEstado={setValueEstado} optionsModalDsr={optionsModalDsr} setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions} handleCloseModal={handleCloseModal} idwebsite={idwebsite} valueSelect={valueSelect} params={params} *//>,
      'subida': <SubidaArchivos params={params} dataMapping={dataMapping} handleCloseModal={handleCloseModal} /* idButtonData={idButtonData} setValueEstado={setValueEstado} optionsModalDsr={optionsModalDsr} setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions} handleCloseModal={handleCloseModal} idwebsite={idwebsite} valueSelect={valueSelect} params={params} *//>,
      'mostrarIssues': <DsrSubirImages saveImageData={saveImageData} handleCloseModal={handleCloseModal} params={params} selectedFile={selectedFile} setSelectedFile={setSelectedFile} setIdTransactionies={setIdTransactionies} option={3} nameButton={'Upload'}/>,
      'mostrarIssuesDelete': <DsrDeletemages deleteImageIssues={deleteImageIssues} params={params} hidemImages={hidemImages} />,
    }
  
      const COLORS_CELL_DEFAULT = ''
      return objOrdanamiento[text] || COLORS_CELL_DEFAULT
  }

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition={true}
    >
      <Box sx={style}>
        {renderModalsStatusDsr(optionsModalDsr.idOption)}  
      </Box>
    </Modal>
  )
}


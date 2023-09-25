import { Modal, Box } from '@mui/material'
import { MostrarPHotosHistorialIssues } from './MostrarPHotosHistorialIssues'

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

export const ModalHistorialIssues = ({ 
    hidemImages,
    optionsModalDsr,
    handleCloseModal,
    openModal,
    params,
}) => {
  const renderModalsStatusDsr = (text) => {
    const objOrdanamiento = {
      'mostrarHistoryIssues': <MostrarPHotosHistorialIssues params={params} hidemImages={hidemImages} />,
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
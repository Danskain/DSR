import { Modal, Box } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 500, 
  overflow: 'auto',
  width: 560,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export const ModalEmail = ({ openModalEmail, handleCloseModalEmail, dataPreview, renderHTML }) => {
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={openModalEmail}
        onClose={handleCloseModalEmail}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {renderHTML(dataPreview)}  
        </Box>
      </Modal>
    </div>
  )
}

import { Modal, Box } from '@mui/material'
import { Approved, EventCalendar, EventCalendarNext, InPress, Portially } from '../modalDsrStatus'

const style = {  
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxHeight: 750,
  overflow: 'auto',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderStyle: 'outset',
  borderRadius: '12px'
}


export const ModalDsr = ({optionsModalDsr, handleCloseModal, openModal, idwebsite, valueSelect, params, idButtonData, setValueEstado, setOpenAlerts, setAlertsOptions }) => {
  const renderModalsStatusDsr = (text) => {
    const objOrdanamiento = {
      '1': <Approved idButtonData={idButtonData} setValueEstado={setValueEstado} optionsModalDsr={optionsModalDsr} setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions} handleCloseModal={handleCloseModal} idwebsite={idwebsite} valueSelect={valueSelect} params={params}/>,
      '2': <EventCalendar idButtonData={idButtonData} setValueEstado={setValueEstado} optionsModalDsr={optionsModalDsr} setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions} handleCloseModal={handleCloseModal} idwebsite={idwebsite} valueSelect={valueSelect} params={params}/>,
      '3': <EventCalendarNext idButtonData={idButtonData} setValueEstado={setValueEstado} optionsModalDsr={optionsModalDsr} setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions} handleCloseModal={handleCloseModal} idwebsite={idwebsite} valueSelect={valueSelect} params={params}/>,
      '4': <InPress idButtonData={idButtonData} setValueEstado={setValueEstado} optionsModalDsr={optionsModalDsr} setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions} handleCloseModal={handleCloseModal} idwebsite={idwebsite} valueSelect={valueSelect} params={params}/>,
      '5': <Portially idButtonData={idButtonData} setValueEstado={setValueEstado} optionsModalDsr={optionsModalDsr} setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions} handleCloseModal={handleCloseModal} idwebsite={idwebsite} valueSelect={valueSelect} params={params}/>,
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

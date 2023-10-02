import { useState } from 'react'

import { Box, Backdrop, Modal, Fade } from '@mui/material'
import { AddNew, Manufacturer } from '../modal'
import { Alerts } from '../../../components'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px 10px 10px',
};


export const AddModify = ({dataModalInventory, openModal, handleCloseModal, fetchDataManufactorer}) => {
  const [openAlerts, setOpenAlerts] = useState(false)
  const [alertsOptions, setAlertsOptions] = useState({})

  const renderModals = (text) => {
    const objOrdanamiento = {
      'add': <AddNew dataModalInventory={dataModalInventory}/* setAlertsOptions={setAlertsOptions} setOpenAlerts={setOpenAlerts} */ />,
      'manufacturer': <Manufacturer dataModalInventory={dataModalInventory} setAlertsOptions={setAlertsOptions} setOpenAlerts={setOpenAlerts} fetchDataManufactorer={fetchDataManufactorer} />,
    }
    const COLORS_CELL_DEFAULT = ''
    return objOrdanamiento[text] || COLORS_CELL_DEFAULT
  }

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 1000,
          },
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
           {renderModals(dataModalInventory.idOpcion)}
           <Alerts open={openAlerts} setOpen={setOpenAlerts} alertsOptions={alertsOptions} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
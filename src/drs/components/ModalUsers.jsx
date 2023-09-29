import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../auth/context/AuthContext'
import { Box, Fade, Modal, Backdrop } from '@mui/material'
import { ModalUsersCrud, Alerts, ModalUsersProfiles } from '../components'
import { apiRest } from '../../logic/constantes'

//import AdbIcon from '@mui/icons-material/Adb'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  //width: 660,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '10px',
  //p: 1
};

export const ModalUsers = ({
  open,
  handleClose,
  optionsModalUser
}) => {

  const [openAlerts, setOpenAlerts] = useState(false)
  const [alertsOptions, setAlertsOptions] = useState({})
  const [dataUserProfile, setDataUserProfile] = useState([])
  const [dataUserInformation, setDataUserInformation] = useState([])

  const { token } = useContext(AuthContext)

  const fetchDataUser = async () => {
    const request = {
      token
    }
    request.option = 'dataUser'
    request.controller = 'user'

    const requestOptions = {
      method: 'POST',
      //headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(request)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { type, message, dataProfile, dataUsers } = datas
        //console.log("🚀 ~ file: ModalUsers.jsx:51 ~ fetchDataUser ~ datas:", datas)
        
        if (type === 'ok') {
          setDataUserProfile(dataProfile)
          setDataUserInformation(dataUsers)
        }

        if (type === 'error') {
          setAlertsOptions({
            types: type,
            message
          })
          setOpenAlerts(true)
          if (message === 'invalid token') {
            logout()
          }
        }
      })
      .catch(error => console.log(error))
  }

  /* const fetchDataProfiles = async () => {
    const request = {
      token
    }
    request.option = 'dataProfiles'
    request.controller = 'user'

    const requestOptions = {
      method: 'POST',
      //headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(request)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { type, message } = datas
        console.log("🚀 ~ file: ModalUsers.jsx:51 ~ fetchDataUser ~ datas:", datas)
        
        if (type === 'ok') {
          setDataUserProfile(dataProfile)
          setDataUserInformation(dataUsers)
        }

        if (type === 'error') {
          setAlertsOptions({
            types: type,
            message
          })
          setOpenAlerts(true)
          if (message === 'invalid token') {
            logout()
          }
        }
      })
      .catch(error => console.log(error))
  } */

  useEffect(() => {
    //fetchDataUserSelects()
    fetchDataUser()
    //fetchDataProfiles()
  }, [])

  const renderModals = (text) => {
    const objOrdanamiento = {
      'Create and Modify Users': <ModalUsersCrud fetchDataUser={fetchDataUser} setAlertsOptions={setAlertsOptions} setOpenAlerts={setOpenAlerts} dataUserProfile={dataUserProfile} dataUserInformation={dataUserInformation} />,
      'Create and Modify Profiles': <ModalUsersProfiles fetchDataUser={fetchDataUser} setAlertsOptions={setAlertsOptions} setOpenAlerts={setOpenAlerts} dataUserProfile={dataUserProfile} dataUserInformation={dataUserInformation} />,
    }
    const COLORS_CELL_DEFAULT = ''
    return objOrdanamiento[text] || COLORS_CELL_DEFAULT
  }

  
  return (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {renderModals(optionsModalUser)}
            <Alerts open={openAlerts} setOpen={setOpenAlerts} alertsOptions={alertsOptions} />
          </Box>
        </Fade>
      </Modal>
  )
}

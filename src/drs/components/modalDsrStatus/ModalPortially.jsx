import { useState, useContext } from 'react'
import { Modal, Box } from '@mui/material'
import { ReadyForPickup, ReadyForShipping, ReadyForShippingDHL, SendInformation } from '../modalDsrStatus'
import { apiRest } from '../../../logic/constantes'
import LoadingButton from '@mui/lab/LoadingButton'
import { AuthContext } from '../../../auth/context/AuthContext'
import Swal from 'sweetalert2'

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

export const ModalPortially = ({
  setOpenAlerts,
  setAlertsOptions,
  valueSelect,
  params,
  idButtonData,
  setValueEstado,
  valueSignedBy,
  inputRefQtyBoxes,
  inputRefQtyPerBox,
  inputRefQtyLastBox,
  inputRefMissingQty,
  inputRefComment,
  handleCloseModal,
}) => {

  const [loadingSave, setLoadingSave] = useState(false)
  const [dataModalsPortially, setDataModalsPortially] = useState({})
  const [open, setOpen] = useState(false);
  
  const { token, user } = useContext(AuthContext)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') return
    setOpen(false)
  }


  const renderModalsStatusDsr = (text) => {
    const objOrdanamiento = {
      '6': <ReadyForPickup valueSelect={valueSelect} handleClose={handleClose} dataModalsPortially={dataModalsPortially} handleCloseModal={handleCloseModal} idButtonData={idButtonData} params={params} setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions} />,
      '9': <SendInformation valueSelect={valueSelect} handleClose={handleClose} dataModalsPortially={dataModalsPortially} handleCloseModal={handleCloseModal} idButtonData={idButtonData} params={params} setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions} />,
      '7': <ReadyForShipping setDataModalsPortially={setDataModalsPortially} handleClose={handleClose} dataModalsPortially={dataModalsPortially} params={params} setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions} idButtonData={idButtonData} handleCloseModal={handleCloseModal} />,
      '8': <ReadyForShippingDHL setDataModalsPortially={setDataModalsPortially} handleClose={handleClose} dataModalsPortially={dataModalsPortially} params={params} setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions} idButtonData={idButtonData} handleCloseModal={handleCloseModal} />
    }
    const COLORS_CELL_DEFAULT = ''
    return objOrdanamiento[text] || COLORS_CELL_DEFAULT
  }
  
  const fetchDataEmail = async (requestMagento) => {
    requestMagento.token = token
    requestMagento.option = 'sendEmailStatus'
    requestMagento.controller = 'email'  

    const requestOptions = {
      method: 'POST',
      /* headers: { 'Content-Type': 'application/json' }, */
      body: JSON.stringify(requestMagento)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { type, message } = datas
        if (type === 'ok') {
          Swal.fire(
            'Email sent!',
            message,
            'success'
          )
        }

        if (type === 'error') {
          setAlertsOptions({
            types: type,
            message
          })
          setOpenAlerts(true)
        }
      
      })
      .catch(error => console.log(error))
  }

  const sweetalert2FunctionSave = () => {
    Swal.fire({
      title: '',
      text: "Do you want to send mail to the customer of the registration status?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        const ogj = {
          status: valueSelect,
          mgorder: params.row.dsr_order,
          idwebsite: params.row.dsr_websiteId,
          user: user.name
        }
        fetchDataEmail(ogj)
      }
    })
  }

  const saveModal = async (requestMagento) => {
    requestMagento.token = token
    requestMagento.option = 'eventStatus'
    requestMagento.controller = 'dsr'  

    const requestOptions = {
      method: 'POST',
      /* headers: { 'Content-Type': 'application/json' }, */
      body: JSON.stringify(requestMagento)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { type, idOption, message, snEmail } = datas
        if (type === 'ok') {

          if (idOption) {
            setDataModalsPortially(datas)
            setLoadingSave(false)
            //setValueEstado(true)
            handleOpen()
            //handleCloseModal()
          } else {
            if (snEmail) {
              sweetalert2FunctionSave()
            }
            setAlertsOptions({
              types: 'success',
              message
            })
            setOpenAlerts(true)
            setLoadingSave(false)
            handleClose()
            document.getElementById(`tab-${idButtonData}`).click()
            setValueEstado(true)
            handleCloseModal()
          }
        }

        if (type === 'error') {
          setAlertsOptions({
            types: type,
            message
          })
          setOpenAlerts(true)
          setLoadingSave(false)
        } 
      
      })
      .catch(error => console.log(error))
  }

  const handelSaveModal = () => {
  
    const arrayData = [
      {
        status: {
          user: user.name, 
          idWebsite: params.row.dsr_websiteId, 
          mgOrder: params.row.dsr_order,
          qtyBoxes: inputRefQtyBoxes.current.value,
          qtyPerBox: inputRefQtyPerBox.current.value,
          qtyLastBox: inputRefQtyLastBox.current.value,
          missingQty: inputRefMissingQty.current.value,
          signedBy: valueSignedBy,
          csr: '',
          operator: '',
          approved: '',
          totalGoodS: '',
          totalWastedS: '',
          mode: '',
          comment: inputRefComment.current.value,
          packing: params.row.dsr_packing
        },
        calendar: {
          measure:'',
          printType:'',
          dateEvent:'',
          idTransaction:'',
          scodix: ''
        }, 
      }
    ]

    const requestMagento = {
      status: valueSelect,
      typeOption: 'save',
      arrayData: arrayData
    }
    setLoadingSave(true)
    saveModal(requestMagento)
  }

  return (
    <>
      <LoadingButton
        style={{ backgroundColor: '#00A1E0' }}
        loading={loadingSave}
        variant="contained"
        onClick={handelSaveModal}
        disabled={false}
      >
        Save Status
      </LoadingButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {renderModalsStatusDsr(dataModalsPortially.idOption)}
        </Box>
      </Modal>
    </>
  )
}

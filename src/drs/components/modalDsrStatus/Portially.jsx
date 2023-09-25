import { useState, useRef } from 'react'
import { Box, Typography, Stack, Button, TextField } from '@mui/material'


import { SelectInput } from '../../components'
import { TextareaAutosize } from '@mui/base'
import { ModalPortially } from '../modalDsrStatus'

export const Portially = ({optionsModalDsr, handleCloseModal, valueSelect, idwebsite, params, idButtonData, setValueEstado, setOpenAlerts, setAlertsOptions}) => {
    const [valueSignedBy, setValueSignedBy] = useState('')
  
    const inputRefQtyBoxes = useRef()
  
    const inputRefQtyPerBox = useRef()

    const inputRefQtyLastBox = useRef()

    const inputRefMissingQty = useRef()

    const inputRefComment = useRef()
  
    const handleSignedBy = (e) => {
      setValueSignedBy(e.target.value)
    }
  
    
  
    
  return (
    <Box style={{ backgroundColor: 'white', width: '400px' }}>
    <Typography variant='h6' align='center' sx={{ backgroundColor: '#00A1E0', borderRadius: '10px 10px 0 0', color: 'white', fontSize: '17px' }}>
      Detail about the change of status
    </Typography>
    <Box style={{ padding: '20px 20px 0 20px' }}>
      <Stack
        direction='column'
        justifyContent='flex-start'
        alignItems='flex-start'
        spacing={0.5}
      >
        <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
          Qty Boxes:
        </Typography>
        <TextField id="standard-basic" label="" variant="standard" type="number" inputRef={inputRefQtyBoxes} fullWidth />
        <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
          Qty Per Box:
        </Typography>
        <TextField id="standard-basic" label="" variant="standard" type="number" inputRef={inputRefQtyPerBox} fullWidth />
        <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
          Qty Last Box:
        </Typography>
        <TextField id="standard-basic" label="" variant="standard" type="number" inputRef={inputRefQtyLastBox} fullWidth />
        <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
          Missing Qty:
        </Typography>
        <TextField id="standard-basic" label="" variant="standard" type="number" inputRef={inputRefMissingQty} fullWidth />
        <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
          Signed By:
        </Typography>
        <SelectInput age={valueSignedBy} handleChange={handleSignedBy} valorData={optionsModalDsr.arrayData[0].signed} />
        <Typography variant='string' style={{ fontWeight: 'bold', fontSize: '15px' }}>
          Comment
        </Typography>
        <TextareaAutosize
          aria-label='minimum height'
          minRows={3}
          style={{ width: '100%', borderRadius: '5px' }}
          ref={inputRefComment}
        />
      </Stack>
      <Stack
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={2}
        sx={{ /* display: { lg: 'flex', md: 'none' },  */margin: '30px' }}
      >
        <ModalPortially
          setOpenAlerts={setOpenAlerts}
          setAlertsOptions={setAlertsOptions}
          valueSelect={valueSelect}
          idwebsite={idwebsite}
          params={params}
          idButtonData={idButtonData}
          setValueEstado={setValueEstado}
          valueSignedBy={valueSignedBy}
          inputRefQtyBoxes={inputRefQtyBoxes}
          inputRefQtyPerBox={inputRefQtyPerBox}
          inputRefQtyLastBox={inputRefQtyLastBox}
          inputRefMissingQty={inputRefMissingQty}
          inputRefComment={inputRefComment}
          handleCloseModal={handleCloseModal}
        />
        <Button
          style={{ backgroundColor: '#00A1E0' }} 
          variant='contained'
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
      </Stack>
    </Box>
  </Box>
  )
}

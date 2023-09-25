//import { useState, useEffect } from 'react'
//import { Typography, Box } from '@mui/material'
//import CheckIcon from '@mui/icons-material/Check'
//import CloseIcon from '@mui/icons-material/Close'
import { TextareaAutosize } from '@mui/base'


export const DsrEditDescriptionIssuesEdit = ({inputRefDescription, params}) => {
  //const [valueEstado, setValueEstado] = useState(true)
  /* const [styleColor, setStyleColor] = useState(true)

  useEffect(() => {
    const { row } = params
    if (row.issues__status_issues === 'issues' || row.dsr_status === 'r300plated' || row.dsr_status === 'hp_indigo' || row.dsr_status === 'r500plated' || row.dsr_status === 'scodix' || row.dsr_status === 'press_sheet_proof_hp_indigo' || row.dsr_status === 'ricohplated' || row.dsr_status === 'processing' || row.dsr_status === 'hard_copy_proof' || row.dsr_status === 'pending' || row.dsr_status === 'fraud' || row.dsr_status === 'holded' || row.dsr_status === 'complete') {
      setStyleColor(false)
    }
  }, []) */

  /* const handleChangeValue = () => {
    setValueEstado(!valueEstado)
  } */

  return (
    <>
          
            <TextareaAutosize
              aria-label='minimum height'
              minRows={4}
              defaultValue={params.value}
              style={{ width: '100%', height: '100%', borderRadius: '5px', /* border: 'white 5px solid', */ backgroundColor: '#CACFD2' }}
              ref={inputRefDescription}
            />
              
    </>
  )
}


import { useState } from 'react'
import { Typography, Box } from '@mui/material'
//import CheckIcon from '@mui/icons-material/Check'
//import CloseIcon from '@mui/icons-material/Close'

export const DsrEditDescriptionIssues = ({params}) => {
  //const [valueEstado, setValueEstado] = useState(true)
  const [styleColor] = useState(true)

  /* useEffect(() => {
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
      <Box
        style={{
          height: '100%',
          overflowX: 'auto',
          whiteSpace: 'wrap',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'cencer',
          alignItems: 'center',
        }}
        //onDoubleClick={handleChangeValue}
      >
        <Box 
          style={{
            width: '1200px',  
          }}
        >
          <Typography align='center' style={{ color: styleColor ? 'black' : 'white', cursor: 'pointer', fontSize:'13px' }}>
            {params.value}
          </Typography>
        </Box>
      </Box>
    </>
  )
}

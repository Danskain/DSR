import { useEffect, useState } from 'react'
import { Typography, Box } from '@mui/material'

export const DsrCustonStyleValueDataGrid = ({ params, magento }) => {
  //const [styleColor] = useState(true)
  const [valor, setValor] = useState('')

  useEffect(() => {
    const { value } = params
    setValor(value)
    /* if (row.dsr_color === '' || row.dsr_color === undefined) {
      setStyleColor(false)
    } */

  }, [params])
  
  const hidenOptionsImagesUrgency = (text) => {
    const objOrdanamiento = {
        'Drop-Dead': <img src='https://prestodemos.com/dsr/img/alert_icon.png' alt="" style={{ width: '85px', height:'85px' }} />,
        'PRINT IN TAMPA': <img src='https://prestodemos.com/dsr/img/tampa.png' alt="" style={{ width: '85px', height:'85px' }} />,
        'PRINT IN TAMPA DROP-DEAD': <img src='https://prestodemos.com/dsr/img/tampa.png' alt="" style={{ width: '85px', height:'85px' }} />
      }
  
      const COLORS_CELL_DEFAULT = ''
      return objOrdanamiento[text] || COLORS_CELL_DEFAULT
  }
  return (
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
    >
      <Box 
        style={{
          width: '1100px',  
        }}
      >
        <Typography align='center' variant='h6' style={{ cursor: 'pointer', fontSize: '12px' }} className='texto-con-relieve'>
          {valor}
        </Typography>
        {magento &&
          hidenOptionsImagesUrgency(valor)
        }
      </Box>
    </Box>
  )
}

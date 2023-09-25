import { useEffect, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'

export const ProductInfo = ({ params }) => {
  /* const { value } = params
  const transformJson = JSON.parse(value) */
  const [data, setData] = useState([])
  const [styleColor] = useState(true)

  useEffect(() => {
    const { value, /* row */ } = params
    const transformJson = value
    setData(transformJson)
    /* if (row.dsr_color === '') {
      setStyleColor(false)
    } */
  }, [params])
  
  return (
    <Box style={{ height: '100%', padding: '10px 0 0 0' }}>
    <Box
      style={{ /* padding: '10px 10px 10px 10px',  */width: '372px', height: '100%', overflow: 'auto', whiteSpace: 'wrap' }}
    >
      <Stack
        direction='column'
        justifyContent='flex-start'
        alignItems='flex-start'
        spacing={0.5}
      > 
        {data.map((da, index) => (
          <Stack
            key={index}
            direction='row'
            justifyContent='flex-start'
            alignItems='flex-start'
            spacing={0.5}
            style={{ borderBottom: '1px solid', borderBottomColor: styleColor ? 'black' : 'white' }}
          >
            <Typography variant='string' style={{width: '150px', fontWeight: 'bold', fontSize: '12px', color: styleColor ? 'black' : 'white' }}>
              {`${da.label}:`} 
            </Typography>
            <Typography variant='string' style={{width: '205px', fontSize: '12px', marginLeft: '5px', color: styleColor ? 'black' : 'white' }}>
              {da.value}
            </Typography>
          </Stack> 
        ))}
      </Stack>  
    </Box>
  </Box>
  )
}

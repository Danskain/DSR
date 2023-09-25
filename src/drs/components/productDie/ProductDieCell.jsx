import { Typography, Box } from '@mui/material'

export const ProductDieCell = ({params}) => { 
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
          width: '2000px',
          //paddingTop: '700px'  
        }}
      >
        <Typography align='center' style={{ color: 'black', cursor: 'not-allowed', }}>
          {params.value}
        </Typography>
      </Box>
    </Box>
    )
}

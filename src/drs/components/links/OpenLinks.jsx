import { Link, Box, Typography } from '@mui/material'

export const OpenLinks = ({params}) => { 
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
            <Link href={params.value}  target="_blank" rel="noopener noreferrer">
                {params.value}
            </Link>
        </Typography>
      </Box>
    </Box>
    )
}

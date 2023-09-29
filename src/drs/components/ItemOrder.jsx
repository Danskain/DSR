import { Stack, Typography, IconButton, Box, Link } from '@mui/material'
/* import Grid from '@mui/material/Unstable_Grid2' */
import EditIcon from '@mui/icons-material/Edit'

import { MagentoSelect } from '../components'

export const ItemOrder = ({ arrayItemOrder, haidenSelectEvent, handleChange, haidenCancelItemOrdered, checkValue }) => {
  return (
    <>
        <Stack
          direction='column'
          justifyContent='flex-start'
          alignItems='flex-start'
          spacing={0}
          style={{ padding: '10px' }}
        >
          {arrayItemOrder.map((da) => (
            <Box sm={12} key={da.id} style={{ paddingBottom: '10px' }} >
              <Stack
                direction='row'
                justifyContent='flex-start'
                alignItems='center'
                spacing={0}
              >
                <Typography variant='h6' /* style={{ fontSize: '1rem' }} */ className='texto-con-relieve' >
                  {da.label}
                </Typography>
                {da.typeCtrl !== 'none'
                ? <IconButton sx={{ color: 'red' }} aria-label='upload picture' component='label' onClick={() => haidenSelectEvent(da.id)}><EditIcon style={{ fontSize: '15px' }} /></IconButton>
                : ''}
              </Stack>
              {da.event
              ? <Typography variant='body1' align='left'  /* style={{ fontSize: '14px' }} */className='texto-con-relieve-value' >
                  {da.typeCtrl !== 'link'
                  ?  da.value
                  :
                    <Link href={da.value} target="_blank" rel="noopener noreferrer">
                      {da.value}
                    </Link>
                  }
                </Typography>
              : <MagentoSelect age={da.value} typeCtrl={da.typeCtrl} handleChange={handleChange} id={da.id} haidenCancel={haidenCancelItemOrdered} valorData={da.arraySelect} checkValue={checkValue} />}
            </Box>
          ))}
        </Stack>
    </>
  )
}

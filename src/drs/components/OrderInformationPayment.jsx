import { Stack, Typography } from '@mui/material'

export const OrderInformationPayment = ({ paymentInformationResult }) => {
  return (
    <Stack
      direction='column'
      justifyContent='flex-start'
      alignItems='flex-start'
      spacing={0}
      style={{ padding: '10px', borderStyle: 'outset', borderRadius: '10px', backgroundColor: 'white', overflowX: 'auto', whiteSpace: 'nowrap' }}
    >
      <Typography variant='h6' className='texto-con-relieve'>
        Payment Information:
      </Typography>
      {paymentInformationResult.map((da, index) => (
        <Stack
          key={index}
          direction='row'
          justifyContent='flex-start'
          alignItems='center'
          spacing={0.5}
        >
          <Typography variant='h6' style={{ fontSize: '15px' }} className='texto-con-relieve' >
            {da.name}:
          </Typography>
          <Typography variant='subtitle1' style={{ fontSize: '14px' }} className='texto-con-relieve-value' >
            {da.value}
          </Typography>
        </Stack>
      ))}
    </Stack>
  )
}

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
      <Typography variant='h6'>
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
          <Typography variant='h6' style={{ fontSize: '11px' }}>
            {da.name}:
          </Typography>
          <Typography variant='subtitle1' style={{ fontSize: '11px' }}>
            {da.value}
          </Typography>
        </Stack>
      ))}
    </Stack>
  )
}

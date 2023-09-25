import { Stack, Typography, Box } from '@mui/material'
export const OrderInformationHistorialPayment = ({
    historyOrderRender,
    renderHTML
}) => {
  return (
      <Stack
        direction='column'
        justifyContent='flex-start'
        alignItems='flex-start'
        spacing={0}
        style={{ padding: '10px' }}
      >
        {historyOrderRender.map((history, index) => (
          <Box
            key={index}
          > 
            <Typography variant='subtitle1' align='left' style={{ fontSize: '11px' }}>
              {history.created_at}
            </Typography>
            <Typography variant='subtitle1' align='left' style={{ fontSize: '11px' }}>
              {renderHTML(history.comment)}
            </Typography>   
            <br />
          </Box>
        ))}
      </Stack>
  )
}

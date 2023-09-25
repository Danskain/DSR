import { Alert, Stack } from '@mui/material'
export const AlertTop = ({ message, severitys }) => {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={severitys}>{message}</Alert>
    </Stack>
  )
}

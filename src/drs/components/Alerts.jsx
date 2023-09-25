import * as React from 'react'
import { Stack, Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Alerts = ({ open, setOpen, alertsOptions }) => {
  /* const [open, setOpen] = React.useState(false); */

  /* const handleClick = () => {
    setOpen(true);
  }; */
  const vertical = 'bottom'
  const horizontal = 'center'

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={4099} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
        <Alert onClose={handleClose} severity={alertsOptions.types} sx={{ width: '500px' }}>
          {alertsOptions.message}
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </Stack>
  )
}

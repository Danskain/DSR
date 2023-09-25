import LoadingButton from '@mui/lab/LoadingButton'
/* import SaveIcon from '@mui/icons-material/Save' */
import Stack from '@mui/material/Stack'
import SendIcon from '@mui/icons-material/Send'

export const ButtonLoading = ({ variant, size, text, positionloading, loading }) => {
  return (
    <Stack direction='row' spacing={2}>
      {/* <LoadingButton
        loading
        loadingPosition='start'
        startIcon={<SaveIcon />}
        variant='outlined'
      >
        Save
      </LoadingButton> */}
      <LoadingButton
        type='submit'
        size={size}
        /* onClick={handleClick} */
        endIcon={<SendIcon />}
        loading={loading}
        loadingPosition={positionloading}
        variant={variant}
        sx={{ backgroundColor: '#F25B19', marginTop: '10px' }}
      >
        <span>{text}</span>
      </LoadingButton>
    </Stack>
  )
}

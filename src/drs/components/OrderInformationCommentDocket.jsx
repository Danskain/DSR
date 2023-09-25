import { Stack, TextField, IconButton } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import CheckIcon from '@mui/icons-material/Check'

export const OrderInformationCommentDocket = ({
  inputRef,
  checkValueCommentTemplate,
  haidenCancelCommentTemplate
}) => {
  return (
    <Stack
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={0}
    >
      <TextField fullWidth id='standard-basic' variant='standard' inputRef={inputRef} name='Change' />
      <Stack
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={1}
      >
        <>
          <IconButton sx={{ color: 'red' }} aria-label='upload picture' component='label' onClick={checkValueCommentTemplate}>
            <CheckIcon />
          </IconButton>
          <IconButton sx={{ color: 'red' }} aria-label='upload picture' component='label' onClick={haidenCancelCommentTemplate}>
            <ClearIcon />
          </IconButton>
        </>
      </Stack>
    </Stack>
  )
}

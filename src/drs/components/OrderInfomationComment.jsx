import { Stack, Typography } from '@mui/material'
import { TextareaAutosize } from '@mui/base'

export const OrderInfomationComment = ({ selectCommentTemplateDocket, inputRefComment }) => {
  return (
    <Stack
      direction='column'
      justifyContent='flex-start'
      alignItems='flex-start'
      spacing={0}
      style={{ padding: '10px'}}
    >
      <Typography variant='h6' style={{ fontSize: '16px' }}>
        Comment
      </Typography>  
      <TextareaAutosize
        aria-label='minimum height'
        minRows={4}
        defaultValue={selectCommentTemplateDocket.comment}
        style={{ width: '100%', height: '90px', borderRadius: '5px' }}
        ref={inputRefComment}
      />
    </Stack>
  )
}

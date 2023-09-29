import { Stack, Typography } from '@mui/material'
import { TextareaAutosize } from '@mui/base'

export const OrderInfomationComment = ({ selectCommentTemplateDocket, setSelectCommentTemplateDocket }) => {
  return (
    <Stack
      direction='column'
      justifyContent='flex-start'
      alignItems='flex-start'
      spacing={0}
      style={{ padding: '10px'}}
    >
      <Typography variant='h6' className='texto-con-relieve'>
        Comment
      </Typography>  
      <TextareaAutosize
        aria-label='minimum height'
        minRows={4}
        value={selectCommentTemplateDocket.comment}
        onChange={(e) => setSelectCommentTemplateDocket({
            commentTemplate: [],
            comment: e.target.value,
            docketHeader: []  
        })}
        style={{ width: '100%', height: '90px', borderRadius: '5px' }}
        //ref={inputRefComment}
      />
    </Stack>
  )
}

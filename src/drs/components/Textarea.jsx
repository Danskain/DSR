import { TextareaAutosize } from '@mui/base'
export const Textarea = ({ id, age, handleChange }) => {
  return (
    <>
      <TextareaAutosize
        aria-label='minimum height'
        minRows={4}
        style={{ width: '350px', height: '100px', borderRadius: '5px' }}
        value={age}
        onChange={(e) => handleChange(e, id)}
      />
    </>
  )
}

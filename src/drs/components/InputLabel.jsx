import TextField from '@mui/material/TextField';

export const InputLabel = ({ id, age, handleChange }) => {
  return (
    <TextField id="standard-basic" value={age} variant="standard" onChange={(e) => handleChange(e, id)} fullWidth />
  )
}

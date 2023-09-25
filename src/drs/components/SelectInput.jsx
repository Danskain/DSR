import { Select, MenuItem, FormControl } from '@mui/material'

export const SelectInput = ({ valorData, age, handleChange }) => {
  return (
    <FormControl variant='standard' fullWidth >
      <Select
        labelId='demo-simple-select-standard-label'
        id='demo-simple-select-standard'
        value={age}
        onChange={handleChange}
        label='Status'
        style={{fontSize: '12px'}}
      >
        {valorData.map((da) => (
          <MenuItem key={da.id} value={da.value}>{da.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

import { Select, MenuItem, FormControl } from '@mui/material'

export const SelectInputMagento = ({ valorData, age, handleChange, id }) => {
  return (
    <FormControl variant='standard' fullWidth>
      <Select
        align='left'
        labelId='demo-simple-select-standard-label'
        id='demo-simple-select-standard'
        value={age}
        onChange={(e) => handleChange(e, id)}
        label='Status'
      >
        {valorData.map((da) => (
          <MenuItem key={da.id} value={da.value}>{da.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

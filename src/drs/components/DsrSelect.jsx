import { Select, MenuItem, FormControl } from '@mui/material'
export const DsrSelect = ({ valorData, age, handleChange }) => {
    return (
      <FormControl variant='filled' fullWidth sx={{ border: 'white 1px solid', backgroundColor: '#CACFD2', borderRadius: '5px', }}>
        <Select
          sx={{ paddingBottom: '5px' }}
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

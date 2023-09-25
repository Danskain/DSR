import { Select, MenuItem, FormControl } from '@mui/material'
export const DsrInputSelectIssues = ({ handleChange, params }) => {
    return (
      <FormControl variant='filled' fullWidth sx={{ border: 'white 1px solid', backgroundColor: '#CACFD2', borderRadius: '5px', }}>
        <Select
          sx={{ paddingBottom: '8px' }}
          labelId='demo-simple-select-standard-label'
          id='demo-simple-select-standard'
          value={params.value}
          onChange={(newValue) => handleChange(newValue, params.row.id)}
          label='Status'
          style={{fontSize: '12px'}}
        >
          {params.row.valorDataSelect.map((da) => (
            <MenuItem key={da.id} value={da.value}>{da.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    )
}



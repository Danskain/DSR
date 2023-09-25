//import { useState } from 'react'
//import React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Box } from '@mui/material'
import dayjs from 'dayjs'

export const DsrDataBasic = ({handleChange, params}) => {

  /* useEffect(() => {
    const { value } = params
    console.log("🚀 ~ file: DsrDataBasic.jsx:9 ~ useEffect ~ value:", value)
    
    setValueDate(value)
  }, [params]) */
  /* const datePickerStyles = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red', // Cambia este valor al color deseado para los bordes
      },
      '& input': {
        color: 'blue', // Cambia este valor al color deseado para el valor
      },
    },
  }; */
  //const [name, setName] = useState('')
  /* const CustomActionBar = () => (
    <TextField  variant="standard" />
  ); */

  //const CustomToolbar = () => <input />;
  
  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs} /* style={{ borderColor: 'white', color: 'white' }} */>
        <DemoContainer
          components={[
            'DatePicker',
          ]}
          //style={{ borderColor: 'white', color: 'white' }}
        >
          <DatePicker
            /* format='YYYY/MM/DD hh:mm' */
            //defaultValue={dayjs(age)}
            sx={{ border: 'white 1px solid', backgroundColor: '#CACFD2', borderRadius: '5px' }}
            onChange={(newValue) => handleChange(newValue, params.row.id, params.field)}
            value={dayjs(params.value) || null}
            slotProps={{
              actionBar: {
                actions: ['clear'],
                /* name,
                setName */
              },
            }}
            /* slots={{
              textField: CustomTextField  
            }} */
            //inputVariant="standard" 
            /* renderInput={(props) => (
              <TextField
                {...props}
                InputLabelProps={{ shrink: true }}
                variant="standard"
                style={datePickerStyles}
              />
            )} */
            emptyLabel=" "
          />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  )
}

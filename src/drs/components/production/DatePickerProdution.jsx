//import { useState } from 'react'
//import React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Box } from '@mui/material'
//import dayjs from 'dayjs'

export const DatePickerProdution = ({ name, valor, handleChange }) => {  
  
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
            sx={{ /* border: 'white 1px solid', */ backgroundColor: 'white', borderRadius: '5px' }}
            //onChange={(newValue) => handleChange(newValue, params.row.id)}
            //value={dayjs(params.value) || null}
            onChange={handleChange}
            //value={dayjs(valor)}
            value={valor}
            label={name}
            slotProps={{
              actionBar: {
                actions: ['clear'],
                /* name,
                setName */
              },
            }}
            //renderInput={(params) => <TextField {...params} />}
            //emptyLabel="sss"
          />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  )
}

/* import { useEffect, useState } from 'react' */
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { Box } from '@mui/material'
import dayjs from 'dayjs'


export const Date = ({ age, handleChange, id }) => {
  /* console.log(age) */
  /* const [formatDate, setFormatDate] = useState(age)
  useEffect(() => {
    const stringResult = 'T00:00'
    console.log(age)
    if (age.length === 10) {
      setFormatDate(`${age}${stringResult}`)
    }
  }, [age]) */
  
  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={[
            'DateTimePicker',
          ]}
        >
          <DateTimePicker
            /* format='YYYY/MM/DD hh:mm' */
            /* defaultValue={dayjs(age)} */
            onChange={(newValue) => handleChange(newValue, id)}
            value={dayjs(age)}
            slotProps={{
              actionBar: {
                actions: ['clear'],
              },
            }}
            emptyLabel=" "
          />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  )
}

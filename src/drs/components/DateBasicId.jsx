/* import { useEffect, useState } from 'react' */
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Box } from '@mui/material'
import dayjs from 'dayjs'


export const DateBasicId = ({ age, handleChange, id }) => {
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
            'DatePicker',
          ]}
        >
          <DatePicker
            /* format='YYYY/MM/DD hh:mm' */
            //defaultValue={dayjs(age)}
            onChange={(newValue) => handleChange(newValue, id)}
            value={dayjs(age) || null}
            slotProps={{
              actionBar: {
                actions: ['clear', 'today'],
              },
            }}
            emptyLabel=" "
          />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  )
}


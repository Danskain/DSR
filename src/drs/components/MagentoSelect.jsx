import ClearIcon from '@mui/icons-material/Clear'
import CheckIcon from '@mui/icons-material/Check'
import { SelectInputMagento } from './SelectInputMagento'
import { IconButton, Stack } from '@mui/material'
import { Date, InputLabel, DateBasicId, Textarea, DateTime } from '../components'
//mport { Link } from '../../components'

export const MagentoSelect = ({ valorData, age, handleChange, id, haidenCancel, checkValue, typeCtrl, handleChangeOrderDate }) => {
  const handelInputs = (typeCtrl) => {
    const objOrdanamiento = {
      select: <SelectInputMagento age={age} id={id} handleChange={handleChange} valorData={valorData} />,
      date: <Date age={age} id={id} handleChange={handleChangeOrderDate} valorData={valorData} />,
      dateTime: <DateTime age={age} id={id} handleChange={handleChangeOrderDate} valorData={valorData} />,
      input: <InputLabel age={age} handleChange={handleChange} id={id} />,
      dateBasic: <DateBasicId age={age} id={id} handleChange={handleChangeOrderDate} valorData={valorData} />,
      //link: <Link age={age} id={id} handleChange={handleChangeOrderDate} valorData={valorData} />
      textarea: <Textarea age={age} handleChange={handleChange} id={id} />
    }

    const COLORS_CELL_DEFAULT = ''

    return objOrdanamiento[typeCtrl] || COLORS_CELL_DEFAULT
  }
  
  return (
    <Stack
      direction='row'
      justifyContent='flex-start'
      alignItems='center'
      spacing={0}
      /* style={{ with: '90%', backgroundColor: 'red' }} */
    >
      {
        handelInputs(typeCtrl)
      }
      <IconButton sx={{ color: 'red' }} aria-label='upload picture' component='label' onClick={() => checkValue(id)}>
        <CheckIcon />
      </IconButton>
      <IconButton sx={{ color: 'red' }} aria-label='upload picture' component='label' onClick={() => haidenCancel(id)}>
        <ClearIcon />
      </IconButton>
    </Stack>
  )
}

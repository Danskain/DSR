import { Stack, Typography, IconButton, Grid } from '@mui/material'
/* import Grid from '@mui/material/Unstable_Grid2' */
import EditIcon from '@mui/icons-material/Edit'
import { MagentoSelect } from '../components'
export const OrderInformationArraies = ({ arraySelectOrderInformation, haidenSelectEventOrder, handleChangeOrder, handleChangeOrderDate, haidenCancel, checkValueOrder }) => {
  //console.log(arraySelectOrderInformation)
  const format = (text) => {
    const objOrdanamiento = {
     '12': '12',
     '13': '1',
     '14': '2',
     '15': '3',
     '16': '4',
     '17': '5',
     '18': '6',
     '19': '7',
     '20': '8',
     '21': '9',
     '22': '10',
     '23': '11',
     '24': '12',
    }
  
    const COLORS_CELL_DEFAULT = ''
    return objOrdanamiento[text] || COLORS_CELL_DEFAULT
  }
  
  const formateDateTimeDei = (number, minutos) => {
    if (number >= 12) {
      return `${format(number.toString())}:${minutos} PM`
    }

    return `${(number.toString())}:${minutos} AM`
  }

  const formateDateTimeHours = (date) => {
    const arraySeparado = date.split(':')
    return formateDateTimeDei(parseInt(arraySeparado[0]), arraySeparado[1])
  }

  const validateLetraT = (texto) => {
    return texto.includes("T");
  } 

  const formateDateTime = (label, value) => {
    if (!value || !label) {
      return ''
    }
    if (label === 'Approval Time:') {
      if (validateLetraT(value)) {
        const arraySeparado = value.split('T');
        return formateDateTimeHours(arraySeparado[1])
      }
      return value
    }

    if (label === 'Estimated Shipping (or Pickup) Date:' || label === 'Estimated Delivery Date:' || label === 'Approval Date:') {
      if (validateLetraT(value)) {
        const arraySeparado = value.split('T');
        return arraySeparado[0]
      }
      return value
    }
    return value
  }

  return (
    <Grid
      container
      spacing={0}
      style={{ padding: '10px' }}
    >
      {arraySelectOrderInformation.map((elemento) => (
        <Grid xs={6} key={elemento.id} /* style={{ borderStyle: 'outset', borderRadius: '10px' }} */>
          <Stack
            direction='row'
            justifyContent='flex-start'
            alignItems='center'
            spacing={0}
          >
            <Typography variant='h6' align='left' style={{ fontSize: '16px' }}>
              {elemento.label}
            </Typography>
            {elemento.typeCtrl !== 'none'
            ? <IconButton sx={{ color: 'red' }} aria-label='upload picture' component='label' onClick={() => haidenSelectEventOrder(elemento.id)}><EditIcon style={{ fontSize: '12px' }}/></IconButton>
            : ''}
          </Stack>
          {elemento.event
          ? <Typography variant='body1' align='left' style={{ fontSize: '15px' }}> {formateDateTime(elemento.label, elemento.value)} </Typography>
          : <MagentoSelect age={elemento.value} typeCtrl={elemento.typeCtrl} handleChange={handleChangeOrder} handleChangeOrderDate={handleChangeOrderDate} id={elemento.id} haidenCancel={haidenCancel} valorData={elemento.arraySelect} checkValue={checkValueOrder} />}
        </Grid>
      ))}
    </Grid>
  )
}

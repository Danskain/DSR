import { Stack, Typography, IconButton, Grid } from '@mui/material'
/* import Grid from '@mui/material/Unstable_Grid2' */
import EditIcon from '@mui/icons-material/Edit'
import { MagentoSelect } from '../components'
export const OrderInformationArraies = ({ arraySelectOrderInformation, haidenSelectEventOrder, handleChangeOrder, handleChangeOrderDate, haidenCancel, checkValueOrder }) => {
  //console.log(arraySelectOrderInformation)
  const format = (text) => {
    const objOrdanamiento = {
      '0': '12',
      '1': '01',
      '2': '02',
      '3': '03',
      '4': '04',
      '5': '05',
      '6': '06',
      '7': '07',
      '8': '08', 
      '9': '08', 
      '10': '10', 
      '11': '11',
      '12': '12',
      '13': '01',
      '14': '02',
      '15': '03',
      '16': '04',
      '17': '05',
      '18': '06',
      '19': '07',
      '20': '08',
      '21': '09',
      '22': '10',
      '23': '11',
      '24': '12',
    }
  
    const COLORS_CELL_DEFAULT = ''
    return objOrdanamiento[text] || COLORS_CELL_DEFAULT
  }
  const formatMinutos = (numer) => {
    if (numer < 10) {
      return `0${numer}`
    }
    return  `${numer}`
  }
  const formateDateTimeDei = (number, minutos) => {
    console.log("number, minutos:", number, minutos)
    if (number >= 12) {
      return `${format(number.toString())}:${formatMinutos(minutos)} PM`
    } 
    
    //console.log("number:", number)
    return `${format(number.toString())}:${formatMinutos(minutos)} AM`
  }

  const formateDateTimeHours = (date) => {
    const arraySeparado = date.split(':')
    return formateDateTimeDei(parseInt(arraySeparado[0]), parseInt(arraySeparado[1]))
  }

  const validateLetraT = (texto) => {
    return texto.includes("T");
  } 

  const formateDateTime = (label, value) => {
    if (!value || !label) {
      return ''
    }
    if (label === 'Approval Time:') {
      console.log("value:", value)
      if (validateLetraT(value)) {
        const arraySeparado = value.split('T');
        return formateDateTimeHours(arraySeparado[1])
      }
      return formateDateTimeHours(value)
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
            <Typography variant='h6' align='left' /* style={{ fontSize: '16px' }} */ className='texto-con-relieve' >
              {elemento.label}
            </Typography>
            {elemento.typeCtrl !== 'none'
            ? <IconButton sx={{ color: 'red' }} aria-label='upload picture' component='label' onClick={() => haidenSelectEventOrder(elemento.id)}><EditIcon style={{ fontSize: '12px' }}/></IconButton>
            : ''}
          </Stack>
          {elemento.event
          ? <Typography variant='body1' align='left' className='texto-con-relieve-value'> {formateDateTime(elemento.label, elemento.value)} </Typography>
          : <MagentoSelect age={elemento.value} typeCtrl={elemento.typeCtrl} handleChange={handleChangeOrder} handleChangeOrderDate={handleChangeOrderDate} id={elemento.id} haidenCancel={haidenCancel} valorData={elemento.arraySelect} checkValue={checkValueOrder} />}
        </Grid>
      ))}
    </Grid>
  )
}

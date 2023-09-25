import { Stack, Typography, IconButton, Grid } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
/* import Grid from '@mui/material/Unstable_Grid2' */
import { MagentoSelect } from '../components'
export const OrderInformationDie = ({
    dieResultArray,
    haidenSelectEventDie,
    handleChangeDie,
    haidenCancelDie,
    checkValueDie
}) => {
  return (
    <Stack
      direction='column'
      justifyContent='flex-start'
      alignItems='flex-start'
      spacing={0}
      style={{ padding: '10px' }}
    >
      {dieResultArray.map((da) => (
        <Grid xs={12} key={da.id}>
          <Stack
            direction='row'
            justifyContent='flex-start'
            alignItems='center'
            spacing={1}
          >
            <Typography variant='h6' align='left' style={{ fontSize: '16px' }}>
              {da.label}
            </Typography>
            {da.typeCtrl === 'input'
            ? <IconButton sx={{ color: 'red' }} aria-label='upload picture' component='label' onClick={() => haidenSelectEventDie(da.id)}><EditIcon style={{ fontSize: '15px' }}/></IconButton>
            : ''}
          </Stack>
          {da.event
          ? <Typography variant='body1' align='left' style={{ fontSize: '15px', padding: 0 }}> {da.value} </Typography>
          : <MagentoSelect age={da.value} typeCtrl={da.typeCtrl} handleChange={handleChangeDie} id={da.id} haidenCancel={haidenCancelDie} valorData={da.arraySelect} checkValue={checkValueDie} />}
        </Grid>
      ))}  
    </Stack>
  )
}

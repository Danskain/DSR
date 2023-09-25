import { Stack, Typography, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import ClearIcon from '@mui/icons-material/Clear'
import CheckIcon from '@mui/icons-material/Check'
import { InputLabel } from '../components'
export const OrderInformationAddress = ({
    checkValueAddress,
    haidenCancelAddress, 
    arrayshippingAddressArray,
    haidenSelectEventAddress, 
    handleChangeAddress, 
    hidenAddress
}) => {
  return (
    <Stack
      direction='column'
      justifyContent='flex-start'
      alignItems='flex-start'
      spacing={0}
      style={{ padding: '10px' }}
    >
      {arrayshippingAddressArray.map((da) => (
        <Stack
          key={da.id}
          direction='row'
          justifyContent='flex-start'
          alignItems='center'
          spacing={1}
          /* sx={{ display: { lg: 'flex', md: 'none' } }} */
        >
          <Typography variant='h6' style={{ fontSize: '16px' }}>
            {da.label}
          </Typography>
          {da.typeCtrl === 'butoon'
          ? <IconButton sx={{ color: 'red' }} aria-label='upload picture' component='label' onClick={() => haidenSelectEventAddress(da.id)}><EditIcon style={{ fontSize: '13px' }}/></IconButton>
          : ''}
          {da.event
            ? <Typography variant='subtitle1' style={{ fontSize: '15px' }}> {da.value} </Typography>
            : <InputLabel age={da.value} handleChange={handleChangeAddress} id={da.id} />}
        </Stack>
      ))}
      {/* {arrayshippingAddressArray.map((da) => (
        <Stack
          key={da.id}
          direction='column'
          justifyContent='flex-start'
          alignItems='flex-start'
          spacing={1}
          sx={{ display: { md: 'flex', lg: 'none' } }}
        >
          <Typography variant='h6'>
            {da.label}
          </Typography>
          {da.typeCtrl === 'butoon'
          ? <IconButton sx={{ color: 'red' }} aria-label='upload picture' component='label' onClick={() => haidenSelectEventAddress(da.id)}><EditIcon style={{ fontSize: '15px' }}/></IconButton>
          : ''}
          {da.event
          ? <Typography variant='subtitle1'> {da.value} </Typography>
          : <InputLabel age={da.value} handleChange={handleChangeAddress} id={da.id} />}
        </Stack>
      ))} */}
      <Stack
        direction='row'
        justifyContent='flex-start'
        alignItems='center'
        spacing={1}
      >
        {hidenAddress
        ? <>
            <IconButton sx={{ color: 'red' }} aria-label='upload picture' component='label' onClick={checkValueAddress}>
              <CheckIcon />
            </IconButton>
            <IconButton sx={{ color: 'red' }} aria-label='upload picture' component='label' onClick={haidenCancelAddress}>
              <ClearIcon />
            </IconButton>
          </>
        : ''}
      </Stack>
    </Stack>
  )
}

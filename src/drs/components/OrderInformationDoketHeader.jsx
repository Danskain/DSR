import { useState, useRef } from 'react'
import { Stack, Typography, IconButton, Grid, FormControl, Select, MenuItem } from '@mui/material'
import { OrderInformationCommentDocket } from '../components'
import EditIcon from '@mui/icons-material/Edit'

export const OrderInformationDoketHeader = ({ valorDataSelectDocketHeader, setValorDataSelectDocketHeader, setSelectDocketHeader, selectDocketHeader}) => {
  const [hidemDocketHeader, sethidemDocketHeader] = useState(true)
  const inputRefDocketHeader = useRef()

  const checkValueDocketHeader = () => {
    const arrayResult = [...selectDocketHeader]
    arrayResult.push(inputRefDocketHeader.current.value)
    setSelectDocketHeader(arrayResult)
    sethidemDocketHeader(true)
  }

  const haidenCancelDocketHeader = () => {
    inputRefDocketHeader.current.value = ''
    sethidemDocketHeader(true)
  }

  const haidenSelectEventDocketHeader = () => {
    sethidemDocketHeader(false)
  }

  const handleChangeSelectDocketHeader = (e) => {
    setValorDataSelectDocketHeader(e.target.value)
  }

  return (
    <Stack
      direction='row'
      justifyContent='flex-start'
      alignItems='flex-start'
      spacing={4}
      style={{ padding: '10px' }}
    >
      <Grid xs={12}>
        <Stack
          direction='row'
          justifyContent='flex-start'
          alignItems='center'
          pacing={1}
        >
          <Typography  variant='h6' align='left' className='texto-con-relieve'>
            Docket Header
          </Typography>
            {hidemDocketHeader
            ? <IconButton sx={{ color: 'red' }} aria-label='upload picture' component='label' onClick={haidenSelectEventDocketHeader}><EditIcon style={{ fontSize: '15px' }}/></IconButton>
            : ''}
        </Stack>
        {hidemDocketHeader
        ? <FormControl variant='standard' fullWidth>
            <Select
                align='left'
                labelId='demo-simple-select-standard-label'
                id='demo-simple-select-standard'
                value={valorDataSelectDocketHeader}
                onChange={handleChangeSelectDocketHeader}
                label='Status'
            >
                {selectDocketHeader.map((da) => (
                <MenuItem key={da} value={da}>{da}</MenuItem>
                ))}
            </Select>
            </FormControl>
        : <OrderInformationCommentDocket inputRef={inputRefDocketHeader} checkValueCommentTemplate={checkValueDocketHeader} haidenCancelCommentTemplate={haidenCancelDocketHeader} />}
      </Grid>
    </Stack>
  )
}

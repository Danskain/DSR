import { useState, useRef } from 'react'
import { Stack, Typography, IconButton, Grid, FormControl, Select, MenuItem } from '@mui/material'
import { OrderInformationCommentDocket } from '../components'
import EditIcon from '@mui/icons-material/Edit'

export const OrderInformationCommentTemplate = ({selectCommentTemplate, setSelectCommentTemplate, valorDataSelectCommentTemplate, setValorDataSelectCommentTemplate, inputRefComment}) => {
  const [hidemCommentTemplate, setHidemCommentTemplate] = useState(true)
  const inputRefCommentTemplate = useRef()

  const haidenSelectEventCommentTemplate = () => {
    setHidemCommentTemplate(false)
  }

  const checkValueCommentTemplate = () => {
    const arrayResult = [...selectCommentTemplate]
    arrayResult.push(inputRefCommentTemplate.current.value)
    setSelectCommentTemplate(arrayResult)
    setHidemCommentTemplate(true)
  }

  const haidenCancelCommentTemplate = () => {
    inputRefCommentTemplate.current.value = ''
    setHidemCommentTemplate(true)
  }

  const handleChangeSelectCommentTemplate = (e) => {
    const valorComent = inputRefComment.current.value
    inputRefComment.current.value = `${valorComent} ${e.target.value}`
    setValorDataSelectCommentTemplate(e.target.value)
  }

  return (
    <Stack
      direction='row'
      justifyContent='flex-start'
      alignItems='flex-start'
      spacing={4}
      style={{padding: '10px'}}
    >
      <Grid xs={12}>
        <Stack
          direction='row'
          justifyContent='flex-start'
          alignItems='center'
          spacing={1}
        >
          <Typography variant='h6' align='left' style={{ fontSize: '16px' }}>
            Comment Template
          </Typography>
          {hidemCommentTemplate
            ? <IconButton sx={{ color: 'red' }} aria-label='upload picture' component='label' onClick={haidenSelectEventCommentTemplate}><EditIcon style={{ fontSize: '15px' }}/></IconButton>
            : ''}
        </Stack>
        {hidemCommentTemplate
          ? <FormControl variant='standard' fullWidth>
              <Select
                align='left'
                labelId='demo-simple-select-standard-label'
                id='demo-simple-select-standard'
                value={valorDataSelectCommentTemplate}
                onChange={handleChangeSelectCommentTemplate}
                label='Status'
              >
                {selectCommentTemplate.map((da) => (
                  <MenuItem key={da} value={da}>{da}</MenuItem>
                ))}
              </Select>
            </FormControl>
          : <OrderInformationCommentDocket inputRef={inputRefCommentTemplate} checkValueCommentTemplate={checkValueCommentTemplate} haidenCancelCommentTemplate={haidenCancelCommentTemplate} />}
        </Grid>  
    </Stack>
  )
}

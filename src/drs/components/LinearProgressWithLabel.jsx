/* import { useEffect } from 'react' */
import { Typography, Box, Stack, styled } from '@mui/material'
import LinearProgress, {
  linearProgressClasses
} from '@mui/material/LinearProgress'


export const LinearProgressWithLabel = (props) => {

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800]
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: /* props.progress === 100 ? "#00FF00" :  */props.progress === 95 || props.progress === 25 ? "#FF0000" : "#1a90ff"
    }
  }));

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
      spacing={0}
      style={{ margin: '10px 0 10px 0'}}
    >
      <Typography variant='body2' color='text.secondary'>
        {`${props.index + 1})`} {props.name} {`(${props.size})`}bytes
      </Typography>
      <Box sx={{ width: '100%'}}>
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        > 
          <Box sx={{ width: '100%'}}>
            <BorderLinearProgress variant='determinate' /* {...props} */value={props.progress} />
          </Box>
          <Box sx={{ width: '10%'}}>  
            <Typography variant='body2' style={{color: /* props.progress === 100 ? "#00FF00" :  */props.progress === 95 || props.progress === 25 ? "#FF0000" : "#1a90ff" }} >{`${Math.round(
              props.progress,
            )}%`}</Typography>
          </Box>
        </Stack>  
      </Box>
    </Stack>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
//import { AuthContext } from '../../auth/context/AuthContext'
import FindInPageIcon from '@mui/icons-material/FindInPage'
//import { apiRest } from '../../logic/constantes'
import LoadingButton from '@mui/lab/LoadingButton'
import { Stack } from '@mui/material'
export const BottonOrder = ({ params,  modulo, magento }) => {
  const { value } = params
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handelButoon = () => {
    setLoading(true)

    if (modulo === '1') {
      const newPathname = `/magento/${value}/${params.row.idWebsite || params.row.dsr_websiteId}`
      //const loca = `/magento/${order}/${orderWebsite.website}`
      navigate(newPathname);
    } else {
      navigate(`${value}/${params.row.idWebsite || params.row.dsr_websiteId}`)
    }
    setLoading(false)
  }

  const diferentePestana = () =>{
    const newPathname = `/magento/${value}/${params.row.idWebsite || params.row.dsr_websiteId}`
    const dominio = window.location.origin
    const url = `${dominio}/#${newPathname}`
    window.open(url, '_blank');
    /* console.log("dominio:", dominio) */
  }

  return (
    
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      style={{ width: '100%' }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={0.3}
      >
        <FindInPageIcon
          className='boton-icon'
          style={{ height: '38px', }}
          onClick={diferentePestana}
        />
        <LoadingButton
          //startIcon={<FindInPageIcon  />}
          style={{ backgroundColor: '#00A1E0' }}
          loading={loading}
          variant="contained"
          onClick={handelButoon}
        >
          {value}
        </LoadingButton>
      </Stack>
      {/* <LoadingButton
        startIcon={<FindInPageIcon  />}
        style={{ backgroundColor: '#00A1E0' }}
        loading={loading}
        variant="contained"
        onClick={handelButoon}
      >
      </LoadingButton> */}
      {/* <IconButton aria-label='upload picture' onClick={diferentePestana} style={{ backgroundColor: 'red' }} >
        <FindInPageIcon  />        
      </IconButton> */}
      {/* <Button
        style={{ backgroundColor: 'red', width: '5px' }}
        onClick={diferentePestana}
      >
        <FindInPageIcon  />
      </Button> */}
      {magento &&
        <a href={params.row.dsr_url_magento} target="_blank" rel="noopener noreferrer">
          <img src="/src/assets/logo.png" alt="" style={{ width: '40px', height:'40px' }} />
        </a>
      }

    </Stack>
    
  )
}

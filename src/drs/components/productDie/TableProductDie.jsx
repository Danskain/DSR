import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../../auth/context/AuthContext'
import { ProductDieCell, ImageProductDie, Download, ModalAddDie } from '../productDie';
import { Box, Backdrop, styled, CircularProgress, Button, Stack } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
//import { BottonOrder } from '../../components'
import { apiRest } from '../../../logic/constantes'
import {
  DataGrid,
  //GridCellEditStopReasons,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from '@mui/x-data-grid'

function customCheckbox (theme) {
  return {
    '& .MuiCheckbox-root svg': {
      width: 16,
      height: 16,
      backgroundColor: 'transparent',
      border: `1px solid ${
        theme.palette.mode === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'
      }`,
      borderRadius: 2
    },
    '& .MuiCheckbox-root svg path': {
      display: 'none'
    },
    '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
      backgroundColor: '#1890ff',
      borderColor: '#1890ff'
    },
    '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
      position: 'absolute',
      display: 'table',
      border: '2px solid #fff',
      borderTop: 0,
      borderLeft: 0,
      transform: 'rotate(45deg) translate(-50%,-50%)',
      opacity: 1,
      transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
      content: '""',
      top: '50%',
      left: '39%',
      width: 5.71428571,
      height: 9.14285714
    },
    '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
      width: 8,
      height: 8,
      backgroundColor: '#1890ff',
      transform: 'none',
      top: '39%',
      border: 0
    }
  }
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color:
    theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"'
  ].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d'
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none'
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `2px solid ${
      theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
    }`
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: `2px solid ${
      theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
    }`
  },
  '& .MuiDataGrid-cell': {
    color:
      theme.palette.mode === 'light' ? 'black' : 'rgba(255,255,255,0.65)'
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0
  },
  '& .MuiTablePagination-root': {
    color:
      theme.palette.mode === 'light' ? '#fafafa' : 'red'
  },
  '& .MuiSvgIcon-root': {
    color:
      theme.palette.mode === 'light' ? 'white' : 'red'
  },
  ...customCheckbox(theme)
}))

export const TableProductDie = () => {
  const [rows, setRows] = useState([])
  const [open, setOpen] = useState(false)
  const [heightDate, setHeightDate] = useState(true)
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  const { token } = useContext(AuthContext)

  useEffect(() => {
    if(rows.length >= 9) {
      setHeightDate(false)
    }else{
      setHeightDate(true)
    }
  }, [rows])

  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }

  const formartJson = (text) => {
    const arrayResilt = JSON.parse(text)
    const resultado = arrayResilt.map(objeto => {
      const clave = Object.keys(objeto)[0]; // Obtener la única clave del objeto
      return `${clave}: ${objeto[clave]}`;
    }).join(', '); 
    return resultado
  }

  const fetchDataProductDie = async () => {
    const request = {
      token
    }
    request.option = 'dieCut'
    request.controller = 'dsr'
    //request.optionIssues = '2'

    const requestOptions = {
      method: 'POST',
      /* headers: { 'Content-Type': 'application/json' }, */
      body: JSON.stringify(request)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { data, message, type } = datas
        
        if (type === 'ok') {
          const dararesult = data.map((da) => {
            return {
              ...da,
              id: da.die_cut__id,
              die_cut__pocket_size: formartJson(da.die_cut__pocket_size),
              die_cut__panel_size: formartJson(da.die_cut__panel_size),
            }
          })
          setRows(dararesult)
        }

        if (type === 'error') {
          setAlertsOptions({
            types: type,
            message
          })
          setOpenAlerts(true)
          if (message === 'invalid token') {
            logout()
          }
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        handleClose()
      })
  }

  useEffect(() => {
    handleOpen()
    fetchDataProductDie()
  }, [])

  function CustomToolbar() {
    return (
      <GridToolbarContainer style={{backgroundColor: /* '#CACFD2' *//* '#433F3F' */'#0166C6', borderBottom: '#fafafa 2px solid', padding: '5px'}} >
        <GridToolbarColumnsButton style={{color: 'white', backgroundColor: '#00A1E0'}} />
        <GridToolbarFilterButton style={{color: 'white', backgroundColor: '#00A1E0'}} />
        
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0}
            //onClick={handleSaveDataIssues}
            style={{backgroundColor: '#00A1E0', height: '31px', paddingLeft: '4px', borderRadius: '4px'}}
          >
            <AddBoxIcon style={{  fontSize: 22 }} />
            <Button style={{color: 'white', /* position: 'relative', right: 5, */}} onClick={handleOpenModal}>
              Add New Die 
            </Button>
          </Stack>
      </GridToolbarContainer>
    );
  }
  
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 120,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <ProductDieCell params={params} />
    },
    {
      field: 'die_cut__code',
      headerName: 'Code',
      width: 120,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <ProductDieCell params={params} />
    },
    {
      field: 'die_cut__preview',
      headerName: 'Preview',
      width: 300,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <ImageProductDie params={params} />
    },
    {
      field: 'die_cut__open_size',
      headerName: 'Open Size',
      //width: 200,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <ProductDieCell params={params} />
    },
    {
      field: 'die_cut__finish_size',
      headerName: 'Finished Size',
      //width: 200,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <ProductDieCell params={params} />
    },
    {
      field: 'die_cut__qty_pocket',
      headerName: 'Qty. Pockets',
      //width: 200,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <ProductDieCell params={params} />
    },
    {
      field: 'die_cut__pocket_size',
      headerName: 'Pockets Size',
      //width: 200,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <ProductDieCell params={params} />
    },
    {
      field: 'die_cut__qty_panel',
      headerName: 'Qty. Panles',
      //width: 200,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <ProductDieCell params={params} />
    },
    {
      field: 'die_cut__panel_size',
      headerName: 'Panles Size',
      //width: 200,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <ProductDieCell params={params} />
    },
    {
      field: 'die_cut__description',
      headerName: 'Description',
      width: 260,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <ProductDieCell params={params} />
    },
    {
      field: 'die_cut__file',
      headerName: 'Download',
      width: 130,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <Download params={params} />
    },
  ]

  return (
    <Box sx={{
      /* backgroundColor: '#191616', */
      marginTop: '5px',
      height: heightDate ? 'auto' : '94vh',
      width: '100%',
    }}
    >
      <StyledDataGrid
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: '#fafafa',
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main'
            },
            '& .super-app-theme--header': {
              backgroundColor: '#0166C6',
              //backgroundColor: '#CACFD2',
            },
            '& .MuiDataGrid-footerContainer': {
              //backgroundColor: '#CACFD2',
              //backgroundColor: '#433F3F',
              backgroundColor: '#0166C6',
            },
        }}
        rows={rows}
        columns={columns}
        slots={{
          toolbar: CustomToolbar,
        }}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
          pagination: {
            paginationModel: {
              pageSize: 25
            }
          }
        }}
        pageSizeOptions={[25, 50, 100]}
        checkboxSelection={false}
        disableRowSelectionOnClick
        rowHeight={250}
        autoHeight={heightDate}
        /* getRowClassName={getRowClassName} */
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <ModalAddDie
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />
    </Box>
  )
}

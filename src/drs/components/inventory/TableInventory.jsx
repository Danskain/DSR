
import { useState, useEffect } from 'react'
import {
  //GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  //GridToolbarExport,
  //GridToolbarDensitySelector,
  //GridActionsCellItem,
  //GridRowEditStopReasons,
} from '@mui/x-data-grid'

  import AddIcon from '@mui/icons-material/Add';
  //import EditIcon from '@mui/icons-material/Edit';
  //import DeleteIcon from '@mui/icons-material/DeleteOutlined';
  //import SaveIcon from '@mui/icons-material/Save';
  //import CancelIcon from '@mui/icons-material/Close';
//import { AuthContext } from '../../../auth/context/AuthContext'
//import { BottonOrder } from '../BottonOrder'
//import { ProductDieCell } from '../productDie';
import { Box, Backdrop, styled, CircularProgress, Button } from '@mui/material'
import { AddModify } from './modal'

//import { apiRest } from '../../../logic/constantes'

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

export const TableInventory = () => {
  const [rows, setRows] = useState([])
  const [open, setOpen] = useState(false)
  const [heightDate, setHeightDate] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  //const { token } = useContext(AuthContext)

  useEffect(() => {
    if(rows.length >= 9) {
      setHeightDate(false)
    }else{
      setHeightDate(true)
    }
  }, [rows])

  const handleClose = () => setOpen(false)
  
  const handleOpen = () => setOpen(true)
  

  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)



  const handleManufacture = () => alert('Manufacture')

  /* const formartJson = (text) => {
    const arrayResilt = JSON.parse(text)
    const resultado = arrayResilt.map(objeto => {
      const clave = Object.keys(objeto)[0]; // Obtener la única clave del objeto
      return `${clave}: ${objeto[clave]}`;
    }).join(', '); 
    return resultado
  } */

  /* const fetchDataProductDie = async () => {
    const request = {
      token
    }
    request.option = 'dieCut'
    request.controller = 'dsr'
    //request.optionIssues = '2'

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
  } */

  /* useEffect(() => {
    handleOpen()
    fetchDataProductDie()
  }, []) */
  
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 120,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'name',
      headerName: 'Name',
      //width: 120,
      flex: 1,
      editable: true,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'ska',
      headerName: 'Ska',
      //width: 200,
      editable: true,
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'area',
      headerName: 'Area',
      //width: 200,
      editable: true,
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'manufactures',
      headerName: 'Manufactures',
      //width: 200,
      editable: true,
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'locations',
      headerName: 'Locations',
      //width: 200,
      editable: true,
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      headerClassName: 'super-app-theme--header',
      
    },
  ]

  function CustomToolbar() {
    return (
      <GridToolbarContainer  style={{backgroundColor: /* '#CACFD2' *//* '#433F3F' */'#0166C6', borderBottom: '#fafafa 2px solid', padding: '5px',}}>
        <GridToolbarColumnsButton style={{color: 'white', backgroundColor: '#00A1E0'}} />
        <GridToolbarFilterButton style={{color: 'white', backgroundColor: '#00A1E0'}} />
        {/* <GridToolbarDensitySelector /> */}
        {/* <GridToolbarExport style={{color: 'white', backgroundColor: '#00A1E0'}} /> */}
        <Button color="primary" style={{color: 'white', backgroundColor: '#00A1E0', fontSize: '12px'}} startIcon={<AddIcon />} onClick={handleOpenModal}>
          Add 
        </Button>
        <Button color="primary" style={{color: 'white', backgroundColor: '#00A1E0', fontSize: '12px'}} startIcon={<AddIcon />} onClick={handleManufacture}>
          Manufacturer
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <Box sx={{
      /* backgroundColor: '#191616', */
      marginTop: '5px',
      height: heightDate ? 'auto' : '86vh',
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

        /* editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate} */

        slots={{ toolbar: CustomToolbar }}
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
        /* slotProps={{
          toolbar: { setRows, setRowModesModel },
        }} */
        pageSizeOptions={[25, 50, 100]}
        checkboxSelection={false}
        disableRowSelectionOnClick
        rowHeight={60}
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
      <AddModify
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />
    </Box>
  )
}



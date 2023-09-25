import { useState, useEffect } from 'react'
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  //GridToolbarDensitySelector,
} from '@mui/x-data-grid';
//import { AuthContext } from '../../../auth/context/AuthContext'
import { BottonOrder } from '../BottonOrder'
import { ProductDieCell } from '../productDie';
import { Box, Backdrop, styled, CircularProgress } from '@mui/material'
import { SerchTableProduction } from '../production'
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

export const TableProduction = () => {
  const [rows, setRows] = useState([])
  const [open, setOpen] = useState(false)
  const [heightDate, setHeightDate] = useState(true)

  //const { token } = useContext(AuthContext)

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
      renderCell: (params) => <ProductDieCell params={params} />
    },
    {
      field: 'inpress_data__mg_order',
      headerName: 'Order',
      width: 120,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <BottonOrder
                                params={params}
                                /* idwebsite={idwebsite} */
                                modulo={'1'}
                              />
    },
    {
      field: 'dsr__mg_status',
      headerName: 'Status',
      //width: 200,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <ProductDieCell params={params} />
    },
    {
      field: 'dsr__create_date',
      headerName: 'Create Date Order',
      //width: 200,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <ProductDieCell params={params} />
    },
    {
      field: 'inpress_data__create_date',
      headerName: 'Create Date Impress',
      //width: 200,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <ProductDieCell params={params} />
    },
    {
      field: 'inpress_data__operator',
      headerName: 'Operator',
      //width: 200,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <ProductDieCell params={params} />
    },
    {
      field: 'inpress_data__approval',
      headerName: 'Approved By',
      //width: 200,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <ProductDieCell params={params} />
    },
    {
      field: 'inpress_data__total_good_sheets',
      headerName: 'Total Good Sheets',
      //width: 200,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <ProductDieCell params={params} />
    },
    {
      field: 'inpress_data__total_waste_sheets',
      headerName: 'Total Waste Sheets',
      width: 350,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <ProductDieCell params={params} />
    },
  ]

  function CustomToolbar() {
    return (
      <GridToolbarContainer  style={{backgroundColor: /* '#CACFD2' *//* '#433F3F' */'#0166C6', borderBottom: '#fafafa 2px solid', padding: '5px',}}>
        <GridToolbarColumnsButton style={{color: 'white', backgroundColor: '#00A1E0'}} />
        <GridToolbarFilterButton style={{color: 'white', backgroundColor: '#00A1E0'}} />
        {/* <GridToolbarDensitySelector /> */}
        <GridToolbarExport style={{color: 'white', backgroundColor: '#00A1E0'}} />
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
      <SerchTableProduction setRows={setRows} handleOpen={handleOpen} handleCloseLoading={handleClose} />
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
    </Box>
  )
}

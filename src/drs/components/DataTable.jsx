import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../auth/context/AuthContext'
import { apiRest } from '../../logic/constantes'
import { DataGrid } from '@mui/x-data-grid'
import { BottonOrder } from './BottonOrder'
import { Box, Backdrop, styled, CircularProgress } from '@mui/material'
import { MagentoCellDataGrid } from '../components'
import { SearchMagento } from './SearchMagento'

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

export const DataTable = () => {
  const [rows, setRows] = useState([])
  const [open, setOpen] = useState(false)
  const [heightDate, setHeightDate] = useState(true)
  const [idwebsite, setIdwebsite] = useState('')

  const { token, logout } = useContext(AuthContext)

  useEffect(() => {
    if(rows.length >= 9) {
      setHeightDate(false)
    }else{
      setHeightDate(true)
    }
  }, [rows])

  const formatStringLocaton = (city, state, code) => {
    return `${city} ${state} ${code}`
  }

  const formatData = (data) => {
    const arrayResultMagento = data.map((da) => {
      return {
        id: da.dsr__id_dsr,
        order: da.dsr__mg_order,
        status: da.dsr__mg_status,
        create_date: da.dsr__create_date,
        company: da.dsr__company,
        location: formatStringLocaton(da.dsr__city, da.dsr__state, da.dsr__code_country),
        postal_code: da.dsr__postalcode,
        street: da.dsr__street,
        sales_executive: da.dsr__sales_executive,
        csr: da.dsr__csr,
        shipping_type: da.dsr__shipping_type,
        idWebsite: da.dsr__id_website
      }
    })
    setRows(arrayResultMagento)
    handleClose()
  }

  const fetchData = async () => {
    const request = {
      token,
    }
    request.option = 'listOrdersMagento'
    request.controller = 'magento'

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(request)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const {type, message, data} = datas
        if (type === 'ok') {
          formatData(data)
        }

        if (type === 'error') {
          handleClose()
          if (message === 'invalid token') {
            logout()
          }
        }
      })
      .catch(error => {
        console.log(error)
        handleClose()
      })
      /* .finally(() => {
        setLoading(false)
      }) */
  }

  useEffect(() => {
    handleOpen()
    fetchData()
  }, [])

  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 120,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <MagentoCellDataGrid params={params} />
    },
    {
      field: 'order',
      headerName: 'Order',
      width: 140,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <BottonOrder
                                params={params}
                                idwebsite={idwebsite}
                                modulo={'2'}
                              />
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 160,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <MagentoCellDataGrid params={params} />
    },
    {
      field: 'create_date',
      headerName: 'Create Date',
      width: 110,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <MagentoCellDataGrid params={params} />
    },
    {
      field: 'company',
      headerName: 'Company',
      width: 200,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <MagentoCellDataGrid params={params} />
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 200,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <MagentoCellDataGrid params={params} />
    },
    {
      field: 'postal_code',
      headerName: 'Postal Code',
      width: 100,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <MagentoCellDataGrid params={params} />
    },
    {
      field: 'street',
      headerName: 'Street',
      width: 300,
      align: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <MagentoCellDataGrid params={params} />
    },
    {
      field: 'sales_executive',
      headerName: 'Sales Executive',
      width: 150,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <MagentoCellDataGrid params={params} />
    },
    {
      field: 'csr',
      headerName: 'CSR',
      //width: 170,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <MagentoCellDataGrid params={params} />
    },
    {
      field: 'shipping_type',
      headerName: 'Shipping Type',
      //width: 170,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <MagentoCellDataGrid params={params} />
    }
  ]

  return (
    <Box sx={{
      /* backgroundColor: '#191616', */
      marginTop: '5px',
      height: heightDate ? 'auto' : '88vh',
      width: '100%',
    }}
    >
      <SearchMagento setRows={setRows} handleOpen={handleOpen} handleCloseLoading={handleClose} setIdwebsite={setIdwebsite} />
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
              backgroundColor: '#0166C6',
            },
            //width: 'auto',
        }}
        rows={rows}
        columns={columns}
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
        rowHeight={80}
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

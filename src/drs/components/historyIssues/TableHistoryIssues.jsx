import { useContext, useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { AuthContext } from '../../../auth/context/AuthContext'
import { PhotosHistoryIssues, HistoryIssuesCellGrid, HistoryIssuesCellGridDescription } from '../historyIssues';
import { Box, Backdrop, styled, CircularProgress } from '@mui/material'
import { BottonOrder } from '../../components'
import { apiRest } from '../../../logic/constantes'

function customCheckbox () {
  return {
    '& .super-app-theme--inpress': {

      backgroundColor: 'white',
  
      '&:hover': { backgroundColor: '#E3E4E5' }
  
    },
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
  ...customCheckbox()
}))

export const TableHistoryIssues = () => {
  const [rows, setRows] = useState([])
  const [open, setOpen] = useState(false)
  const [heightDate, setHeightDate] = useState(true)

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

  function esJSONValido(cadena) {
    try {
      JSON.parse(cadena);
      return true;
    } catch (error) {
      return false;
    }
  }

  const fetchDataIssues = async () => {
    const request = {
      token
    }
    request.option = 'issues'
    request.controller = 'dsr'
    request.optionIssues = '2'

    const requestOptions = {
      method: 'POST',
      /* headers: { 'Content-Type': 'application/json' }, */
      body: JSON.stringify(request)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const {type, data, urlImages, message } = datas

        if (type === 'ok') {
          const dararesult = data.map((da) => {
            let arrayImages = ''
            if (da.issues__images !== null) {
              if (esJSONValido(da.issues__images)) {
                arrayImages = JSON.parse(da.issues__images)
                
              }else{
                arrayImages = []
              }
            } else {
              arrayImages = []
            }
            return {
              ...da,
              id: da.issues__id_issue,
              idWebsite: da.issues__id_website,
              url: urlImages,
              arrayImages
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
      });
  }

  useEffect(() => {
    handleOpen()
    fetchDataIssues()
  }, [])
  
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 120,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <HistoryIssuesCellGrid params={params} />
    },
    {
      field: 'issues__mg_order',
      headerName: 'Order',
      width: 120,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <BottonOrder
                                params={params}
                                modulo={'1'}
                              />
    },
    {
      field: 'issues__date_issue',
      headerName: 'Issues Date',
      //width: 150,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <HistoryIssuesCellGrid params={params} />
    },
    {
      field: 'issues__resolv_issue',
      headerName: 'Solution Date',
      //width: 150,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <HistoryIssuesCellGrid params={params} />
    },
    {
      field: 'issues__csr',
      headerName: 'CSR',
      //width: 200,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <HistoryIssuesCellGrid params={params} />
    },
    {
      field: 'issues__description',
      headerName: 'Description',
      width: 395,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <HistoryIssuesCellGridDescription params={params} />
    },
    {
      field: 'issues__solutions',
      headerName: 'Solutions',
      width: 395,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <HistoryIssuesCellGrid params={params} />
    },
    {
      field: 'arrayImages',
      headerName: 'Photos',
      width: 250,
      //flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <PhotosHistoryIssues params={params} />
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
        getRowClassName={() => `super-app-theme--inpress`}
        pageSizeOptions={[25, 50, 100]}
        checkboxSelection={false}
        disableRowSelectionOnClick
        rowHeight={200}
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
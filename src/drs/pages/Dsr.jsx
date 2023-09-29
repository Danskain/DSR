import * as React from 'react'
import { useContext, useState, useEffect, useRef } from 'react'
import { CircularProgress, Button, Stack, Box, Backdrop, styled, Typography, Grid, Paper } from '@mui/material'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SaveIcon from '@mui/icons-material/Save';
import { AuthContext } from '../../auth/context/AuthContext'
import { apiRest } from '../../logic/constantes'
import {
  DataGrid,
  //GridCellEditStopReasons,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from '@mui/x-data-grid'
import {
  DsrEditDescriptionIssues,
  DsrEditDescriptionIssuesEdit,
  DsrImagesIssuesDelete,
  InputSelectDataTable,
  ProductInfo,
  DsrDataBasic,
  DsrCustonStyleValueDataGrid,
  BottonOrder,
  DsrImageIssues,
  DsrInputSelectIssues,
  DsrShipDate,
  MagentoOrderIdSerch
} from '../components'
import { Image } from '../../components'

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    //backgroundColor: '#f5f5f9',
    //backgroundColor: '#B0C4DF',
    backgroundColor: 'transparent',
    //color: 'rgba(0, 0, 0, 0.87)',
    //maxWidth: 220,
    //width: '1000px',
    fontSize: theme.typography.pxToRem(12),
    //border: '1px solid #dadde9',
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#B0C4DF' : '#B0C4DF',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  //textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export const Dsr = ({setOpenAlerts, setAlertsOptions }) => {
  const { tabs, token, logout } = useContext(AuthContext)
  const [datasTabs, setDatasTabs] = useState(tabs)
  const [datasMapping, setDataMapping] = useState([])
  const [dataInputSelect, setDataInputSelect] = useState([])
  const [open, setOpen] = useState(false)
  const [idButtonData, setIdButtonData] = useState('')
  const [columsData, setColumsData] = useState([])
  const [controlColums, setControlColums] = useState(true)
  const [hidemSaveIssues, setHidemSaveIssues] = useState(false)
  const [heightDate, setHeightDate] = useState(true)
  const [nameTab, setNameTab] = useState('')
  const [toolTipTotalsOrders, setToolTipTotalsOrders] = useState([])
  const [toolTipTotalsOrdersUrgency, setToolTipTotalsOrdersUrgency] = useState([])
  const [toolTipTotalsOrdersPacking, setToolTipTotalsOrdersPacking] = useState([])
  const [toolTipTotalsOrdersCsr, setToolTipTotalsOrdersCsr] = useState([])

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    id: false,
  });
  
  const inputRefDescription = useRef()
  const inputRefSolutions = useRef()
  /*/const [valorDataSelectIssues, setValorDataSelectIssues] = useState([])
  /* const [idTransactionies, setIdTransactionies] = useState('') */
  /* const classess = useStyles(); */

  //const VISIBLE_FIELDS = ['dsr_order', 'dsr_status', 'dsr_company', 'dsr_city', 'dsr_shipping', 'dsr_csr', 'dsr_est_shipping_date', 'dsr_est_delivery_date', 'dsr_time', 'dsr_csr_comment', 'dsr_delivery', 'dsr_packing', 'dsr_sc', 'dsr_image', 'dsr_product_options']


  /* const [filterModel, setFilterModel] = useState({
    items: [{ field: 'dsr_order', operator: 'contains', value: ''} ],
  }) */
  /* const [openAlerts, setOpenAlerts] = useState(false)
  const [alertsOptions, setAlertsOptions] = useState({}) */
  //const [filterState, setFilterState] = useState({});

  /* const handleCellKeyDown = (params, event) => {
    if (event.key === ' ') {
    // Prevent the default behavior (activating cell editing)
      //event.preventDefault();
      console.log(inputRefSolutionsBoton)
      // Manually set the cell ID in the state to handle editing
    }
  }; */

  function customColorsCell () {
    const arrarrayResult = [...datasMapping]
    
    const arrayResult = arrarrayResult.map((data) => {
      return {
        claveUno: `& .super-app-theme--${data.dsr_status}`,
        claveUnoUno: `backgroundColor`,
        valorUnoUno: data.dsr_color ? data.dsr_color : '',
        claveUnoDos: '&:hover',
        claveUnoDosUno: `backgroundColor`,
        valorUnoDosUno: data.dsr_color ? data.dsr_color : '',
      }
    })

    function eliminarDuplicados(arr, prop) {
      return arr.filter((obj, index, self) =>
        index === self.findIndex((o) => o[prop] === obj[prop])
      )
    }

    const arregloSinDuplicados = eliminarDuplicados(arrayResult, 'claveUno')

    const arrayFilterColors = arregloSinDuplicados.map((data) => {

      if (data.valorUnoUno === '') {
        return {
          ...data,
          valorUnoUno: 'white',
          valorUnoDosUno: 'white'
        }
      }
      return data
    })
    
    const nuevoObjeto = {}

    for (const item of arrayFilterColors) {
      const { claveUno, claveUnoDos, claveUnoDosUno, claveUnoUno, valorUnoDosUno, valorUnoUno } = item;

      if (!nuevoObjeto[claveUno]) {
        nuevoObjeto[claveUno] = {};
      }

      nuevoObjeto[claveUno][claveUnoUno] = valorUnoUno;

      if (!nuevoObjeto[claveUno][claveUnoDos]) {
        nuevoObjeto[claveUno][claveUnoDos] = {};
      }
      nuevoObjeto[claveUno][claveUnoDos][claveUnoDosUno] = valorUnoDosUno;
    }
    
    return nuevoObjeto
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
    borderRight: `4px solid ${
      theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
    }`
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: `4px solid ${
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
  /* '& .super-app-theme--cell': {
    //wordWrap: 'break-word',
    height: '100%',
    overflowX: 'auto',
    whiteSpace: 'wrap',
  }, */
  ...customColorsCell()
}))

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
      //width: 90, 
      align: 'center',
    },
    {
      field: 'dsr_order',
      headerName: 'ORDER',
      minWidth: 130,
      flex: 1,
      align: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <BottonOrder params={params} idwebsite={params.row.dsr_websiteId} modulo={'1'} magento={true}/>
    },
    {
      field: 'dsr_status',
      headerName: 'STATUS',
      minWidth: 110,
      flex: 1,
      //editable: true,
      align: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <InputSelectDataTable dataInputSelect={dataInputSelect} params={params} flag='status'  idButtonData={idButtonData} setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions} />
    },
    {
      field: 'dsr_company',
      headerName: 'COMPANY',
      minWidth: 114,
      flex: 1,
      align: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <DsrCustonStyleValueDataGrid params={params} />
    },
    {
      field: 'dsr_city',
      headerName: 'CITY',
      minWidth: 100,
      flex: 1,
      align: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <DsrCustonStyleValueDataGrid params={params} />
    },
    {
      field: 'dsr_shipping',
      headerName: 'SHIP METHOD',
      minWidth: 100,
      flex: 1,
      align: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <DsrCustonStyleValueDataGrid params={params} />
    },
    {
      field: 'dsr_csr',
      headerName: 'CSR',
      minWidth: 100,
      flex: 1,
      align: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <DsrCustonStyleValueDataGrid params={params} />
    },
    {
      field: 'dsr_est_shipping_date',
      headerName: 'SHIP DATE',
      minWidth: 225,
      flex: 1,
      align: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <DsrShipDate params={params} name='saveShippingDate' setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions} />
    },
    {
      field: 'dsr_est_delivery_date',
      headerName: 'DEL DATE',
      minWidth: 225,
      flex: 1,
      align: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <DsrShipDate params={params} name='saveDeliveryDate' setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions} />
    },
    {
      field: 'dsr_time',
      headerName: 'SAMPLE',
      minWidth: 80,
      flex: 1,
      align: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <DsrCustonStyleValueDataGrid params={params} />
    },
    {
      field: 'dsr_csr_comment',
      headerName: 'URGENCY',
      minWidth: 110,
      flex: 1,
      align: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <DsrCustonStyleValueDataGrid params={params} magento={true} />
    },
    {
      field: 'dsr_sc',
      headerName: 'SC',
      minWidth: 60,
      flex: 1,
      align: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <DsrCustonStyleValueDataGrid params={params} />
    },
    {
      field: 'dsr_dieused',
      headerName: 'CUSTOM DIE',
      minWidth: 100,
      flex: 1,
      align: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <DsrCustonStyleValueDataGrid params={params} />
    },
    {
      field: 'dsr_delivery',
      headerName: 'DELIVERY',
      minWidth: 140,
      flex: 1,
      align: 'center',
      //cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <InputSelectDataTable dataInputSelect={dataInputSelect} params={params} flag='delivery' idButtonData={idButtonData} setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions} />
    },
    {
      field: 'dsr_packing',
      headerName: 'PACKING',
      minWidth: 140,
      flex: 1,
      align: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <InputSelectDataTable datasMapping={datasMapping} dataInputSelect={dataInputSelect} params={params} flag='packing' idButtonData={idButtonData} setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions} />
    },
    {
      field: 'dsr_image',
      headerName: 'IMAGE',
      minWidth: 220,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <Image dataMapping={dataMapping} params={params} setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions} idButtonData={idButtonData} />
    },
    {
      field: 'dsr_product_options',
      headerName: 'PRODUCT INFO',
      minWidth: 350,
      align: 'left',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <ProductInfo params={params} />
    }
  ]

  const formartFecha = (dato) => {
    if (dato < 10) {
      return `0${dato.toString()}`
    }
    return `${dato.toString()}`
  }

  const farmatDate = (data) => {
    if (!data) {
      return null
    }
    const { $D, $M, $y } = data
    if (isNaN($D) || isNaN($D) || isNaN($y)) {
      return null
    }
    return `${$y}-${formartFecha($M + 1)}-${formartFecha($D)}` 
  }

  const handleValueDate = (e, id, name) => {
  //console.log("🚀 ~ file: Dsr.jsx:372 ~ handleValueDate ~ name:", name)
  ///console.log("🚀 ~ file: Dsr.jsx:372 ~ handleValueDate ~ id:", id)

    const datasMappingResult = [...datasMapping]

    const resultData = datasMappingResult.map((data) => {
      if (id === data.issues__id_issue) {
        return {
         ...data,
         [name]: farmatDate(e)
        }
      }
      return data
    })

    setDataMapping(resultData)
  }

  const handleValueDateSelectIssues = (e, id) => {

    const datasMappingResult = [...datasMapping]

    const resultData = datasMappingResult.map((data) => {
      if (id === data.issues__id_issue) {
        return {
         ...data,
         issues__state_issues: e.target.value
        }
      }
      return data
    })
    setDataMapping(resultData)
  }

  const handleCheckIcon = (params) => {
    if (params.field !== 'issues__description') {
      handleCheckIconSolutionsIssues(params)
      return
    }
    const datasMappingResult = [...datasMapping]
    const resultData = datasMappingResult.map((data) => {
      if (params.row.id === data.issues__id_issue) {
        return {
         ...data,
         issues__description: inputRefDescription.current.value
        }
      }
      return data
    })
    setDataMapping(resultData)
  }

  const handleCheckIconSolutionsIssues = (params) => {
    const datasMappingResult = [...datasMapping]

    const resultData = datasMappingResult.map((data) => {
      if (params.row.id === data.issues__id_issue) {
        return {
         ...data,
         issues__solutions: inputRefSolutions.current.value
        }
      }
      return data
    })
    setDataMapping(resultData)
  }

  const saveImageData = (id, files) => {
    const datasMappingResult = [...datasMapping]
    let arrayResult = []
    let namberFiles = ''
    const resultData = datasMappingResult.map((data) => {
      if (id === data.issues__id_issue) {
        arrayResult = data.issues__images
        files.forEach((file) => {
          const obj = {
            img: file.name
          }
          namberFiles += `${file.name}, `
          arrayResult.push(obj)
        })
        return {
          ...data,
          issues__images: arrayResult
        }
      }
      return data
    })
    setDataMapping(resultData)
    setAlertsOptions({
      types: 'success',
      message: `the files ${namberFiles} were uploaded successfully`
    })
    setOpenAlerts(true)
  }

  const deleteImageIssues = (id, nameImage) => {
    const datasMappingResult = [...datasMapping]
    
    const resultData = datasMappingResult.map((data) => {
      if (id === data.issues__id_issue) {
        const arrayResultImages = data.issues__images.filter(image => image.img.trimStart() !== nameImage);
        return {
          ...data,
          issues__images: arrayResultImages
        }
      }
      return data
    })
    setDataMapping(resultData)
    setAlertsOptions({
      types: 'success',
      message: `the file ${nameImage} was deleted successfully`
    })
    setOpenAlerts(true)
  }

  const columnsIssues = [
    {
      field: 'id',
      headerName: 'ID',
      //width: 90, 
      align: 'center',
    },
    {
      field: 'issues__mg_order',
      headerName: 'ORDER',
      minWidth: 130,
      flex: 1,
      align: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <BottonOrder params={params} idwebsite={params.row.dsr_websiteId} modulo={'1'} />
    },
    {
      field: 'issues__status_issues',
      headerName: 'STATUS',
      minWidth: 70,
      flex: 1,
      //editable: true,
      align: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <InputSelectDataTable datasMapping={datasMapping} dataInputSelect={dataInputSelect} setDataMapping={setDataMapping} params={params} flag='status'  idButtonData={idButtonData} setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions} />
    },
    {
      field: 'issues__date_issue',
      headerName: 'ISSUES DATE',
      minWidth: 210,
      flex: 1,
      align: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <DsrDataBasic handleChange={handleValueDate} params={params} />
    },
    {
      field: 'issues__resolv_issue',
      headerName: 'SOLUTION DATE',
      minWidth: 210,
      flex: 1,
      align: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <DsrDataBasic handleChange={handleValueDate} params={params} />
    },
    {
      field: 'issues__csr',
      headerName: 'CSR',
      minWidth: 110,
      flex: 1,
      align: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <DsrCustonStyleValueDataGrid params={params} />
    },
    {
      field: 'issues__state_issues',
      headerName: 'ISSUE STATUS',
      minWidth: 200,
      flex: 1,
      align: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <DsrInputSelectIssues handleChange={handleValueDateSelectIssues} params={params} />
    },
    {
      field: 'issues__amount',
      headerName: 'AMOUNT',
      minWidth: 110,
      flex: 1,
      align: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <DsrCustonStyleValueDataGrid params={params} />
    },
    {
      field: 'issues__description',
      headerName: 'DESCRIPTION',
      minWidth: 250,
      flex: 1,
      align: 'center',
      editable: true,
      //cellClassName: 'super-app-theme--cell',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <DsrEditDescriptionIssues
          params={params}
        />
      ),
      renderEditCell: (params) => <DsrEditDescriptionIssuesEdit
                                    inputRefDescription={inputRefDescription}
                                    params={params}
                                  />
    },
    {
      field: 'issues__solutions',
      headerName: 'SOLUTIONS',
      minWidth: 200,
      flex: 1,
      align: 'center',
      editable: true,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <DsrEditDescriptionIssues params={params} />,
      renderEditCell: (params) => <DsrEditDescriptionIssuesEdit inputRefDescription={inputRefSolutions} params={params}/>
    },
    {
      field: 'issues__imageOrder',
      headerName: 'PHOTOS',
      minWidth: 220,
      flex: 1,
      align: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <DsrImageIssues saveImageData={saveImageData} params={params} setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions} idButtonData={idButtonData} /* idTransactionies={idTransactionies} setIdTransactionies={setIdTransactionies} */ />
      
    },
    {
      field: 'issues__images',
      headerName: 'PHOTOS DELETE',
      minWidth: 250,
      flex: 1,
      align: 'center',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <DsrImagesIssuesDelete deleteImageIssues={deleteImageIssues} params={params} setOpenAlerts={setOpenAlerts} setAlertsOptions={setAlertsOptions} idButtonData={idButtonData} />
    }
  ]

  function esJSON(variable) {
    try {
      JSON.parse(variable);
      return true;
    } catch (error) {
      return false;
    }
  }

  const validateJson = (valor) => {
    if (esJSON(valor)) {
      return JSON.parse(valor)
    }
    return valor
  }
  

  const dataMapping = (data) => {
    const arrayMapping = data.map((da) => {
      return {
        id: da.dsr__id_dsr,
        dsr_order: da.dsr__mg_order,
        dsr_status: da.dsr__mg_status,
        dsr_color: da.magento_status__tx_color,
        dsr_Name_status: da.magento_status__tx_label,
        dsr_company: da.dsr__company,
        dsr_city: da.dsr__city,
        dsr_shipping: da.dsr__shipping,
        dsr_csr: da.dsr__csr,
        dsr_est_shipping_date: da.dsr__est_shipping_date,
        dsr_est_delivery_date: da.dsr__est_delivery_date,
        dsr_time: da.dsr__time,
        dsr_csr_comment: da.dsr__csr_comment,
        dsr_packing: da.dsr__packing,
        dsr_sc: da.dsr__sc,
        dsr_delivery: da.dsr__delivery,
        dsr_image: da.dsr__mg_order,
        dsr_websiteId: da.website__id_website,
        dsr_product_options: validateJson(da.dsr__product_options),
        dsr_url_magento: da.url_magento,
        dsr_dieused: da.dsr__dieused,
      }
    })
    setDataMapping(arrayMapping)
  }

  /* const getRowClassName = (params) => {
    const COLORS_CELL = {
      approved: 'approved',
      die_cut: 'diecut',
      inpress: 'inpress',
      lost_sample_kit: 'lostsamplekit',
      partially_complete: 'partiallycomplete',
      ready_for_scodix: 'readyforscodix',
      readyforpickup: 'readyforpickup',
      readyforshipping: 'readyforshipping',
      reprocessing: 'reprocessing',
      reprocessing_hp_indigo: 'reprocessinghpindigo',
      reprocessing_jpressplated: 'reprocessingjpressplated',
      reprocessing_r500plated: 'reprocessingr500plated',
      reprocessing_ricohplated: 'reprocessingricohplated',
      to_follow_up: 'tofollowup'
    }

    const COLORS_CELL_DEFAULT = 'default'

    return COLORS_CELL[params.row.dsr_status] || COLORS_CELL_DEFAULT
  } */

  const fetchData = async (ref) => {
    const request = {
      fieldSql: ref,
      token
    }
    request.option = 'optionTabs'
    request.controller = 'dsr'

    const requestOptions = {
      method: 'POST',
      /* headers: { 'Content-Type': 'application/json' }, */
      body: JSON.stringify(request)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { data, type, totalCsr, totalStatus, message, totalPacking, totalUrgency } = datas
        
        if (type === 'ok') {
          
          dataMapping(data)
          //handleClose()
          setColumsData(columns)
          if (!Array.isArray(totalStatus)) {
            const arregloDeObjeto = Object.values(totalStatus.totalStatus)
            if (arregloDeObjeto[0].countStatus !== 0) {
              setToolTipTotalsOrders(arregloDeObjeto)
            }else{
              setToolTipTotalsOrders([])
            }
          }else{
            setToolTipTotalsOrders([])
          }

          if (!Array.isArray(totalCsr)/*  && name === 'Without date' */) {
            const arregloDeObjeto = Object.values(totalCsr.totalCsr)
            if (arregloDeObjeto[0].countCsr !== 0) {
              setToolTipTotalsOrdersCsr(arregloDeObjeto)
            }else{
              setToolTipTotalsOrdersCsr([])
            }
          }else{
            setToolTipTotalsOrdersCsr([])
          }

          if (!Array.isArray(totalPacking)) {
            const arregloDeObjeto = Object.values(totalPacking.totalPacking)
            //console.log("arregloDeObjeto:", arregloDeObjeto)
            if (arregloDeObjeto[0].countPacking !== 0) {
              setToolTipTotalsOrdersPacking(arregloDeObjeto)
            }else{
              setToolTipTotalsOrdersPacking([])
            }
          }else{
            setToolTipTotalsOrdersPacking([])
          }
          
          if (!Array.isArray(totalUrgency)) {
            const arregloDeObjeto = Object.values(totalUrgency.totalUrgency)
            if (arregloDeObjeto[0].countUrgency !== 0) {
              setToolTipTotalsOrdersUrgency(arregloDeObjeto)
            }else{
              setToolTipTotalsOrdersUrgency([])
            }
          }else{
            setToolTipTotalsOrdersUrgency([])
          }
        }
        
        if (type === 'error') {
          dataMapping([])
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
      .catch(error => {
        console.log(error)
        const { message } = error
        dataMapping([])
        setAlertsOptions({
          types: 'error',
          message
        })
        setOpenAlerts(true)
      })
      .finally(() => {
        handleClose()
      })
  }

  useEffect(() => {
    if (controlColums) {
      setColumsData(columns)
    }else{
      setColumsData(columnsIssues)
    }

    if(datasMapping.length >= 4) {
      setHeightDate(false)
    }else{
      setHeightDate(true)
    }
  }, [datasMapping])

  const fetchDataTwo = async () => {
    const request = {
      token
    }
    request.option = 'dsrListData'
    request.controller = 'dsr'

    const requestOptions = {
      method: 'POST',
      //headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(request)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { data, type, message } = datas
        //console.log("datas:", datas)

        if (type === 'ok') {
          setDataInputSelect(data)
          document.getElementById(`tab-3`).click()
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
  }

  const fetchDataIssues = async () => {
    const request = {
      token
    }
    request.option = 'issues'
    request.controller = 'dsr'
    request.optionIssues = '1'

    const requestOptions = {
      method: 'POST',
      /* headers: { 'Content-Type': 'application/json' }, */
      body: JSON.stringify(request)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { type, data, urlImages, issuesStatus, message } = datas

        if (type === 'ok') {
          const dararesult = data.map((da) => {
            let arrayIssues = ''
            if (da.issues__images !== '') {
              arrayIssues = JSON.parse(da.issues__images)
            }
  
            if (da.issues__images === '' || da.issues__images === null) {
              arrayIssues = []
            }
            return {
              ...da,
              id: da.issues__id_issue,
              dsr_status: da.issues__status_issues,
              dsr_order: da.issues__mg_order,
              dsr_websiteId: da.issues__id_website,
              issues__imageOrder: 'https://prestodemos.com/dsr/img/big/',
              url: urlImages,
              valorDataSelect: issuesStatus,
              issues__images: arrayIssues
            }
          })
          setDataMapping(dararesult)
          setControlColums(false)
          setColumsData(columnsIssues)
        }
        
        if (type === 'error') {
          dataMapping([])
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
    fetchDataTwo()
  }, [])

  const changeColor = (id) => {
    const resultDatasTabs = [...tabs]
    const data = resultDatasTabs.map((tab) => {
      if (tab.dsr_tab__id === id) {
        return {
          ...tab,
          dsr_Tab__color: '#E5F0FB'
        }
      }
      return tab
    })
    //tabs = data
    setDatasTabs(data)
  }

  const reference = (ref, id, name) => {
    localStorage.removeItem('packing')
    changeColor(id)
    setNameTab(name)
    if(name === 'Issues'){
      handleOpen()
      fetchDataIssues()
      setHidemSaveIssues(true)
      return
    }
    setHidemSaveIssues(false)
    setControlColums(true)
    setIdButtonData(id)
    handleOpen()
    fetchData(ref, name)
  }
  
  //const memoreference = useCallback((ref, id) => reference(ref, id), [datasMapping])
  const handleFilterChange = (params) => {
    console.log('clickeada:', params)
    /* console.log('clickeada:', params.items)
    console.log(filterModel) */


    /* const filterModelObj = {...filterModel}
    const { items } = filterModelObj
    const itemsResult = items.map(() => {
      return {
        field: params.items.field,
        operator: params.items.operator,
        value: params.items.operator ? params.items.operator : '',
        id: params.items.operator ? params.items.id : ''
      }
    })
    const itemsP = {
      items: itemsResult
    }
     */
    /* console.log("🚀 ~ file: Dsr.jsx:711 ~ handleFilterChange ~ params.items.value:", params.items[0])
    if (params.items[0] !== undefined) {
    console.log("undifine")
      if (params.items[0].field !== filterModel.items[0].field) {
        console.log('si')
        setFilterModel(params)
      }
      if (params.items[0].value !== '') {
        setFilterModel(params)
      }
    } */
    /* console.log(params.items)
    if (params.items[0].field || params.items[0].field === 'dsr_order') {
      console.log('si')
      setFilterModel(itemsP)
    } */
  }

  const fetchSaveIssues = async (request) => {
    request.token = token 
    request.option = 'issuesSave'
    request.controller = 'dsr'

    const requestOptions = {
      method: 'POST',
      /* headers: { 'Content-Type': 'application/json' }, */
      body: JSON.stringify(request)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { type, message } = datas
        if (type === 'ok') {
          setAlertsOptions({
            types: 'success',
            message
          })
          setOpenAlerts(true)
        }

        if (type === 'error') {
          setAlertsOptions({
            types: type,
            message
          })
          setOpenAlerts(true)
        }
        handleClose()
      })
      .catch(error => console.log(error))
  }

  const handleSaveDataIssues = () => {
    const datasMappingResult = [...datasMapping]
    const resultDatasMappingResult = datasMappingResult.map((data) => {
      return {
					issues__id_issue: data.issues__id_issue,
					issues__id_website: data.issues__id_website,
					issues__mg_order: data.issues__mg_order,
					issues__status_issues: data.issues__status_issues,
          issues__date_issue: data.issues__date_issue,
					issues__resolv_issue: data.issues__resolv_issue,
					issues__csr: data.issues__csr,
					issues__description: data.issues__description,
					issues__solutions: data.issues__solutions,
					issues__images: data.issues__images.length === 0 ? null : data.issues__images,
					issues__state_issues: data.issues__state_issues,
					issues__amount: data.issues__amount
        }  
    })
    const obj = {
      data: resultDatasMappingResult
    }
    fetchSaveIssues(obj)
    handleOpen()
  }

  /* const handleKeyDown = (event) => {
    if (event.key === 's') {
      console.log("🚀 ~ file: Dsr.jsx:758 ~ handleKeyDown ~ event:", event)
      //event.target.focus()
      event.preventDefault(); // Evitar que la tecla espacio haga su acción predeterminada
    }
  }; */

  /* const handleCellClick = (params) => {    
    // Lógica que se ejecutará al hacer clic en una celda
    console.log('Celda clickeada:', params);
  }; */


  function CustomToolbar() {
    return (
      <GridToolbarContainer style={{backgroundColor: '#0166C6', borderBottom: '#fafafa 2px solid', padding: '5px'}} >
        <GridToolbarColumnsButton style={{color: 'white', backgroundColor: '#00A1E0'}} />
        <GridToolbarFilterButton style={{color: 'white', backgroundColor: '#00A1E0'}} />
        {hidemSaveIssues ?
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0}
            onClick={handleSaveDataIssues}
            style={{backgroundColor: '#00A1E0', height: '31px', paddingLeft: '4px', borderRadius: '4px'}}
          >
            <SaveIcon style={{  fontSize: 22 }} />
            <Button style={{color: 'white', /* position: 'relative', right: 5, */}}>
              SAVE 
            </Button>
          </Stack>
          :
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0}
            //onClick={handleSaveDataIssues}
            style={{backgroundColor: '#00A1E0', height: '31px', paddingLeft: '4px', borderRadius: '4px'}}
          >
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Box sx={{ flexGrow: 1, width: '510px', position: 'relative', left: -80 }}>
                    <Grid
                      container
                      spacing={{ xs: 0.5, md: 2 }} 
                      columns={{ xs: 2, sm: 12, md: 12 }}
                    >
                      {toolTipTotalsOrders.length > 0 &&
                        <Grid item xs={2} sm={5} md={6}>
                          <Item>
                            {toolTipTotalsOrders.map((da, index) => (
                              <Stack
                                key={index}
                                direction='row'
                                justifyContent='space-between'
                                alignItems='baseline'
                                //spacing={1}
                                style={{ borderBottom: '1px solid', borderBottomColor: 'black', width: '100%'  }}
                              >
                                <Typography variant='string' style={{ fontSize: '0.8rem', color: 'black'}}>
                                  {`${da.countStatusName.status}:`} 
                                </Typography>
                                <Typography variant='string' style={{  fontWeight: 'bold', fontSize: '0.8rem', marginLeft: '5px', color: 'black'}}>
                                  {`${da.countStatus}`}
                                </Typography>
                              </Stack> 
                            ))}
                          </Item>
                        </Grid>
                      }
                      {toolTipTotalsOrdersUrgency.length > 0 &&
                        <Grid item xs={2} sm={4} md={6}>
                          <Item>
                            {toolTipTotalsOrdersUrgency.map((da, index) => (
                              <Stack
                                key={index}
                                direction='row'
                                justifyContent='space-between'
                                alignItems='baseline'
                                //spacing={1}
                                style={{ borderBottom: '1px solid', borderBottomColor: 'black', width: '100%'  }}
                              >
                                <Typography variant='string' style={{ fontSize: '0.8rem', color: 'black'}}>
                                    {`${da.countUrgencyName.urgency || da.countUrgencyName}:`} 
                                  </Typography>
                                  <Typography variant='string' style={{  fontWeight: 'bold', fontSize: '0.8rem', marginLeft: '5px', color: 'black'}}>
                                    {`${da.countUrgency}`}
                                  </Typography>
                              </Stack> 
                            ))}
                          </Item>
                        </Grid>
                      }
                      {toolTipTotalsOrdersPacking.length > 0 &&
                        <Grid item xs={2} sm={3} md={8}>
                          <Item>
                            <Stack
                              direction='column'
                              justifyContent='flex-start'
                              alignItems='flex-start'
                              spacing={0.5}
                              style={{ /* width: '100%', */ margin: '5px 0 5px 0'}}
                            > 
                              {toolTipTotalsOrdersPacking.map((da, index) => (
                                <Stack
                                  key={index}
                                  direction='row'
                                  justifyContent='space-between'
                                  alignItems='baseline'
                                  //spacing={1}
                                  style={{ borderBottom: '1px solid', borderBottomColor: 'black', width: '100%' }}
                                >
                                  <Typography variant='string' style={{ fontSize: '0.8rem', color: 'black'}}>
                                    {`${da.countPackingName.packing || da.countPackingName}:`} 
                                  </Typography>
                                  <Typography variant='string' style={{  fontWeight: 'bold', fontSize: '0.8rem', marginLeft: '5px', color: 'black'}}>
                                    {`${da.countPacking}`}
                                  </Typography>
                                </Stack> 
                              ))}
                            </Stack>  
                          </Item>
                        </Grid>
                      }
                      {toolTipTotalsOrdersCsr.length > 0 &&
                        <Grid item xs={2} sm={3} md={4}>
                          <Item>
                            <Stack
                              direction='column'
                              justifyContent='flex-start'
                              alignItems='flex-start'
                              spacing={0.5}
                              style={{ margin: '5px 0 5px 0'}}
                            > 
                              {toolTipTotalsOrdersCsr.map((da, index) => (
                                <Stack
                                  key={index}
                                  direction='row'
                                  justifyContent='space-between'
                                  alignItems='baseline'
                                  //spacing={1}
                                  style={{ borderBottom: '1px solid', borderBottomColor: 'black', width: '100%' }}
                                >
                                  {da.countCsrName.csr === '' ? 
                                    <Typography variant='string' style={{ fontSize: '0.8rem', color: 'black'}}>
                                      Undefined
                                    </Typography>
                                  :
                                    <Typography variant='string' style={{ fontSize: '0.8rem', color: 'black'}}>
                                      {`${da.countCsrName.csr || da.countCsrName}:`} 
                                    </Typography>
                                  }
                                  <Typography variant='string' style={{  fontWeight: 'bold', fontSize: '0.8rem', marginLeft: '5px', color: 'black'}}>
                                    {`${da.countCsr}`}
                                  </Typography>
                                </Stack> 
                              ))}
                            </Stack>  
                          </Item>
                        </Grid>
                      }
                    </Grid>  
                  </Box>      
                    
                </React.Fragment>
              }
            >
              <Button style={{color: 'white', /* position: 'relative', right: 5, */}}>
              {`total orders [ ${datasMapping.length} ]`}
              </Button>
            </HtmlTooltip>
          </Stack>
        }
        <MagentoOrderIdSerch dataMapping={dataMapping} validates={true} />
        <Typography variant='h5' style={{ marginLeft: '20%', color: 'white' }}>
          {nameTab}
        </Typography>
      </GridToolbarContainer>
    );
  }

  /* const columnVisibilityModelRE = {
    id: false
  } */

  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={0.5}
        className='containe-fixed-nav'
        //sx={{ width: '100%', /* height: '40px', */ overflow: 'auto', /* whiteSpace: 'nowrap' */ }}
      >
        {datasTabs.map((tab) => (
          <Button
            key={tab.dsr_tab__id}
            onClick={() => reference(tab.dsr_tab__fields_wheresql, tab.dsr_tab__id, tab.dsr_tab__label)}
            id={`tab-${tab.dsr_tab__id}`}
            variant='contained'
            style={{  /* whiteSpace: 'nowrap', fontSize: '10px', */ backgroundColor: tab.dsr_Tab__color, color: tab.dsr_Tab__color === '#E5F0FB' ? '#0166C6' : 'white' }}
            startIcon={<PlayArrowIcon fontSize='inherit' className='contain' style={{display: tab.dsr_Tab__color === '#E5F0FB' ? 'block' : 'none', fontSize: '13px',}} />}
          >
            {tab.dsr_tab__label}
          </Button>
        ))}
          {/* <Button
            variant='contained'
            //className=''
            className=''
          >
            santa fe
          </Button> */}
      </Stack>
      <Box sx={{
        marginTop: '5px',
        height: '40px',
        width: '100%'
      }}
      />
      <Box sx={{
        height: heightDate ? 'auto' : '89vh',
        //height: 'auto',
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
              //backgroundColor: '#433F3F',
              //backgroundColor: '#CACFD2',
            },
            '& .MuiDataGrid-footerContainer': {
              //backgroundColor: '#CACFD2',
              backgroundColor: '#0166C6',
            },   
          }}
          rows={datasMapping}
          columns={columsData}
          slots={{
            toolbar: CustomToolbar,
          }}
          initialState={{
            /* columns: {
              columnVisibilityModel:  {
                id: false,
              },
              //columnVisibilityModel: columnVisibilityModelRE,
            }, */
            pagination: {
              paginationModel: {
                pageSize: 25
              }
            }
          }}

          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel) => {
            setColumnVisibilityModel(newModel)
          }
          }
          /* slotProps={{
            toolbar: {
              disableexport: true, // Desactivar el botón de exportación
            },
          }} */
          /* onCellEditStop={(params, event) => {
            if (params.reason === GridCellEditStopReasons.cellFocusOut) {
              event.defaultMuiPrevented = true;
            }
          }} */
          pageSizeOptions={[25, 50, 100]}
          //filterModel={filterModel}
          onFilterModelChange={/* (newFilterModel) => setFilterModel(newFilterModel) */ handleFilterChange}
          //onCellClick={handleCellClick}
          //checkboxSelection
          disableRowSelectionOnClick
          disableSelectionOnClick
          rowHeight={200}
          autoHeight={heightDate}
          footerStyle={{ color: 'white', backgroundColor: 'blue' }}
          getRowClassName={(params) => `super-app-theme--${params.row.dsr_status}`}
          //onCellKeyDown={handleCellKeyDown}
          //editable
          onCellEditStop={handleCheckIcon}
          //onCellEditStart={handleEditCellChange}
        />
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
        {/* <Alerts open={openAlerts} setOpen={setOpenAlerts} alertsOptions={alertsOptions} /> */}
      </Box>
    </>
  )
}



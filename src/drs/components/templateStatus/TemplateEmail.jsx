import { useState, useEffect, useContext, useRef } from 'react'
import { AuthContext } from '../../../auth/context/AuthContext'
import { Stack, Box, InputLabel, MenuItem, FormControl, Select, TextField, Typography, Checkbox, FormControlLabel } from '@mui/material'
//import { Tiptap } from '../../components'
import { apiRest } from '../../../logic/constantes'
import LoadingButton from '@mui/lab/LoadingButton'

import { useEditor, EditorContent } from '@tiptap/react'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import '../../../Tiptap.css'
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import {
  FaBold,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaUnderline,
} from 'react-icons/fa'

const MenuBar = ({ editor, dataComentario }) => {
    const [valueSelect, setValueSelect] = useState('')
    const [valueSelectFontFamily, setValueSelectFontFamily] = useState('')
    const [selectedValue, setSelectedValue] = useState('')
    if (!editor) {
      return null;
    }
    
    const handleSelectChange  = (event) => {
      setSelectedValue(event.target.value)
      editor.commands.insertContent(event.target.value)
    }
  
    const handleChange = (e) => {
      const num = parseInt(e.target.value)
      editor.chain().focus().toggleHeading({ level: num }).run()
      setValueSelect(e.target.value)
    }
  
    const handleChangeFontFamily = (e) => {
      editor.chain().focus().setFontFamily(e.target.value).run()
      setValueSelectFontFamily(e.target.value)
    }
    
    return (
      <div className="menuBar">
        <div className='content-select'>
          <select
            name='heading'
            onChange={(e) => handleChange(e)}
            value={valueSelect}
          >
            <option value=''>--Heading--</option>
            <option value={1}>Heading 1</option>
            <option value={2}>Heading 2</option>
            <option value={3}>Heading 3</option>
            <option value={4}>Heading 4</option>
            <option value={5}>Heading 5</option>
            <option value={6}>Heading 6</option>
          </select>
          <select
            name='heading'
            onChange={(e) => handleChangeFontFamily(e)}
            value={valueSelectFontFamily}
          >
            <option value=''>--Font--</option>
            <option value='sans-serif'>Sans serf</option>
            <option value='serif'>Serf</option>
            <option value='Wide'>Wide</option>
            <option value='Archivo Narrow'>Narrow</option>
            <option value='Comic Sans MS, Comic Sans'>Comic Sans MS</option>
            <option value='Courier New'>Courier New</option>
            <option value='EB Garamond'>Garamond</option>
            <option value='Georgia'>Georgia</option>
            <option value='Tahoma'>Tahoma</option>
            <option value='Trebuchet MS'>Trebuchet MS</option>
            <option value='Verdana'>Verdana</option>
          </select>
  
          <select  value={selectedValue} onChange={handleSelectChange}>
            <option value="">select item order</option>
            {dataComentario.map((comentario) => (
              <option key={comentario.id} value={comentario.value}>{comentario.name}</option>  
            ))}
          </select>
  
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is_active" : ""}
          >
            <FaBold />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is_active" : ""}
          >
            <FaItalic />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "is_active" : ""}
          >
            <FaUnderline />
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is_active" : ""}
          >
            <FaListUl />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is_active" : ""}
          >
            <FaListOl />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "is_active" : ""}
          >
            <FaQuoteLeft />
          </button>
          <input
            type="color"
            onInput={event => editor.chain().focus().setColor(event.target.value).run()}
            value={editor.getAttributes('textStyle').color}
            data-testid="setColor"
          />
          {/* <button
            onClick={() => editor.chain().focus().unsetColor().run()}
            data-testid="unsetColor"
          >
            unsetColor
          </button> */}
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
          >
            <FaAlignLeft />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
          >
            <FaAlignCenter />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
          >
            <FaAlignRight />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
          >
            <FaAlignJustify />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editor.isActive('highlight') ? 'is-active' : ''}
          >
            <FormatPaintIcon />
          </button>
        </div>
      </div>
    )
  }

export const TemplateEmail = ({setAlertsOptions, setOpenAlerts}) => {
  const { token } = useContext(AuthContext)
  //const [valueEmailTemplate, setValueEmailTemplate] = useState('')
  const [arraySelectEstatus, setArraySelectEstatus] = useState([])
  const [valuesTemplate, setValuesTemplate] = useState({
    subject: '',
    template: '',
    sending: false
  })
  const [valueStatus, setValueStatus] = useState('')
  const [emailTemplateText, setEmailTemplateText] = useState(true)

  const inputRefTiptapValue = useRef()

  const [dataComentario, setDataComentario] = useState([])
  const [loadingSaveModified, setLoadingSaveModified] = useState(false)

  const fetchData = async () => {
    const request = {
      token
    }
    request.option = 'loadDataStatusEmail'
    request.controller = 'email'
    //request.optionIssues = '2'

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(request)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        //console.log("🚀 ~ file: TemplateEmail.jsx:24 ~ fetchDataProductDie ~ datas:", datas)
        const { selectStatus, selectfieldsDsr, message, type } = datas
        
        if (type === 'ok') {
          setArraySelectEstatus(selectStatus)
          setDataComentario(selectfieldsDsr)
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
      /* .finally(() => {
        handleClose()
      }) */
  }

  useEffect(() => {
    fetchData()
  }, [])

  const descomprimirBase64 = (base64String) => {
    var decodedString = atob(base64String);
    var decompressedString = decodeURIComponent(escape(decodedString))
    
    return decompressedString;
  }

  const transicionDataMap = (data) => {
    const [cero] = data
    const { status_template__subject, status_template__email_body, status_template__sn_send } = cero
    console.log("🚀 ~ file: TemplateEmail.jsx:260 ~ transicionDataMap ~ status_template__email_body:", status_template__email_body)
    setValuesTemplate({
        subject: status_template__subject,
        template: descomprimirBase64(status_template__email_body),
        sending: status_template__sn_send === '1' ? true : false 
      })
    editor.commands.insertContent(descomprimirBase64(status_template__email_body))
    //setValueEmailTemplate(descomprimirBase64(status_template__email_body))
  }

  const fetchDataTemplate = async () => {
    const request = {
      token,
      status: valueStatus
    }
    request.option = 'selectTemplateEmail'
    request.controller = 'email'
    //request.optionIssues = '2'

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(request)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { data, message, type } = datas
        
        if (type === 'ok' && data.length > 0) {
          //console.log(valuesTemplate.template)
          //editor.commands.clearContent()
          transicionDataMap(data)
        }/*  else {
          setValuesTemplate({
            subject: '',
            template: '',
            sending: false 
          })
          editor.commands.clearContent()
        } */

        if (type === 'error') {
          /* setAlertsOptions({
            types: type,
            message
          })
          setOpenAlerts(true) */
          if (message === 'invalid token') {
            logout()
          }
        }
      })
      .catch(error => console.log(error))
      /* .finally(() => {
        handleClose()
      }) */
  }

  useEffect(() => {
    if (valueStatus !== '') {
      fetchDataTemplate()
    }
  }, [valueStatus]);
  
  const handleChange = (e) => {
    if (e.target.name === 'sending') {
      setValuesTemplate((prev) => ({
        ...prev,
        [e.target.name]: e.target.checked
      }))
      return
    }
    /* if (e.target.name === 'status') {
      fetchDataTemplate(e.target.value)  
    } */
    setValuesTemplate((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const limpearTemplate = () => {
    setValuesTemplate({
      subject: '',
      template: '',
      sending: false 
    })
    editor.commands.clearContent()
  }
  const handleChangeStatus = (e) => {
    limpearTemplate()
    setValueStatus(e.target.value)
  }

  const editor = useEditor({
    extensions: [
      FontFamily,
      Color,
      TextStyle,
      StarterKit,
      Underline,
      Document,
      Paragraph,
      Text,
      Heading,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({
        multicolor: true 
      })
    ],
    content: valuesTemplate.template,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      inputRefTiptapValue.current.value = html
    },
  })

  const formatEmailTemplateBody = (texto) => {
    //const encodedText = encodeURIComponent(texto)
    const base64 = btoa(texto)
    return base64
  }

  const fetchUpdateUser = async (request) => {

    request.option = 'templateEmail'
    request.controller = 'email'
    //request.optionIssues = '2'

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(request)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { message, type } = datas
        
        if (type === 'ok') {
          limpearTemplate()
          setValueStatus('')
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
          if (message === 'invalid token') {
            logout()
          }
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        setLoadingSaveModified(false)
      })
  }

  const saveModifiedTemplate = () => {

    const request = {
      token,
      status: valueStatus,
      subject: valuesTemplate.subject,
      textTemplate: formatEmailTemplateBody(inputRefTiptapValue.current.value),
      enableSending: valuesTemplate.sending ? '1' : '0'
    }
    setLoadingSaveModified(true)
    fetchUpdateUser(request)
  }

  const functionEmailTemplateText = () => {
    setEmailTemplateText(true)
  }
  
  return (
    <Box
      style={{ marginTop: '30px'}}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        //style={{ backgroundColor: 'white' }}
      >
        <FormControl
          style={{ width: 500 }}
        >
          <InputLabel id="demo-simple-select-label" /* style={{ color: 'black' }} */>Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name='status'
            value={valueStatus}
            label="Status"
            onChange={handleChangeStatus}
          >
            {arraySelectEstatus.map((da, index) => (
              <MenuItem key={index} style={{backgroundColor: da.magento_status__tx_color }} value={da.magento_status__id_magento_status}>{da.magento_status__tx_label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          style={{ width: 500 }}
        >  
          <TextField
            id="outlined-basic"
            label="Subject"
            variant="outlined"
            /* style={{ color: 'red' }} */
            name='subject'
            value={valuesTemplate.subject}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl
          style={{ width: 500 }}
          onClick={functionEmailTemplateText}
        >
          <Typography variant="string" /* component="span" */>
            Email Template Text
          </Typography>
        </FormControl>
        {emailTemplateText &&
          <FormControl
            style={{ width: 500 }}
          >
            <Box>
                <Box>
                    <MenuBar editor={editor} dataComentario={dataComentario}/>
                </Box>
                <Box style={{height: '400px', width: '100%', overflowY: 'auto', borderRadius: '5px 5px 5px 5px' }}>
                  <EditorContent editor={editor} ref={inputRefTiptapValue} align='left'/>
                </Box>
            </Box>
          </FormControl>
        }
        <FormControl
          style={{ width: 400 }}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            //style={{ backgroundColor: 'white' }}
          >
            <LoadingButton
              style={{ backgroundColor: '#00A1E0' }}
              loading={loadingSaveModified}
              variant="contained"
              onClick={saveModifiedTemplate}
            >
              Save template
            </LoadingButton>
            <FormControlLabel control={<Checkbox name='sending' checked={valuesTemplate.sending} onChange={handleChange} />} label={<span className="custom-label" >Enable sending mail</span>} />
          </Stack>
        </FormControl>
      </Stack>
    </Box>
  )
}

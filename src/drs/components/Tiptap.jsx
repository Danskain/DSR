import { useState, useEffect, useContext } from 'react'
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
import '../../Tiptap.css'
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
import { Box } from '@mui/material'
import { AuthContext } from '../../auth/context/AuthContext'
import { apiRest } from '../../logic/constantes'

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

export const Tiptap = ({ valueEmailTemplate, inputRefTiptapValue }) => {
  const [dataComentario, setDataComentario] = useState([])
  //const [valorTemplate, setValorTemplate] = useState('')
  const { token } = useContext(AuthContext)

  const fetchDataComentarios = async () => {
    const requestMagento = {}
    requestMagento.token = token
    requestMagento.option = 'getDataItemsEmail'
    requestMagento.controller = 'email'  

    const requestOptions = {
      method: 'POST',
      /* headers: { 'Content-Type': 'application/json' }, */
      body: JSON.stringify(requestMagento)
    }

    fetch(apiRest, requestOptions)
      .then(response => response.json())
      .then(datas => {
        const { type, selectItemEmail } = datas
        if (type === 'ok') {
          setDataComentario(selectItemEmail)
        }

        if (type === 'error') {
          setAlertsOptions({
            types: type,
            message
          })
          setOpenAlerts(true)
        } 
        //setLoadingSave(false)
      
      })
      .catch(error => console.log(error))
  }
  
  useEffect(() => {
    fetchDataComentarios()
  }, []) 

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
    content: valueEmailTemplate,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      inputRefTiptapValue.current.value = html
    },
  })
  
  return (
    <Box>
      <Box>
        <MenuBar editor={editor} dataComentario={dataComentario}/>
      </Box>
      <Box style={{height: '265px', width: '100%', overflowY: 'auto', borderRadius: '5px 5px 5px 5px' }}>
        <EditorContent editor={editor} ref={inputRefTiptapValue} align='left'/>
      </Box>
    </Box>
  )
}

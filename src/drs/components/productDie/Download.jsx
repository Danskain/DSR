//import React from 'react'
import { Stack, Button } from '@mui/material'

export const Download = ({params}) => {

    const diferentePestana = () =>{
      const newPathname = `${params.value}`
      const dominio = window.location.origin
      if (dominio === 'http://localhost:5173') {
        const urlL = `https://dsr.prestodemos.com/${newPathname}`
        window.open(urlL, '_blank');
        return
      }
      const url = `${dominio}/${newPathname}`
      window.open(url, '_blank');
      /* console.log("dominio:", dominio) */
      
      /* const newPathname = `${params.value}`
      const dominio = window.location.origin
      console.log("🚀 ~ file: Download.jsx:20 ~ diferentePestana ~ newPathname:", newPathname)
      let pdfUrl = ''
      if (dominio === 'http://localhost:5173') {
        pdfUrl = `https://dsr.prestodemos.com/${newPathname}`
      }else{
        pdfUrl = `${dominio}/${newPathname}`
      }
      const link = document.createElement('a');
      console.log("link:", link)
      link.href = pdfUrl;
      link.download = 'archivo.pdf';
      //link.target = '_blank'; // Abre el enlace en una nueva pestaña
      //link.setAttribute('download', 'archivo.pdf'); 
      //link.style.display = 'none';
      //document.body.appendChild(link);
      link.click();
      //document.body.removeChild(link); */
    }  
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Button
        onClick={diferentePestana}
        variant="contained"
      >
        Download
      </Button>
    </Stack>
  )
}

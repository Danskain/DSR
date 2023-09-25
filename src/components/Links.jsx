import { useState, useEffect } from 'react'
import { Link } from '@mui/material'

export const Links = ({name}) => {
  const [hidenAddress, setHidenAddress] = useState('')
  const [hiden, setHiden] = useState(false)

  useEffect(() => {
    if (Array.isArray(name)) {
      const valueLink = [...name]
      setHiden(true)
      setHidenAddress(valueLink)
    }
  }, [])

  return (
    <>
      {hiden
      ?
        <>
          {hidenAddress.map((elemento, index) => (
            <Link key={index} href={elemento.url} target="_blank" rel="noopener noreferrer">
              {elemento.nameFile}
            </Link>
          ))}
        </>
      :
        ''
      }
    </>
  )
}

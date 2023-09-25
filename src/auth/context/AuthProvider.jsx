import { useReducer } from 'react'
import { AuthContext } from './AuthContext'
import { authReducer } from './authReducer'

import { types } from '../types/types'

// const initialState = {
//     logged: false,
// }

const init = () => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  const pages = JSON.parse(window.localStorage.getItem('pages'))
  const tabs = JSON.parse(window.localStorage.getItem('tabs'))
  const token = JSON.parse(window.localStorage.getItem('token'))
  const menuUser = JSON.parse(window.localStorage.getItem('menuUser'))

  return {
    logged: !!user,
    user,
    pages,
    tabs,
    token,
    menuUser
  }
}

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {}, init)

  const logins = (name = '', navBar, tabes, token, dataMenuUser) => {
    const pages = navBar
    const tabs = tabes
    const user = { id: 'ABC', name }
    const menuUser = dataMenuUser
    const action = { type: types.login, payload: user, pages, tabs, token, menuUser }

    window.localStorage.setItem('user', JSON.stringify(user))
    window.localStorage.setItem('pages', JSON.stringify(pages))
    window.localStorage.setItem('tabs', JSON.stringify(tabs))
    window.localStorage.setItem('token', JSON.stringify(token))
    window.localStorage.setItem('menuUser', JSON.stringify(menuUser))
    dispatch(action)
  }

  const logout = () => {
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('pages')
    window.localStorage.removeItem('tabs')
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('menuUser')
    const action = { type: types.logout }
    dispatch(action)
  }

  return (
    <AuthContext.Provider value={{
      ...authState,

      // Methods
      logins,
      logout
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}

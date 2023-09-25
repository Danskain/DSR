import { types } from '../types/types'

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        logged: true,
        user: action.payload,
        pages: action.pages,
        tabs: action.tabs,
        token: action.token,
        menuUser: action.menuUser
      }

    case types.logout:
      return {
        logged: false
      }

    default:
      return state
  }
}

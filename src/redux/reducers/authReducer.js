import * as authTypes from '../types/authTypes'

const initialState = {
  jwt: localStorage.getItem('jwt') || null,
  unauthorized: false,
}

const authReducer = (state = initialState, action = undefined) => {
  const { type, payload } = action
  switch (type) {
    case authTypes.SAVE_JWT:
      localStorage.setItem('jwt', payload)
      return { ...state, jwt: payload }
    case authTypes.AUTHORIZED:
      return { ...state, unauthorized: false }
    case authTypes.UN_AUTHORIZED:
      return { ...state, unauthorized: true, jwt: null }
    default:
      return state
  }
}

export default authReducer

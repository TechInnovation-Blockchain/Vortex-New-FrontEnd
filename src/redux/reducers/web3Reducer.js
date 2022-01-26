import * as web3Types from '../types/web3Types'

const initialState = {
  web3context: null,
}

const web3Reducer = (state = initialState, action = undefined) => {
  const { type, payload } = action
  switch (type) {
    case web3Types.STORE_WEB3_CONTEXT:
      return { ...state, web3context: { ...payload } }
    default:
      return state
  }
}

export default web3Reducer

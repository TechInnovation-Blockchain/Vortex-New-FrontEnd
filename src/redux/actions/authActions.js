import axios from 'axios'
import { BASE_URL } from '../../config/constants'
import { logError, logMessage } from '../../utils/log'
import { store } from '../store'
import * as authTypes from '../types/authTypes'

// get jwt web token
export const getJWT = (walletAddress, timeStamp) => async (dispatch) => {
  try {
    const body = { wallet_address: walletAddress, time_stamp: timeStamp }
    const res = await axios.post(`${BASE_URL}/upload_csv/auth`, body)
    logMessage('getJWT', res)
    if (res?.data?.responseCode === 200) {
      dispatch({ type: authTypes.SAVE_JWT, payload: res.data.result })
    }
  } catch (e) {
    logError('getJWT', e)
  }
}

export const authorize = () => async (dispatch) => {
  dispatch({ type: authTypes.AUTHORIZED })
}

export const authError = (error) => {
  if (error.message === 'Request failed with status code 403') {
    store.dispatch({
      type: authTypes.UN_AUTHORIZED,
    })
  }
}

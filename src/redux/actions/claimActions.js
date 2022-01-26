import axios from 'axios'
import { BASE_URL } from '../../config/constants'
import { logError, logMessage } from '../../utils/log'
import * as claimTypes from '../types/claimTypes'
import { authError } from './authActions'
import { showSnackbar } from './uiActions'

// all claims of user
export const getAvailableClaims = (jwt) => async (dispatch) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    }
    const res = await axios.get(
      `${BASE_URL}/user/claimed_tokens?history=false`,
      config,
    )
    logMessage('Get Available Claims', res)
    if (res?.data?.responseCode === 201) {
      dispatch({
        type: claimTypes.GET_AVAILABLE_CLAIMS,
        payload: res.data.result,
      })
    } else {
      dispatch({ type: claimTypes.GET_AVAILABLE_CLAIMS, payload: [] })
    }
  } catch (e) {
    logError('Get Available Claims', e)
    if (e.message === 'Network Error') {
      dispatch(showSnackbar({ message: e.message, severity: 'error' }))
    }
    dispatch({ type: claimTypes.GET_AVAILABLE_CLAIMS, payload: [] })
    authError(e)
  }
}

// split user claims into lock and unlocked claims
export const setLockAndUnlockClaims = (data) => (dispatch) => {
  dispatch({ type: claimTypes.SET_LOCK_UNLOCK_CLAIMS, payload: data })
}

// clear locked and unlocked claims
export const resetLockAndUnlockClaims = () => (dispatch) => {
  dispatch({ type: claimTypes.RESET_LOCK_UNLOCK_CLAIMS })
}

// get user claimes history
export const getClaimsHistory = (jwt) => async (dispatch) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    }
    const res = await axios.get(
      `${BASE_URL}/user/claimed_tokens?history=true`,
      config,
    )
    logMessage('Get Claims History', res)
    if (res?.data?.responseCode === 201) {
      dispatch({
        type: claimTypes.GET_CLAIMS_HISTORY,
        payload: res.data.result,
      })
    } else {
      dispatch({ type: claimTypes.GET_CLAIMS_HISTORY, payload: [] })
    }
  } catch (e) {
    logError('Get Claims History', e)
    dispatch({ type: claimTypes.GET_CLAIMS_HISTORY, payload: [] })
    authError(e)
  }
}

// remove claim from redux after claiming
export const removeClaim = (claims, address) => async (dispatch) => {
  dispatch({ type: claimTypes.REMOVE_CLAIMS, payload: { claims, address } })
}

// clear user claims from redux
export const resetClaims = () => async (dispatch) => {
  dispatch({ type: claimTypes.RESET_CLAIMS })
}

// clear users claims history from redux
export const resetClaimsHistory = () => async (dispatch) => {
  dispatch({ type: claimTypes.RESET_CLAIMS_HISTORY })
}

// start single claim
export const withdrawClaimedToken = async (claimId, jwt) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    }
    const res = await axios.post(
      `${BASE_URL}/user/withdraw_claimed_token/${claimId}?claim=single`,
      {},
      config,
    )
    logMessage('withdrawClaimedToken', res)
    if (res?.data?.responseCode === 201) {
      return true
    }
    return false
  } catch (e) {
    logError('withdrawClaimedToken', e)
    authError(e)
    return false
  }
}

// start multiple claim
export const withdrawMultipleClaimedToken = async (
  walletAddress,
  merkleRoot,
  jwt,
) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    }
    const body = { merkleRoot }
    const res = await axios.post(
      `${BASE_URL}/user/withdraw_claimed_token/${walletAddress}?claim=multiple`,
      body,
      config,
    )
    logMessage('withdrawMultipleClaimedToken', res)
    if (res?.data?.responseCode === 201) {
      return true
    }
    return false
  } catch (e) {
    logError('withdrawMultipleClaimedToken', e)
    authError(e)
    return false
  }
}

export const getAquaClaims = (walletAddress) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://server.aquafi.io/aqua/${walletAddress}`,
    )
    logMessage('getAquaClaims', res)
    if (res?.data?.status === 'success') {
      dispatch({
        type: claimTypes.GET_AQUA_CLAIMS,
        payload: {
          aqua: true,
          amount: res.data.data.amount,
          multiplier: res.data.data.currentMultiplier,
        },
      })
    } else {
      dispatch({ type: claimTypes.GET_AQUA_CLAIMS, payload: {} })
    }
  } catch (e) {
    logError('getAquaClaims', e)
    dispatch({ type: claimTypes.GET_AQUA_CLAIMS, payload: {} })
  }
}

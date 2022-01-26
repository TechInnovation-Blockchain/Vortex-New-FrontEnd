import axios from 'axios'
import { BASE_URL } from '../../config/constants'
import { logError, logMessage } from '../../utils/log'
import * as dropTypes from '../types/dropTypes'
import { authError } from './authActions'
import { showSnackbar } from './uiActions'

// save drop inputs
export const saveFields = (data) => (dispatch) => {
  dispatch({ type: dropTypes.SAVE_FIELDS, payload: data })
}

// get token logo
export const getTokenLogo = async (tokenAddress) => {
  const unknownLogo = 'https://gateway.pinata.cloud/ipfs/QmNX2QerTxTm1RThD7Dc9X5uS9VFnQxmMotaMFhK5GYbBk'
  try {
    const logoUrl = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${tokenAddress}/logo.png`
    const res = await axios.get(logoUrl)
    if (res) {
      return logoUrl
    }
    return unknownLogo
  } catch (error) {
    logError('Token Logo', error)
    return unknownLogo
  }
}

// clear all drop inputs
export const clearFields = (account) => (dispatch) => {
  dispatch({ type: dropTypes.CLEAR_FIELDS, payload: account })
}

// clear csv data
export const clearCSV = () => (dispatch) => {
  dispatch({ type: dropTypes.CLEAR_CSV })
}

// const generateDate = min => {
//   const currentDate = new Date();
//   console.log('Current Date => ', currentDate.toISOString());
//   currentDate.setMinutes(currentDate.getMinutes() + min);
//   const newDate = new Date(currentDate);
//   console.log('New Date => ', newDate.toISOString());
//   return newDate.toISOString();
// };

// uploading csv on server
export const uploadCSV = (
  {
    file, account, token, startDate, endDate, dropName, decimal, totalAmount,
  },
  jwt,
  onError,
) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        headers: { Authorization: `Bearer ${jwt}` },
      },
    }
    const formData = new FormData()
    formData.append('file', file)
    formData.append('walletAddress', account)
    formData.append('tokenAddress', token)
    formData.append('decimal', decimal)
    formData.append('totalAmount', totalAmount)
    if (dropName) {
      formData.append('dropName', dropName)
    }
    if (startDate) {
      formData.append('startDate', startDate)
    }
    if (endDate) {
      formData.append('endDate', endDate)
    }
    // formData.append('endDate', generateDate(3));

    const res = await axios.post(
      `${BASE_URL}/upload_csv/merkle_root`,
      formData,
      config,
    )
    logMessage('Upload CSV', res)
    if (res?.data?.responseCode === 200) {
      dispatch({
        type: dropTypes.UPLOAD_CSV,
        payload: res.data.result,
      })
      dispatch(
        showSnackbar({
          message: 'CSV Uploaded Successfully',
          severity: 'success',
        }),
      )
    } else {
      dispatch(
        showSnackbar({ message: 'CSV Upload Error', severity: 'error' }),
      )
      onError()
    }
  } catch (e) {
    logError('Upload CSV', e)
    dispatch(
      showSnackbar({ message: 'CSV Upload Error', severity: 'error' }),
    )
    onError()
    authError(e)
  }
}

// get dropper drops
export const getUserDrops = (jwt) => async (dispatch) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    }
    const res = await axios.get(`${BASE_URL}/dropper/get_drops`, config)
    logMessage('Get Drops', res)
    if (res?.data?.responseCode === 201) {
      dispatch({
        type: dropTypes.GET_DROPS,
        payload: res.data.result ? res.data.result : [],
      })
    } else {
      dispatch({
        type: dropTypes.GET_DROPS,
        payload: [],
      })
    }
  } catch (e) {
    dispatch({
      type: dropTypes.GET_DROPS,
      payload: [],
    })
    logError('Get Drops', e)
    authError(e)
  }
}

// update withdrawed drop
export const withdrawDrops = (drop) => async (dispatch) => {
  dispatch({ type: dropTypes.WITHDRAW_DROP, payload: drop })
}

// change drop status in redux
export const pauseDrop = (dropId, pause) => async (dispatch) => {
  dispatch({ type: dropTypes.PAUSE_DROP, payload: { id: dropId, pause } })
}

// get csv file from server
export const getCSVFile = async (dropId, tokenName, jwt) => {
  let result = null
  try {
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    }
    const res = await axios.get(
      `${BASE_URL}/dropper/get_csv/${dropId}?token_name=${tokenName}`,
      config,
    )
    logMessage('getCSVFile', res)
    if (res?.data?.responseCode === 201) {
      result = res.data.result
    }
  } catch (e) {
    logError('getCSVFile', e)
    authError(e)
  }
  return result
}

// start cron job for pause/unpause on server
export const startpause = async (dropId, action, jwt) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    }
    const res = await axios.get(
      `${BASE_URL}/dropper/pause_drop/${dropId}?pause=${action}`,
      config,
    )
    logMessage('pause', res)
    if (res?.data?.responseCode === 201) {
      return true
    }
    return false
  } catch (e) {
    logError('pause', e)
    authError(e)
    return false
  }
}

// start withdraw cron job on server
export const startWithdraw = async (dropperAddress, dropId, jwt) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    }
    const res = await axios.get(
      `${BASE_URL}/dropper/withdraw_drop/${dropperAddress}?csv_id=${dropId}`,
      config,
    )
    logMessage('startWithdraw', res)
    if (res?.data?.responseCode === 201) {
      return true
    }
    return false
  } catch (e) {
    logError('startWithdraw', e)
    authError(e)
    return false
  }
}

// remove users data from server on rejection
export const rejectDrop = async (dropperAddress, merkleRoot, jwt) => {
  let result
  try {
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    }
    result = await axios.get(
      `${BASE_URL}/dropper/reject_drop/${dropperAddress}?merkleRoot=${merkleRoot}`,
      config,
    )
    logMessage('rejectDrop', result)
  } catch (e) {
    logError('rejectDrop', e)
    authError(e)
  }
  return result
}

// clear user drops from redux
export const resetDrops = () => async (dispatch) => {
  dispatch({ type: dropTypes.RESET_DROPS })
}

// validate dropName
export const checkDropName = async (dropName, tokenAddress) => {
  try {
    const body = { dropName, tokenAddress }
    const res = await axios.post(`${BASE_URL}/dropper/check_drop`, body)
    logMessage('checkDropName', res)
    if (res?.data?.responseCode) {
      return true
    }
    return false
  } catch (e) {
    logError('checkDropName', e)
    return false
  }
}

// change drop tabs from token=>dates=>uploadCSV
export const changeTab = (tab) => async (dispatch) => {
  dispatch({ type: dropTypes.CHANGE_TAB, payload: tab })
}

export const saveTxnHash = async (merkleRoot, txnHash, jwt) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    }
    const body = { txn_hash: txnHash, merkle_root: merkleRoot }
    const res = await axios.post(
      `${BASE_URL}/dropper/etherscan_link`,
      body,
      config,
    )
    logMessage('saveTxnHash', res)
  } catch (e) {
    logError('saveTxnHash', e)
    authError(e)
  }
}

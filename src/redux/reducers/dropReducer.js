import * as dropTypes from '../types/dropTypes'

const initialState = {
  fields: {
    tokenName: '',
    tokenLogo: '',
    token: '',
    dropName: '',
    dropExists: false,
    approved: 0,
    validated: false,
    loading: '',
    error: '',
    dropNameError: '',

    startDate: null,
    endDate: null,

    file: null,
    totalAmount: 0,
    totalAddress: 0,
    balance: 0,
    csvError: '',
  },
  currentAccount: '',
  currentTab: 'token',
  csv: null,
  userDrops: null,
  dropsPausing: false,
}

const dropReducer = (state = initialState, action = undefined) => {
  const { type, payload } = action
  switch (type) {
    case dropTypes.SAVE_FIELDS:
      return { ...state, fields: { ...state.fields, ...payload } }
    case dropTypes.CLEAR_FIELDS:
      return {
        ...state,
        fields: initialState.fields,
        csv: null,
        currentTab: 'token',
        currentAccount: payload || state.currentAccount,
      }
    case dropTypes.UPLOAD_CSV:
      return { ...state, csv: payload }
    case dropTypes.GET_DROPS: {
      const pausedDrops = payload.filter(
        ({ pauseDrop, withDraw }) => pauseDrop === true && withDraw === false,
      )
      return {
        ...state,
        userDrops: payload,
        dropsPausing: pausedDrops.length > 0,
      }
    }
    case dropTypes.RESET_DROPS:
      return { ...state, userDrops: [], dropsPausing: false }
    case dropTypes.CLEAR_CSV:
      return { ...state, csv: null }
    case dropTypes.CHANGE_TAB:
      return { ...state, currentTab: payload }
    case dropTypes.PAUSE_DROP: {
      const tempDrops = state.userDrops
      let targetData = tempDrops.filter(({ _id }) => _id === payload.id)[0]
      const index = tempDrops.findIndex(({ _id }) => _id === payload.id)
      targetData = { ...targetData, pauseDrop: payload.pause }
      tempDrops[index] = targetData
      const pausedDrops = tempDrops.filter(
        ({ pauseDrop, withDraw }) => pauseDrop === true && withDraw === false,
      )
      return {
        ...state,
        dropsPausing:
          !(!payload.pause && pausedDrops.length === 0),
      }
    }
    case dropTypes.CLEAR_DROPS:
      return { ...state, userDrops: null }
    case dropTypes.WITHDRAW_DROP: {
      const tempDrops = state.userDrops
      const index = tempDrops.findIndex(({ _id }) => _id === payload._id) // eslint-disable-line no-underscore-dangle
      tempDrops[index] = { ...payload, pauseDrop: false, withDraw: true }
      const pausedDrops = tempDrops.filter(
        ({ pauseDrop, withDraw }) => pauseDrop === true && withDraw === false,
      )
      return {
        ...state,
        userDrops: tempDrops,
        dropsPausing: pausedDrops.length > 0,
      }
    }
    default:
      return state
  }
}

export default dropReducer

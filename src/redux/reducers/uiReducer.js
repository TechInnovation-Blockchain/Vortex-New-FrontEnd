import * as uiTypes from '../types/uiTypes'

const initialState = {
  theme: localStorage.getItem('theme') || 'dark',
  loading: { walletConnection: false, dapp: false },
  snackbar: {
    open: false,
    severity: 'success',
    message: '',
    transactionHash: '',
  },
  modal: {
    open: false, varaint: 'loading', text: '', secondaryText: '',
  },
  initialRender: true,
}

const uiReducer = (state = initialState, action = undefined) => {
  const { type, payload } = action
  switch (type) {
    case uiTypes.TOGGLE_THEME: {
      const theme = state.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', theme)
      return { ...state, theme }
    }
    case uiTypes.LOADING:
      return { ...state, loading: { ...state.loading, ...payload } }
    case uiTypes.SHOW_SNACKBAR:
      return {
        ...state,
        snackbar: { open: true, transactionHash: '', ...payload },
      }
    case uiTypes.HIDE_SNACKBAR:
      return { ...state, snackbar: { open: false, transactionHash: '' } }
    case uiTypes.SHOW_SNACKBAR_INDEEP:
      return { ...state, snackbar: { open: true, ...payload } }
    case uiTypes.INITIALLY_RENDERED:
      return { ...state, initialRender: false }
    case uiTypes.SHOW_MODAL:
      return { ...state, modal: payload }
    default:
      return state
  }
}

export default uiReducer

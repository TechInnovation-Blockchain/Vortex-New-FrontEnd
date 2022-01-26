import { useSelector } from 'react-redux'
import {
  hideSnackbar,
  initiallyRendered,
  setLoading,
  showSnackbar,
  showSnackbarInDeep,
  toggleTheme,
} from '../redux'
import { useDispatchWrap } from './utilHooks'

export const useTheme = () => {
  const theme = useSelector((state) => state.ui.theme)
  const toggleThemeF = useDispatchWrap(toggleTheme)

  return { theme, toggleThemeF }
}

export const useLoading = () => {
  const loading = useSelector((state) => state.ui.loading)
  const setLoadingF = useDispatchWrap(setLoading)

  return { loading, setLoadingF }
}

export const useSnackbar = () => {
  const snackbar = useSelector((state) => state.ui.snackbar)
  const showSnackbarF = useDispatchWrap(showSnackbar)
  const hideSnackbarF = useDispatchWrap(hideSnackbar)
  const showSnackbarInDeepF = useDispatchWrap(showSnackbarInDeep)

  return {
    ...snackbar, showSnackbarF, hideSnackbarF, showSnackbarInDeepF,
  }
}

export const useInitiallyRedndering = () => {
  const initialRender = useSelector((state) => state.ui.initialRender)
  const initiallyRenderedF = useDispatchWrap(initiallyRendered)

  return { initialRender, initiallyRenderedF }
}

export const useModal = () => {
  const modal = useSelector((state) => state.ui.modal)

  return { modalProps: modal }
}

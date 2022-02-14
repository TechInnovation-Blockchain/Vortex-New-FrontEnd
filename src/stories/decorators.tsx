import { addDecorator } from '@storybook/react'
import { ThemeProvider } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from '../utils/web3ConnectFunctions'
import { lightTheme } from '../theme/materialUiTheme'
import { store } from '../redux/store'

type DecoratorFunction = Parameters<typeof addDecorator>[0]

export const withTheme: DecoratorFunction = (Story) => (
  <ThemeProvider theme={lightTheme}>
    <Story />
  </ThemeProvider>
)

export const withWeb3Provider: DecoratorFunction = (Story) => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <Story />
  </Web3ReactProvider>
)

export const withProvider: DecoratorFunction = (Story) => (
  <Provider store={store}>
    <Story />
  </Provider>
)

export const withMuiPickersUtilsProvider: DecoratorFunction = (Story) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Story />
  </MuiPickersUtilsProvider>
)

export const withBackground: () => DecoratorFunction = (backgroundColor: string = 'black') => (Story) => (
  <div style={{ backgroundColor }}>
    <Story />
  </div>
)

export const withRouter: DecoratorFunction = (Story) => (
  <Router>
    <Story />
  </Router>
)

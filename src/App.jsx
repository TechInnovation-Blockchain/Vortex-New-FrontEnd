import { ThemeProvider } from '@material-ui/core/styles'
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import { useEffect } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import './App.css'
import './assets/css/grid.css'
import AuthMiddleware from './Auth/AuthMiddleware'
import Layout from './Components/Layout'
import { Snackbar } from './Components'
// import {useJWT, useModal, useTheme} from './hooks';
import { useJWT, useTheme } from './hooks'
import routes from './Routing'
import { darkTheme, lightTheme } from './theme/materialUiTheme'
import { getLibrary } from './utils/web3ConnectFunctions'

// const theme = createTheme({
//   typography: {
//     fontFamily: 'Montserrat',
//     fontSize: '13px'
//   },
//   palette: {
//     primary: green,
//     type: "dark" // Switching the dark mode on is a single property value change.
//   }
// });

function App() {
  const { theme } = useTheme()

  useEffect(() => {
    document.body.style.setProperty(
      '--mainBackground',
      theme === 'light'
        ? lightTheme.palette.background.main
        : darkTheme.palette.background.main,
    )
  }, [theme])

  // const { modalProps } = useModal();
  const { unauthorized, getJWTF, authorizeF } = useJWT()
  const { account, deactivate } = useWeb3React()

  // const [open, setOpen] = useState(localStorage.getItem('initail') ? false : true);

  // const handleClose = () => {
  //   setOpen(false);
  //   localStorage.setItem('initail', true);
  // };

  useEffect(() => {
    if (account) {
      getJWTF(account, Date.now())
    }
  }, [account])

  useEffect(() => {
    if (unauthorized) {
      deactivate()
      authorizeF()
    }
  }, [unauthorized])

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        <Router>
          <Switch>
            {routes.map((route, key) => (
              <AuthMiddleware
                path={route.path}
                layout={Layout}
                redirectTo={route.redirectTo}
                component={route.component}
                key={key} // eslint-disable-line react/no-array-index-key
              />
            ))}
          </Switch>
        </Router>
        <Snackbar />
      </ThemeProvider>
    </Web3ReactProvider>
  )
}

export default App

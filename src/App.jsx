import { ThemeProvider } from '@material-ui/core/styles'
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import './assets/css/grid.css'
import Deposit from 'pages/deposit'
import StakePage from 'pages/stake'
import Layout from './components/layout'
import { Snackbar } from './components'
import { useJWT, useTheme } from './hooks'
import { darkTheme, lightTheme } from './theme/materialUiTheme'
import { getLibrary } from './utils/web3ConnectFunctions'

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

  const { unauthorized, getJWTF, authorizeF } = useJWT()
  const { account, deactivate } = useWeb3React()

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
          <Layout>
            <Switch>
              <Route exact path="/">
                <StakePage />
              </Route>
              <Route exact path="/create">
                <Deposit />
              </Route>
            </Switch>
          </Layout>
        </Router>
        <Snackbar />
      </ThemeProvider>
    </Web3ReactProvider>
  )
}

export default App

import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { ApolloProvider } from '@apollo/client'
import App from './App'
import './index.css'
import { store } from './redux/store'
import { vortexData } from './apollo/client'

ReactDOM.render(
  <ApolloProvider client={vortexData}>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </ApolloProvider>,
  document.getElementById('root'),
)

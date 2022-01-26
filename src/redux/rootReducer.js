import { combineReducers } from 'redux'
import authReducer from './reducers/authReducer'
import claimReducer from './reducers/claimReducers'
import dropReducer from './reducers/dropReducer'
import {
  claimingReducer,
  loadingReducer,
  stakeReducer,
  stakingReducer,
  dataLoadingReducer,
  unstakingReducer,
} from './reducers/loadingReducer'
import uiReducer from './reducers/uiReducer'
import web3Reducer from './reducers/web3Reducer'

const rootReducer = combineReducers({
  ui: uiReducer,
  web3: web3Reducer,
  drop: dropReducer,
  claim: claimReducer,
  auth: authReducer,
  loading: loadingReducer,
  staking: stakeReducer,
  staking_loading: stakingReducer,
  claiming_loading: claimingReducer,
  data_loading: dataLoadingReducer,
  unstaking: unstakingReducer,
})

export default rootReducer

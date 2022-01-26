import { useSelector } from 'react-redux'
import { storeWeb3Context } from '../redux'
import { useDispatchWrap } from './utilHooks'

export const useWeb3 = () => {
  const web3Data = useSelector((state) => state.web3)
  const storeWeb3ContextF = useDispatchWrap(storeWeb3Context)

  return { ...web3Data, storeWeb3ContextF }
}

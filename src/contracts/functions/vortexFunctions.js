import { parseEther } from '@ethersproject/units'
import { loading } from '../../redux/actions/loadingActions'
import { store } from '../../redux/store'
import { vortexContract } from '../getContract'

// create portal
export const createPortalContract = async (
  endBlock,
  _rewardsToken,
  _minimumRewardRate,
  _stakingToken,
  stakeLimit,
  contractLimit,
  distLimit,
  decimal,
  walletAddress,
) => {
  try {
    const contract = vortexContract()
    const newMinimumRewardRate = _minimumRewardRate.map((item) => parseEther(item, decimal).toString())
    const res = await contract.methods
      .createPortal(
        endBlock,
        _rewardsToken,
        newMinimumRewardRate,
        _stakingToken,
        parseEther(stakeLimit, decimal).toString(),
        parseEther(contractLimit, decimal).toString(),
        parseEther(distLimit, decimal).toString(),
      )
      .send({ from: walletAddress })
      .on('transactionHash', () => {
        console.log('transaction pending!')
        store.dispatch(loading('transaction pending!'))
      })
      .then(() => {
        console.log('transaction success!')
        store.dispatch(loading('transaction success!'))
      })
      .catch((e) => {
        if (e.code === 4001) {
          console.log('transaction rejected!')
          store.dispatch(loading('transaction rejected!'))
        } else {
          console.log('transaction failed!')
          store.dispatch(loading('transaction failed!'))
        }
        console.log('transaction status!', e)
      })
    return res
  } catch (e) {
    return e
  }
}

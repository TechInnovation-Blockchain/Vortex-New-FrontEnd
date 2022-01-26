import { parseEther } from '@ethersproject/units'
import {
  stakeLoading, staking, claiming, unstaking,
} from '../../redux/actions/loadingActions'
import { store } from '../../redux/store'
import { portalContract } from '../getContract'

export const getStakingToken = async (address) => {
  try {
    const contract = portalContract(address)
    const stakingToken = await contract.methods.getStakingToken().call()
    return stakingToken
  } catch (e) {
    return e
  }
}

export const getRewardTokens = async (address) => {
  try {
    const contract = portalContract(address)
    const rewardTokens = await contract.methods.getRewardTokens().call()

    return rewardTokens
  } catch (e) {
    return 'error'
  }
}

export const getTotalReward = async (address) => {
  try {
    const contract = portalContract(address)
    const totalReward = await contract.methods.totalReward().call()

    return totalReward
  } catch (e) {
    return e
  }
}

export const getEndDate = async (address) => {
  try {
    const contract = portalContract(address)
    const endDate = await contract.methods.endDate().call()

    return endDate
  } catch (e) {
    return e
  }
}

export const stake = async (
  address,
  quantity,
  decimal,
  account,
) => {
  try {
    const contract = portalContract(address)
    await contract.methods
      .stake(parseEther(quantity, decimal).toString(), account)
      .send({ from: account })
      .on('transactionHash', () => {
        store.dispatch(staking('transaction pending!'))
      })
      .then(() => {
        store.dispatch(staking('transaction success!'))
      })
      .catch((e) => {
        if (e.code === 4001) {
          store.dispatch(staking('transaction rejected!'))
        } else {
          store.dispatch(staking('transaction failed!'))
        }
        console.log('transaction status!', e)
      })
  } catch (e) {
    console.log(e)
  }
}

export const deposit = async (
  address,
  quantity,
  endBlock,
  decimal,
  account,
) => {
  const quantities = quantity.map((item, index) => parseEther(item.toString(), decimal[index]).toString())
  try {
    const contract = portalContract(address)
    console.log('contract:', contract)
    await contract.methods
      .addReward(quantities, parseInt(endBlock)) // eslint-disable-line radix
      .send({ from: account })
      .on('transactionHash', () => {
        store.dispatch(stakeLoading('transaction pending!'))
      })
      .then(() => {
        store.dispatch(stakeLoading('transaction success!'))
      })
      .catch((e) => {
        if (e.code === 4001) {
          store.dispatch(stakeLoading('transaction rejected!'))
        } else {
          store.dispatch(stakeLoading('transaction failed!'))
        }
        console.log('transaction status!', e)
      })
  } catch (e) {
    console.log(e)
  }
}

export const claim = async (
  address,
  account,
) => {
  try {
    const contract = portalContract(address)
    await contract.methods
      .harvest(account)
      .send({ from: account })
      .on('transactionHash', () => {
        store.dispatch(claiming('transaction pending!'))
      })
      .then(() => {
        store.dispatch(claiming('transaction success!'))
      })
      .catch((e) => {
        if (e.code === 4001) {
          store.dispatch(claiming('transaction rejected!'))
        } else {
          store.dispatch(claiming('transaction failed!'))
        }
        console.log('transaction status!', e)
      })
  } catch (e) {
    console.log(e)
  }
}

export const claimdata = async (
  address,
  account,
) => {
  try {
    const contract = portalContract(address)
    const ClaimData = await contract.methods.getUserData(account).call()

    return ClaimData
  } catch (e) {
    return e
  }
}

export const unStake = async (
  address,
  account,
) => {
  try {
    const contract = portalContract(address)
    await contract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', () => {
        store.dispatch(unstaking('transaction pending!'))
      })
      .then(() => {
        store.dispatch(unstaking('transaction success!'))
      })
      .catch((e) => {
        if (e.code === 4001) {
          store.dispatch(unstaking('transaction rejected!'))
        } else {
          store.dispatch(unstaking('transaction failed!'))
        }
        console.log('transaction status!', e)
      })
  } catch (e) {
    console.log(e)
  }
}

export const getRewardRate = async (
  address,
) => {
  let rewardRate = []
  try {
    const contract = portalContract(address)
    rewardRate = await contract.methods.getRewardRate().call()
  } catch (e) {
    console.log(e)
  }
  return rewardRate
}

export const getTotalStaked = async (
  address,
) => {
  let totalStaked = 0
  try {
    const contract = portalContract(address)
    totalStaked = await contract.methods.getTotalStaked().call()
  } catch (e) {
    console.log(e)
  }
  return totalStaked
}

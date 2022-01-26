import { formatUnits } from '@ethersproject/units'
import { MaxUint256 } from '@ethersproject/constants'
import { logError } from '../../utils/log'
import { erc20TokenContract } from '../getContract'

export const getDecimal = async (tokenAddress) => {
  let decimals
  try {
    const contract = erc20TokenContract(tokenAddress)
    decimals = await contract.methods.decimals().call()
  } catch (e) {
    logError('getDecimal', e)
  }
  return decimals
}

export const getName = async (tokenAddress) => {
  let name
  try {
    const contract = erc20TokenContract(tokenAddress)
    name = await contract.methods.name().call()
  } catch (e) {
    // logError('getName', e);
  }
  return name
}

export const getSymbol = async (tokenAddress) => {
  let symbol
  try {
    const contract = erc20TokenContract(tokenAddress)
    symbol = await contract.methods.symbol().call()
  } catch (e) {
    // logError('getSymbol', e);
  }
  return symbol
}

export const getBalance = async (tokenAddress, account) => {
  let floatBalance
  try {
    const contract = erc20TokenContract(tokenAddress)
    const balance = await contract.methods.balanceOf(account).call()
    const decimal = await getDecimal(tokenAddress)
    floatBalance = parseFloat(formatUnits(balance, decimal)).toFixed(2).toString()
  } catch (e) {
    // logError('getSymbol', e);
  }
  return floatBalance
}

export const approve = async (
  tokenAddress,
  contractAddress,
  account,
  amount,
  decimal,
  callback,
) => {
  try {
    const contract = erc20TokenContract(tokenAddress)
    const allowance = await contract.methods.allowance(account, contractAddress).call()
    if (parseFloat(allowance.toString()) > 0) {
      callback()
      return true
    }
    await contract.methods
      .approve(contractAddress, MaxUint256._hex) // eslint-disable-line no-underscore-dangle
      .send({ from: account })
      .on('transactionHash', () => {})
      .then(() => {
        callback()
      })
      .catch(() => false)
    return true
  } catch (e) {
    return false
  }
}

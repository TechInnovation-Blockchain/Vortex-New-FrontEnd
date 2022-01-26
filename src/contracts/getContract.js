import Web3 from 'web3'
import { logError } from '../utils/log'
import erc20Abi from './abi/ERC20.json'
import portalAbi from './abi/Portal.json'
import vortexAbi from './abi/Vortex.json'

// import { VALID_CHAIN } from '../config/constants';

let web3
let web3Infura

// const infuraUrl =
//   VALID_CHAIN === 1
//     ? `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`
//     : `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`;

const infuraUrl = 'https://rinkeby.infura.io/v3/d1861c06cb1746c99fa4854cd2ca349f'
const contractAddress = '0x0762Ca13aFD8Bca8fecbEda91Ea413Fcb5a0814b'
console.log('erc20abi:::', erc20Abi)
try {
  web3 = new Web3(window?.web3?.currentProvider)
  web3Infura = new Web3(infuraUrl)
} catch (e) {
  logError('Connect Web3', e)
}

export const setWeb3Provider = (provider) => {
  web3 = new Web3(provider)
}

export const erc20TokenContract = (tokenAddress) => {
  let contract
  try {
    if (window?.web3?.currentProvider || web3) {
      contract = new web3.eth.Contract(erc20Abi.abi, tokenAddress)
    } else {
      contract = new web3Infura.eth.Contract(erc20Abi.abi, tokenAddress)
    }
  } catch (e) {
    logError('erc20TokenContract', e)
  }
  return contract
}

export const vortexContract = () => {
  let contract
  try {
    if (window?.web3?.currentProvider || web3) {
      contract = new web3.eth.Contract(vortexAbi.abi, contractAddress)
    } else {
      contract = new web3Infura.eth.Contract(vortexAbi.abi, contractAddress)
    }
  } catch (e) {
    logError('vortexContract Error', e)
  }
  return contract
}

export const portalContract = (address) => {
  let contract
  try {
    if (window?.web3?.currentProvider || web3) {
      contract = new web3.eth.Contract(portalAbi.abi, address)
    } else {
      contract = new web3Infura.eth.Contract(portalAbi.abi, address)
    }
  } catch (e) {
    logError('portalContract Error', e)
  }
  return contract
}

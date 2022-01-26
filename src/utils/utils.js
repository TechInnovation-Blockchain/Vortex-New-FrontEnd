import { getAddress } from '@ethersproject/address'
import axios from 'axios'
import { ethers } from 'ethers'

export function isAddress(value) {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}
export function shortenAddress(address, chars = 4) {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

export const getTokenLogo = (tokenAddr) => {
  const tokenAddress = ethers.utils.getAddress(tokenAddr)
  console.log('tokenAddr', tokenAddr, tokenAddress, getAddress(tokenAddr))
  let logo = 'https://gateway.pinata.cloud/ipfs/QmNX2QerTxTm1RThD7Dc9X5uS9VFnQxmMotaMFhK5GYbBk'
  try {
    const logoUrl = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${tokenAddress}/logo.png`
    axios.get(logoUrl).then((res) => {
      if (res) {
        logo = logoUrl
      }
    })
  } catch (error) {
    console.log(error)
  }
  return logo
}

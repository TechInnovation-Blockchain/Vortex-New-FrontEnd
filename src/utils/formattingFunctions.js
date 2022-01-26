import Web3 from 'web3'

export const conciseAddress = (address) => {
  if (Web3.utils.isAddress(address)) {
    return `${address.slice(0, 6)}...${address.slice(
      address.length - 3,
      address.length,
    )}`
  }
  return '-'
}

export const ogTrunc = (value) => {
  if (!Number(value)) {
    return 0
  }
  const val = (value * 100 - Math.trunc(value) * 100) / 100
  if (!val) {
    return Math.trunc(value)
  }
  let decimal = 0
  if (val < 0.000001) {
    decimal = 7
    return parseFloat(value).toFixed(7)
  } if (val < 0.00001) {
    decimal = 6
  } else if (val < 0.0001) {
    decimal = 5
  } else if (val < 0.001) {
    decimal = 4
  } else if (val < 0.01) {
    decimal = 3
  } else if (val < 1) {
    decimal = 2
  } else {
    return Math.trunc(value).toString()
  }
  return (
    Math.trunc(value)
    + parseFloat(
      val
        .toString()
        .match(new RegExp(`^-?\\d+(?:.\\d{0,${decimal}})?`))[0],
    )
  ).toFixed(decimal)
}

export const trunc = (value, test) => {
  const val = ogTrunc(value, test).toString()
  const val2 = val.split('.')
  if (val2[0].length > 8) {
    const v = val2[0].slice(0, 4)
    const val3 = val2[0].slice(val2.length - 4, -1)
    const joined = [v, val3].join('..')
    return joined
  }
  if (val.includes('.')) {
    const splitedVal = val.split('.')
    if (value < 0.0001) {
      return '<0.0001'
    }
    return [
      splitedVal[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      splitedVal[1],
    ].join('.')
  }
  return Number(val).toLocaleString()
}

export const truncFileName = (fileName, acceptedLength) => {
  if (fileName.length > acceptedLength) {
    return `${fileName.substring(0, acceptedLength - 4)}...`
  }
  return fileName
}

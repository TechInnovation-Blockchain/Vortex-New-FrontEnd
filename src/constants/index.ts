export const VALID_CHAIN = process.env.REACT_APP_ENVIRONMENT === 'PRODUCTION' ? 1 : 3

export const NoLogo = 'https://gateway.pinata.cloud/ipfs/QmNX2QerTxTm1RThD7Dc9X5uS9VFnQxmMotaMFhK5GYbBk'

export const DATE_FORMAT = 'dd MMM yyyy'

export const BASE_URL = VALID_CHAIN === 1
  ? 'https://server.dropzero.io'
  : 'https://server-testnet.dropzero.io'

export const ETHERSCAN_TX_BASE_URL = VALID_CHAIN === 1
  ? 'https://etherscan.io/tx/'
  : 'https://ropsten.etherscan.io/tx/'

export const ETHERSCAN_ADDRESS_BASE_URL = VALID_CHAIN === 1
  ? 'https://etherscan.io/address/'
  : 'https://ropsten.etherscan.io/address/'

export const INDEX_FEE = 0 / 100

export enum TransactionStatus {
  TRANSACTION_SUCCESS = 'transaction success!',
  TRANSACTION_PENDING = 'transaction pending!',
  TRANSACTION_FAILED = 'transaction failed!',
  TRANSACTION_REJECTED = 'transaction rejected!',
}

const DEV_ENVIRONMENT = process.env.REACT_APP_ENVIRONMENT === 'DEVELOPMENT'

const logMessage = (title, ...params) => {
  if (DEV_ENVIRONMENT) {
    console.log(title, ' -> ', ...params, ' -> ', Date.now())
  }
}

const logError = (title, ...params) => {
  if (DEV_ENVIRONMENT) {
    console.error('ERROR ', title, ' -> ', ...params, ' -> ', Date.now())
  }
}

export { logMessage, logError }

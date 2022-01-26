export const loading = (data) => (dispatch) => {
  dispatch({ type: 'LOADING', payload: data })
}

export const stakeLoading = (data) => (dispatch) => {
  dispatch({ type: 'STAKE_LOADING', payload: data })
}

export const staking = (data) => (dispatch) => {
  dispatch({ type: 'STAKING', payload: data })
}

export const claiming = (data) => (dispatch) => {
  dispatch({ type: 'CLAIMING', payload: data })
}

export const dataLoading = (data) => (dispatch) => {
  dispatch({ type: 'DATA_LOADING', payload: data })
}

export const unstaking = (data) => (dispatch) => {
  dispatch({ type: 'UNSTAKING', payload: data })
}

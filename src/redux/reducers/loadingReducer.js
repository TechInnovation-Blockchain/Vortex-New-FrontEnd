const initialState = {
  data: null,
}

export const loadingReducer = (state = initialState, action = undefined) => {
  const { type, payload } = action

  switch (type) {
    case 'LOADING':
      return { ...state, data: payload }
    default:
      return state
  }
}

export const stakeReducer = (state = initialState, action = undefined) => {
  const { type, payload } = action

  switch (type) {
    case 'STAKE_LOADING':
      return { ...state, data: payload }
    default:
      return state
  }
}

export const stakingReducer = (state = initialState, action = undefined) => {
  const { type, payload } = action

  switch (type) {
    case 'STAKING':
      return { ...state, data: payload }
    default:
      return state
  }
}

export const claimingReducer = (state = initialState, action = undefined) => {
  const { type, payload } = action

  switch (type) {
    case 'CLAIMING':
      return { ...state, data: payload }
    default:
      return state
  }
}

export const dataLoadingReducer = (state = initialState, action = undefined) => {
  const { type, payload } = action

  switch (type) {
    case 'DATA_LOADING':
      return { ...state, data: payload }
    default:
      return state
  }
}

export const unstakingReducer = (state = initialState, action = undefined) => {
  const { type, payload } = action

  switch (type) {
    case 'UNSTAKING':
      return { ...state, data: payload }
    default:
      return state
  }
}

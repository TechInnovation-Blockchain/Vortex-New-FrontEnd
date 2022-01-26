import * as claimTypes from '../types/claimTypes'

const initialState = {
  availableClaims: null,
  unlockedClaims: [],
  lockedClaims: [],
  claimsHistory: null,
  aquaClaims: null,
}

const claimReducer = (state = initialState, action = undefined) => {
  const { type, payload } = action
  switch (type) {
    case claimTypes.GET_AVAILABLE_CLAIMS:
      return { ...state, availableClaims: payload }
    case claimTypes.SET_LOCK_UNLOCK_CLAIMS:
      return {
        ...state,
        unlockedClaims: payload.unlockedClaims,
        lockedClaims: payload.lockedClaims,
      }
    case claimTypes.RESET_LOCK_UNLOCK_CLAIMS:
      return { ...state, unlockedClaims: [], lockedClaims: [] }
    case claimTypes.GET_CLAIMS_HISTORY:
      return { ...state, claimsHistory: payload }
    case claimTypes.RESET_CLAIMS:
      return {
        ...state,
        availableClaims: [],
        unlockedClaims: [],
        lockedClaims: [],
        aquaClaims: {},
      }
    case claimTypes.RESET_CLAIMS_HISTORY:
      return { ...state, claimsHistory: [] }
    case claimTypes.REMOVE_CLAIMS: {
      const newUnlockedClaims = state.unlockedClaims.filter(
        ({ _id }) => !payload.claims.includes(_id),
      )

      // get grouped claim
      const targetClaim = state.availableClaims.filter(
        ({ address }) => address === payload.address,
      )[0]
      // remove subclaims
      targetClaim.data = targetClaim.data.filter(
        ({ _id }) => !payload.claims.includes(_id),
      )

      let newAvailableClaims
      if (targetClaim.data.length === 0) {
        // if no subclaim left remove the grouped claim
        newAvailableClaims = state.availableClaims.filter(
          ({ address }) => address !== payload.address,
        )
      } else {
        // else update grouped claim
        newAvailableClaims = state.availableClaims.filter(
          ({ address }) => address !== payload.address,
        )
        newAvailableClaims = [...newAvailableClaims, targetClaim]
      }

      return {
        ...state,
        availableClaims: newAvailableClaims,
        unlockedClaims: newUnlockedClaims,
      }
    }
    case claimTypes.GET_AQUA_CLAIMS:
      return { ...state, aquaClaims: payload }
    default:
      return state
  }
}

export default claimReducer

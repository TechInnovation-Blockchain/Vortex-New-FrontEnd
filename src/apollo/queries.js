import { gql } from '@apollo/client'

export const ALL_USER_PORTALS = gql`
  query allPortals($skip: Int!, $first: Int!) {
    portals(skip: $skip, first: $first, orderBy: endBlock, orderDirection: desc) {
      portalAddress
      portalCreater
      stakingToken
      rewardsToken
      endBlock
      createdAt
      index
    }
  }
`

export const TOTAL_COUNT = gql`
  query counts {
    portalCounts(first: 5) {
      count
      validCount
    }
  }
`

export const STAKE_DATA = gql`
  query stakeData($staker: Bytes!) {
    stakeds (orderBy: createdAt, orderDirection: desc, where: {
      staker: $staker
    }) {
      staker
      recipient
      amount
      createdAt
      portal
    }
  }
`

export const UNSTAKE_DATA = gql`
  query unstakeData($unstaker: Bytes!) {
    unStakeds (orderBy: createdAt, orderDirection: desc, where: {
      unstaker: $unstaker
    }) {
      portal
      unstaker
      createdAt
    }
  }
`

export const CLAIM_DATA = gql`
  query claimData($recipient: Bytes!) {
    harvesteds (orderBy: createdAt, orderDirection: desc, where: {
      recipient: $recipient
    }) {
      recipient
      createdAt
      portal
    }
  }
`

export const DEPOSIT_DATA = gql`
  query depositData($recipient: Bytes!) {
    depositeds (orderBy: createdAt, orderDirection: desc, where: {
      recipient: $recipient
    }) {
      amount
      recipient
      endBlock
      createdAt
      portal
    }
  }
`

export const FILTERED_PORTALS = gql`
  query filteredPortals($filter: [Bytes!]!) {
    portals(where: {
      portalAddress_in: $filter
    }, orderBy: endBlock, orderDirection: desc) {
      portalAddress
      portalCreater
      stakingToken
      rewardsToken
      endBlock
      createdAt
      index
    }
  }
`

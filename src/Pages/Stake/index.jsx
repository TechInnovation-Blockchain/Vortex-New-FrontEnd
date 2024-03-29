import { useLocation } from 'react-router-dom'
import { Button } from '@material-ui/core'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { formatUnits } from '@ethersproject/units'
import Typography from '@material-ui/core/Typography'
import { useWeb3React } from '@web3-react/core'
// import { BigNumber } from "ethers";
import BigNumber from 'bignumber.js'
import { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { vortexData } from 'apollo/client'
import { ALL_USER_PORTALS, TOTAL_COUNT } from 'apollo/queries'
import Logo from 'assets/images/center-logo.png'
import AquaIcon from 'assets/images/icons/aqua.webp'
import UmaIcon from 'assets/images/icons/UMA.webp'
import {
  DepositConfirm, ElevatedBtn, GlassCard, InputText,
} from 'components'
import inputStyles from 'components/styles'
import Modal from 'components/modal'
import { StyledTab, StyledTabs, ThemeTabs } from 'components/theme-tabs'
import {
  approve,
  getBalance,
  getDecimal,
  getName,
} from 'contracts/functions/erc20Functions'
import {
  getRewardTokens,
  stake,
  claim,
  claimdata,
  getRewardRate,
  getTotalReward,
} from 'contracts/functions/portalFunctions'
import { store } from 'redux/store'
import { TransactionStatus } from 'constants'
import { dataLoading } from 'redux/actions/loadingActions'
import ThemeResponse from 'components/modal/theme-response'
import StakeDashboard from './stake-dashboard'
import YieldHistory from './yield-history'
import StakeWelcome from './stake-welcome'
import ModalContent from './modal-content'

const STAKING_MODAL_TITLES = {
  [TransactionStatus.TRANSACTION_PENDING]: 'STAKE PENDING',
  [TransactionStatus.TRANSACTION_SUCCESS]: 'STAKE SUCCESS',
  [TransactionStatus.TRANSACTION_FAILED]: 'STAKE FAILED',
  [TransactionStatus.TRANSACTION_REJECTED]: 'STAKE REJECTED',
}

const CLAIM_MODAL_TITLE = {
  [TransactionStatus.TRANSACTION_PENDING]: 'PORTAL CLAIM PENDING',
  [TransactionStatus.TRANSACTION_SUCCESS]: 'PORTAL CLAIM SUCCESS',
  [TransactionStatus.TRANSACTION_FAILED]: 'PORTAL CLAIM FAILED',
  [TransactionStatus.TRANSACTION_REJECTED]: 'PORTAL CLAIM REJECTED',
}

const Stake = ({ size }) => {
  const location = useLocation()
  const staking = useSelector((state) => state.staking_loading)
  const claiming = useSelector((state) => state.claiming_loading)

  const [getDataLoading, setGetDataLoading] = useState(true)
  const selectClasses = inputStyles()
  let tabNo = 0
  let activeTab = 'panel1'
  const { account } = useWeb3React()
  const [accountBalance, setAccountBalance] = useState(0)
  const [activeWelcome, setActiveWelcome] = useState(true)

  const [showPortalModalStake, setShowPortalModalStake] = useState(false)
  const [showPortalModalClaim, setShowPortalModalClaim] = useState(false)

  const [expanded, setExpanded] = useState(activeTab)
  const [searchSmallFont, setSearchSmallFont] = useState('')

  const accordionHandle = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  const [value, setValue] = useState(tabNo)
  const [modal, setModal] = useState({ show: false, onClose }) // eslint-disable-line @typescript-eslint/no-use-before-define
  const [selectedPortalStake, setSelectedPortalStake] = useState()
  const [selectTokenOptionsStake, setSelectTokenOptionsStake] = useState()
  const [quantityStake, setQuantityStake] = useState()

  const [portals, setPortals] = useState()
  const [filteredPortals, setFilteredPortals] = useState()
  const [selectedPortalOptionStake, setSelectedPortalOptionStake] = useState('')
  const [selectedPortalOptionClaim, setSelectedPortalOptionClaim] = useState('')
  const [tokenContractAddressStake, setTokenContractAddressStake] = useState() // eslint-disable-line @typescript-eslint/no-unused-vars

  const [selectTokenOptionsClaim, setSelectTokenOptionsClaim] = useState() // eslint-disable-line @typescript-eslint/no-unused-vars
  const [tokenContractAddressClaim, setTokenContractAddressClaim] = useState() // eslint-disable-line @typescript-eslint/no-unused-vars
  const [selectedPortalClaim, setSelectedPortalClaim] = useState()
  const [claimData, setClaimData] = useState()
  const [searchValue, setSearchValue] = useState('')
  const [notifyMessage, setNotifyMessage] = useState(false)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 1,
  })

  useEffect(() => {
    async function stakeEffect() {
      if (!portals || !selectTokenOptionsStake) return
      const contractAddress = portals.filter(
        (item) => item.address === selectedPortalStake,
      )[0].token
      const balance = await getBalance(contractAddress, account)
      setAccountBalance(balance)
    }
    stakeEffect()
  }, [selectedPortalStake, portals, account])

  useEffect(() => {
    async function claimEffect() {
      if (!portals || !selectedPortalClaim) return
      const contractAddress = portals.filter(
        (item) => item.address === selectedPortalClaim,
      )[0].token
      const balance = await getBalance(contractAddress, account)
      setAccountBalance(balance)
    }
    claimEffect()
  }, [selectedPortalClaim, portals, account])

  const [_, setTotalCount] = useState('X') // eslint-disable-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars

  const paginationArr = (arr) => arr?.reduce((resultArray, item, index) => {
    const result = resultArray
    const chunkIndex = Math.floor(index / 10)

    if (!result[chunkIndex]) {
      result[chunkIndex] = [] // start a new chunk
    }

    result[chunkIndex].push(item)

    return result
  }, [])

  useEffect(() => {
    const query = async () => {
      const t = await vortexData.query({
        query: TOTAL_COUNT,
      })
      const total = Math.ceil(t.data.portalCounts[0].validCount / 10)
      setPagination({
        ...pagination,
        pageSize: total,
      })
      setTotalCount(t.data.portalCounts[0].count)
    }
    query()
  }, [])

  useEffect(() => {
    if (!account) return
    const fetchInfo = async () => {
      setPortals(null)
      setFilteredPortals(paginationArr(null))

      const t = await vortexData.query({
        query: ALL_USER_PORTALS,
        variables: {
          skip: (pagination.currentPage - 1) * 10,
          first: 10,
        },
      })
      const data = t.data.portals

      let temp = []
      temp = await Promise.all(
        data.map(async (item) => {
          const ret = {
            address: item.portalAddress,
          }

          ret.rewardTokens = item.rewardsToken
          ret.token = item.stakingToken
          ret.endBlock = item.endBlock

          // ret.apy = 10;
          const rewardRate = await getRewardRate(item.portalAddress)
          const actualTotalReward = await getTotalReward(item.portalAddress)
          const reducer = (previousValue, currentValue) => (previousValue > currentValue ? previousValue : currentValue)

          ret.apr = rewardRate.map((amount, key) => (BigNumber(amount).comparedTo(0) === 0
            || BigNumber(actualTotalReward[key]).comparedTo(0) === 0
            ? 0
            : BigNumber(amount)
              .dividedBy(actualTotalReward[key])
              .multipliedBy(BigNumber(240 * 23.56 * 30.42 * 12))
              .toString()))

          const BLOCKS_IN_A_YEAR = 2103840
          const aprToApy = (apr, frequency = BLOCKS_IN_A_YEAR) => ((1 + apr / 100 / frequency) ** frequency - 1) * 100
          ret.apy = ret.apr.map((amount) => (parseFloat(amount) === 0 ? 0 : aprToApy(parseFloat(amount))))
          ret.apy = Number(parseFloat(ret.apy.reduce(reducer)).toFixed(4))

          ret.stakingTokenName = await getName(ret.token)
          ret.stakingTokenName = ret.stakingTokenName === 'Uniswap V2'
            ? 'XIO-LP'
            : ret.stakingTokenName

          ret.rewardTokenNames = await Promise.all(
            ret.rewardTokens?.map(async (itm) => getName(itm)),
          )

          if (ret.rewardTokenNames.length === 1) {
            ret.label = `Portal ${item.index} ${ret.rewardTokenNames[0]}`
          } else if (ret.rewardTokenNames.length === 2) {
            ret.label = `Portal ${item.index} ${ret.rewardTokenNames[0]}. ${ret.rewardTokenNames[1]}`
          } else if (ret.rewardTokenNames.length > 2) {
            ret.label = `Portal ${item.index} ${ret.rewardTokenNames[0]}. ${ret.rewardTokenNames[1]} ...`
          } else ret.label = 'Not Defined'

          ret.icon = AquaIcon
          ret.value = '15%'
          ret.options = ret.rewardTokenNames.map((itm, index) => ({
            label: itm,
            value: ret.rewardTokens[index],
            icon: UmaIcon,
          }))
          return ret
        }),
      )

      setPortals(temp)
      setFilteredPortals(paginationArr(temp))
    }
    fetchInfo()
  }, [account, pagination.currentPage])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    // if (localStorage.getItem("welcomePopup")) {
    //   setActiveWelcome(false);
    // }
    setActiveWelcome(false)
  }, [])
  if (+location.pathname.split('/')[1] === 2) {
    tabNo = 0
  } else if (+location.pathname.split('/')[1] === 3) {
    tabNo = 2
  } else if (+location.pathname.split('/')[1] === 6) {
    tabNo = 2
    activeTab = 'panel2'
  }

  function onClose() {
    setModal({ ...modal, show: false })
  }

  function confirmStake() {
    store.dispatch(dataLoading('loading done!'))
    setModal({
      ...modal,
      show: true,
      Content: () => (
        <DepositConfirm
          title="Stake"
          getDescription={() => (
            <div>
              <p>
                Your stake of
                {' '}
                <b>
                  {`${quantityStake} ${selectTokenOptionsStake}`}
                </b>
                {' '}
                will start after successful confirmation.
              </p>
              <p>
                You may need to approve a one-off transaction to allow your
                {' '}
                <b>{selectTokenOptionsStake}</b>
                {' '}
                to be used.
              </p>
            </div>
          )}
          cancelled={modal.onClose}
          confirmed={async () => {
            store.dispatch(dataLoading('data loading!'))
            const contractAddress = portals.filter(
              (item) => item.address === selectedPortalStake,
            )[0].token
            const decimal = await getDecimal(contractAddress)
            await approve(
              contractAddress,
              selectedPortalStake,
              account,
              quantityStake,
              decimal,
              async () => {
                await stake(
                  selectedPortalStake,
                  quantityStake,
                  decimal,
                  account,
                )
                store.dispatch(dataLoading('loading done!'))
                modal.onClose()
              },
            )
          }}
        />
      ),
    })
  }

  useEffect(() => {
    if (!selectedPortalOptionClaim || !portals) return
    const portal = portals.filter(
      (item) => item.label === selectedPortalOptionClaim,
    )[0].address
    const fetchClaimData = async () => {
      setGetDataLoading(true)
      const dataClaim = await claimdata(portal, account)

      if (dataClaim[1].length === 0) {
        setClaimData(dataClaim[1])
        setGetDataLoading(false)
        store.dispatch(dataLoading('data loading!'))
        setNotifyMessage(true)
        return
      }
      const rewardTokens = await getRewardTokens(portal)
      const decimals = await Promise.all(
        rewardTokens.map(async (val) => {
          const ret = await getDecimal(val)
          return ret
        }),
      )
      const amount = decimals.map((val, key) => parseFloat(formatUnits(dataClaim[1][key], val).toString()).toFixed(4))

      const reducer = (previousValue, currentValue) => parseFloat(previousValue) + parseFloat(currentValue)
      const sum = amount.reduce(reducer)
      setClaimData(amount)
      if (sum >= 1) {
        setGetDataLoading(false)
        store.dispatch(dataLoading('loading done!'))
        setNotifyMessage(false)
        return
      }
      setGetDataLoading(false)
      setNotifyMessage(true)
      store.dispatch(dataLoading('data loading!'))
    }
    fetchClaimData()
  }, [selectedPortalOptionClaim, portals, account])

  const updateContentClaim = useCallback(() => (
    <DepositConfirm
      title="CLAIM"
      // eslint-disable-next-line no-nested-ternary
      getDescription={() => (getDataLoading ? (
        <div style={{ textAlign: 'center' }}>
          <p>Claim Data is loading, please wait ...</p>
        </div>
      ) : notifyMessage ? (
        <div style={{ textAlign: 'left' }}>
          <p>
            You are claiming your rewards from
            {' '}
            <b>{selectedPortalOptionClaim}</b>
            {' '}
            as follows:
          </p>
          <div>
            <p>
              <FontAwesomeIcon icon={faCheck} />
              {' '}
              Reward Tokens :
              {portals
                .filter(
                  (item) => item.label === selectedPortalOptionClaim,
                )[0]
                .rewardTokenNames.map((name) => ` ${name}`)
                .toString()}
            </p>
            <p>
              <FontAwesomeIcon icon={faCheck} />
              {' '}
              Amount :
              {claimData.length === 0
                ? portals
                  .filter(
                    (item) => item.label === selectedPortalOptionClaim,
                  )[0]
                  .rewardTokenNames.map(() => ` ${0}`)
                  .toString()
                : claimData.map((item) => ` ${item}`).toString()}
            </p>
          </div>
          <p>Please try again when the reward amounts are 1 or greater.</p>
        </div>
      ) : (
        <div style={{ textAlign: 'left' }}>
          <p>
            You are claiming your rewards from
            {' '}
            <b>{selectedPortalOptionClaim}</b>
            {' '}
            as follows:
          </p>
          <div>
            <p>
              <FontAwesomeIcon icon={faCheck} />
              {' '}
              Reward Tokens :
              {portals
                .filter(
                  (item) => item.label === selectedPortalOptionClaim,
                )[0]
                .rewardTokenNames.map((name) => ` ${name}`)
                .toString()}
            </p>
            <p>
              <FontAwesomeIcon icon={faCheck} />
              {' '}
              Amount :
              {claimData.length === 0
                ? portals
                  .filter(
                    (item) => item.label === selectedPortalOptionClaim,
                  )[0]
                  .rewardTokenNames.map(() => ` ${0}`)
                  .toString()
                : claimData.map((item) => ` ${item}`).toString()}
            </p>
          </div>
        </div>
      ))}
      cancelled={modal.onClose}
      confirmed={async () => {
        const portal = portals.filter(
          (item) => item.label === selectedPortalOptionClaim,
        )[0].address

        await claim(portal, account)
        modal.onClose()
      }}
    />
  ), [getDataLoading, notifyMessage])

  const confirmClaim = async () => {
    setModal({
      ...modal,
      show: true,
      Content: updateContentClaim,
    })
  }

  useEffect(() => {
    if (updateContentClaim) {
      setModal({
        ...modal,
        Content: updateContentClaim,
      })
    }
  }, [updateContentClaim])

  const handleInputChange = (text) => {
    if (text.length > 30) {
      setSearchSmallFont('9px')
    } else if (text.length > 15) {
      setSearchSmallFont('12px')
    } else {
      setSearchSmallFont('')
    }
    setSearchValue(text)
  }

  const handleSearch = () => {
    const filteredData = portals?.filter((item) => (
      item.label.toLowerCase().includes(searchValue.toLowerCase())
      || item.address.toLowerCase().includes(searchValue.toLowerCase())
    ))

    setPagination({
      currentPage: 1,
      pageSize: Math.ceil(paginationArr(filteredData).length / 10),
    })
    setFilteredPortals(paginationArr(filteredData))
  }

  return (
    <>
      <GlassCard width="450px" height="auto">
        <Accordion
          elevation={0}
          sx={{
            '&:before': {
              display: 'none',
            },
          }}
          className="bg-transparent border-0"
          expanded={expanded === 'panel1'}
          onChange={accordionHandle('panel1')}
        >
          <AccordionSummary
            aria-controls="panel1b-content"
            id="panel1b-header"
            className="d-none"
          />
          <AccordionDetails className="p-0">
            <div className="flex-basis-full">
              <StyledTabs value={value} onChange={handleChange}>
                <StyledTab label="Stake" />
                <h1 className="p-0 m-0 d-flex align-self-center mt-4">
                  <img src={Logo} width={40} alt="" />
                </h1>
                <StyledTab label="Claim" />
              </StyledTabs>
              <ThemeTabs value={value} index={0}>
                {activeWelcome ? (
                  <StakeWelcome
                    onHide={() => {
                      localStorage.setItem('welcomePopup', true)
                      setActiveWelcome(false)
                    }}
                  />
                ) : (
                  <>
                    <div className="row mx-0 mb-4">
                      <div className="col-12 px-0 px-md-2 mb-5">
                        <div
                          className={
                            `select-box py-4 ${selectClasses.selectRoot}`
                          }
                        >
                          <div className="row p-0 m-0">
                            <div
                              className={
                                `${size === 'small' ? 'col-5' : 'col-3'
                                } d-flex align-self-center px-0`
                              }
                            >
                              <span className="side-label p-0 m-0">Portal</span>
                            </div>
                            <div
                              className={
                                `${size === 'small' ? 'col-7' : 'col-9'
                                } px-0`
                              }
                            >
                              <button
                                type="button"
                                style={{
                                  background: '#65C988',
                                  color: '#FFFFFF',
                                  padding: '10px 13px',
                                  marginBottom: '5px',
                                  fontWeight: 'bold',
                                  borderRadius: '15px',
                                  border: 'none',
                                  marginTop: '5px',
                                  width: '100%',
                                }}
                                onClick={() => {
                                  setShowPortalModalStake(true)
                                  setSearchSmallFont('')
                                }}
                              >
                                {selectedPortalOptionStake === ''
                                  ? 'SELECT'
                                  : selectedPortalOptionStake}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 px-0 px-md-2 mb-5 pr-md-2">
                        <div
                          className="select-box py-4 h-100"
                          style={{
                            padding: '5px',
                          }}
                        >
                          <h3
                            style={{
                              margin: '1px 10px',
                              marginBottom: '10px',
                              color: '#c5c5c5',
                            }}
                          >
                            Staking Token
                          </h3>
                          <h2
                            style={{ margin: '1px 10px', fontSize: '1.7rem' }}
                          >
                            {selectTokenOptionsStake || 'Select portal'}
                          </h2>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 px-0 px-md-2 mb-5 pl-md-2">
                        <InputText
                          type="number"
                          className="h-100"
                          onChange={setQuantityStake}
                          value={quantityStake}
                          sideLabel=""
                          Sublabel={() => (
                            <span className="d-flex align-items-center gap-1">
                              <span
                                role="button"
                                tabIndex={0}
                                onKeyPress={() => { }}
                                className="text-light text-right pointer quantity-limit"
                                onClick={() => {
                                  setQuantityStake(
                                    (accountBalance / 4).toFixed(4),
                                  )
                                }}
                              >
                                25%
                                {' '}
                              </span>
                              <span
                                role="button"
                                tabIndex={-1}
                                onKeyPress={() => { }}
                                className="text-light ml-2 text-right pointer quantity-limit"
                                onClick={() => {
                                  setQuantityStake(
                                    (accountBalance / 2).toFixed(4),
                                  )
                                }}
                              >
                                50%
                                {' '}
                              </span>
                              <span
                                role="button"
                                tabIndex={-2}
                                onKeyPress={() => { }}
                                className="primaryText quantity-primary ml-2 text-right pointer quantity-limit"
                                onClick={() => {
                                  setQuantityStake(
                                    parseFloat(accountBalance).toFixed(4),
                                  )
                                }}
                              >
                                MAX
                                {' '}
                              </span>
                            </span>
                          )}
                          placeholder="0"
                          style={{
                            fontSize: '10px !important',
                          }}
                        />
                      </div>
                      <div className="col-12 px-0 px-md-2 mb-4 pl-md-2">
                        <Button
                          variant="contained"
                          color="primary"
                          disableElevation
                          fullWidth
                          className="main-btn primaryBtn"
                          disabled={
                            !(selectTokenOptionsStake && quantityStake > 0)
                          }
                          onClick={() => confirmStake()}
                        >
                          <strong>STAKE</strong>
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </ThemeTabs>
              <ThemeTabs value={value} index={2}>
                <div className="row mx-0 mb-2 flex-basis-full">
                  <div className="col-12 px-0 mb-5 px-md-2">
                    <div
                      className={`select-box  py-4 ${selectClasses.selectRoot}`}
                    >
                      <div className="row p-0 m-0">
                        <div
                          className={
                            `${size === 'small' ? 'col-5' : 'col-3'
                            } d-flex align-self-center px-0`
                          }
                        >
                          <span className="side-label p-0 m-0">Portal</span>
                        </div>
                        <div
                          className={
                            `${size === 'small' ? 'col-7' : 'col-9'
                            } px-0`
                          }
                        >
                          <button
                            type="button"
                            style={{
                              background: '#65C988',
                              color: '#FFFFFF',
                              padding: '10px 13px',
                              marginBottom: '5px',
                              fontWeight: 'bold',
                              borderRadius: '15px',
                              border: 'none',
                              marginTop: '5px',
                              width: '100%',
                            }}
                            onClick={() => setShowPortalModalClaim(true)}
                          >
                            {selectedPortalOptionClaim === ''
                              ? 'SELECT'
                              : selectedPortalOptionClaim}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 px-0 mb-5">
                    {!activeWelcome && !selectedPortalClaim && (
                      <p className="text text-center p-0 m-0">
                        Select a portal to claim rewards
                      </p>
                    )}
                  </div>
                  <div
                    className="col-12 px-0 px-md-2"
                    style={{ marginBottom: '1.5rem' }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      disableElevation
                      fullWidth
                      disabled={!selectedPortalClaim}
                      className="main-btn primaryBtn"
                      // style={{marginBottom: '1.5rem'}}
                      onClick={() => {
                        if (activeWelcome) {
                          setActiveWelcome(false)
                        } else {
                          confirmClaim()
                        }
                      }}
                    >
                      {activeWelcome ? 'START' : 'CLAIM'}
                    </Button>
                  </div>
                </div>
              </ThemeTabs>
              <Typography />
            </div>
          </AccordionDetails>
        </Accordion>
        {!activeWelcome && (
          <>
            <Accordion
              expanded={expanded === 'panel2'}
              className={
                value === 2
                  ? 'bg-transparent mb-0'
                  : 'd-none bg-transparent mb-0'
              }
            >
              <AccordionSummary>
                <ElevatedBtn
                  title="Claim Dashboard "
                  expanded={expanded === 'panel2'}
                  onClick={() => (expanded === 'panel2'
                    ? setExpanded('panel1')
                    : setExpanded('panel2'))}
                />
              </AccordionSummary>
              <AccordionDetails className="p-0">
                <YieldHistory />
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === 'panel2'}
              className={
                value === 0 ? 'bg-transparent' : 'bg-transparent d-none'
              }
            >
              <AccordionSummary>
                <ElevatedBtn
                  title="Stake Dashboard"
                  expanded={expanded === 'panel2'}
                  onClick={() => (expanded === 'panel2'
                    ? setExpanded('panel1')
                    : setExpanded('panel2'))}
                // style={{ bottom: 0 }}
                />
              </AccordionSummary>
              <AccordionDetails className="p-0">
                <StakeDashboard />
              </AccordionDetails>
            </Accordion>
          </>
        )}
        <Modal show={modal.show} onClose={modal.onClose}>
          {modal.Content && modal.Content()}
        </Modal>
      </GlassCard>

      <Modal
        show={showPortalModalStake || showPortalModalClaim}
        onClose={() => {
          setShowPortalModalStake(false)
          setSearchValue('')
          setFilteredPortals(paginationArr(portals))
        }}
      >
        <ModalContent
          selectItemsData={filteredPortals}
          select={showPortalModalStake ? setSelectedPortalOptionStake : setSelectedPortalOptionClaim}
          setModal={setSelectedPortalOptionClaim ? setShowPortalModalStake : setShowPortalModalClaim}
          setSelectTokenOptions={setSelectedPortalOptionClaim ? setSelectTokenOptionsStake : setSelectTokenOptionsClaim}
          setTokenContractAddress={setSelectedPortalOptionClaim ? setTokenContractAddressStake : setTokenContractAddressClaim}
          setSelectedPortal={setSelectedPortalOptionClaim ? setSelectedPortalStake : setSelectedPortalClaim}
          setInputValue={handleInputChange}
          handleSearch={handleSearch}
          pagination={pagination}
          searchSmallFont={searchSmallFont}
          setPagination={setPagination}
        />
      </Modal>

      {staking.data && (
        <ThemeResponse title={STAKING_MODAL_TITLES[staking.data]} type={staking.data} />
      )}
      {claiming.data && (
        <ThemeResponse title={CLAIM_MODAL_TITLE[claiming.data]} type={staking.data} />
      )}
    </>
  )
}

export default Stake

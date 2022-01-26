// import { faShareSquare } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from 'react-redux'
import { Button, CircularProgress } from '@material-ui/core'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { useWeb3React } from '@web3-react/core'
import { formatUnits } from '@ethersproject/units'
import { useState, useEffect } from 'react'
import UmaIcon from '../../assets/images/icons/UMA.webp'
import { DepositConfirm } from '../../Components'
import ThemeModal from '../../Components/theme-modal'
import { vortexData } from '../../apollo/client'
import { STAKE_DATA, UNSTAKE_DATA, FILTERED_PORTALS } from '../../apollo/queries'
import { isAddress, shortenAddress } from '../../utils/utils'
import {
  unStake,
} from '../../contracts/functions/portalFunctions'

import { getDecimal, getName } from '../../contracts/functions/erc20Functions'

import { store } from '../../redux/store'
import { dataLoading } from '../../redux/actions/loadingActions'

import UnstakingResponseSuccess from '../UnstakingResponse/UnstakingResponseSuccess'
import UnstakingResponseFailed from '../UnstakingResponse/UnstakingResponseFailed'
import UnstakingResponsePending from '../UnstakingResponse/UnstakingResponsePending'
import UnstakingResponseReject from '../UnstakingResponse/UnstakingResponseReject'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: '0',
    '& .MuiAccordionSummary-content': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0px 0px',
      marginBottom: '0px',
      marginTop: '5px',
    },
    '& .Mui-expanded': {
      minHeight: '32px',
    },
    '& .MuiAccordionSummary-root': {
      minHeight: '32px',
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(24),
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: theme.typography.pxToRem(18),
  },
  linkScan: {
    fontSize: theme.typography.pxToRem(18),
    marginBottom: theme.typography.pxToRem(5),
  },
}))

const StakeDashboard = () => {
  const classes = useStyles()
  const [modal, setModal] = useState({ show: false, onClose }) // eslint-disable-line @typescript-eslint/no-use-before-define
  const [accordionData, setAccordionData] = useState()
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 1,
  })

  const unstaking = useSelector((state) => state.unstaking)

  const { account } = useWeb3React()

  function onClose() {
    setModal({ ...modal, show: false })
  }

  const formatDate = (date) => {
    const myDate = new Date(parseInt(date, 10) * 1000)
    return (
      `${myDate.getDate()
      }.${
        myDate.getMonth() + 1
      }.${
        myDate.getFullYear()}`
    )
  }

  const fetchInfo = async () => {
    let res = await vortexData.query({
      query: STAKE_DATA,
      variables: {
        staker: account,
      },
    })

    const stakeData = res.data.stakeds

    const portalAddress = stakeData.map((item) => item.portal)

    res = await vortexData.query({
      query: FILTERED_PORTALS,
      variables: {
        filter: portalAddress,
      },
    })

    const pportalData = res.data.portals

    res = await vortexData.query({
      query: UNSTAKE_DATA,
      variables: {
        unstaker: account,
      },
    })
    const unstakeData = res.data.unStakeds

    const link = 'https://rinkeby.etherscan.io/token/'

    const newPortal = await Promise.all(pportalData.map(async (item) => ({
      ...item,
      decimal: await getDecimal(item.stakingToken),
      rewardsTokenNames: await Promise.all(item.rewardsToken.map(async (addr) => getName(addr))),
      stakingTokenName: await getName(item.stakingToken),
    })))
    const updatedAccordionData = stakeData.map((item) => ({
      address: newPortal.filter((subitem) => isAddress(item.portal) === isAddress(subitem.portalAddress))[0].stakingToken,
      token: newPortal.filter((subitem) => isAddress(item.portal) === isAddress(subitem.portalAddress))[0].stakingTokenName,
      tokenIcon: UmaIcon,
      tokenLink: link + newPortal.filter((subitem) => isAddress(item.portal) === isAddress(subitem.portalAddress))[0].stakingToken,
      date: formatDate(item.createdAt),
      amount: formatUnits(item.amount, newPortal.filter((subitem) => isAddress(item.portal) === isAddress(subitem.portalAddress))[0].decimal).toString(),
      label:
            newPortal.filter((subitem) => isAddress(item.portal) === isAddress(subitem.portalAddress))[0].rewardsTokenNames.length === 1
              ? `Portal ${newPortal.filter((subitem) => isAddress(item.portal) === isAddress(subitem.portalAddress))[0].index} ${newPortal.filter((subitem) => isAddress(item.portal) === isAddress(subitem.portalAddress))[0].rewardsTokenNames[0]}` : `Portal ${newPortal.filter((subitem) => isAddress(item.portal) === isAddress(subitem.portalAddress))[0].index} ${newPortal.filter((subitem) => isAddress(item.portal) === isAddress(subitem.portalAddress))[0].rewardsTokenNames[0]}. ${newPortal.filter((subitem) => isAddress(item.portal) === isAddress(subitem.portalAddress))[0].rewardsTokenNames[1]}`,
      portal: item.portal,
      disable: unstakeData.filter((t) => t.portal === item.portal).length === 0,
      unstaked_time: unstakeData.filter((t) => t.portal === item.portal).length !== 0 ? formatDate(unstakeData.filter((t) => t.portal === item.portal)[0].createdAt) : 0,
    }))
    setAccordionData(updatedAccordionData)
    setPagination({ ...pagination, pageSize: updatedAccordionData.length === 0 ? 1 : Math.ceil(updatedAccordionData.length / 3) })
  }

  useEffect(() => {
    if (!account) return
    fetchInfo()
  }, [account])
  const [active, setActive] = useState()
  const unstake = () => {
    store.dispatch(dataLoading('loading done!'))
    setModal({
      ...modal,
      show: true,
      Content: () => (
        <DepositConfirm
          title="Unstake"
          getDescription={() => (
            <div>
              <p>
                You are unstaking
                {' '}
                <b>{accordionData[active].token}</b>
                {' '}
                from
                {' '}
                <b>{accordionData[active].label}</b>
                .
                You will no longer earn rewards from that portal. Please claim any available rewards earned to date.
              </p>
            </div>
          )}
          cancelled={modal.onClose}
          confirmed={async () => {
            await unStake(
              accordionData[active].portal,
              account,
              () => {
                modal.onClose()
              },
            )
            modal.onClose()
          }}
        />
      ),
    })
  }
  const handleClick = (id) => {
    if (active !== id) setActive(id)
  }
  return (
    <>
      <div
        style={{
          background: '#373737',
          width: '100%',
          padding: '30px',
          // marginBottom: '-15px',
          marginBottom: '-30px',
          marginTop: '-22px',
        }}
      >
        <div className={classes.root}>
          {/* eslint-disable-next-line no-nested-ternary */}
          {accordionData ? (
            accordionData.length === 0 ? (
              <Typography
                className={classes.heading}
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: '#bdbdbd',
                  textAlign: 'center',
                }}
              >
                {' '}
                No Data
              </Typography>
            ) : accordionData.map((content, index) => (
              pagination.currentPage === 0
                ? (
                  <Accordion
                    expanded
                    key={index} // eslint-disable-line react/no-array-index-key
                    id={index}
                    className={
                  index === active
                    ? 'yield-accordion-outer yield-selected'
                    : 'yield-accordion-outer'
                }
                    onClick={(e) => {
                      e.stopPropagation()
                      handleClick(index)
                    }}
                  >
                    <AccordionSummary
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                      className={classes.accordionHeader}
                    >
                      <Typography className={classes.heading}>
                        <img
                          src={content.tokenIcon}
                          alt=""
                          width={25}
                          className="mr-2"
                        />
                        {' '}
                        {content.token}
                      </Typography>
                      <Typography className={classes.heading}>
                        {content.amount}
                      </Typography>

                      <div className="d-flex justify-content-center align-items-center gap-1">
                        <Typography className={classes.subheading}>
                          {content.date}
                        </Typography>
                        {/* <img src={ShareImage} alt='' width={12} /> */}
                      </div>
                    </AccordionSummary>
                    <AccordionSummary
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                      className={classes.accordionHeader}
                    >
                      <Typography className={classes.heading}>
                        {content.label}
                      </Typography>
                    </AccordionSummary>
                  </Accordion>
                )
                : (index >= ((pagination.currentPage - 1) * 3) && index < (pagination.currentPage * 3))
              && (
              <Accordion
                id={index}
                expanded
                key={index} // eslint-disable-line react/no-array-index-key
                className={
                  index === active
                    ? 'yield-accordion-outer yield-selected'
                    : 'yield-accordion-outer'
                }
                onClick={(e) => {
                  e.stopPropagation()
                  handleClick(index)
                }}
              >
                <AccordionSummary
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  className={classes.accordionHeader}
                >
                  <Typography className={classes.heading}>
                    {content.label}
                  </Typography>
                </AccordionSummary>
                <AccordionSummary
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  className={classes.accordionHeader}
                >
                  <Typography className={classes.heading} style={{ width: '100%' }}>
                    <div
                      className="d-flex justify-content-between"
                      style={{ fontSize: '12px' }}
                    >
                      <div>
                        <img
                          src={content.tokenIcon}
                          alt=""
                          width={25}
                          className="mr-2"
                        />
                        {' '}
                        {content.token}
                      </div>
                      <div className="align-items-end gap-1">
                        <span className="d-flex align-items-baseline">
                          <a
                            href={content.tokenLink}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              color: 'white',
                            }}
                          >
                            {shortenAddress(content.address)}
                          </a>
                        </span>
                      </div>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionSummary
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  className={classes.accordionHeader}
                >
                  <Typography className={classes.heading} style={{ width: '100%' }}>
                    <div
                      className="d-flex justify-content-between"
                      style={{ fontSize: '12px' }}
                    >
                      <div>
                        Amount
                      </div>
                      <div className="align-items-end gap-1">
                        {content.amount}
                      </div>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionSummary
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  className={classes.accordionHeader}
                >
                  <Typography className={classes.heading} style={{ width: '100%' }}>
                    <div
                      className="d-flex justify-content-between"
                      style={{ fontSize: '12px' }}
                    >
                      <div>
                        Date
                      </div>
                      <div className="align-items-end gap-1">
                        {content.date}
                      </div>
                    </div>
                  </Typography>
                </AccordionSummary>
                {content.unstaked_time !== 0 && (
                <AccordionSummary
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  className={classes.accordionHeader}
                >
                  <Typography className={classes.heading} style={{ width: '100%' }}>
                    <div
                      className="d-flex justify-content-between"
                      style={{ fontSize: '12px' }}
                    >
                      <div>
                        Unstaked Date
                      </div>
                      <div className="align-items-end gap-1">
                        {content.unstaked_time}
                      </div>
                    </div>
                  </Typography>
                </AccordionSummary>
                )}

              </Accordion>
              )
            ))
          ) : (
            <CircularProgress
              style={{ color: 'gray', display: 'flex', margin: 'auto' }}
            />
          )}
          <Button
            variant="contained"
            disabled={active ? !accordionData[active].disable : true}
            color="primary"
            disableElevation
            fullWidth
            className="main-btn primaryBtn mt-4"
            onClick={unstake}
          >
            <strong>UNSTAKE</strong>
          </Button>
        </div>
        <span
          className="mt-3"
          style={{
            textAlign: 'center', display: 'flex', flexFlow: 'column', color: '#979797', fontSize: '11px',
          }}
        >
          Refresh your browser to see new transactions
        </span>

        <div className="yield-pagination text-center mt-2 d-flex align-items-center justify-content-center">
          {/* <span className='page-number'>1 of 6</span> */}
          <span className="page-number">
            {pagination.currentPage}
            {' '}
            of
            {' '}
            {pagination.pageSize}
          </span>
          <span className="pagination-control ml-4 d-flex align-self-center">
            <NavigateBeforeIcon
              className={
                pagination.currentPage === 1
                  ? 'nav-control'
                  : 'nav-control'
              }
              onClick={() => {
                if (pagination.currentPage > 1) {
                  setPagination({
                    ...pagination,
                    currentPage: pagination.currentPage - 1,
                  })
                }
              }}
            />
            <NavigateNextIcon
              className={
                pagination.currentPage === 10
                  ? 'nav-control ml-3'
                  : 'nav-control ml-3'
              }
              onClick={() => {
                if (pagination.currentPage < pagination.pageSize) {
                  setPagination({
                    ...pagination,
                    currentPage: pagination.currentPage + 1,
                  })
                }
              }}
            />
          </span>
        </div>
      </div>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <ThemeModal {...modal} />

      {unstaking.data === 'transaction pending!' && <UnstakingResponsePending />}
      {unstaking.data === 'transaction success!' && <UnstakingResponseSuccess />}
      {unstaking.data === 'transaction failed!' && <UnstakingResponseFailed />}
      {unstaking.data === 'transaction rejected!' && <UnstakingResponseReject />}
    </>
  )
}
export default StakeDashboard

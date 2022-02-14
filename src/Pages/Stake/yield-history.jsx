import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
// import AccordionDetails from "@material-ui/core/AccordionDetails";
import { makeStyles } from '@material-ui/core/styles'
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from '@material-ui/core/Typography'
import { CircularProgress } from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import UmaIcon from '../../assets/images/icons/UMA.webp'
import { vortexData } from '../../apollo/client'
import { CLAIM_DATA, FILTERED_PORTALS } from '../../apollo/queries'
import { getName } from '../../contracts/functions/erc20Functions'
import { isAddress, shortenAddress } from '../../utils/utils'

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
      marginTop: '0px',
    },
    '& .Mui-expanded': {
      minHeight: '40px',
    },
    '& .MuiAccordionSummary-root': {
      minHeight: '40px',
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

const YieldHistory = () => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false) // eslint-disable-line @typescript-eslint/no-unused-vars
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 1,
  })

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const { account } = useWeb3React()
  const [accordionData, setAccordionData] = useState()

  const formatDate = (date) => {
    const myDate = new Date(parseInt(date, 10) * 1000)
    return (
      `${myDate.getDate()
      }.${myDate.getMonth() + 1
      }.${myDate.getFullYear()}`
    )
  }

  useEffect(() => {
    if (!account) return
    const fetchInfo = async () => {
      let res = await vortexData.query({
        query: CLAIM_DATA,
        variables: {
          recipient: account,
        },
      })

      const harvestData = res.data.harvesteds
      console.log('harvest:::', harvestData)
      const portalAddress = harvestData.map((item) => item.portal)

      res = await vortexData.query({
        query: FILTERED_PORTALS,
        variables: {
          filter: portalAddress,
        },
      })

      const portalData = res.data.portals

      const link = 'https://rinkeby.etherscan.io/token/'

      const newPortal = await Promise.all(portalData.map(async (item) => ({
        ...item,
        rewardsTokenNames: await Promise.all(item.rewardsToken.map(async (addr) => getName(addr))),
      })))
      const updateAccordionData = harvestData.map((item) => ({
        token: newPortal.filter((subitem) => isAddress(item.portal) === isAddress(subitem.portalAddress))[0].rewardsTokenNames,
        address: newPortal.filter((subitem) => isAddress(item.portal) === isAddress(subitem.portalAddress))[0].rewardsToken,
        tokenLink: newPortal.filter((subitem) => isAddress(item.portal) === isAddress(subitem.portalAddress))[0].rewardsToken.map((address) => (link + address)),
        tokenIcon: UmaIcon,
        date: formatDate(item.createdAt),
        label:
          newPortal.filter((subitem) => isAddress(item.portal) === isAddress(subitem.portalAddress))[0].rewardsTokenNames.length === 1
            ? `Portal ${newPortal.filter((subitem) => isAddress(item.portal) === isAddress(subitem.portalAddress))[0].index} ${newPortal.filter((subitem) => isAddress(item.portal) === isAddress(subitem.portalAddress))[0].rewardsTokenNames[0]}` : `Portal ${newPortal.filter((subitem) => isAddress(item.portal) === isAddress(subitem.portalAddress))[0].index} ${newPortal.filter((subitem) => isAddress(item.portal) === isAddress(subitem.portalAddress))[0].rewardsTokenNames[0]}. ${newPortal.filter((subitem) => isAddress(item.portal) === isAddress(subitem.portalAddress))[0].rewardsTokenNames[1]}`,
      }))

      setAccordionData(updateAccordionData)
      setPagination({ ...pagination, pageSize: updateAccordionData.length === 0 ? 1 : Math.ceil(updateAccordionData.length / 3) })
    }
    fetchInfo()
  }, [account])

  return (
    <>
      <div
        style={{
          background: '#373737',
          width: '100%',
          padding: '30px',
          paddingBottom: '20px',
          marginTop: '-22px',
        }}
      >
        <div className={classes.root}>
          {/* eslint-disable-next-line no-nested-ternary */}
          {accordionData ? accordionData.length === 0 ? (
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
          ) : (
            accordionData.map((content, index) => (
              pagination.currentPage === 0
                ? (
                  <Accordion
                    expanded
                    className="yield-accordion-outer"
                    onChange={handleChange('panel1')}
                  >
                    {content.token ? (
                      content.token.map((item) => (
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
                            {item}
                          </Typography>
                          {content.date ? (
                            <div className="d-flex justify-content-center align-items-center gap-1">
                              <Typography className={classes.subheading}>
                                {content.date}
                              </Typography>
                              {/* <img src={ShareImage} alt='' width={12} /> */}
                            </div>
                          ) : (
                            <></>
                          )}
                        </AccordionSummary>
                      ))
                    ) : (
                      <></>
                    )}
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
                    expanded
                    className="yield-accordion-outer"
                    onChange={handleChange('panel1')}
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
                          className="d-flex justify-content-between mb-3"
                          style={{ fontSize: '12px' }}
                        >
                          <span>Date</span>
                          <div className="d-flex justify-content-center align-items-end gap-1">
                            <span className="d-flex align-items-baseline">
                              {content.date}
                            </span>
                          </div>
                        </div>
                      </Typography>
                    </AccordionSummary>
                    {content.token ? (
                      content.token.map((item, key) => (
                        <AccordionSummary
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                          className={classes.accordionHeader}
                        >
                          <Typography className={classes.heading} style={{ width: '100%' }}>
                            <div
                              className="d-flex justify-content-between mb-3"
                              style={{ fontSize: '12px' }}
                            >
                              <div>
                                <img
                                  src={content.tokenIcon}
                                  alt=""
                                  width={25}
                                  className="mr-2"
                                />
                                {item}
                              </div>
                              <div className="align-items-end gap-1">
                                <span className="d-flex align-items-baseline">
                                  <a href={content.tokenLink[key]} target="_blank" rel="noreferrer" style={{ color: 'white' }}>
                                    {shortenAddress(content.address[key])}
                                  </a>
                                </span>
                              </div>
                            </div>
                          </Typography>
                        </AccordionSummary>
                      ))
                    ) : (
                      <CircularProgress
                        style={{ color: 'gray', display: 'flex', margin: 'auto' }}
                      />
                    )}
                  </Accordion>
                )
            ))
          ) : (
            <></>
          )}
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
            {`${pagination.currentPage} of ${pagination.pageSize}`}
          </span>
          <span className="pagination-control ml-4 d-flex align-self-center">
            {/* <NavigateBeforeIcon className='nav-control disabled' />
            <NavigateNextIcon className=' nav-control ml-3' /> */}
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
    </>
  )
}
export default YieldHistory

import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import React from 'react'
import { shortenAddress } from '../../utils/utils'

const useStyles = makeStyles((theme) => ({
  heading: {
    // fontSize: theme.typography.pxToRem(24),
    fontSize: theme.typography.pxToRem(18),
    // flexBasis: "100%",
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  subheading: {
    fontSize: theme.typography.pxToRem(18),
    // paddingRight: theme.typography.pxToRem(60),
  },
  linkScan: {
    fontSize: theme.typography.pxToRem(18),
    marginBottom: theme.typography.pxToRem(5),
  },
}))

const PopupDropdown = ({
  data,
  select,
  setSelectedTokenOption,
  setModal,
  setTokenContractAddresses,
  setRequestedTokenOptions,
  setSelectedPortal = {},
}) => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <>
      <Accordion
        expanded={expanded === 'panel1'}
        className="yield-accordion-outer2"
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={(
            <ExpandMoreIcon
              style={{ color: 'white' }}
              onClick={(e) => {
                e.stopPropagation()
                if (!expanded) {
                  setExpanded('panel1')
                } else {
                  setExpanded(null)
                }
              }}
            />
          )}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          onClick={() => {
            select(data.label)
            setTokenContractAddresses(data.rewardTokens)
            setRequestedTokenOptions(
              data.rewardTokens.map((item, index) => ({
                label: data.rewardTokenNames[index],
                value: item,
                address: item,
                icon: 'https://gateway.pinata.cloud/ipfs/QmNX2QerTxTm1RThD7Dc9X5uS9VFnQxmMotaMFhK5GYbBk',
              })),
            )
            setSelectedTokenOption(data.stakingTokenName)
            setSelectedPortal(data.address)
            setModal(false)
          }}
        >
          <Typography className={classes.heading}>
            <span>
              { data.label.length > 18 ? `${data.label.substr(0, 18)} ...` : data.label}
            </span>
            <span>
              up to
              <b>
                {` ${data.apy}`}
                %
              </b>
            </span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{ width: '100%' }}>
            {data.options.map((option, index) => (
              <div
                key={index} // eslint-disable-line react/no-array-index-key
                className="d-flex justify-content-between mt-3"
                style={{ fontSize: '12px' }}
              >
                <span>
                  <img src={option.icon} alt="" width={25} className="mr-2" />
                  {' '}
                  {option.label}
                </span>
                <a href={`https://rinkeby.etherscan.io/token/${option.value}`} target="_blank" style={{ color: 'white' }} rel="noreferrer">
                  <span>{shortenAddress(option.value)}</span>
                </a>
              </div>
            ))}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <style>
        {`
        .MuiAccordionSummary-root.Mui-expanded {
          min-height: 0 !important;
        }
        .MuiAccordionSummary-content.Mui-expanded {
          margin: 0 !important;
        }
      `}
      </style>
    </>
  )
}

export default PopupDropdown

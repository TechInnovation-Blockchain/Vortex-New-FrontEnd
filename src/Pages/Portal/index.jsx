import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import InfoIcon from '@material-ui/icons/Info'
import React from 'react'
import AquaIcon from '../../assets/images/icons/aqua.webp'
import FlashIcon from '../../assets/images/icons/FLASH.webp'
import UmaIcon from '../../assets/images/icons/UMA.webp'
import { InputText } from '../../Components'
import ThemeModal from '../../Components/theme-modal'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    fontFamily: 'Montserrat, sans-serif',
  },
  heading: {
    fontSize: theme.typography.pxToRem(26),
    fontFamily: 'Montserrat, sans-serif',
    flexBasis: '100%',
  },
  content: {
    fontSize: theme.typography.pxToRem(26),
    fontFamily: 'Montserrat, sans-serif',
  },
}))

const Portal = () => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  const content = () => (
    <div className="portal-container">
      <div className="search-portal mb-5">
        <p className="mb-2 pb-2 ml-4 ">
          <strong>Search a portal</strong>
        </p>
        <InputText color="#ffffff" fullWidth placeholder="Search Portals" />
      </div>
      <div className="portal-info d-flex justify-content-between">
        <span>Portal Info</span>
        <span className="text-right">Yield Tokens</span>
      </div>
      <div className={`portal-list ${classes.root}`}>
        <Accordion
          expanded={expanded === 'panel1'}
          className="accordion-outer"
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography
              className={`${classes.heading} d-flex justify-content-between`}
            >
              Votex1
              <span className="primaryText">(152% APY)</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="pt-0">
            <Typography
              className={classes.content}
              style={{ width: '100%', paddingTop: 0 }}
            >
              <div className="text-center" style={{ width: '100%' }}>
                <p>Yield Token Breakdown</p>
                <div style={{ opacity: '0.8' }}>
                  <p className="d-flex justify-content-center gap-1  align-items-center">
                    <img src={FlashIcon} alt="" width={20} />
                    <span>
                      FLASH
                      {' '}
                      <span className="primaryText">(100% APU) </span>
                    </span>
                    <Tooltip title="Really interesting">
                      <InfoIcon />
                    </Tooltip>
                  </p>
                  {' '}
                  <p className="d-flex justify-content-center gap-1  align-items-center">
                    <img src={AquaIcon} alt="" width={20} />
                    <span>
                      AQUA
                      {' '}
                      <span className="primaryText">(50% APU)</span>
                    </span>
                    <Tooltip title="Really interesting">
                      <InfoIcon />
                    </Tooltip>
                  </p>
                  {' '}
                  <p className="d-flex justify-content-center gap-1  align-items-center">
                    <img src={UmaIcon} alt="" width={20} />
                    <span>
                      UMA
                      {' '}
                      <span className="primaryText">(2% APU)</span>
                    </span>
                    <Tooltip title="Really interesting">
                      <InfoIcon />
                    </Tooltip>
                  </p>
                </div>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel2'}
          className="accordion-outer"
          onChange={handleChange('panel2')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography
              className={`${classes.heading} d-flex justify-content-between`}
            >
              VORTEX2
              {' '}
              <span className="primaryText">(52% APY)</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Lorum Ipsum Text</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel3'}
          className="accordion-outer"
          onChange={handleChange('panel3')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography
              className={`${classes.heading} d-flex justify-content-between`}
            >
              AQUAFI
              {' '}
              <span className="primaryText">(12% APY)</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Lorum Ipsum Text</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel4'}
          className="accordion-outer"
          onChange={handleChange('panel4')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography
              className={`${classes.heading} d-flex justify-content-between`}
            >
              RANDOM
              {' '}
              <span className="primaryText">(175% APY)</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Lorum Ipsum Text</Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  )

  return <ThemeModal show Content={content} />
}
export default Portal

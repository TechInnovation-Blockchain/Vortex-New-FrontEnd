import { Button, makeStyles } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import React from "react";
import AquaIcon from "../../assets/images/icons/aqua.webp";
import FlashIcon from "../../assets/images/icons/FLASH.webp";
import UmaIcon from "../../assets/images/icons/UMA.webp";
// import './stake=welcome.css';
const useStyles = makeStyles((theme) => ({
  welcomeRoot: {
    "& .MuiAccordionSummary-root": {
      pointerEvents: "none",
    },
  },
  heading: {
    // fontSize: theme.typography.pxToRem(24),
    fontSize: theme.typography.pxToRem(18),
    fontWeight: "bold",

    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  subheading: {
    fontSize: theme.typography.pxToRem(20),
    paddingRight: theme.typography.pxToRem(60),
  },
}));
const StakeWelcome = ({ onHide }) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    event.stopPropagation();
    setExpanded(isExpanded ? panel : false);
  };

  const classes = useStyles();

  return (
    <div className={classes.welcomeRoot}>
      <Typography className={classes.root}>
        <p className="text-center text">
          Welcome to the
          <b>{" Blockzero Vortex"}</b>:
        </p>
        <p className="text text-center">
          {"If you "}
          <b>stake XIO</b>, below are some tokens you will earn simultaneously
          in
          <b>{" real time."}</b>
        </p>
      </Typography>
      <Accordion
        expanded={expanded === "panel2"}
        className="yield-accordion-outer"
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2bh-content" id="panel2bh-header">
          <Typography
            className={`${classes.heading} d-flex gap-2 align-items-center`}
          >
            <img src={FlashIcon} alt="" width={25} className="mr-2" />
            <span>
              FLASH UP TO
              <span className="primaryText"> 22.35% APY</span>
            </span>
          </Typography>
        </AccordionSummary>
      </Accordion>
      <Accordion
        expanded={expanded === "panel1"}
        className="yield-accordion-outer"
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography
            className={`${classes.heading} d-flex gap-2 align-items-center`}
          >
            <img src={UmaIcon} alt="" width={25} className="mr-2" />
            <span>
              UMA UP TO
              <span className="primaryText"> 1.75% APY</span>
            </span>
          </Typography>
        </AccordionSummary>
      </Accordion>

      <Accordion
        expanded={expanded === "panel3"}
        className="yield-accordion-outer"
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel2bh-content" id="panel2bh-header">
          <Typography
            className={`${classes.heading} d-flex gap-2 align-items-center`}
          >
            <img src={AquaIcon} alt="" width={25} className="mr-2" />
            <span>
              AQUA UP TO
              <span className="primaryText"> 52.75% APY</span>
            </span>
          </Typography>
        </AccordionSummary>
      </Accordion>
      <Button
        variant="contained"
        color="primary"
        size="large"
        disableElevation
        fullWidth
        className="main-btn primaryBtn"
        style={{ marginBottom: "1.5rem" }}
        onClick={onHide}
      >
        START
      </Button>
    </div>
  );
};
export default StakeWelcome;

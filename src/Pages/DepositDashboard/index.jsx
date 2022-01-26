// import { Button } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { formatUnits } from "@ethersproject/units";
import { vortexData } from "../../apollo/client";
import { DEPOSIT_DATA, FILTERED_PORTALS } from "../../apollo/queries";
import UmaIcon from "../../assets/images/icons/UMA.webp";
import { isAddress, shortenAddress } from "../../utils/utils";
import { getDecimal, getName } from "../../contracts/functions/erc20Functions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "0",
    "& .MuiAccordionSummary-content": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(24),
    // flexBasis: "100%",
    fontWeight: "bold",
  },
  subheading: {
    fontSize: theme.typography.pxToRem(18),
    // paddingRight: theme.typography.pxToRem(60),
  },
  linkScan: {
    fontSize: theme.typography.pxToRem(18),
    marginBottom: theme.typography.pxToRem(5),
  },
}));

const DepositDashboard = () => {
  const { library, account } = useWeb3React();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 1,
  });

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [accordionData, setAccordionData] = useState();

  const formatDate = (date) => {
    const myDate = new Date(parseInt(date, 10) * 1000);
    return `${myDate.getDate()}.${
      myDate.getMonth() + 1
    }.${myDate.getFullYear()}`;
  };

  const formatEndDate = async (date) => {
    const block = await library.eth.getBlockNumber();
    const dayDifference = ((date - block) * 365) / (2102400 * 1000 * 3600 * 24);
    const myDate = new Date(dayDifference + new Date().getTime());

    return `${myDate.getDate()}.${
      myDate.getMonth() + 1
    }.${myDate.getFullYear()}`;
  };

  useEffect(() => {
    if (!account) return;
    const fetchInfo = async () => {
      let res = await vortexData.query({
        query: DEPOSIT_DATA,
        variables: {
          recipient: account,
        },
      });

      const depositeData = res.data.depositeds;
      const portalAddress = depositeData.map((item) => item.portal);

      res = await vortexData.query({
        query: FILTERED_PORTALS,
        variables: {
          filter: portalAddress,
        },
      });

      const portalData = res.data.portals;

      const link = "https://rinkeby.etherscan.io/token/";

      const newPortal = await Promise.all(
        portalData.map(async (item) => ({
          ...item,
          decimal: await Promise.all(
            item.rewardsToken.map(async (addr) => getDecimal(addr))
          ),
          rewardsTokenNames: await Promise.all(
            item.rewardsToken.map(async (addr) => getName(addr))
          ),
          endDate: await formatEndDate(item.endBlock),
        }))
      );
      const updatedAccordionData = depositeData.map((item) => ({
        tokenAddress: newPortal.filter(
          (subitem) =>
            isAddress(item.portal) === isAddress(subitem.portalAddress)
        )[0].rewardsToken,
        token: newPortal.filter(
          (subitem) =>
            isAddress(item.portal) === isAddress(subitem.portalAddress)
        )[0].rewardsTokenNames,
        tokenIcon: UmaIcon,
        tokenLink: newPortal
          .filter(
            (subitem) =>
              isAddress(item.portal) === isAddress(subitem.portalAddress)
          )[0]
          .rewardsToken.map((address) => link + address),
        date: formatDate(item.createdAt),
        endDate: newPortal.filter(
          (subitem) =>
            isAddress(item.portal) === isAddress(subitem.portalAddress)
        )[0].endDate,
        amount: item.amount.map((amount, key) =>
          formatUnits(
            amount,
            newPortal.filter(
              (subitem) =>
                isAddress(item.portal) === isAddress(subitem.portalAddress)
            )[0].decimal[key]
          ).toString()
        ),
        label:
          newPortal.filter(
            (subitem) =>
              isAddress(item.portal) === isAddress(subitem.portalAddress)
          )[0].rewardsTokenNames.length === 1
            ? `Portal ${
                newPortal.filter(
                  (subitem) =>
                    isAddress(item.portal) === isAddress(subitem.portalAddress)
                )[0].index
              } ${
                newPortal.filter(
                  (subitem) =>
                    isAddress(item.portal) === isAddress(subitem.portalAddress)
                )[0].rewardsTokenNames[0]
              }`
            : `Portal ${
                newPortal.filter(
                  (subitem) =>
                    isAddress(item.portal) === isAddress(subitem.portalAddress)
                )[0].index
              } ${
                newPortal.filter(
                  (subitem) =>
                    isAddress(item.portal) === isAddress(subitem.portalAddress)
                )[0].rewardsTokenNames[0]
              }. ${
                newPortal.filter(
                  (subitem) =>
                    isAddress(item.portal) === isAddress(subitem.portalAddress)
                )[0].rewardsTokenNames[1]
              }`,
      }));

      setAccordionData(updatedAccordionData);
      setPagination({
        ...pagination,
        pageSize:
          updatedAccordionData.length === 0
            ? 1
            : Math.ceil(updatedAccordionData.length / 3),
      });
    };
    fetchInfo();
  }, [account]);

  return (
    <>
      <div
        style={{
          background: "#373737",
          width: "100%",
          padding: "30px",
          // paddingRight: "30px",
          // paddingLeft: "30px",
          marginBottom: "-35px",
          marginTop: "-22px",
        }}
      >
        <div className={`deposit-dashboard ${classes.root}`}>
          {
            // eslint-disable-next-line no-nested-ternary
            accordionData ? (
              accordionData.length === 0 ? (
                <Typography
                  className={classes.heading}
                  style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "#bdbdbd",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  No Data
                </Typography>
              ) : (
                accordionData.map((content, index) =>
                  pagination.currentPage === 0 ? (
                    <Accordion
                      expanded={expanded === `panel${index}`}
                      className="yield-accordion-outer"
                      onChange={handleChange(`panel${index}`)}
                    >
                      <AccordionSummary
                        expandIcon={
                          <ExpandMoreIcon style={{ color: "white" }} />
                        }
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography className={classes.heading}>
                          <img
                            src={UmaIcon}
                            alt=""
                            width={25}
                            className="mr-2"
                          />{" "}
                          {content.label}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography style={{ width: "100%" }}>
                          {content.tokenAddress.map((item, key) => (
                            <>
                              <div
                                className="d-flex justify-content-between"
                                style={{ fontSize: "12px" }}
                              >
                                <span>Token Address</span>
                                <div className="d-flex justify-content-center align-items-end gap-1">
                                  <span className="d-flex align-items-baseline">
                                    <a
                                      href={content.tokenLink[key]}
                                      target="_blank"
                                      rel="noreferrer"
                                      style={{
                                        color: "white",
                                      }}
                                    >
                                      {shortenAddress(item)}
                                    </a>
                                  </span>
                                </div>
                              </div>
                              <div
                                className="d-flex justify-content-between mt-3"
                                style={{
                                  fontSize: "12px",
                                  marginBottom: "14px",
                                }}
                              >
                                <span>Amount</span>
                                <span>{content.amount[key]}</span>
                              </div>
                            </>
                          ))}
                          <div
                            className="d-flex justify-content-between mt-3"
                            style={{ fontSize: "12px" }}
                          >
                            <span>Deposit Date</span>
                            <span>{content.date}</span>
                          </div>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ) : (
                    index >= (pagination.currentPage - 1) * 3 &&
                    index < pagination.currentPage * 3 && (
                      <Accordion
                        expanded={expanded === `panel${index}`}
                        className="yield-accordion-outer"
                        onChange={handleChange(`panel${index}`)}
                      >
                        <AccordionSummary
                          expandIcon={
                            <ExpandMoreIcon style={{ color: "white" }} />
                          }
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography className={classes.heading}>
                            {/* <img src={UmaIcon} alt="" width={25} className="mr-2" /> */}
                            {content.label}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography style={{ width: "100%" }}>
                            {content.tokenAddress.map((item, key) => (
                              <>
                                <div
                                  className="d-flex justify-content-between mb-3"
                                  style={{ fontSize: "12px" }}
                                >
                                  <span>Token</span>
                                  <div className="d-flex justify-content-center align-items-end gap-1">
                                    <span className="d-flex align-items-baseline">
                                      {content.token[key]}
                                    </span>
                                  </div>
                                </div>

                                <div
                                  className="d-flex justify-content-between mb-3"
                                  style={{ fontSize: "12px" }}
                                >
                                  <span>Token Address</span>
                                  <div className="d-flex justify-content-center align-items-end gap-1">
                                    <span className="d-flex align-items-baseline">
                                      <a
                                        href={content.tokenLink[key]}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{
                                          color: "white",
                                        }}
                                      >
                                        {shortenAddress(item)}
                                      </a>
                                    </span>
                                  </div>
                                </div>

                                <div
                                  className="d-flex justify-content-between mb-3"
                                  style={{ fontSize: "12px" }}
                                >
                                  <span>Amount</span>
                                  <span>{content.amount[key]}</span>
                                </div>
                              </>
                            ))}
                            <div
                              className="d-flex justify-content-between mt-3"
                              style={{ fontSize: "12px" }}
                            >
                              <span>Deposit date</span>
                              <span>{content.date}</span>
                            </div>
                            <div
                              className="d-flex justify-content-between mt-3"
                              style={{ fontSize: "12px" }}
                            >
                              <span>End date by</span>
                              <span>{content.endDate}</span>
                            </div>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    )
                  )
                )
              )
            ) : (
              <CircularProgress
                style={{ color: "gray", display: "flex", margin: "auto" }}
              />
            )
          }
        </div>
        <span
          className="mt-3"
          style={{
            textAlign: "center",
            display: "flex",
            flexFlow: "column",
            color: "#979797",
            fontSize: "11px",
          }}
        >
          Refresh your browser to see new transactions
        </span>
        <div className="yield-pagination text-center mt-2 d-flex align-items-center justify-content-center">
          {/* <span className='page-number'>1 of 6</span> */}

          <span className="page-number">
            {pagination.currentPage} of {pagination.pageSize}
          </span>
          <span className="pagination-control ml-4 d-flex align-self-center">
            {/* <NavigateBeforeIcon className='nav-control disabled' />
            <NavigateNextIcon className=' nav-control ml-3' /> */}
            <NavigateBeforeIcon
              className={
                pagination.currentPage === 1 ? "nav-control" : "nav-control"
              }
              onClick={() => {
                if (pagination.currentPage > 1) {
                  setPagination({
                    ...pagination,
                    currentPage: pagination.currentPage - 1,
                  });
                }
              }}
            />
            <NavigateNextIcon
              className={
                pagination.currentPage === 10
                  ? "nav-control ml-3"
                  : "nav-control ml-3"
              }
              onClick={() => {
                if (pagination.currentPage < pagination.pageSize) {
                  setPagination({
                    ...pagination,
                    currentPage: pagination.currentPage + 1,
                  });
                }
              }}
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default DepositDashboard;

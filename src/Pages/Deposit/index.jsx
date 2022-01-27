import DateFnsUtils from "@date-io/date-fns";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, CircularProgress } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import web3 from "web3";
import { vortexData } from "../../apollo/client";
import { ALL_USER_PORTALS, TOTAL_COUNT } from "../../apollo/queries";
import Logo from "../../assets/images/center-logo.png";
import AquaIcon from "../../assets/images/icons/aqua.webp";
import UmaIcon from "../../assets/images/icons/UMA.webp";
import {
  DepositConfirm,
  ElevatedBtn,
  GlassCard,
  PopupDropdown,
  InputDatePicker,
  InputText,
  InputText2,
} from "../../Components";
import inputStyles from "../../Components/inputStyles";
import ThemeModal from "../../Components/theme-modal";
import { StyledTab, StyledTabs, ThemeTabs } from "../../Components/theme-tabs";
import {
  approve,
  getBalance,
  getDecimal,
  getName,
} from "../../contracts/functions/erc20Functions";
import { deposit } from "../../contracts/functions/portalFunctions";
import { createPortalContract } from "../../contracts/functions/vortexFunctions";
import { shortenAddress } from "../../utils/utils";
import DepositDashboard from "../DepositDashboard";

import { store } from "../../redux/store";
import { dataLoading } from "../../redux/actions/loadingActions";
import ThemeResponse from "../../Components/theme-response";
import TokenSection from "../../Components/token-section";

const Deposit = ({ location, size }) => {
  const loadingData = useSelector((state) => state.loading);
  const stakeLoading = useSelector((state) => state.staking);

  const { library, account } = useWeb3React();
  const classes = inputStyles();
  const [quantity, setQuantity] = useState([]);
  const [addTokenError, setAddTokenError] = useState("");
  const [portalName, setPortalName] = useState("Portal");
  const [tokenAddress, setTokenAddress] = useState("");
  const [minRewardRatio, setMinRewardRatio] = useState(0);
  const [tokenArr, setTokenArr] = useState([]);
  const [tokenArrDeposit, setTokenArrDeposit] = useState([]);
  const [selectedTokenList, setSelectedTokenList] = useState();
  const [selectedTokenListDefault, setSelectedTokenListDefault] = useState();
  const [selectedPortal, setSelectedPortal] = useState();
  const [tokenResponse, setTokenResponse] = useState("");
  const [smallFont, setSmallFont] = useState(false);
  const [stakeLimit, setStakeLimit] = useState();
  const [contractLimit, setContractLimit] = useState();
  const [accountBalance, setAccountBalance] = useState([]);
  const [distLimit, setDistLimit] = useState();
  const [showPortalModalDeposit, setShowPortalModalDeposit] = useState(false);
  const [searchSmallFont, setSearchSmallFont] = useState("");
  const [showTokenModalCreate, setShowTokenModalCreate] = useState(false);
  const [modal, setModal] = useState({ show: false, onClose });
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [selectedPortalOptionDeposit, setSelectedPortalOptionDeposit] =
    useState("");
  const [selectedTokenOptionDeposit, setSelectedTokenOptionDeposit] =
    useState("");
  const [selectedTokenOptionCreate, setSelectedTokenOptionCreate] =
    useState("");
  const [tokenContractAddresses, setTokenContractAddresses] = useState();
  const [clearForm, setClearForm] = useState(true);
  const [endDate, setEndDate] = useState(
    new Date(
      `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
        new Date().getDate() + 1
      }`
    )
  );
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (!loadingData) return;
    if (loadingData.data === "transaction pending!") {
      setClearForm(true);
    }
    if (loadingData.data === "transaction success!" && clearForm) {
      setClearForm(false);
      setPortalName("Portal");
      setMinRewardRatio(0);
      setTokenArr([]);
      setStakeLimit(0);
      setContractLimit(0);
      setDistLimit(0);
      setEndDate(
        new Date(
          `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
            new Date().getDate() + 1
          }`
        )
      );
      const setData = async () => {
        const t = await vortexData.query({
          query: TOTAL_COUNT,
        });
        setTotalCount(t.data.portalCounts[0].count);
      };
      setData();
    }
  }, [loadingData]);

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count === 0) return;
    if (tokenContractAddresses.length !== count) return; // eslint-disable-line no-useless-return
  }, [count, account, tokenContractAddresses]);

  let tabNo = 0;
  let activeTab = "panel1";

  if (+location.pathname.split("/")[1] === 2) {
    tabNo = 0;
  } else if (+location.pathname.split("/")[1] === 12) {
    tabNo = 2;
  } else if (+location.pathname.split("/")[1] === 9) {
    tabNo = 0;
    activeTab = "panel2";
  }

  const [value, setValue] = useState(tabNo);
  const [searchValue, setSearchValue] = useState("");
  const [tokenOptions, setTokenOptions] = useState([
    {
      label: "XIO",
      value: "0xA8c3e93587e14ffD4C1610FE8Ddb8d4FF2eda5c7",
      address: "0xA8c3e93587e14ffD4C1610FE8Ddb8d4FF2eda5c7",
      icon: "https://gateway.pinata.cloud/ipfs/QmNX2QerTxTm1RThD7Dc9X5uS9VFnQxmMotaMFhK5GYbBk",
      portal: [1],
    },
    {
      label: "XIO-LP",
      value: "0x3adabebc498812a68533452a82fa1f4dcf6531c9",
      address: "0x3adabebc498812a68533452a82fa1f4dcf6531c9",
      icon: "https://gateway.pinata.cloud/ipfs/QmNX2QerTxTm1RThD7Dc9X5uS9VFnQxmMotaMFhK5GYbBk",
      portal: [1],
    },
  ]);
  const [filteredTokenOptions, setFilteredTokenOptions] = useState([
    {
      label: "XIO",
      value: "0xA8c3e93587e14ffD4C1610FE8Ddb8d4FF2eda5c7",
      address: "0xA8c3e93587e14ffD4C1610FE8Ddb8d4FF2eda5c7",
      icon: "https://gateway.pinata.cloud/ipfs/QmNX2QerTxTm1RThD7Dc9X5uS9VFnQxmMotaMFhK5GYbBk",
      portal: [1],
    },
    {
      label: "XIO-LP",
      value: "0x3adabebc498812a68533452a82fa1f4dcf6531c9",
      address: "0x3adabebc498812a68533452a82fa1f4dcf6531c9",
      icon: "https://gateway.pinata.cloud/ipfs/QmNX2QerTxTm1RThD7Dc9X5uS9VFnQxmMotaMFhK5GYbBk",
      portal: [1],
    },
  ]);
  const [requestedTokenOptions, setRequestedTokenOptions] = useState([]);
  const [portalOptionsNew, setPortalOptionsNews] = useState();
  const [filteredPortalOptionsNew, setFilteredPortalOptionsNew] = useState();
  const [expanded, setExpanded] = useState(activeTab);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 1,
  });

  const [pagination2, setPagination2] = useState({
    currentPage: 1,
    pageSize: 1,
  });

  const accordionHandle = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const paginationArr = (arr) =>
    arr?.reduce((curr, item, index) => {
      const resultArray = curr;
      const chunkIndex = Math.floor(index / 10);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }

      resultArray[chunkIndex].push(item);

      return resultArray;
    }, []);

  const getConfirmDescription = () => {
    if (!selectedPortal) {
      return;
    }
    const rewardsTokenNames = portalOptionsNew.filter(
      (item) => item.address === selectedPortal
    )[0].rewardTokenNames;
    return (
      // eslint-disable-line consistent-return
      <div style={{ textAlign: "left" }}>
        <p>
          You are depositing <b> {selectedPortalOptionDeposit} </b> with the
          following parameters:
        </p>
        <div>
          <p>
            <FontAwesomeIcon icon={faCheck} /> Reward Token:{" "}
            {rewardsTokenNames.map(
              (item, index) =>
                item + (index === rewardsTokenNames.length - 1 ? "" : ", ")
            )}
          </p>
          <p>
            <FontAwesomeIcon icon={faCheck} /> Amount:{" "}
            {quantity.map(
              (item, index) =>
                item + (index === rewardsTokenNames.length - 1 ? "" : ", ")
            )}
          </p>
          <p>
            <b>Note:</b> There will be several transactions to confirm in your
            wallet. Please approve the use of your tokens first. Ensure DEPOSIT
            End Date is greater than date set at portal creation.
          </p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (!selectedPortal) return;

    const fetchEndDate = async () => {
      if (!portalOptionsNew) return;
      const newEndDate = portalOptionsNew.filter(
        (item) => item.address === selectedPortal
      )[0].endBlock;
      const block = await library.eth.getBlockNumber();
      const dayDifference =
        (((newEndDate - block) * 365) / 2102400) * 1000 * 3600 * 24;
      const end = new Date(dayDifference + new Date().getTime());
      setEndDate(end);
    };
    fetchEndDate();
  }, [selectedPortal, portalOptionsNew]);

  const AddButton = ({ onClick }) => (
    <div
      className="d-flex align-self-center justify-content-center flex-column"
      style={{
        borderRadius: "100%",
        border: "1px solid #707070",
        padding: "8px",
        cursor: "pointer",
      }}
      onClick={onClick}
      onKeyPress={() => {}}
      tabIndex={0}
      role="button"
    >
      <AddIcon style={{ fontSize: "25px" }} />
    </div>
  );

  useEffect(() => {
    if (!portalOptionsNew) return;
    const rewardsTokens = portalOptionsNew.filter(
      (item) => item.address === selectedPortal
    );
    setSelectedTokenList(rewardsTokens[0]?.rewardTokenNames);
    setSelectedTokenListDefault(rewardsTokens[0]?.rewardTokenNames);
  }, [selectedPortal, portalOptionsNew]);

  useEffect(() => {
    const setData = async () => {
      const t = await vortexData.query({
        query: TOTAL_COUNT,
      });
      setPagination({
        ...pagination,
        pageSize: Math.ceil(t.data.portalCounts[0].validCount / 10),
      });
      setTotalCount(t.data.portalCounts[0].count);
    };
    setData();
  }, []);

  useEffect(() => {
    if (!account) return;
    const fetchInfo = async () => {
      setPortalOptionsNews(null);
      setFilteredPortalOptionsNew(null);

      const t = await vortexData.query({
        query: ALL_USER_PORTALS,
        variables: {
          skip: (pagination.currentPage - 1) * 10,
          first: 10,
        },
      });
      const data = t.data.portals;

      let temp = [];
      temp = await Promise.all(
        data.map(async (item) => {
          const ret = {
            address: item.portalAddress,
          };

          ret.rewardTokens = item.rewardsToken;
          ret.token = item.stakingToken;
          ret.endBlock = item.endBlock;

          ret.apy = 10;

          ret.stakingTokenName = await getName(ret.token);
          ret.stakingTokenName =
            ret.stakingTokenName === "Uniswap V2"
              ? "XIO-LP"
              : ret.stakingTokenName;

          ret.rewardTokenNames = await Promise.all(
            ret.rewardTokens?.map(async (i) => getName(i))
          );

          if (ret.rewardTokenNames.length === 1) {
            ret.label = `Portal ${item.index} ${ret.rewardTokenNames[0]}`;
          } else if (ret.rewardTokenNames.length === 2) {
            ret.label = `Portal ${item.index} ${ret.rewardTokenNames[0]}. ${ret.rewardTokenNames[1]}`;
          } else if (ret.rewardTokenNames.length > 2) {
            ret.label = `Portal ${item.index} ${ret.rewardTokenNames[0]}. ${ret.rewardTokenNames[1]} ...`;
          } else ret.label = "Not Defined";
          ret.icon = AquaIcon;
          ret.value = "15%";
          ret.options = ret.rewardTokenNames.map((itm, index) => ({
            label: itm,
            value: ret.rewardTokens[index],
            icon: UmaIcon,
          }));
          return ret;
        })
      );

      setPortalOptionsNews(temp);
      setFilteredPortalOptionsNew(paginationArr(temp));
    };
    fetchInfo();
  }, [account, pagination.currentPage]);

  const save = () => {
    store.dispatch(dataLoading("loading done!"));
    setModal({
      ...modal,
      Content: () => (
        <DepositConfirm
          title="Deposit"
          getDescription={getConfirmDescription}
          cancelled={modal.onClose}
          confirmed={async () => {
            store.dispatch(dataLoading("data loading!"));
            const decimals = await Promise.all(
              tokenContractAddresses.map(async (item) => getDecimal(item))
            );
            setCount(0);
            let temp = 0;
            tokenContractAddresses.forEach(async (item, index) => {
              const dayDifference = Math.ceil(
                (new Date(endDate).getTime() - new Date().getTime()) /
                  (1000 * 3600 * 24) +
                  1
              );
              const block = await library.eth.getBlockNumber();
              const endBlock = block + (2102400 / 365) * dayDifference;
              console.log(
                "new endBlock",
                selectedPortal,
                quantity,
                decimals,
                account
              );
              await new Promise((res, reject) => {
                const response = approve(
                  item,
                  selectedPortal,
                  account,
                  quantity[index],
                  decimals[index],
                  async () => {
                    temp += 1;
                    console.log(
                      "selected portal:::",
                      selectedPortal,
                      quantity,
                      decimals,
                      account
                    );
                    if (temp === tokenContractAddresses.length) {
                      store.dispatch(dataLoading("loading done!"));
                      await deposit(
                        selectedPortal,
                        quantity,
                        endBlock,
                        decimals,
                        account
                      );
                      modal.onClose();
                    }
                    res();
                  }
                );
                if (!response) reject();
              });
            });
          }}
        />
      ),
      show: true,
    });
  };

  function onClose() {
    setModal({ ...modal, show: false });
  }

  const addToken = () => {
    // eslint-disable-line consistent-return
    if (
      !(
        minRewardRatio &&
        minRewardRatio > 0 &&
        Number(minRewardRatio) &&
        tokenAddress &&
        tokenAddress.trim() &&
        tokenAddress.length ===
          "0x2b591e99afe9f32eaa6214f7b7629768c40eeb39".length &&
        tokenResponse
      )
    ) {
      setTimeout(() => {
        setAddTokenError("");
      }, 5000);
      return setAddTokenError(
        "Please enter Token Address and Min Reward Ratio to add"
      );
    }

    setMinRewardRatio(0);
    setTokenAddress("");
    for (let i = 0; i < tokenArr.length; i += 1) {
      if (tokenArr[i].token_address === tokenAddress) {
        setAddTokenError("Duplicate Token Address");
        return; // eslint-disable-line consistent-return
      }
    }
    setTokenArr([
      ...tokenArr,
      {
        token_address: tokenAddress,
        token_name: tokenResponse,
        min_reward_ratio: minRewardRatio,
      },
    ]);

    setAddTokenError("");
    setTokenResponse("");
  };

  const addTokenDeposit = () => {
    // eslint-disable-line consistent-return
    if (
      !(
        minRewardRatio &&
        minRewardRatio > 0 &&
        Number(minRewardRatio) &&
        tokenAddress &&
        tokenAddress.trim() &&
        tokenAddress.length ===
          "0x2b591e99afe9f32eaa6214f7b7629768c40eeb39".length &&
        tokenResponse
      )
    ) {
      setTimeout(() => {
        setAddTokenError("");
      }, 5000);
      return setAddTokenError(
        "Please enter Token Address and Min Reward Ratio to add"
      );
    }

    setMinRewardRatio(0);
    setTokenAddress("");
    for (let i = 0; i < tokenArr.length; i += 1) {
      if (tokenArr[i].token_address === tokenAddress) {
        setAddTokenError("Duplicate Token Address");
        return; // eslint-disable-line consistent-return
      }
    }
    setTokenArrDeposit([
      ...tokenArrDeposit,
      {
        token_address: tokenAddress,
        token_name: tokenResponse,
        min_reward_ratio: minRewardRatio,
      },
    ]);

    setAddTokenError("");
    setTokenResponse("");
  };

  useEffect(() => {
    if (!tokenArr.length) return;

    if (tokenArr.length === 1) {
      setPortalName(
        `Portal ${parseInt(totalCount, 10) + 1} ${tokenArr[0].token_name}`
      );
      return;
    }
    if (tokenArr.length === 2) {
      setPortalName(
        `Portal ${parseInt(totalCount, 10) + 1} ${tokenArr[0].token_name}. ${
          tokenArr[1].token_name
        }`
      );
      return;
    }
    setPortalName(
      `Portal ${parseInt(totalCount, 10) + 1} ${tokenArr[0].token_name}. ${
        tokenArr[1].token_name
      } ...`
    );
  }, [tokenArr, totalCount]);

  const createPortal = () => {
    setModal({
      ...modal,
      Content: () => (
        <DepositConfirm
          title="Portal Creation"
          getDescription={() => (
            <div style={{ textAlign: "left" }}>
              <p>
                You are creating <b> {portalName} </b> with the following
                parameters:
              </p>
              <div>
                <p>
                  <FontAwesomeIcon icon={faCheck} /> Reward Token:{" "}
                  {tokenArr.map(
                    (item, index) =>
                      item.token_name +
                      (index === tokenArr.length - 1 ? "" : ", ")
                  )}
                </p>
                <p>
                  <FontAwesomeIcon icon={faCheck} /> Minimum Reward Ratio:{" "}
                  {tokenArr.map(
                    (item, index) =>
                      item.min_reward_ratio +
                      (index === tokenArr.length - 1 ? "" : ", ")
                  )}
                </p>
                <p>
                  <FontAwesomeIcon icon={faCheck} /> Stake Limit:
                  {stakeLimit}
                </p>
                <p>
                  <FontAwesomeIcon icon={faCheck} /> Contract Limit:{" "}
                  {contractLimit}
                </p>
                <p>
                  <FontAwesomeIcon icon={faCheck} /> Distribution Limit:{" "}
                  {distLimit}
                </p>
              </div>
            </div>
          )}
          cancelled={modal.onClose}
          confirmed={async () => {
            const dayDifference = Math.ceil(
              (new Date(endDate).getTime() - new Date().getTime()) /
                (1000 * 3600 * 24)
            );
            const rewardsToken = tokenArr.map((item) => item.token_address);
            const minimumRewardRate = tokenArr.map(
              (item) => item.min_reward_ratio
            );
            const stakingToken = tokenOptions.filter(
              (val) => val.label === selectedTokenOptionCreate
            )[0].address;
            const decimal = await getDecimal(stakingToken);
            const block = await library.eth.getBlockNumber();
            const endBlock = block + (2102400 / 365) * dayDifference;
            await createPortalContract(
              endBlock,
              rewardsToken,
              minimumRewardRate,
              stakingToken,
              stakeLimit,
              contractLimit,
              distLimit,
              decimal,
              account
            );
            modal.onClose();
          }}
        />
      ),
      show: true,
    });
  };

  const validateAddress = (token) => {
    setTimeout(async () => {
      if (token) {
        const tokenName = await getName(token);
        if (web3.utils.isAddress(token) && tokenName) {
          console.log("tokenName", tokenName, typeof tokenName);
          setTokenResponse(tokenName ? tokenName : "Unknown Token");
        } else {
          setTokenResponse("invalid token address");
        }
      } else {
        setTokenResponse("empty token address");
      }
    }, 500);
  };

  const handleTokenAddressChange = (tokenAddr) => {
    if (tokenAddr.length > 30) {
      setSmallFont("8px !important");
    } else if (tokenAddr.length > 15) {
      setSmallFont("15px !important");
    } else {
      setSmallFont(false);
    }
    setTokenAddress(tokenAddr);
    validateAddress(tokenAddr);
  };

  // const handleMinRatioInputChange = (val) => {
  //   const decimalLimit = 18
  //   if (val.includes('.') && val.split('.')[1] !== '') {
  //     const filteredValue = val.split('.')

  //     if (filteredValue[1].length > 1) {
  //       const decimal = filteredValue[1]
  //       console.log('decimal', decimal)
  //       if (decimal.length >= decimalLimit) {
  //         console.log('decimal is too long', decimal.slice(0, decimalLimit))
  //         setMinRewardRatio(
  //           `${filteredValue[0]}.${decimal.slice(0, decimalLimit)}`,
  //         )
  //       }
  //     } else {
  //       setMinRewardRatio(value)
  //     }
  //   } else {
  //     setMinRewardRatio(value)
  //   }
  // }

  useEffect(() => {
    async function asyncFunc() {
      if (!tokenContractAddresses) return;
      const temp = await Promise.all(
        tokenContractAddresses.map(async (item) => getBalance(item, account))
      );
      setAccountBalance(temp);
    }
    asyncFunc();
  }, [tokenContractAddresses, account]);

  const handleQuantityChange = (index, percentage, changed = false) => {
    const temp = [...quantity];
    if (changed)
      temp[index] = parseFloat(percentage) > 0 ? parseFloat(percentage) : "";
    else {
      temp[index] = parseFloat((accountBalance[index] / 100) * percentage)
        .toFixed(4)
        .toString();
    }
    console.log("quantity", temp);
    setQuantity(temp);
  };

  const content = (
    selectItemsData,
    select,
    setModal,
    title,
    isToken = false,
    setInputValue,
    handleSearch
  ) => (
    <div className="content p-4" style={{ maxWidth: "600px" }}>
      <main>
        <h3 style={{ padding: "0 25px" }}>{title || "Select a token"}</h3>
        <div className="modal__search-section">
          <input
            type="text"
            placeholder="Search Token/Address"
            className="modal__search-box"
            style={{
              fontSize: searchSmallFont.length > 0 ? searchSmallFont : "",
            }}
            onChange={(e) => {
              if (setInputValue) {
                setInputValue(e.target.value);
              }
            }}
          />
          <button
            className="modal__search-btn"
            onClick={() => handleSearch()}
            type="button"
          >
            Search
          </button>
        </div>
        <section style={{}}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "2rem",
              padding: "0 16px",
            }}
          >
            <p>Token Name</p>
            <p>{isToken ? "Address" : "APY"}</p>
          </div>

          <div style={{ overflowY: "auto", height: "20rem" }}>
            {selectItemsData.map((item, index) => (
              <div
                key={index} // eslint-disable-line react/no-array-index-key
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderTop: "1px solid gray",
                  color: "#bdbdbd",
                }}
                onClick={() => {
                  select(item.label);
                  setModal(false);
                }}
                tabIndex={0}
                onKeyDown={() => {}}
                role="button"
              >
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  {item.icon && (
                    <div
                      style={{
                        background: `url(${item.icon}) no-repeat`,
                        backgroundSize: "cover",
                        width: 15,
                        height: 15,
                      }}
                      className="mr-2"
                    />
                  )}
                  {item.label}
                </p>
                <p style={{ cursor: "pointer" }}>
                  {isToken
                    ? `${shortenAddress(item.address)}`
                    : `${item.value}%`}
                </p>
              </div>
            ))}
          </div>

          {/* <ThemeSelect options={portalOptions} onChange={null} /> */}
        </section>

        <div className="yield-pagination text-center mt-2 d-flex align-items-center justify-content-center">
          {/* <span className="page-number">1 of 6</span> */}
          <span className="page-number">
            {pagination2.currentPage} of
            {pagination2.pageSize}
          </span>
          <span className="pagination-control ml-4 d-flex align-self-center">
            <NavigateBeforeIcon
              className={
                pagination2.currentPage === 1 ? "nav-control" : "nav-control"
              }
              onClick={() => {
                if (pagination2.currentPage > 1) {
                  setPagination({
                    ...pagination2,
                    currentPage: pagination2.currentPage - 1,
                  });
                }
              }}
            />
            <NavigateNextIcon
              className={
                pagination2.currentPage === 10
                  ? "nav-control ml-3"
                  : "nav-control ml-3"
              }
              onClick={() => {
                if (pagination2.currentPage < pagination2.pageSize) {
                  setPagination2({
                    ...pagination2,
                    currentPage: pagination2.currentPage + 1,
                  });
                }
              }}
            />
          </span>
        </div>
      </main>
    </div>
  );

  const contentNew = useCallback(
    (
      selectItemsData,
      select,
      setModal,
      title,
      isToken = false,
      setInputValue,
      handleSearch
    ) => (
      <div className="content p-4" style={{ maxWidth: "600px" }}>
        <main>
          <h3 style={{ padding: "0 25px" }}>{title || "Select a token"}</h3>

          <div className="modal__search-section">
            <input
              type="text"
              placeholder="Search Portal/Token"
              className="modal__search-box"
              style={{
                fontSize: searchSmallFont.length > 0 ? searchSmallFont : "",
              }}
              onChange={(e) => {
                if (setInputValue) {
                  setInputValue(e.target.value);
                }
              }}
            />
            <button
              type="button"
              className="modal__search-btn"
              onClick={() => handleSearch()}
            >
              Search
            </button>
          </div>

          {/* <section style={{ padding: "0 25px" }}> */}
          <section style={{}}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "2rem",
                padding: "0 16px",
              }}
            >
              <p>Token Name</p>
              <p>{isToken ? "Address" : "APY"}</p>
            </div>

            <div style={{ overflowY: "auto", height: "20rem" }}>
              {/* eslint-disable-next-line no-nested-ternary */}
              {selectItemsData ? (
                selectItemsData.length === 0 ? (
                  <div
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      color: "#bdbdbd",
                      textAlign: "center",
                    }}
                  >
                    No Data
                  </div>
                ) : (
                  selectItemsData[0].map((item, index) => (
                    <div
                      key={index} // eslint-disable-line react/no-array-index-key
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "#bdbdbd",
                      }}
                    >
                      <PopupDropdown
                        data={item}
                        select={select}
                        setSelectedTokenOption={setSelectedTokenOptionDeposit}
                        setModal={setModal}
                        setTokenContractAddresses={setTokenContractAddresses}
                        setRequestedTokenOptions={setRequestedTokenOptions}
                        setSelectedPortal={setSelectedPortal}
                      />
                    </div>
                  ))
                )
              ) : (
                <CircularProgress
                  style={{ color: "gray", display: "flex", margin: "auto" }}
                />
              )}
            </div>

            {/* <ThemeSelect options={portalOptions} onChange={null} /> */}
          </section>

          <div className="yield-pagination text-center mt-2 d-flex align-items-center justify-content-center">
            {/* <span className="page-number">1 of 6</span> */}
            <span className="page-number">
              {pagination.currentPage} of {pagination.pageSize}
            </span>
            <span className="pagination-control ml-4 d-flex align-self-center">
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
                  pagination.currentPage === pagination.pageSize
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
        </main>
      </div>
    ),
    [
      pagination.currentPage,
      filteredPortalOptionsNew,
      searchValue,
      searchSmallFont,
    ]
  );

  const handleInputChange = (text) => {
    if (text.length > 30) {
      setSearchSmallFont("9px");
    } else if (text.length > 15) {
      setSearchSmallFont("12px");
    } else {
      setSearchSmallFont("");
    }
    setSearchValue(text);
  };

  const handleSearch = () => {
    if (!searchValue) return;
    const filteredData = portalOptionsNew?.filter(
      (item) =>
        item.label.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.rewardTokens
          .map((addr) => addr.toLowerCase().includes(searchValue.toLowerCase()))
          .includes(true)
    );

    setPagination({
      currentPage: 1,
      pageSize: Math.ceil(paginationArr(filteredData).length / 10),
    });
    setFilteredPortalOptionsNew(paginationArr(filteredData));
  };

  const handleSearch2 = () => {
    if (!searchValue) return;
    const filteredData = tokenOptions?.filter(
      (item) =>
        item.label.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.address.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredTokenOptions(filteredData);
  };

  return (
    <GlassCard width="450px" height="auto">
      <Accordion
        elevation={0}
        sx={{
          "&:before": {
            display: "none",
          },
        }}
        style={{ background: "transparent", borderBottom: "none" }}
        expanded={expanded === "panel1"}
        onChange={accordionHandle("panel1")}
      >
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="d-none"
        />
        <AccordionDetails style={{ padding: 0 }}>
          <div>
            <StyledTabs value={value} onChange={handleChange}>
              <StyledTab label="Deposit" />
              <h1 className="p-0 m-0 d-flex align-self-center mt-4">
                <img src={Logo} width={40} alt="" />
              </h1>
              <StyledTab label="Create" />
            </StyledTabs>
            <ThemeTabs value={value} index={0}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className="row mx-0">
                  <div className="col-12 mb-4 px-0">
                    <div className={`select-box py-4 ${classes.selectRoot}`}>
                      <div className="row p-0 m-0">
                        <div
                          className={`${
                            size === "small" ? "col-5" : "col-3"
                          } d-flex align-self-center px-0`}
                        >
                          <span className="side-label p-0 m-0">Portal</span>
                        </div>
                        <div
                          className={`${
                            size === "small" ? "col-7" : "col-9"
                          } px-0`}
                        >
                          <button
                            type="button"
                            style={{
                              background: "#65C988",
                              color: "#FFFFFF",
                              padding: "10px 13px",
                              marginBottom: "5px",
                              fontWeight: "bold",
                              borderRadius: "15px",
                              border: "none",
                              marginTop: "5px",
                              width: "100%",
                            }}
                            onClick={() => {
                              setShowPortalModalDeposit(true);
                              setSearchSmallFont("");
                            }}
                          >
                            {selectedPortalOptionDeposit === ""
                              ? "SELECT"
                              : selectedPortalOptionDeposit}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mb-4 px-0 pr-md-2">
                    <div
                      className="select-box mb-4 h-100"
                      style={{
                        padding: "5px",
                      }}
                    >
                      <h3
                        style={{
                          margin: "1px 10px",
                          marginBottom: "10px",
                          color: "#c5c5c5",
                        }}
                      >
                        Staking Token
                      </h3>
                      <h2
                        style={{
                          margin: "1px 10px",
                          fontSize: "1.7rem",
                          paddingTop: "6px",
                        }}
                      >
                        {selectedTokenOptionDeposit || "Select a portal"}
                      </h2>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 mb-4 px-0 pl-0 pl-md-2">
                    <InputDatePicker
                      label="End Date"
                      date={endDate}
                      className="h-100"
                      setDate={(date) => setEndDate(date)}
                      tooltip="End Date defines when the deposited reward tokens will stop distributing. This date must be greater than the default Portal End Date when created. A greater End Date will become the new End Date for the Portal."
                    />
                  </div>

                  {selectedTokenList && (
                    <>
                      <div
                        className="select-box mb-4"
                        style={{ width: "100%" }}
                      >
                        {selectedTokenList?.map((item, index) => (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              key={index} // eslint-disable-line react/no-array-index-key
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <div
                                style={{
                                  background: `url(${UmaIcon}) no-repeat`,
                                  backgroundSize: "cover",
                                  width: 15,
                                  height: 15,
                                  alignSelf: "center",
                                  marginLeft: "10px",
                                }}
                              />
                              <h5
                                style={{
                                  margin: 0,
                                  marginLeft: "5px",
                                  color: "rgb(197, 197, 197)",
                                  lineHeight: "9.8rem",
                                }}
                              >
                                {item.length > 15
                                  ? `${item.substr(0, 15)}...`
                                  : `${item}`}
                              </h5>
                            </div>
                            <div
                              className="col-md-6 col-6"
                              style={{ padding: "5px" }}
                            >
                              <InputText2
                                type="text"
                                value={quantity[index]}
                                onChange={(e) =>
                                  handleQuantityChange(
                                    index,
                                    e.target.value,
                                    true
                                  )
                                }
                                sublabel={
                                  <span className="d-flex align-items-center gap-1">
                                    <span
                                      className="text-light text-right pointer quantity-limit"
                                      onClick={() =>
                                        handleQuantityChange(index, 25)
                                      }
                                      role="button"
                                      tabIndex={0}
                                      onKeyDown={() => {}}
                                    >
                                      25%{" "}
                                    </span>
                                    <span
                                      className="text-light ml-2 text-right pointer quantity-limit"
                                      onClick={() =>
                                        handleQuantityChange(index, 50)
                                      }
                                      role="button"
                                      tabIndex={0}
                                      onKeyDown={() => {}}
                                    >
                                      50%{" "}
                                    </span>
                                    <span
                                      className="primaryText quantity-primary ml-2 text-right pointer quantity-limit"
                                      onClick={() =>
                                        handleQuantityChange(index, 100)
                                      }
                                      role="button"
                                      tabIndex={0}
                                      onKeyDown={() => {}}
                                    >
                                      MAX{" "}
                                    </span>
                                  </span>
                                }
                                placeholder={0.0}
                                style={{
                                  fontSize: "10px !important",
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div
                        className="d-flex justify-content-center mb-4"
                        style={{ width: "100%" }}
                      >
                        <AddButton onClick={() => setShowTokenModal(true)} />
                      </div>
                    </>
                  )}
                </div>
              </MuiPickersUtilsProvider>
              <Button
                variant="contained"
                size="large"
                color="primary"
                // disabled={!(quantity && selectedToken && selectedPortal)}
                // disabled={!(portalName && selectedToken && (tokenArr.length > 0))}
                disabled={!(tokenContractAddresses?.length > 0 && endDate)}
                fullWidth
                className="main-btn primaryBtn mb-5"
                onClick={save}
              >
                Deposit
              </Button>
            </ThemeTabs>
            <ThemeTabs value={value} index={2}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div
                  className="select-box mb-4"
                  style={{
                    marginLeft: "5px",
                    marginRight: "5px",
                    padding: "5px",
                  }}
                >
                  <h3
                    style={{
                      margin: "1px 10px",
                      marginBottom: "10px",
                      color: "#c5c5c5",
                    }}
                  >
                    Portal Name
                  </h3>
                  <h2 style={{ margin: "1px 10px" }}>{portalName}</h2>
                </div>
                <div className="row mx-0 mb-4">
                  <div className="col-12 col-md-6 px-0 px-md-2 h-100 mb-4">
                    <div
                      className={`select-box py-4 ${classes.selectRoot}`}
                      style={{ marginTop: "0px" }}
                    >
                      <div>
                        <h4
                          style={{
                            margin: "1px 10px",
                            marginBottom: "10px",
                            color: "#c5c5c5",
                          }}
                        >
                          Staking Token
                        </h4>
                        <div>
                          <button
                            type="button"
                            style={{
                              background: "#65C988",
                              color: "#FFFFFF",
                              padding: "9.5px 13px",
                              marginBottom: "5px",
                              fontWeight: "bold",
                              borderRadius: "15px",
                              border: "none",
                              width: "100%",
                            }}
                            onClick={() => {
                              setShowTokenModalCreate(true);
                              setSearchSmallFont("");
                            }}
                          >
                            {selectedTokenOptionCreate === ""
                              ? "Select a token"
                              : selectedTokenOptionCreate}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 px-0 px-md-2 pl-0 pl-md-2 mb-4 ">
                    <InputDatePicker
                      label="End Date"
                      date={endDate}
                      className="h-100"
                      setDate={(date) => setEndDate(date)}
                    />
                  </div>
                  <TokenSection
                    tokenArr={tokenArr}
                    setTokenArr={setTokenArr}
                    tokenAddress={tokenAddress}
                    handleTokenAddressChange={handleTokenAddressChange}
                    tokenResponse={tokenResponse}
                    minRewardRatio={minRewardRatio}
                    setMinRewardRatio={setMinRewardRatio}
                    addToken={addToken}
                    addTokenError={addTokenError}
                    smallFont={smallFont}
                    classes={classes}
                  />

                  {/* portal distribution limits */}
                  <div className="col-12 px-0 px-md-2">
                    <div className={classes.tokenAddressGroup}>
                      <h3 style={{ marginTop: 0, color: "#c5c5c5" }}>
                        Portal distribution limits
                      </h3>

                      <div className="row">
                        <div className="col-4 p-2 pl-4">
                          <InputText
                            className="h-100"
                            type="number"
                            label="Stake"
                            value={stakeLimit}
                            onChange={setStakeLimit}
                            tooltip="The stake limit is the maximum stake amount the user can stake. Example: if the stake limit is 1000, the sum of all user stakes cannot exceed 1000 tokens."
                            marginSm
                            placeholder="0"
                          />
                        </div>

                        <div className="col-4 p-2">
                          <InputText
                            className="h-100"
                            type="number"
                            label="Contract"
                            value={contractLimit}
                            onChange={setContractLimit}
                            tooltip="The contract stake limit is the maximum stake amount for the selected portal. Example: if the contract stake limit is 500, the maximum stakes among all users cannot exceed 500."
                            marginSm
                            placeholder="0"
                          />
                        </div>

                        <div className="col-4 p-2 pr-4">
                          <InputText
                            className="h-100"
                            type="number"
                            label="Dist."
                            value={distLimit}
                            onChange={setDistLimit}
                            tooltip="The distribution limit specifies the quantity of staked tokens needed before rewards start accumulating for all stakers. Example: if the distribution limit is 300, rewards don’t start accumulating for stakers until a minimum of 300 tokens are staked."
                            marginSm
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 px-0 px-md-2 mb-2">
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      disableElevation
                      disabled={
                        !(
                          portalName &&
                          endDate &&
                          selectedTokenOptionCreate &&
                          stakeLimit &&
                          contractLimit &&
                          distLimit &&
                          tokenArr.length > 0
                        )
                      }
                      fullWidth
                      className="main-btn primaryBtn "
                      onClick={createPortal}
                      style={{
                        marginTop: "15px",
                      }}
                    >
                      Create Portal
                    </Button>
                  </div>
                </div>
              </MuiPickersUtilsProvider>
            </ThemeTabs>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        className={value !== 0 ? "d-none" : ""}
        style={{ background: "transparent" }}
      >
        <AccordionSummary>
          <ElevatedBtn
            title="Deposit Dashboard"
            expanded={expanded === "panel2"}
            onClick={() =>
              expanded === "panel2"
                ? setExpanded("panel1")
                : setExpanded("panel2")
            }
          />
        </AccordionSummary>

        <AccordionDetails style={{ padding: 0 }}>
          <DepositDashboard />
        </AccordionDetails>
      </Accordion>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <ThemeModal {...modal} />

      <ThemeModal
        show={showPortalModalDeposit}
        onClose={() => {
          setShowPortalModalDeposit(false);
          setSearchValue("");
        }}
      >
        {contentNew(
          // portalOptionsNew,
          filteredPortalOptionsNew,
          setSelectedPortalOptionDeposit,
          setShowPortalModalDeposit,
          "Select a portal",
          false,
          // setSearchValue,
          handleInputChange,
          handleSearch
        )}
      </ThemeModal>

      <ThemeModal
        show={showTokenModalCreate}
        onClose={() => {
          setShowTokenModalCreate(false);
          setSearchValue("");
        }}
      >
        {content(
          // tokenOptions,
          filteredTokenOptions,
          setSelectedTokenOptionCreate,
          setShowTokenModalCreate,
          "Select a token",
          true,
          setSearchValue,
          handleSearch2
        )}
      </ThemeModal>

      <ThemeModal
        show={showTokenModal}
        onClose={() => setShowTokenModal(false)}
      >
        <h2 style={{textAlign: 'center'}}>Add New Reward Tokens</h2>
        <div style={{ padding: "1rem" }}>
          <TokenSection
            selectedTokenList={selectedTokenList}
            selectedTokenListDefault={selectedTokenListDefault}
            setSelectedTokenList={setSelectedTokenList}
            tokenArr={tokenArrDeposit}
            setTokenArr={setTokenArrDeposit}
            tokenAddress={tokenAddress}
            handleTokenAddressChange={handleTokenAddressChange}
            tokenResponse={tokenResponse}
            minRewardRatio={minRewardRatio}
            setMinRewardRatio={setMinRewardRatio}
            addToken={addTokenDeposit}
            addTokenError={addTokenError}
            smallFont={smallFont}
            classes={classes}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </div>
      </ThemeModal>

      {loadingData.data === "transaction pending!" && (
        <ThemeResponse title="PORTAL BEING CREATED" type="pending" />
      )}
      {loadingData.data === "transaction success!" && (
        <ThemeResponse title="PORTAL SUCCESSFULLY CREATED" type="success" />
      )}
      {loadingData.data === "transaction failed!" && (
        <ThemeResponse title="PORTAL CREATION FAILED" type="failed" />
      )}
      {loadingData.data === "transaction rejected!" && (
        <ThemeResponse title="PORTAL CREATION REJECTED" type="rejected" />
      )}

      {stakeLoading.data === "transaction pending!" && (
        <ThemeResponse title="PORTAL DEPOSIT PENDING" type="pending" />
      )}
      {stakeLoading.data === "transaction success!" && (
        <ThemeResponse title="PORTAL DEPOSIT SUCCESS" type="success" />
      )}
      {stakeLoading.data === "transaction failed!" && (
        <ThemeResponse title="PORTAL DEPOSIT FAILED" type="failed" />
      )}
      {stakeLoading.data === "transaction rejected!" && (
        <ThemeResponse title="PORTAL DEPOSIT REJECTED" type="rejected" />
      )}
    </GlassCard>
  );
};
export default Deposit;

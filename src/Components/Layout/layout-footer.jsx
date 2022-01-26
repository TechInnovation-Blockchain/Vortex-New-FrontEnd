import { Button, IconButton } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
// import TelegramIcon from '@material-ui/icons/Telegram';
import GearIcon from "@material-ui/icons/Settings";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { FortmaticConnector } from "@web3-react/fortmatic-connector";
import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError,
} from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { useCallback, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
// import DiscordIcon from '../../assets/images/icons/discord.svg';
import CreditsImage from "../../assets/images/icons/created-by.png";
import { setWeb3Provider } from "../../contracts/getContract";
import {
  useDropInputs,
  // useJWT,
  useLoading,
  useSnackbar,
  // useTheme,
  useWeb3,
} from "../../hooks";
import { useStyles } from "./connectWalletStyles";
import { conciseAddress } from "../../utils/formattingFunctions";
import { walletList } from "../../utils/web3Connectors";
import WalletDialog from "../wallet-dialog";

const LayoutFooter = () => {
  const classes = useStyles();
  const web3context = useWeb3React();
  const { showSnackbarF } = useSnackbar();
  const { setLoadingF, loading } = useLoading();
  const { storeWeb3ContextF } = useWeb3();
  const { currentAccount, clearFieldsF } = useDropInputs();
  // const { theme } = useTheme();
  // const { getJWTF } = useJWT();

  const [open, setOpen] = useState(false);

  const getErrorMessage = (e) => {
    if (e instanceof UnsupportedChainIdError) {
      return "Unsupported Network";
    }
    if (e instanceof NoEthereumProviderError) {
      return "No Wallet Found";
    }
    if (e instanceof UserRejectedRequestError) {
      return "Wallet Connection Rejected";
    }
    if (e.code === -32002) {
      return "Wallet Connection Request Pending";
    }
    return "An Error Occurred";
  };

  const activateWallet = useCallback(
    (connector, onClose = () => {}) => {
      setLoadingF({
        walletConnection: true,
        connector: connector || InjectedConnector,
      });

      if (
        connector instanceof WalletConnectConnector &&
        connector.walletConnectProvider?.wc?.uri
      ) {
        connector.walletConnectProvider = undefined; // eslint-disable-line no-param-reassign
      } else if (connector instanceof FortmaticConnector) {
        onClose();
      }

      web3context
        .activate(
          connector ||
            new InjectedConnector({
              supportedChainIds: [1, 3, 4, 5, 42],
            }),
          undefined,
          true
        )
        .then(() => {
          setLoadingF({ walletConnection: false });
          // getJWTF(web3context.account, Date.now());
        })
        .catch((e) => {
          const err = getErrorMessage(e);
          showSnackbarF({ message: err, severity: "error" });
          console.error("ERROR activateWallet -> ", e);
          setLoadingF({ walletConnection: false });
        });
    },
    [web3context, loading]
  );

  useEffect(() => {
    if (!isMobile) {
      activateWallet();
    }
  }, []);

  useEffect(() => {
    storeWeb3ContextF(web3context);
    if (web3context?.library?._provider) {
      // eslint-disable-line no-underscore-dangle
      // console.log(web3context.library._provider);
      setWeb3Provider(web3context.library._provider); // eslint-disable-line no-underscore-dangle
    }
    if (web3context?.error) {
      web3context.deactivate();
    }
    if (web3context.active || web3context.account) {
      setOpen(false);
      if (currentAccount === "") {
        clearFieldsF(web3context.account);
        // getJWTF(web3context.account, Date.now());
      }
    }
  }, [web3context]);

  window.ethereum?.on("networkChanged", (networkId) => {
    clearFieldsF();
    if (networkId) {
      let msg = "Network changed to ";
      if (networkId === "1") {
        msg += "mainnet";
      } else if (networkId === "3") {
        msg += "ropsten";
      } else if (networkId === "4") {
        msg += "rinkeby";
      } else if (networkId === "5") {
        msg += "goerli";
      } else if (networkId === "42") {
        msg += "kovan";
      }
      showSnackbarF({ message: msg, severity: "info" });
    }
  });

  return (
    <div className="text-center">
      <Button
        onClick={() => setOpen(true)}
        className="connect-wallet d-inline-block px-4 py-4 mb-4"
      >
        <div className="d-flex justify-content-center align-self-center">
          <span className="mr-4 ">
            {web3context.active && web3context.account
              ? conciseAddress(web3context.account)
              : "CONNECT WALLET"}
          </span>
          <span className="connect-icon d-flex align-self-center">
            <GearIcon style={{ fontSize: 18 }} />
          </span>
        </div>
      </Button>
      <div
        className={`d-flex justify-content-center mt-3 ${classes.creditsImage}`}
      >
        <a href="https://blockzerolabs.io" target="_blank" rel="noreferrer">
          <img src={CreditsImage} alt="" width={150} />
        </a>
      </div>
      <div className="social-links" style={{ paddingBottom: "3rem" }}>
        <a href="https://discord.gg/w3pgm7R6" target="_blank" rel="noreferrer">
          <IconButton size="small" aria-label="Twitter" className="footer-icon">
            <div style={{ width: "18px", height: "18px", fill: "white" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 294334 333333"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                imageRendering="optimizeQuality"
                fillRule="evenodd"
                clipRule="evenodd"
              >
                <g id="Layer_x0020_1">
                  <g id="_489768256">
                    <path
                      className="fil0"
                      d="M178012 139855c-9581 0-17146 8237-17146 18491s7733 18491 17146 18491c9581 0 17146-8237 17146-18491s-7733-18491-17146-18491zm-61354 0c-9581 0-17146 8237-17146 18491s7733 18491 17146 18491c9581 0 17146-8237 17146-18491 168-10254-7564-18491-17146-18491z"
                    />
                    <path
                      className="fil0"
                      d="M259706 0H34459C15465 0 0 15465 0 34459v225247c0 18995 15465 34459 34459 34459h190620l-8909-30761 21516 19835 20339 18659 36309 31434V34458C294166 15464 278701-1 259706-1zm-64885 217683s-6052-7228-11094-13448c22020-6219 30425-19835 30425-19835-6892 4539-13448 7733-19331 9918-8405 3530-16474 5715-24374 7228-16137 3026-30929 2185-43537-168-9581-1849-17818-4370-24710-7228-3866-1513-8068-3362-12271-5715-504-336-1009-504-1513-840-336-168-504-337-672-337-3026-1681-4707-2857-4707-2857s8068 13280 29417 19667c-5043 6388-11263 13784-11263 13784-37149-1177-51269-25383-51269-25383 0-53622 24205-97159 24205-97159 24206-17986 47067-17482 47067-17482l1681 2017c-30257 8573-44041 21853-44041 21853s3698-2017 9918-4707c17987-7901 32274-9918 38158-10590 1009-168 1849-336 2857-336 10254-1345 21853-1681 33955-337 15969 1849 33115 6556 50596 15969 0 0-13280-12607-41855-21180l2354-2689s23029-504 47066 17482c0 0 24206 43537 24206 97159 0-168-14120 24038-51269 25215z"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </IconButton>
        </a>
        <a
          href="https://twitter.com/blockzerolabs"
          target="_blank"
          rel="noreferrer"
        >
          <IconButton size="small" aria-label="Twitter" className="footer-icon">
            <TwitterIcon style={{ fontSize: 18 }} />
          </IconButton>
        </a>
        <a
          href="https://www.youtube.com/c/bombx"
          target="_blank"
          rel="noreferrer"
        >
          <IconButton size="small" aria-label="Youtube" className="footer-icon">
            <YouTubeIcon style={{ fontSize: 18 }} />
          </IconButton>
        </a>
        <a
          href="https://www.facebook.com/groups/xionetwork"
          target="_blank"
          rel="noreferrer"
        >
          <IconButton
            size="small"
            aria-label="Facebook"
            className="footer-icon"
          >
            <FacebookIcon style={{ fontSize: 18 }} />
          </IconButton>
        </a>
      </div>

      <WalletDialog
        className={classes.connectWalletButton}
        open={open}
        setOpen={setOpen}
        items={walletList}
        activate={activateWallet}
        address={conciseAddress(web3context.account)}
      />
    </div>
  );
};
export default LayoutFooter;

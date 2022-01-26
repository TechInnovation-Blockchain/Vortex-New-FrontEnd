import {
  Box,
  CircularProgress,
  Container,
  Dialog as MuiDialog,
  IconButton,
  List,
  ListItem,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { ClearOutlined, LinkOffOutlined } from "@material-ui/icons";
import { useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { useCallback, useState } from "react";
import { useLoading, useWeb3 } from "../../hooks";
import { useStyles } from "./styles";

const WalletDialog = ({
  open,
  setOpen,
  address,
  items = [],
  activate = () => {},
}) => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const { loading } = useLoading();
  const { web3context } = useWeb3();
  const { deactivate } = useWeb3React();

  const onChangeSearch = ({ target: { value } }) => {
    setSearch(value.toUpperCase());
  };

  const filteredData = useCallback(
    () => items.filter(({ name }) => name.toUpperCase().includes(search)),
    [search, items]
  );

  const onClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleDisconnect = (connector) => {
    deactivate();
    localStorage.removeItem("jwt");
    connector instanceof WalletConnectConnector &&
      localStorage.removeItem("walletconnect");
  };

  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      PaperProps={{ className: classes.dialogPaper }}
    >
      <Container maxWidth="xs" className={classes.dialog}>
        <Box className={classes.closeBtnContainer}>
          <Typography variant="body1" className={classes.dialogHeading}>
            {web3context && web3context.active
              ? "CHANGE WALLET"
              : "CONNECT TO A WALLET"}

            <br />
            {web3context && web3context.active ? (
              <span className={classes.secondaryHeading}>
                {`CONNECTED TO ${address}`}
              </span>
            ) : null}
          </Typography>
          <IconButton
            size="small"
            onClick={onClose}
            className={classes.closeIcon}
          >
            <ClearOutlined />
          </IconButton>
        </Box>

        <Box className={classes.closeBtnContainer}>
          <TextField
            placeholder="SEARCH"
            className={classes.textField}
            fullWidth
            value={search}
            onChange={onChangeSearch}
            InputProps={{ disableUnderline: true }}
          />
          {search ? (
            <IconButton
              size="small"
              onClick={() => setSearch("")}
              className={classes.clearSearch}
            >
              <ClearOutlined />
            </IconButton>
          ) : null}
        </Box>

        {filteredData().length ? (
          <List className={classes.list}>
            {filteredData().map(({ name, connector, connectorType, logo }) => (
              <ListItem
                button
                key={name}
                onClick={() => {
                  activate(connector, onClose);
                }}
                className={
                  !(web3context?.connector instanceof connectorType)
                    ? classes.listItem
                    : classes.selectedListItem
                }
              >
                <Typography variant="body1" className={classes.listItemText}>
                  {loading.walletConnection &&
                  loading.connector === connector ? (
                    <CircularProgress
                      size={12}
                      color="inherit"
                      className={classes.loadingIcon}
                    />
                  ) : null}
                  <img
                    src={logo}
                    alt={name}
                    srcSet=""
                    width={20}
                    style={{ marginRight: 5 }}
                  />
                  {name}
                  {web3context?.connector instanceof connectorType ? (
                    <Tooltip
                      title="Disconnect"
                      onClick={() => handleDisconnect(web3context?.connector)}
                    >
                      <LinkOffOutlined className={classes.disconnect} />
                    </Tooltip>
                  ) : null}
                </Typography>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1" className={classes.secondaryText}>
            NOTHING TO SHOW
          </Typography>
        )}
      </Container>
    </MuiDialog>
  );
};

export default WalletDialog;

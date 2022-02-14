import { IconButton, Slide, Snackbar as SnackbarMui } from '@material-ui/core'
import { ClearOutlined, LinkOutlined } from '@material-ui/icons'
import Alert from '@material-ui/lab/Alert'
import { ETHERSCAN_TX_BASE_URL } from '../../constants'
import { useSnackbar } from '../../hooks'
import { useStyles } from './styles'

const Snackbar = () => {
  const classes = useStyles()
  const {
    open, message, severity, transactionHash, hideSnackbarF,
  } = useSnackbar()

  const TransitionUp = (props) => <Slide {...props} direction="up" /> // eslint-disable-line react/jsx-props-no-spreading

  return (
    <SnackbarMui
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={hideSnackbarF}
      TransitionComponent={TransitionUp}
      action={(
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={hideSnackbarF}
        >
          <ClearOutlined fontSize="small" />
        </IconButton>
      )}
    >
      <Alert
        onClose={hideSnackbarF}
        severity={severity}
        className={classes.snackbarStyles}
        style={open ? {} : { display: 'none' }}
      >
        {message}
        {transactionHash && (
          <a
            className={classes.etherscan}
            href={ETHERSCAN_TX_BASE_URL + transactionHash}
            target="_blank"
            rel="noreferrer"
          >
            <LinkOutlined />
            {' '}
            <span>View on etherscan</span>
          </a>
        )}
      </Alert>
    </SnackbarMui>
  )
}

export default Snackbar

import { makeStyles } from '@material-ui/styles'

export const useStyles = makeStyles((theme) => ({
  snackbarStyles: {
    width: 250,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
    backgroundColor: theme.palette.background.primary,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.border.lightBorder}`,
    '& .MuiAlert-icon': {
      color: theme.palette.primary.main,
    },
    '& .MuiAlert-message': {
      fontSize: '12px',
      letterSpacing: 2,
    },
  },
  etherscan: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary.main,
    '& svg': {
      marginRight: '4px',
    },
  },
}))

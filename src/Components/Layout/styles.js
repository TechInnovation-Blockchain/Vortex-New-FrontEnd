import { makeStyles } from '@material-ui/styles'

export const useStyles = makeStyles((theme) => ({
  connectWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '15px',
  },
  connectBtn: {
    width: '230px !important',
    fontSize: '14px !important',
    margin: '8px auto !important',
  },
  bottomError: {
    color: theme.palette.error.main,
    fontWeight: 500,
    fontSize: '11px',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  btnWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  bottomPara: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& p:first-child': {
      letterSpacing: '0px',
      fontSize: '12px',
      color: '#74747B',
    },
    '& p:last-child': {
      letterSpacing: '0px',
      fontWeight: 600,
      color: theme.palette.text.title,
      fontSize: '14px',
    },
    '& img': {
      marginBottom: '5px',
    },
  },
  social: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
    '& a': {
      color: theme.palette.text.title,
      margin: theme.spacing(0, 0.6),
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
  },
  creditsImage: {
    marginBottom: '20px',
  },
}))

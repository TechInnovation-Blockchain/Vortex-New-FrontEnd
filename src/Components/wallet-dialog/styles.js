import { makeStyles } from '@material-ui/styles'

export const useStyles = makeStyles((theme) => ({
  dropdown: {
    background: theme.palette.background.dialog,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(1),
    position: 'relative',
  },
  dropdownIcon: {
    color: theme.palette.text.secondary,
    position: 'absolute',
    right: 0,
    fontWeight: 900,
  },
  closeBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    color: theme.palette.text.secondary,
  },
  clearSearch: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: 'translateY(-50%)',
    color: theme.palette.text.disabled,
  },
  dialogPaper: {
    maxWidth: 400,
    width: '100vw',
    borderRadius: '15px',
    border: '1px solid rgba(197,197,197,.1);',
  },
  dialog: {
    textAlign: 'center',
    padding: theme.spacing(2),
    paddingBottom: 0,

    '&>*': {
      marginBottom: theme.spacing(2),
    },
    background: theme.palette.background.primary,
    '@media(max-width:330px)': {
      padding: theme.spacing(1),
    },
  },
  dialogHeading: {
    color: theme.palette.primary.main,
    fontWeight: 700,
    padding: '5px 0',
    fontSize: '14px',
  },
  textField: {
    borderRadius: '15px',
    background: theme.palette.background.secondary,
    '& .MuiInputBase-input': {
      height: 36,
      fontWeight: '700 !important',
      padding: theme.spacing(0, 1),
      lineHeight: 1.5,
      textAlign: 'center',
      color: '#ffffff',
      fontSize: '14px',
    },
    '& ::placeholder': {
      color: '#ffffff',
      opacity: '1!important',
    },
  },
  list: {
    maxHeight: 500,
    overflowY: 'hidden',
    padding: 0,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
    position: 'relative',
    borderRadius: '15px',
    '&:hover': {
      backgroundColor: '#65C988',
    },
  },
  selectedListItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.primary,
    backgroundColor: '#65C988',
    borderRadius: '15px',
    position: 'relative',
    '& p': {
      color: theme.palette.text.primary,
    },
    '&:hover': {
      backgroundColor: '#65C988',
      borderRadius: '15px',
    },
  },

  listItemText: {
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    fontSize: '14px',
    textTransform: 'uppercase',
  },
  disconnect: {
    position: 'absolute',
    right: '10px',
  },
  loadingIcon: {
    marginRight: 5,
  },
  secondaryText: {
    color: theme.palette.text.secondary,
    fontWeight: 700,
  },
  secondaryHeading: {
    color: theme.palette.text.disabled,
    fontWeight: 700,
    fontSize: '12px',
  },
}))

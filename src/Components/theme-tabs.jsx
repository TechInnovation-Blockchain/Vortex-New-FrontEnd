import { Box } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'

const ThemeTabs = (props) => {
  const {
    children, value, index, ...other
  } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other} // eslint-disable-line react/jsx-props-no-spreading
    >
      {value === index && (
        <Box px={3} pt={3}>
          {children}
        </Box>
      )}
    </div>
  )
}

const StyledTabs = withStyles({
  root: {
    '& div.MuiTabs-scroller': {
      '& .MuiTabs-flexContainer': {
        justifyContent: 'center',
      },
    },
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#80FFB3',
    },
  },
})((props) => (
  <Box px={3}>
    {/*  eslint-disable-next-line react/jsx-props-no-spreading */}
    <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />
  </Box>
))

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'uppercase',
    letterSpacing: '2px',
    color: '#fff',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(28),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
    wrapper: {
      width: '10px',
    },
  },
  // eslint-disable-next-line react/jsx-props-no-spreading
}))((props) => <Tab disableRipple {...props} />)

export { ThemeTabs, StyledTab, StyledTabs }

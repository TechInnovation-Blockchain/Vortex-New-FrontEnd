import { makeStyles } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel'

const labelStyles = makeStyles(() => ({
  label: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
    color: '#CACACE!important',
    fontSize: '14px',
    paddingBottom: '5px',
  },
}))

const ThemeLabel = ({ label }) => {
  const classes = labelStyles()
  return (
    <>
      <InputLabel focused className={classes.label}>
        {label}
      </InputLabel>
    </>
  )
}
export default ThemeLabel

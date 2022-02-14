import { makeStyles } from '@material-ui/core/styles'

const styles = ({ label, font }) => makeStyles(() => ({
  selectRoot: {
    fontSize: '20px',
    padding: '7px 15px',
  },
  inputProps: {
    fontWeight: 'bold',
    marginLeft: '0',
    marginTop: label ? '18px' : '5px',
    color: '#65C988',
    fontSize: font || '',
    height: '35px',
  },
  inputLabel: {
    fontSize: '16px',
    width: '125%',
  },
  sideLabel: {
    fontSize: '10px',
    fontWeight: 'bold',
  },
}))()

export default styles

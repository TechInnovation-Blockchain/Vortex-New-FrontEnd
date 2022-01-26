import { makeStyles } from '@material-ui/core/styles'

const inputStyles = makeStyles(() => ({
  selectRoot: {
    color: '#FFFFFF',
    fontSize: '16px',
    // fontWeight: 'bold',
    lineHeight: '1.9rem',
    marginTop: '5px',
    padding: '5px 13px 10px',
  },
  icon: {
    color: '#FFFFFF',
    margin: '4px 2px',
  },
  selectPaper: {
    // backgroundColor: "#65C988",
    padding: '5px',
    // borderRadius: "5px",
    color: '#fff',
    background:
      'transparent linear-gradient(126deg, #FEF8F821 0%, #FFFFFF14 100%) 0 0 no-repeat padding-box',
    backdropFilter: 'blur(10px)',
    '& li': {
      fontSize: '18px',
      fontWeight: 'bold',
    },
    '& li:hover': {
      backgroundColor: '#65C988',
    },
  },
  deleteBtn: {
    cursor: 'pointer',
  },
  tokenAddressGroup: {
    borderRadius: '15px',
    border: '1px solid #6C6C6C',
    padding: '15px',
    boxShadow: '15px 15px 50px #0000001c',
  },
}))

export default inputStyles

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import InfoIcon from '@material-ui/icons/Info'

const inputStyles = ({ label, font }) => makeStyles(() => ({
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

const InputText = ({
  fontSize, className, Sublabel, label, tooltip, marginSm, value, onChange, type, placeholder, sideLabel,
}) => {
  const classes = inputStyles({ label, font: fontSize })
  const id = Math.random().toString(36).substring(2) + new Date().getTime().toString(36)
  return (
    <>
      <div className={`select-box ${className}`}>
        <div
          className={
            `${classes.selectRoot
            } d-flex justify-content-between align-items-end paddingResize`
          }
          // style={styleParent}
          style={{ padding: marginSm ? '0px 15px' : '7px 15px' }}
        >
          {/* {label && <ThemeLabel label={label}/>} */}
          <TextField
            id={id}
            label={(
              <div className="pb-2 fontResize">
                {Sublabel ? <span className="pb-2"><Sublabel /></span> : null}
                {label && (
                  <div className="d-flex align-items-center mt-3 gap-2">
                    <span className=" d-block">{label}</span>
                    {tooltip && (
                      <Tooltip title={tooltip}>
                        <InfoIcon />
                      </Tooltip>
                    )}
                  </div>
                )}
              </div>
            )}
            variant="standard"
            type={type}
            placeholder={placeholder}
            InputLabelProps={{ shrink: true, className: classes.inputLabel }}
            fullWidth
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
            inputProps={{
              className: `inputText ${classes.inputProps}`,
            }}
            className={marginSm ? 'margin-sm' : ''}
          />
          <span className={classes.sideLabel}>{sideLabel}</span>
        </div>

        <style scoped>
          {`
          .margin-sm input {
            margin-top: 0px;
            margin-bottom: 5px;
          }
        `}
        </style>
      </div>
    </>
  )
}
export default InputText

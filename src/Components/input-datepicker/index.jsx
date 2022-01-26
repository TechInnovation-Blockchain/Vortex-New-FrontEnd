import { makeStyles } from '@material-ui/core/styles'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { useState } from 'react'
import InfoIcon from '@material-ui/icons/Info'
import Tooltip from '@material-ui/core/Tooltip'

const inputStyles = makeStyles(() => ({
  root: {
    //
    width: '100%',
    paddingTop: '5px',
    paddingLeft: '15px',
  },

  inputProps: {},
}))
const InputDatePicker = ({
  label,
  className,
  date,
  minDate,
  maxDate,
  setDate,
  tooltip,
}) => {
  const classes = inputStyles()
  const [isOpen, setIsOpen] = useState(false)
  // const [selectedDate, setSelectedDate] = React.useState(date || '-');

  // const handleDateChange = (date) => {
  //   setDate(date);
  //   setSelectedDate(date);
  // };
  return (
    <>
      <div
        style={{ width: '100%' }}
        className={`d-table select-box ${className}`}
      >
        <form
          className={`table-cell-middle w-100${classes.root}`}
          noValidate
          autoComplete="off"
        >
          <KeyboardDatePicker
            disabled
            margin="normal"
            label={(
              <h3
                className="pb-2"
                style={{
                  paddingLeft: '20px',
                  marginTop: '-14px',
                  color: '#c5c5c5',
                }}
              >
                {label && (
                  <div className="d-flex align-items-center">
                    {tooltip && (
                      <>
                        <span className="">{label}</span>
                        <Tooltip title={tooltip} disableTouchListener style={{ marginLeft: '5px', fontSize: '20px !important' }}>
                          <InfoIcon />
                        </Tooltip>
                      </>
                    )}
                    {!tooltip && (
                      <>
                        <span style={{ marginTop: '-5px' }}>{label}</span>
                      </>
                    )}
                  </div>
                )}
              </h3>
            )}
            format="dd.MM.yyyy"
            // value={selectedDate}
            value={date || '-'}
            inputVariant="standard"
            inputProps={{
              className: 'inputText ',
              style: {
                background: '#65C988',
                color: '#FFFFFF',
                padding: '10px 13px',
                marginBottom: '5px',
                fontWeight: 'bold',
                borderRadius: '15px',
                border: 'none',
                marginTop: '1.5px',
                width: '100%',
                textAlign: 'center',
                cursor: 'pointer',
              },
            }}
            minDate={minDate}
            maxDate={maxDate}
            InputLabelProps={{
              shrink: true,
              style: { fontSize: '20px', paddingTop: '2px', paddingLeft: '' },
            }}
            placeholder="-"
            onClick={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            open={isOpen}
            invalidDateMessage=""
            // onChange={handleDateChange}
            onChange={setDate}
            PopoverProps={{
              style: {
                fontSize: '22px',
              },
            }}
            className={classes.root}
            DialogProps={{ style: { fontSize: '22px' } }}
            KeyboardButtonProps={{ disabled: true, style: { display: 'none' } }}
            style={{ height: '64px' }}
          />
        </form>

        <style scoped>
          {`
          .MuiOutlinedInput-adornedEnd {
              padding-right: 14px;
              margin-top: 15px;
          }
        `}
        </style>
      </div>
    </>
  )
}
export default InputDatePicker

import React from 'react'
import TextField from '@material-ui/core/TextField'
import { InputProps as StandardInputProps } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import InfoIcon from '@material-ui/icons/Info'
import inputStyles from './styles'

export interface Props {
  fontSize?: Number,
  className: string,
  Sublabel?: typeof React.Component,
  label: string,
  tooltip?: string,
  marginSm: boolean,
  value: string,
  onChange: (value: string) => void,
  type: string,
  placeholder: string,
  sideLabel?: string,
  error?: string,
  inputProps: StandardInputProps['inputProps'],
}

const InputText: React.FC<Props> = ({
  fontSize, className, Sublabel, label, tooltip, marginSm, value, onChange, type, placeholder, sideLabel, error, inputProps = {},
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
          style={{ padding: marginSm ? '0px 15px' : '7px 15px' }}
        >
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
              ...inputProps,
            }}
            className={marginSm ? 'margin-sm' : ''}
            error={!!error}
            helperText={error}
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

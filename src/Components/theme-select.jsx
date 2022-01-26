import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'

const inputStyles = makeStyles(() => ({
  selectRoot: {
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: 'bold',
    lineHeight: '1.9rem',
    marginTop: '5px',
    padding: '5px 13px 10px',
  },
  icon: {
    color: '#FFFFFF',
    margin: '4px 2px',
    right: '8px',
  },
  selectPaper: {
    // backgroundColor: "#65C988",
    padding: '5px',
    borderRadius: '15px',
    color: '#fff',
    background:
      'transparent linear-gradient(126deg, #FEF8F821 0%, #FFFFFF14 100%) 0 0 no-repeat padding-box',
    backdropFilter: 'blur(10px)',
    '& li': {
      fontSize: '18px',
      borderRadius: '10px',
      fontWeight: 'bold',
    },
    '& li:hover': {
      borderRadius: '10px',
      backgroundColor: '#65C988',
    },
  },
}))

const ThemeSelect = ({
  options, onChange = () => {}, value = 0, style,
}) => {
  const [val, setValue] = useState(value)
  const [displayOptions, setDisplayOptions] = useState(options)
  function changeValue(v) {
    setValue(v)
    onChange(v)
  }

  const selectClasses = inputStyles()
  return (
    <>
      <Select
        classes={{
          root: selectClasses.selectRoot,
          icon: selectClasses.icon,
        }}
        value={val}
        onOpen={() => setDisplayOptions(options.filter((option) => option.value))}
        onClose={() => setDisplayOptions(options)}
        MenuProps={{ classes: { paper: selectClasses.selectPaper } }}
        onChange={(e) => changeValue(e.target.value)}
        className="inputSelect "
        style={style}
      >
        {displayOptions?.map((option, key) => (
          // eslint-disable-next-line react/no-array-index-key
          <MenuItem value={option.value} key={key} className="input-menu">
            {option.icon && (
              <img
                src={option.icon}
                alt={option.label}
                width="15"
                className="mr-2"
              />
            )}
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </>
  )
}
export default ThemeSelect

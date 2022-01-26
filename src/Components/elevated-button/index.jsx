import { Button } from '@material-ui/core'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const ElevatedBtn = ({
  title, onClick, style, expanded,
}) => (
  <div className="elevated-button" style={style}>
    <Button
      variant="contained"
      color="default"
      size="small"
      disableElevation
      className="yield-history-btn mt-5 relative"
      onClick={onClick}
      disableRipple
    >
      <svg
        width="100%"
        height="142"
        viewBox="0 0 884 142"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute z-20"
      >
        <path
          d="M14.8 128L0 135H855.8L844.8 130.5L834.8 125L824.3 118.5L814.8 111.5L808.3 105L800.3 96.5L786.3 82L759.8 53L747.3 40L735.8 29L726.8 22L714.8 14L697.3 6L678.3 0.5L177.3 0L157.8 6L139.3 14.5L125.8 23L111.8 34L93.3 55L75.8 72.5L63.3 86L49.8 100.5L36.3 114.5L25.3 122L14.8 128Z"
          fill="#373737"
        />
      </svg>
      <span className="d-flex align-items-center gap-1 z-100 small">
        <span className="px-2 elevated-title">
          {' '}
          {title}
        </span>
        {expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </span>
    </Button>
  </div>
)
export default ElevatedBtn

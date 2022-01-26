import { Typography } from '@material-ui/core'
import ThemeModal from '../../Components/theme-modal'

const StakePending = () => {
  const content = () => (
    <>
      <div className="content text-center">
        <svg className="progress-ring" width="120" height="120">
          <circle
            stroke="#707070"
            strokeWidth="6"
            fill="transparent"
            r="45"
            cx="60"
            cy="60"
          />
        </svg>
        <Typography>
          <p style={{ fontSize: '24px' }} className="mb-4">
            STAKE PENDING
          </p>
          <p className="text">
            <span className="primaryText">10,000 XIO</span>
            {' '}
            tokens will be
            staked into the XIO portal, earning portal yields from start date to
            end date.
          </p>
        </Typography>
      </div>
    </>
  )
  return (
    <>
      <ThemeModal show Content={content} />
    </>
  )
}

export default StakePending

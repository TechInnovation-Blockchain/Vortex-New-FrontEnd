import { Typography } from '@material-ui/core'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import { useState } from 'react'
import ThemeModal from '../../Components/theme-modal'

const UnstakingResponseSuccess = () => {
  const [modal, setModal] = useState(true)

  const content = () => (
    <div className="text-center p-4">
      {/* <svg
        className="progress-ring"
        width="120"
        height="120">
        <circle
          className="progress-ring__circle"
          stroke='#80FFB3'
          stroke-width="6"
          fill="transparent"
          r="45"
          cx="60"
          cy="60"/>
      </svg> */}
      <DoneAllIcon color="primary" style={{ fontSize: '11rem' }} />
      <Typography>
        <p style={{ fontSize: '24px' }} className="mb-4">
          PORTAL UNSTAKE SUCCESS
        </p>
      </Typography>
    </div>
  )

  return (
    <>
      <ThemeModal
        show={modal}
        onClose={() => setModal(false)}
        Content={content}
      />
    </>
  )
}

export default UnstakingResponseSuccess

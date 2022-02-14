import { CircularProgress, Typography } from '@material-ui/core'
import { useState } from 'react'
import ThemeModal from 'components/theme-modal'

const UnstakingResponsePending = () => {
  const [modal, setModal] = useState(true)

  const content = () => (
    <div className="content text-center px-4">
      {/* <svg
        className="progress-ring"
        width="120"
        height="120">
        <circle
          className=""
          stroke='#707070'
          stroke-width="6"
          fill="transparent"
          r="45"
          cx="60"
          cy="60"/>
      </svg> */}
      <CircularProgress style={{ color: 'gray' }} />
      <Typography>
        <p style={{ fontSize: '24px' }} className="mb-4">
          PORTAL UNSTAKE PENDING
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

export default UnstakingResponsePending

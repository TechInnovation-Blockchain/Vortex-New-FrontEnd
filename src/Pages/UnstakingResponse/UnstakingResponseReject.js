import { Typography } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'
import { useState } from 'react'
import ThemeModal from '../../Components/theme-modal'

const UnstakingResponseReject = () => {
  const [modal, setModal] = useState(true)

  const content = () => (
    <div className="text-center p-4">
      <ClearIcon color="error" style={{ fontSize: '11rem' }} />
      <Typography>
        <p style={{ fontSize: '24px' }} className="mb-4">
          PORTAL UNSTAKE REJECTED
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

export default UnstakingResponseReject

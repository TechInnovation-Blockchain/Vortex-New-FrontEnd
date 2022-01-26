import { useState } from 'react'
import { CircularProgress, Typography } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import ThemeModal from './theme-modal'

const ThemeResponse = ({ title, type }) => {
  const [modal, setModal] = useState(true)

  const content = () => (
    <div className="text-center px-4">
      {/* <div className="content text-center px-4"> */}
      {type === 'pending' && <CircularProgress style={{ color: 'gray' }} />}
      {type === 'success' && <DoneAllIcon color="primary" style={{ fontSize: '11rem' }} />}
      {type === 'failed' && <ClearIcon color="error" style={{ fontSize: '11rem' }} />}
      {type === 'rejected' && <ClearIcon color="error" style={{ fontSize: '11rem' }} />}
      <Typography>
        <p style={{ fontSize: '24px' }} className="mb-4">
          {title}
        </p>
      </Typography>
    </div>
  )

  return (
    <ThemeModal
      show={modal}
      onClose={() => setModal(false)}
      Content={content}
    />
  )
}

export default ThemeResponse

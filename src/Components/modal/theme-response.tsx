import { useState } from 'react'
import { CircularProgress, Typography } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import { TransactionStatus } from '../../constants'
import Modal from '.'

interface Props {
  title: string,
  type: TransactionStatus,
}

const ThemeResponse = ({ title, type }: Props) => {
  const [modal, setModal] = useState(true)
  return (
    <Modal
      show={modal}
      onClose={() => setModal(false)}
    >
      <div className="text-center px-4">
        {type === TransactionStatus.TRANSACTION_PENDING && <CircularProgress style={{ color: 'gray' }} />}
        {type === TransactionStatus.TRANSACTION_SUCCESS && <DoneAllIcon color="primary" style={{ fontSize: '11rem' }} />}
        {type === TransactionStatus.TRANSACTION_FAILED && <ClearIcon color="error" style={{ fontSize: '11rem' }} />}
        {type === TransactionStatus.TRANSACTION_REJECTED && <ClearIcon color="error" style={{ fontSize: '11rem' }} />}
        <Typography>
          <p style={{ fontSize: '24px' }} className="mb-4">
            {title}
          </p>
        </Typography>
      </div>
    </Modal>
  )
}

export default ThemeResponse

import { Modal } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'
import GlassCard from '../glass-card'

interface Props {
  show: boolean,
  children: JSX.Element,
  onClose: () => void,
}

const ThemeModal = ({
  show, children, onClose,
}: Props) => (
  <Modal
    BackdropProps={{ style: { backgroundColor: 'rgb(0,0,0,0.7)' } }}
    open={show}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
  >
    <GlassCard
      color="#ffffff"
      margin="10% auto"
      height="auto"
      width="450px"
      dark
    >
      <div
        style={{
          top: '25px',
          right: '25px',
          position: 'absolute',
          cursor: 'pointer',
        }}
      >
        <ClearIcon onClick={onClose} />
      </div>
      <div className="modal-content px-4 pb-4">
        {children}
      </div>
    </GlassCard>
  </Modal>
)
export default ThemeModal

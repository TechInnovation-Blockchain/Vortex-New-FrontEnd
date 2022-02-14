import { Modal } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'
import GlassCard from './glass-card'

const ThemeModal = ({
  show, children, Content, onClose,
}) => (
  <>
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
          {Content ? (
            <Content />
          ) : children || <h2 className="p-5 m-5">No Content Added</h2>}
        </div>
      </GlassCard>
    </Modal>

    <style>
      {`
        div {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE 10+ */
        }

        /* Works on Chrome, Edge, and Safari */
        ::-webkit-scrollbar {
          // width: 3px;
          // width: 0;
          // height: 0;
          display: none;
        }
        
        ::-webkit-scrollbar-track-piece {
          background: #bdbdbd;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #bdbdbd;
        }


        div {
          scrollbar-visibility: hidden; /* <--- I wish we had this one !! */
        }
      `}
    </style>
  </>
)
export default ThemeModal

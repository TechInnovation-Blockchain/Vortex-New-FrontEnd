import { Button } from '@material-ui/core'
import { useSelector } from 'react-redux'

const DepositConfirm = ({
  title,
  confirmed,
  cancelled,
  getDescription,
}) => {
  const loadingData = useSelector((state) => state.data_loading)
  return (
    <>
      <div className="content text-center p-4">
        <p className="modal-title mb-4">{title || 'CONFIRM'}</p>
        <p>{getDescription()}</p>
        <div className="mt-5">
          <div className="row">
            <div className="col-6 pl-2">
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                className="primaryBtn"
                onClick={cancelled}
              >
                Cancel
              </Button>
            </div>
            <div className="col-6 pr-2">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="primaryBtn"
                onClick={confirmed}
                disabled={loadingData.data === 'data loading!'}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default DepositConfirm

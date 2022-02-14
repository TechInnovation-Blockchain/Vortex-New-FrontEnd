import { CircularProgress } from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import {
  PopupDropdown,
} from 'components'

interface Props {
  selectItemsData: Record<string, any>,
  select: string,
  setModal: () => void,
  setSelectTokenOptions: () => void,
  setTokenContractAddress: () => void,
  setSelectedPortal: () => void,
  setInputValue: (value: string) => void,
  handleSearch: () => void,
  pagination: { currentPage: number, pageSize: number },
  searchSmallFont: string,
  setPagination: (data: { currentPage: number, pageSize: number }) => void,
}

const ModalContent = ({
  selectItemsData,
  select,
  setModal,
  setSelectTokenOptions,
  setTokenContractAddress,
  setSelectedPortal,
  setInputValue,
  handleSearch,
  pagination,
  searchSmallFont,
  setPagination,
}: Props) => (
  <div className="content p-4" style={{ maxWidth: '600px' }}>
    <main>
      <h3 style={{ padding: '0 25px' }}>
        Select a portal
      </h3>
      <div className="modal__search-section">
        <input
          type="text"
          placeholder="Search Portal"
          className="modal__search-box"
          style={{
            fontSize: searchSmallFont.length > 0 ? searchSmallFont : '',
          }}
          onChange={(e) => {
            if (setInputValue) {
              setInputValue(e.target.value)
            }
          }}
        />
        <button
          className="modal__search-btn"
          onClick={handleSearch}
          type="button"
        >
          Search
        </button>
      </div>
      <section style={{}}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '2rem',
            padding: '0 16px',
          }}
        >
          <p>Token Name</p>
          <p>APY</p>
        </div>

        <div style={{ overflowY: 'auto', height: '20rem' }}>
          {/* eslint-disable-next-line no-nested-ternary */}
          {selectItemsData ? (
            selectItemsData.length === 0 ? (
              <div
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: '#bdbdbd',
                  textAlign: 'center',
                }}
              >
                No Data
              </div>
            ) : (
              selectItemsData[0].map((item: any, index: number) => (
                <div
                  key={index} // eslint-disable-line react/no-array-index-key
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#bdbdbd',
                  }}
                >
                  <PopupDropdown
                    data={item}
                    select={select}
                    setSelectedTokenOption={setSelectTokenOptions}
                    setModal={setModal}
                    setTokenContractAddresses={setTokenContractAddress}
                    setRequestedTokenOptions={() => { }}
                    setSelectedPortal={setSelectedPortal}
                  />
                </div>
              ))
            )
          ) : (
            <CircularProgress
              style={{ color: 'gray', display: 'flex', margin: 'auto' }}
            />
          )}
        </div>
      </section>
      <div className="yield-pagination text-center mt-2 d-flex align-items-center justify-content-center">
        <span className="page-number">
          {`${pagination.currentPage} of ${pagination.pageSize}`}
        </span>
        <span className="pagination-control ml-4 d-flex align-self-center">
          <NavigateBeforeIcon
            className={
              pagination.currentPage === 1 ? 'nav-control' : 'nav-control'
            }
            onClick={() => {
              if (pagination.currentPage > 1) {
                setPagination({
                  ...pagination,
                  currentPage: pagination.currentPage - 1,
                })
              }
            }}
          />
          <NavigateNextIcon
            className={
              pagination.currentPage === pagination.pageSize
                ? 'nav-control ml-3'
                : 'nav-control ml-3'
            }
            onClick={() => {
              if (pagination.currentPage < pagination.pageSize) {
                setPagination({
                  ...pagination,
                  currentPage: pagination.currentPage + 1,
                })
              }
            }}
          />
        </span>
      </div>
    </main>
  </div>
)

export default ModalContent

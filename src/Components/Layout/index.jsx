import LayoutFooter from './layout-footer'
// Layout Related Components
import LayoutHeader from './layout-header'
import './layout.css'

const Layout = ({ children }) => (
  <>
    <div className="main">
      <div className="bglayer" />
      <div className="main-content">
        <LayoutHeader />
        <div className="content">{children}</div>
        <LayoutFooter />
      </div>
    </div>
  </>
)

export default Layout

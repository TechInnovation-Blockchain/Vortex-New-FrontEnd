import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'

const AuthMiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => (
  <Route
    {...rest} // eslint-disable-line react/jsx-props-no-spreading
    render={(props) => {
      if (rest.redirectTo) {
        return (
          <Redirect
            to={{ pathname: rest.redirectTo, state: { from: props.location } }}
          />
        )
      }
      return (
        <Layout>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...props} />
        </Layout>
      )
    }}
  />
)

AuthMiddleware.defaultProps = {
  isAuthProtected: false,
  component: null,
  location: {},
  redirectTo: '',
  layout: null,
  user: null,
}

AuthMiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.elementType,
  location: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  redirectTo: PropTypes.string,
  layout: PropTypes.elementType,
  user: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

export default AuthMiddleware

import React from 'react';
import PropTypes from 'prop-types';
import { Navbar as BSNavbar } from 'react-bootstrap';
import UserInfo from './UserInfo';

const MNLavbar = ({
  logo,
  logoStyle,
  title,
  children,
  withoutUser,
  ...props
}) => (
  <BSNavbar fluid={true}>
    <BSNavbar.Header>
      {logo && (
        <BSNavbar.Brand>
          <div className="navbar-left">
            <props.brandLink>
              <img
                src={logo}
                style={logoStyle || { maxWidth: '100px', maxHeight: '45px' }}
              />
            </props.brandLink>
          </div>
        </BSNavbar.Brand>
      )}
      <BSNavbar.Brand>
        <props.brandLink>
          <span>{title}</span>
        </props.brandLink>
      </BSNavbar.Brand>
      <BSNavbar.Toggle />
    </BSNavbar.Header>
    <BSNavbar.Collapse>
      {children}
      {!withoutUser && (
        <UserInfo
          isAuthenticated={props.isAuthenticated}
          currentUsername={props.currentUsername}
          profile={props.profile}
          submitLogout={props.submitLogout}
          loginPath={props.loginPath}
        />
      )}
    </BSNavbar.Collapse>
  </BSNavbar>
);

const defaultBrandLink = props => <a href="/" {...props} />;

MNLavbar.defaultProps = {
  brandLink: defaultBrandLink
};

MNLavbar.propTypes = {
  title: PropTypes.string,
  brandLink: PropTypes.func,
  withoutUser: PropTypes.bool
};

export default MNLavbar;
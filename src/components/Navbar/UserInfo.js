import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, Nav, NavItem, Navbar as BSNavbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const UserInfo = ({
  isAuthenticated,
  currentUsername,
  profile,
  submitLogout,
  loginPath
}) => {
  return <div>
    {isAuthenticated ? (
      <div className="pull-right">
        <BSNavbar.Text>
          <Glyphicon glyph="user" /> {profile && profile.name.fullName || currentUsername}
        </BSNavbar.Text>
        <Nav>
          <NavItem
            onClick={e => {
              e.preventDefault();
              submitLogout(currentUsername);
            }}
          >
            Logout
          </NavItem>
        </Nav>
      </div>
    ) : (
      <Nav pullRight>
        <LinkContainer exact to={loginPath || '/login'}>
          <NavItem>Login</NavItem>
        </LinkContainer>
      </Nav>
    )}
  </div>
};

UserInfo.propTypes = {
  isAuthenticated: PropTypes.bool,
  currentUsername: PropTypes.string,
  profile: PropTypes.object,
  submitLogout: PropTypes.func,
  loginPath: PropTypes.string
};

export default UserInfo;
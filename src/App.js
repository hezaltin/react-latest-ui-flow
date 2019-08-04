import React from 'react';
import { Grid } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { AppContainer } from './containers';

import Routes from './components/Routes';
import Navbar from './components/Navbar/Navbar';

const App = appProps => { 
  return (
  <AppContainer
    {...appProps}
    render={props => {
      return (
        <div>
          <Navbar
            isAuthenticated={props.isAuthenticated}
            currentUsername={props.currentUser}
            profile={props.profile}
            submitLogout={props.submitLogout}
          />
          <Grid fluid={true}>
            <Routes {...props} />
          </Grid>
        </div>
      )
    }}
  />
)
    }

export default withRouter(App);

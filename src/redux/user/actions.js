import * as types from './actionTypes';
import defaultAPI from './api';

export const completeLogin = user => ({
  type: types.NETWORK_LOGIN_SUCCESS,
  payload: { user }
});

export const setCurrentUser = username => ({
  type: types.SET_CURRENT_USER,
  payload: { username }
});

export const submitLogin = (username, password, extraArgs = {}) => {
  const API = extraArgs.api || defaultAPI;
  return dispatch => {
    // TODO: pending state
    // dispatch({
    //   type:
    // })

    dispatch(setCurrentUser(username));
    // dispatch(completeLogin({ username }));
    dispatch(getAuthenticationStatus())

// THIS IS THE ORIGINAL CODE FOR THE COMMAND

    // return API.login(username, password).then(response => {
    //   if (response.ok) {
    //     dispatch(setCurrentUser(username));
    //     dispatch(getAuthenticationStatus())
    //   }
    // });
  };
};

export const completeNetworkLogout = username => ({
  type: types.NETWORK_LOGOUT_SUCCESS,
  payload: { username }
});

export const submitLogout = (username, extraArgs = {}) => {
  const API = extraArgs.api || defaultAPI;
  return dispatch => {
    dispatch(localLogout());
    // TODO: pending state
    // dispatch({
    //   type:
    // })
    return API.logout(username).then(response => {
      if (response.ok) {
        dispatch(completeNetworkLogout(username));
      }
    });
  };
};

export const localLogout = () => ({
  type: types.LOCAL_LOGOUT
});

export const getAuthenticationStatus = (extraArgs = {}) => {
  const API = extraArgs.api || defaultAPI;
  return dispatch => {
    // TODO: pending state
    // dispatch({
    //   type:
    // })

    let responseValue = {authenticated:true,username:"fan",profile:{id:"fan",epass:"lc3268",email:"fan.li@dupont.com",name:{firstName:"Fan",lastName:"Li",fullName:"Fan Li"},approver:{id:"fan",fullName:"Fan Li"},previewCount:0},disallowUpdates:false,appUsersOnly:false,appName:"COMPAS"};

    dispatch({
          type: types.FETCH_AUTHSTATUS_SUCCESS,
          payload: { user: responseValue }
        });
        dispatch(completeLogin({ username: responseValue.username }));
// THIS IS THE ORIGINAL CODE FOR THE COMMAND

    // return API.status().then(response => {
    //   dispatch({
    //     type: types.FETCH_AUTHSTATUS_SUCCESS,
    //     payload: { user: response }
    //   });
    //   dispatch(completeLogin({ username: response.username }));
    // });
  };
};

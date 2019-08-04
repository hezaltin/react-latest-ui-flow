import { combineReducers } from 'redux';
import * as bareTypes from '../actionTypes';

export const createReducer = config => {
  let types = bareTypes;
  if (config && config.namespace) {
    types = Object.keys(types).reduce((newTypes, typeKey) => {
      newTypes[typeKey] = config.namespace + '/' + types[typeKey];
      return newTypes;
    }, {});
  }

  const abstractDisplay = (state = false, action) => {
    switch (action.type) {
      case types.SET_ABSTRACT_DISPLAY:
        return action.payload.display
      default:
        return state
    }
  };

  return combineReducers({
    abstractDisplay
  });
};

// SELECTORS
export const selectors = {
  getCustomDisplay: state => state,
  getAbstractDisplay: state => state.abstractDisplay
};

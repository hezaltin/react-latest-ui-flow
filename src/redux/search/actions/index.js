/* global require */
import * as bareTypes from '../actionTypes';

import {UserForm} from './indexConfig'

// TODO: remove /api/search? or just make it the actual defaultAPI below
// import searchAPI from './api/search'
require('isomorphic-fetch');

const defaultAPI = {
  search: searchQuery => {
    return fetch(new URL('/api/search/all', document.baseURI).toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        ...searchQuery,
        queryText: undefined,
        filters: {
          and: [
            {
              type: 'queryText',
              value: searchQuery.queryText
            },
            ...(searchQuery.filters.filter(x => x.mode === 'and') || [])
          ],
          not: searchQuery.filters.filter(x => x.mode === 'not') || []
        }
      })
    }).then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(error.message);
        });
      }
      return response.json();
    });
  }
};

export default config => {
  let types = bareTypes;
  if (config && config.namespace) {
    types = Object.keys(types).reduce((newTypes, typeKey) => {
      newTypes[typeKey] = config.namespace + '/' + types[typeKey];
      return newTypes;
    }, {});
  }

  const receiveSuccessfulSearch = (response, optionalArgs) => ({
    type: types.SEARCH_SUCCESS,
    payload: { response, ...optionalArgs }
  });

  const runSearch = (searchQuery, optionalArgs = {}) => {
    let searchAPI = defaultAPI;
    if (optionalArgs.api) {
      searchAPI = optionalArgs.api;
      delete optionalArgs.api;
    }
    return dispatch => {
      dispatch({
        type: types.SEARCH_REQUESTED,
        payload: { query: searchQuery, ...optionalArgs }
      });

      // TODO: consider changing shape of state instead of modifying
      // shape of query here
      const { page, pageLength, ...groveSearchQuery } = searchQuery
      console.log('search query', groveSearchQuery)
      return searchAPI
        .search(
          {
            ...groveSearchQuery,
            options: {
              start:
                pageLength && page ? pageLength * (page - 1) + 1 : undefined,
              pageLength: pageLength,
            }
          },
          optionalArgs
        )
        .then(
          data => dispatch(receiveSuccessfulSearch(data, optionalArgs)),
          error => {
            // dispatch({
            //   type: types.SEARCH_FAILURE,
            //   payload: { error: error.message, ...optionalArgs }
            // });
             //THIS IS THE ORIGINAL CODE FOR THE COMMAND
            console.log('UserForm====>',JSON.parse(UserForm))
            dispatch(receiveSuccessfulSearch(JSON.parse(UserForm), optionalArgs))
          }
        );
    };
  };

  const clearSearchResults = (optionalArgs = {}) => ({
    type: types.CLEAR_SEARCH_RESULTS,
    payload: { ...optionalArgs }
  })

  // const suggest = (queryText) => {
  //   return (dispatch, getState) => {
  //     dispatch({ type: types.SUGGEST_REQUESTED, payload: queryText })

  //     let state = getState().search
  //     let query = qb.ext.combined(constraintQuery(state.constraints), state.queryText)

  //     return client.suggest(state.suggestQueryText, query, { options: 'all' })
  //       .then(response => {
  //         if (!response.ok) throw new Error('bad search')
  //         return response.json()
  //       })
  //       .then(
  //         response => dispatch({ type: types.SUGGEST_SUCCESS, payload: response }),
  //         response => dispatch({ type: types.SUGGEST_FAILURE, payload: response }),
  //       )
  //   }
  // }

  // const options = () => {
  //   return dispatch => {
  //     dispatch({ type: types.OPTIONS_REQUESTED })

  //     return client.options('all')
  //     // !response.ok?
  //       .then(response => response.json())
  //       .then(response => {
  //         if (!(response && response.options)) throw new TypeError('invalid options')
  //         return response
  //       })
  //       .then(
  //         response => dispatch({ type: types.OPTIONS_SUCCESS, payload: response }),
  //         response => dispatch({ type: types.OPTIONS_FAILURE, payload: response })
  //       )
  //   }
  // }

  const setQueryText = queryText => {
    return {
      type: types.SET_QUERYTEXT,
      payload: { queryText }
    };
  };

  const changePage = n => {
    return { type: types.CHANGE_PAGE, payload: { page: n } };
  };

  // const pageLength = (l) => {
  //   return dispatch => {
  //     dispatch({ type: types.PAGE_LENGTH, payload: l })
  //     return dispatch(runSearch())
  //   }
  // }

  const addFilter = (constraint, constraintType, values, optional = {}) => {
    values = values instanceof Array ? values : [values];
    return {
      type: types.FILTER_ADD,
      payload: {
        constraint,
        constraintType: constraintType || undefined,
        values,
        boolean: optional.boolean || 'and'
      }
    };
  };

  const removeFilter = (constraint, values, optional = {}) => {
    values = values instanceof Array ? values : [values];
    return {
      type: types.FILTER_REMOVE,
      payload: { constraint, values, boolean: optional.boolean || 'and' }
    };
  };

  const clearFilter = (constraint, optional = {}) => ({
    type: types.FILTER_CLEAR,
    payload: { constraint, ...optional }
  });
  
  const replaceFilter = (constraint, constraintType, values, optional = {}) => {
    // TODO: DRY UP with addFilter?
    values = values instanceof Array ? values : [values];
    return {
      type: types.FILTER_REPLACE,
      payload: {
        constraint,
        constraintType: constraintType || undefined,
        values,
        boolean: optional.boolean || 'and'
      }
    };
  };

  const setAbstractDisplay = display => ({
    type: types.SET_ABSTRACT_DISPLAY,
    payload: { display }
  });

  const updateSearchResult = (uri, update) => ({
    type: types.ADD_RESULT_BOOKMARK,
    payload: { uri, update }
  })

  // Create a search query based on a document extract
  const searchForSimilar = (extract) => {
    const query = [
      extract.keywords.map(x => `"${x.name}"`).join(' OR '),
    ] 
    const constraints = [
      extract.businesses.map(x => `Business_Unit:"${x.name}"`).join(' OR '),
      extract.authors.map(x => `Author:"${x.name}"`).join(' OR '),
    ]
    const docId = extract.docId
    const queryText = `(${query.join(' OR ')}) AND (${constraints.join(' OR ')}) AND -DocID:"${docId}"`

    return dispatch => { 
      dispatch(clearFilter())
      dispatch(setQueryText(queryText))

    }
  }


  return {
    runSearch,
    receiveSuccessfulSearch,
    setQueryText,
    changePage,
    addFilter,
    removeFilter,
    replaceFilter,
    clearFilter,
    clearSearchResults,
    setAbstractDisplay,
    updateSearchResult,
    searchForSimilar,
  };
};

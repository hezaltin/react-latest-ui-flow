import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SearchView from '../../components/SearchView/SearchView'

import { actions, selectors } from '../../redux/search';
import { actions as srvActions, selectors as srvSelectors } from '../../redux/service';
import { bindSelectors } from '../utils/redux-utils';
const boundSelectors = bindSelectors(selectors, 'search');
const boundSrvSelectors = bindSelectors(srvSelectors, 'service')

let SearchContainer = class SearchContainer extends Component {
  render() {
    return <SearchView {...this.props} detailPath="/detail/" />;
  }
};

const mapStateToProps = (state, ownProps) => {
  // TODO: shorten method names by removing 'get' and 'Search'?
  const sel = ownProps.selectors || boundSelectors;
  const srvSel = boundSrvSelectors
  return {
    // TODO: get visible queryText from the stagedSearch?
    queryText: sel.getVisibleQueryText(state),
    stagedSearch: sel.getStagedQuery(state),
    results: sel.getSearchResults(state),
    facets: sel.searchFacets(state),
    activeFilters: sel.stagedFilters(state),
    executionTime: sel.getSearchExecutionTime(state),
    total: sel.getSearchTotal(state),
    totalPages: sel.getSearchTotalPages(state),
    page: sel.getPage(state),
    isSearchPending: sel.isSearchPending(state),
    isSearchComplete: sel.isSearchComplete(state),
    error: sel.getSearchError(state),
    displayAbstract: sel.getAbstractDisplay(state),
    // bookmarkPending: srvSel.bookmarkPending(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let myActions = ownProps.actions || actions;
  console.log('container', ownProps)
  return bindActionCreators(
    {
      runSearch: myActions.runSearch,
      handleQueryTextChange: myActions.setQueryText,
      changePage: myActions.changePage,
      addFilter: myActions.addFilter,
      removeFilter: myActions.removeFilter,
      replaceFilter: myActions.replaceFilter,
      clearFilter: myActions.clearFilter,
      setAbstractDisplay: myActions.setAbstractDisplay,
      clearSearchResults: myActions.clearSearchResults,
      searchForSimilar: myActions.searchForSimilar,
      addBookmark: srvActions.addBookmark,
      removeBookmark: srvActions.removeBookmark,
    },
    dispatch
  );
};

SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer);

export default SearchContainer;
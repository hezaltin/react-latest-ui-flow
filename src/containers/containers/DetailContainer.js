import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DetailView from '../../components/DetailView/DetailView'

import { selectors } from 'grove-crud-redux';
import * as actions from '../../redux/crud/actions'
import { bindSelectors } from '../utils/redux-utils';
import { actions as userActions, selectors as userSelectors } from '../../redux/user';
import { actions as srvActions, selectors as srvSelectors } from '../../redux/service';

const boundSelectors = bindSelectors(selectors, 'documents');
const boundSrvSelectors = bindSelectors(srvSelectors, 'service')
const boundUserSelectors = bindSelectors(userSelectors, 'user');

const mapStateToProps = (state, ownProps) => {
  const sel = boundSelectors;
  const detail = sel.documentById(state, ownProps.id);
  console.log('detail===>',detail)
  return {
    // TODO: move this label implementation to a samplePerson branch
    // because it is not generic, but it is useful for a quick Grove demo
    label: detail && detail.name,
    detail: detail,
    error: sel.errorById(state, ownProps.id),
    contentType: sel.contentTypeById(state, ownProps.id),
    profile: boundUserSelectors.profile(state),
    requestPending: boundSrvSelectors.isRequestPending(state)
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadDetail: actions.fetchDoc,
      requestDoc: srvActions.submitDocRequest,
    },
    dispatch
  );

const DetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailView);

export default DetailContainer;

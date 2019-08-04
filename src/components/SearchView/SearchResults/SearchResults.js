import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, ButtonToolbar, ToggleButtonGroup, ToggleButton, Checkbox } from 'react-bootstrap';
import CardResult from './CardResult';
import ListResult from './ListResult';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


var DefaultNoResults = function DefaultNoResults() {
  return React.createElement(
    Col,
    { md: 12 },
    React.createElement(
      'p',
      null,
      React.createElement('br', null),
      React.createElement(
        'strong',
        null,
        'No results matched your search.'
      )
    )
  );
};


var SearchResults = function (_React$Component) {
  _inherits(SearchResults, _React$Component);

  function SearchResults(props) {
    _classCallCheck(this, SearchResults);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    // var resultComponentName = props.resultComponent ? '' : 'List';
    var resultComponentName = 'Cards';
    // console.log('this', Object.assign({}, this))
    _this.state = {
      resultComponentName: resultComponentName,
      resultComponent: props.resultComponent || ListResult
    };

    _this.setResultType = _this.setResultType.bind(_this);
    return _this;
  }

  SearchResults.prototype.setResultType = function setResultType(e) {
    var resultComponent = void 0;
    if (e === 'Cards') {
      resultComponent = CardResult;
    } else if (e === 'List') {
      resultComponent = ListResult;
    } else {
      throw 'Invalid Result Type: ' + e;
    }
    this.setState({
      resultComponentName: e,
      resultComponent: resultComponent
    });
  };

  SearchResults.prototype.render = function render() {
    var _this2 = this;

    if (!this.props.results) {
      return null;
    }
    // For now, if you provide a resultComponent, we suppress the choice among
    // various types, though I could imagine letting the user specify > 1
    return React.createElement(
      'div',
      null,
      this.props.results.length > 0 && !this.props.resultComponent && React.createElement(
        Col,
        { xs: 12, md: 6, style: { float: 'right' } },
        React.createElement(
          ButtonToolbar,
          { style: { float: 'right', marginBottom: '10px' } },
          // Disable toggle between list and card views
          // React.createElement(
          //   ToggleButtonGroup,
          //   {
          //     type: 'radio',
          //     name: 'result-options',
          //     value: this.state.resultComponentName,
          //     onChange: this.setResultType
          //   },
          //   React.createElement(
          //     ToggleButton,
          //     { value: 'List' },
          //     'List'
          //   ),
          //   React.createElement(
          //     ToggleButton,
          //     { value: 'Cards' },
          //     'Cards'
          //   )
          // )

          // Toggle between Abstract show/hide
          // <ToggleButtonGroup
          //   type='radio'
          //   name='toggle-abstract'
          //   value={this.state.value}
          //   onChange={this.toggleAbstract}
          // >
          //   <ToggleButton value={true}>Display</ToggleButton>
          //   <ToggleButton value={false}>Hide</ToggleButton>
          // </ToggleButtonGroup>,
          // <Checkbox style={{float: 'right'}} className="abstract-toggle" inline title='Display Abstract' onChange={() => { 
          //   this.setState({ displayAbstract: !this.state.displayAbstract })
          // }}>Display Abstract</Checkbox>
        )
      ),
      React.createElement(
        Row,
        { className: 'ml-search-results' },
        React.createElement(
          Col,
          { md: 12, style:{display: 'flex',
          // justifyContent: 'space-evenly',
          flexWrap: 'wrap'} },

          this.props.results.map(function (result) {
            return React.createElement(_this2.state.resultComponent, {
              key: result.id,
              result: result,
              detailPath: _this2.props.detailPath || '/detail',
              displayAbstract: _this2.props.displayAbstract,
              addBookmark: _this2.props.addBookmark,
              removeBookmark: _this2.props.removeBookmark,
              searchForSimilar: _this2.props.searchForSimilar,
            });
          }),
          this.props.results.length === 0 && React.createElement(this.props.noResults, null)
        )
      )
    );
  };

  return SearchResults;
}(React.Component);

SearchResults.defaultProps = {
  noResults: DefaultNoResults
};

SearchResults.propTypes = process.env.NODE_ENV !== "production" ? {
  resultComponent: PropTypes.func,
  noResults: PropTypes.func,
  results: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string
  })).isRequired,
  detailPath: PropTypes.string,
  addBookmark: PropTypes.func,
  removeBookmark: PropTypes.func,
  searchForSimilar: PropTypes.func,
} : {};

export default SearchResults;
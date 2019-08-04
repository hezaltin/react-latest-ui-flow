import React from 'react';
import PropTypes from 'prop-types';
import { Col, FormGroup, FormControl, InputGroup, Glyphicon, Button } from 'react-bootstrap';

class SearchBar extends React.Component {

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onClear = this.onClear.bind(this)
  }

  componentDidMount() {
    // This is workaround to kick off search once a user log in
    // However it does run every time user navigates back to search route (e.g. from detail),
    // although no duplicate http search request is being made.
    if (!this.props.queryText) {
      this.props.onSearchExecute();
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSearchExecute();
  }

  onChange(e) {
   this.props.onQueryTextChange(e.target.value);
  }

  onClear() {
    this.props.onClearFilter()
    this.props.onQueryTextChange('')
  }

  render() {
    return <Col md={12} className="ml-search-bar">
      <form role="search" onSubmit={this.onSubmit}>
        <FormGroup controlId="search-box">
          <InputGroup>
            <FormControl className="ml-qtext-input" type="text" placeholder="Search..." 
              value={this.props.queryText} onChange={this.onChange}>
            </FormControl>
            <InputGroup.Button>
              <Button className="ml-execute-search btn-raised" disabled={this.props.searchPending} type="submit">
                <Glyphicon glyph='search'></Glyphicon>
                Search
              </Button>
              <Button className="ml-qtext-clear btn-raised" onClick={this.onClear}>
                <Glyphicon glyph='remove'></Glyphicon>
                Clear
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    </Col>
  }
}

SearchBar.propTypes = process.env.NODE_ENV !== "production" ? {
  queryText: PropTypes.string.isRequired,
  onQueryTextChange: PropTypes.func,
  onQueryTextClear: PropTypes.func,
  onSearchExecute: PropTypes.func,
  onClearFilter: PropTypes.func,
  onClearSearchResults: PropTypes.func,
  placeholder: PropTypes.string,
  searchPending: PropTypes.bool
} : {};

export default SearchBar
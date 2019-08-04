import React from 'react';
import { Col, Table, Dropdown, DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchSnippet from './SearchSnippet.js';
import styles from './SearchResults.module.css';
import './SearchResults.module.css';
import {imageUrl} from '../searchView.config';
//c


var getFilename = function getFilename(id) {
  if (!id) {
    return null;
  }
  return id.split('%2F').pop();
};

var imageTagStyleProps = {
  height:'100%',
  width:'100%',
  objectFit: 'cover',
};


const imageContent = {
  fontSize:'130%',
  fontWeight: '700',
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#ececec',
  color: '#888',
  userSelect: 'none',
}

var displayMetadata = function displayMetadata(instance) {
  return  <Table className="result-metadata" size="sm" bordered={false} hover={false} striped={false}>
    <tbody>
      <tr>
        <th>Serial Number:</th>
        <td>{ instance.serial_number }</td>
      </tr>
      <tr>
        <th>Ra Number:</th>
        <td>{ instance.ra_number }</td>
      </tr>
      {/* <tr>
        <th>Manufacturer:</th>
        <td>{ instance.manufacturer }</td>
      </tr> */}
      <tr>
        <th>Date:</th>
        <td>{ instance.date }</td>
      </tr>
      {/* <tr>
        <th>Business Unit:</th>
        <td>{ instance.model}</td>
      </tr> */}
    </tbody>
  </Table>
}

var ListResult = function ListResult(props) {
  return React.createElement(
    Col,
    { xs: 3,style:{border:'1px solid #bbb4b4',marginLeft:'16px',marginBottom:'10px', width: '265px'}, className: "ml-search-result-xs" },
    <div className="btn-group" style={{float: 'right', margin: "6px 0 0 16px"}}>
      {/* <DropdownButton
        bsSize="xsmall"
        bsStyle="default"
        title="Action menu"
        key={1}
        pullRight 
        id={`dropdown-basic-1`}
      >
        <MenuItem eventKey="1">Action</MenuItem>
        <MenuItem eventKey="2">Another action</MenuItem>
        <MenuItem eventKey="3" active>
          Active Item
        </MenuItem>
        <MenuItem divider />
        <MenuItem eventKey="4">Separated link</MenuItem>
      </DropdownButton> */}
  <Dropdown className="result-menu" pullRight id="dropdown-custom-1">
    <Dropdown.Toggle noCaret className={styles.toggle} bsSize="xsmall">
      <Glyphicon glyph="option-horizontal" style={{color: "#bbb", fontSize: "16px"}} />
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <MenuItem eventKey="1" disabled={props.result.matches.bookmarked} 
        onSelect={() => { props.addBookmark(props.result.id) }}>Bookmark</MenuItem>
      <MenuItem eventKey="2" disabled={!props.result.matches.bookmarked}
        onSelect={() => { props.removeBookmark(props.result.id) }}>Unbookmark</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey="3"
        onSelect={() => { props.searchForSimilar({
          authors: props.result.matches.authors,
          businesses: props.result.matches.organizations,
          keywords: props.result.matches.keywords,
          docId: props.result.matches.docId,
        }) }}>Find more like this</MenuItem>
    </Dropdown.Menu>
  </Dropdown>
    </div>,
    <div>
      <h2 style={{ fontSize: '14px', fontWeight: '100', margin: '12px 0 0 0' }}>{ props.result.matches ? props.result.matches.manufacturer : "Unknown" }</h2>
    </div>,
    React.createElement(
      'h4',
      {style: { margin: '3px 0 9px 0', fontWeight: '900', fontSize: '20px',  }},
      (props.result.matches && props.result.matches.bookmarked) ? <Glyphicon glyph="star" style={{fontSize: "16px", marginRight: '4px', color: '#ffdf00'}} /> : null,
      React.createElement(
        Link,
        {
          style: { textDecoration: 'none' },
          to: {
            pathname: props.detailPath,
            state: { id: props.result.id },
            search: '?id=' + props.result.id
          }
        },
        // props.result.label || getFilename(props.result.id) || props.result.uri
        props.result.matches ? props.result.matches.model : 
        props.result.label || getFilename(props.result.id) || props.result.uri
      )
    ),
    <div className="ml-search-result-metadata">
      { props.result.matches && displayMetadata(props.result.matches) }
    </div>,
    // React.createElement(
    //   'div',
    //   { className: 'ml-search-result-matches' },
    //   props.result.matches && props.result.matches.map(function (match, index) {
    //     return React.createElement(SearchSnippet, { match: match, key: index });
    //   })
    // ),
    props.displayAbstract && props.result.matches && props.result.matches.description &&
    <p>{ props.result.matches.description }</p>,
    
    React.createElement(
      Link,
      {
        style: { textDecoration: 'none' },
        to: {
          pathname: props.detailPath,
          state: { id: props.result.id },
          search: '?id=' + props.result.id
        }
      },
      <div style={{width: "auto", height: "160px", padding: "6px 0 12px 0"}}>
          {
          props.result.matches.thumbnail ?  
          <img style={imageTagStyleProps} src={'/v1/documents?uri='+props.result.matches.thumbnail} alt={props.result.matches.manufacturer}></img> : 
          <div style={imageContent}><span>No Preview</span></div>
          }
        
      </div>
    )
    // <img src={/content/sample/21715544SOS.preview.png} alt="image url"></img>

    //http://localhost:9003/v1/documents?uri=/content/sample/21715544SOS.preview.png
    // <hr style={{margin: "18px 0 9px"}}/>
  );
};

export default ListResult;
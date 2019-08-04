import React from 'react'
import PropTypes from 'prop-types'
// import { Row, Col, Button, Glyphicon, Table, Tabs, Tab } from 'react-bootstrap' //for bootstrap
import { Row, Col, Button, Glyphicon, Table } from 'react-bootstrap'
import throttle from "lodash.throttle"
import ReadMoreReact from 'read-more-react'
import RequestForm from './RequestForm'
import PdfViewer from '../pdf/PdfViewer';
import './DetailView.css'
import 'font-awesome/css/font-awesome.min.css';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TabViewDetail from './TabViewDetail'
import { Paper } from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: 50
  },
});


const SummarryContentPanel = (props) => {
  const { data, value, clickHandler, profile, requestDoc, requestPending, id, ...other } = props;
  console.log('SummarryContentPanel==>', props.value)
  return (
    <div>
      <h3>Summary</h3>
      <div className="rendered-table"><ReadMoreReact text={data.description} min={250} ideal={300} max={350} /></div>
      <div>
        <h3>Element Materials</h3>
      </div>
      {/* <div className="key-facts-container">
          <KeyFactsList instance={data} profile={profile} requestDoc={requestDoc} requestPending={requestPending} id={id} ></KeyFactsList>
        </div> */}
    </div>
  );
}

const RawDataContentPanel = (props) => {
  const { data, value, clickHandler, ...other } = props;
  const uniqueKey = uniqueId
  console.log('RawDataContentPanel==>', props.value)
  return (
    data ? (<div className="detail-list-container">
      <h4>Raw Data </h4>
      <div className="detail-request">
        {
          data.map((el, i) => <div key={uniqueKey()}>
            <i key={uniqueKey()} className="fa fa-file-pdf-o" aria-hidden="true"></i>
            <a href="javascript:void(0)" onClick={($event) => clickHandler($event, el.uri)} key={uniqueKey()} target="_blank"> {el.uri.split('/').pop()} </a>
          </div>)
        }
      </div>
    </div>) : ''
  );
}

const LiteratureContentPanel = (props) => {
  const { data, value, clickHandler, ...other } = props;
  const uniqueKey = uniqueId
  console.log('LiteratureContentPanel==>', props.value)
  return (
    data ? (<div className="detail-list-container">
      <h4>Attachments </h4>
      <div className="detail-request">
        {
          data.map((el, i) => <div key={uniqueKey()}>
            <i className="fa fa-file-pdf-o" key={uniqueKey()} aria-hidden="true"></i>
            <a href="javascript:void(0)" onClick={($event) => clickHandler($event, el.uri)} key={uniqueKey()} target="_blank"> {el.uri.split('/').pop()} </a>
          </div>)
        }
      </div>
    </div>) : ''
  );
}

const PublicationContentPanel = (props) => {
  const { data, value, clickHandler, ...other } = props;
  const uniqueKey = uniqueId
  console.log('PublicationContentPanel==>', props.value)
  return (
    data ? (<div className="detail-list-container">
      <h4>Publication </h4>
      <div className="detail-request">
        {
          data.map((el, i) => <span key={uniqueId()}> {el.process} </span>)
        }
      </div>
    </div>) : ''
  );
}


const KeyFactsList = (props) => {
  const { instance, value, profile, requestDoc, requestPending, id, ...other } = props;
  return (
    <div className="key-facts-list">
      <h3>Key Facts</h3>
      <Table className="result-metadata" size="sm" bordered={false} hover={false} striped={false}>
        <tbody>
          <tr>
            <th>Doc ID:</th>
            <td>{instance.serial_number}</td>
          </tr>
          <tr>
            <th>Report Number:</th>
            <td>{instance.ra_number}</td>
          </tr>
          <tr>
            <th>Authors:</th>
            <td>{instance.manufacturer}</td>
          </tr>
          <tr>
            <th>Issue Date:</th>
            <td>{instance.date}</td>
          </tr>
          <tr>
            <th>Business Unit:</th>
            <td>{instance.model}</td>
          </tr>
        </tbody>
      </Table>
      <RequestForm instance={instance} profile={profile} uri={id} requestDoc={requestDoc} requestPending={requestPending} />
    </div>

  );
}

let uniqueNumber = {
  previous: 0
}

const uniqueNumberFormat = () => {
  var date = Date.now();

  if (date <= uniqueNumber.previous) {
    date = ++uniqueNumber.previous;
  } else {
    uniqueNumber.previous = date;
  }

  return date;
}


const uniqueId = () => {
  return uniqueNumberFormat();
};



class DetailView extends React.Component {

  constructor(props) {
    super(props)
    this.selector = React.createRef();
    this.uniqueNumber = {
      previous: 0
    }
    this.selectorUri = props.id;
    this.id = props.id
    this.state = { width: null, selectorUri: props.id, value: 0 }
    this.itemClick = this.itemClick.bind(this);
  }

  setDivSize() {
    this.setState({ width: this.selector.current.getBoundingClientRect().width })
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize)
  }

  componentDidMount() {
    this.setDivSize()
    this.handleResize = throttle(this.setDivSize, 500).bind(this)
    window.addEventListener("resize", this.handleResize)

    if (!this.props.detail) {
      this.props.loadDetail(this.props.id)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      if (!this.props.detail) {
        this.props.loadDetail(this.props.id)
      }
    }
  }

  itemClick(event, uri) {
    console.log('uri==>', uri)
    this.setState({ selectorUri: uri })
  }
// FOR BOOTSTRAP
  // handleChange = (value, event) => {
  //   console.log(event)
  //   console.log(value)
  //   this.setState({ value });
  // };

handleChange = ( event, value) => {
    console.log(event)
    console.log(value)
    this.setState({ value });
  };

  createMetadataPanel() {
    if (!this.props.detail || !this.props.profile) {
      return null
    }
    const instance = this.props.detail.documents.envelope.instance
    const profile = this.props.profile
    const requestDoc = this.props.requestDoc
    const requestPending = this.props.requestPending
    const { classes } = this.props;
    const { value } = this.state;
    console.log(this.props)
    return (
      <Col xs={12} md={12} className="ml-result-metadata">
        <a href="javascript:history.back()">Return to search results</a>
        <h1>
          {instance.model}
        </h1>
        <div className="detail-page">
          {/* <div className="detail-tabs">
            <Tabs defaultActiveKey={0} animation={false} onSelect={this.handleChange} id="noanim-tab-example">
              {<Tab eventKey={0} title="Summarray">
                <SummarryContentPanel value={value} data={instance} profile={profile} requestDoc={requestDoc} requestPending={requestPending} id={this.id} ></SummarryContentPanel>
              </Tab>}
              {<Tab eventKey={1} title="Raw Data">
                <RawDataContentPanel value={value} data={instance.raw_data} clickHandler={this.itemClick}></RawDataContentPanel>
              </Tab>}
              {<Tab eventKey={2} title="Literature" >
                <LiteratureContentPanel value={value} data={instance.attachments} clickHandler={this.itemClick}></LiteratureContentPanel>
              </Tab>}
              {<Tab eventKey={3} title="Publication" >
                <PublicationContentPanel value={value} data={instance.results}></PublicationContentPanel>
              </Tab>}
            </Tabs>
          </div> */}

          <div className={classes.root}>
          <Paper position="static">
            <Tabs indicatorColor="secondary" textColor="secondary" value={value} onChange={this.handleChange}>
              <Tab label="Summarray" />
              <Tab label="Raw Data" />
              <Tab label="Literature" />
              <Tab label="Publication" />
            </Tabs>
          </Paper>
          {
            value === 0 && <TabViewDetail>
              <SummarryContentPanel value={value} data={instance}  profile={profile} requestDoc={requestDoc} requestPending={requestPending} id={this.id} ></SummarryContentPanel>
            </TabViewDetail>

          }
          {value === 1 && <TabViewDetail> <RawDataContentPanel value={value} data={instance.raw_data} clickHandler={this.itemClick}></RawDataContentPanel></TabViewDetail>}
          {value === 2 && <TabViewDetail> <LiteratureContentPanel value={value} data={instance.attachments} clickHandler={this.itemClick}></LiteratureContentPanel></TabViewDetail>}
          {value === 3 && <TabViewDetail> <PublicationContentPanel value={value} data={instance.results}></PublicationContentPanel></TabViewDetail>}
        </div>
          <div className="key-facts-container">
            {value === 0 && <KeyFactsList instance={instance} profile={profile} requestDoc={requestDoc} requestPending={requestPending} id={this.id} ></KeyFactsList>}
          </div>
        </div>

      </Col>

    );
  }

  createPdfPreviewPanel() {
    return <Col xs={12} md={7} className="ml-doc-preview">
      <div style={{ width: "100%", display: "flex", overflow: "hidden" }}>
        {/* <div id="placeholderWrapper" style={{width: "100%", height: "100vh"}}/> */}
        <div ref={this.selector} style={{ width: "100%" }}>
          {this.state.selectorUri}
          <PdfViewer uri={this.state.selectorUri} wrapperDivSize={this.state.width - 30} />
        </div>
      </div>
    </Col>
  }



  render() {
    return <Row>
      {this.createMetadataPanel()}
      {this.createPdfPreviewPanel()}
    </Row>
  }
}

DetailView.propTypes = process.env.NODE_ENV !== "production" ? {
  detail: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  contentType: PropTypes.string,
  error: PropTypes.string,
  profile: PropTypes.object,
} : {}

export default withStyles(styles)(DetailView)



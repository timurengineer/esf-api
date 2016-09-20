import React, {Component} from 'react';
import SearchForm from './search.js';
import InvoiceList from './invoicelist.js';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import LinearProgress from 'material-ui/LinearProgress';

var styles = {
  progressBar: {
    backgroundColor: 'white',
    display: 'none'
  }
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoices: [],
      open: true
    }
  }
  handleToggle() {
    this.setState({open: !this.state.open});
  }
  handleClose() {
    this.setState({open: false})
  }
  fetchInvoices(params) {
    var context = this;
    this.handleClose();
    styles.progressBar.display = 'block';
    // get sessionId cookie
    var name = 'sessionId=';
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        params.sessionId = c.substring(name.length, c.length);
      }
    }
    if (!params.sessionId) { this.props.toggleSignIn() }

    // prepare query string
    var queryString = '?';
    for (var key in params) {
      queryString += `${key}=${params[key]}&`;
    }
    queryString = queryString.substring(0, queryString.length - 1);
    console.log(params);

    $.ajax('/api/invoices/query' + queryString).done(function(response) {
      console.log(response);
      styles.progressBar.display = 'none';
      context.setState({
        invoices: response.invoiceInfoList.invoiceInfo
      });
    });
  }
  downloadPdf() {
    styles.progressBar.display = 'block';
    var queryString = '?sessionId=';
    var name = 'sessionId=';
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        queryString += c.substring(name.length, c.length);
      }
    }
    
    for (var i = 0; i < this.state.invoices.length; i++) {
      queryString += '&idList[]=' + this.state.invoices[i].invoiceId;
    }
    $.ajax('/api/pdfs/order' + queryString).done(function(response) {
      styles.progressBar.display = 'none';
      console.log('pdf order ID:', response);
      window.location = '/api/pdfs/download?orderId=' + response.orderId;
    });
  }
  logOut() {
    document.cookie = 'sessionId=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.props.toggleSignIn();
  }
  render() {
    return (
      <div>
        <AppBar
          title="ESF"
          onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
          iconElementRight={
            <span>
            <FlatButton label="Export to PDF" onTouchTap={ this.downloadPdf.bind(this) } />
            <FlatButton label="Sign Out" onTouchTap={ this.logOut.bind(this) } />
            </span>
          }
        />
        <LinearProgress mode="indeterminate" style={styles.progressBar}/>
        
        <Drawer
          docked={false}
          width={300}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <SearchForm fetchInvoices={ this.fetchInvoices.bind(this) }/>
        </Drawer>
        <InvoiceList invoices={ this.state.invoices }/>
      </div>
    );
  }
}

export default Main;
//window.Main = Main;
import React, {Component} from 'react';
import SearchForm from './search.js';
import InvoiceList from './invoicelist.js';
import RaisedButton from 'material-ui/RaisedButton';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoices: []
    }
  }
  fetchInvoices(params) {
    var context = this;
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
      context.setState({
        invoices: response.invoiceInfoList.invoiceInfo
      });
    });
  }
  downloadPdf() {
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
        <h2>Main</h2>
        <RaisedButton label="Sign Out" onTouchTap={ this.logOut.bind(this) } />
        <input type="button" value="PDF" onClick={ this.downloadPdf.bind(this) } />
        <SearchForm fetchInvoices={ this.fetchInvoices.bind(this) }/>
        <InvoiceList invoices={ this.state.invoices }/>
      </div>
    );
  }
}

export default Main;
//window.Main = Main;
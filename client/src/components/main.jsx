class Main extends React.Component {
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
  render() {
    return (
      <div>
        <h2>Main</h2>
        <input type="button" value="Sign Out" onClick={ this.props.toggleSignIn } />
        <SearchForm fetchInvoices={ this.fetchInvoices.bind(this) }/>
        <InvoiceList invoices={ this.state.invoices }/>
      </div>
    );
  }
}

window.Main = Main;
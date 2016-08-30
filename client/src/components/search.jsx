class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: 'INBOUND',
      asc: true
    };
  }
  render() {
    return (
      <div>
        <select value={ this.state.direction } onChange={ (e) => this.setState({ direction: e.target.value }) }>
          <option value="INBOUND">INBOUND</option>
          <option value="OUTBOUND">OUTBOUND</option>
        </select>
        Date From:
        <input type="date" onChange={ (e) => this.setState({ dateFrom: (new Date(e.target.value)).toISOString() }) } />
        Date To:
        <input type="date" onChange={ (e) => this.setState({ dateTo: (new Date(e.target.value)).toISOString() }) } />
        <input type="button" value="Search" onClick={ () => this.props.fetchInvoices(this.state) } />
      </div>
    );
  }
}

window.SearchForm = SearchForm;
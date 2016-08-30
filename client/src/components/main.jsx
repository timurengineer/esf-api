class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>Main</h2>
        <input type="button" value="Sign Out" onClick={ this.props.toggleSignIn } />
        <SearchForm />
        <InvoiceList />
      </div>
    );
  }
}

window.Main = Main;
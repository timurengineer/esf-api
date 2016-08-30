class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false
    };
  }
  toggleSignIn() {
    this.setState({ signedIn: !this.state.signedIn });
  }
  render() {
    return (
      <div>
        {
          this.state.signedIn
            ? <Main />
            : <Login toggleSignIn={ this.toggleSignIn.bind(this) } />
        }
      </div>
    );
  }
}

window.App = App;
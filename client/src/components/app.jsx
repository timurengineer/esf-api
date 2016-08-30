class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: true
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
            ? <Main toggleSignIn={ this.toggleSignIn.bind(this) } />
            : <Login toggleSignIn={ this.toggleSignIn.bind(this) } />
        }
      </div>
    );
  }
}

window.App = App;
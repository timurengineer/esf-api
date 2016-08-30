class App extends React.Component {
  constructor(props) {
    super(props);
    // get sessionId cookie
    var sessionId = null;
    var name = 'sessionId=';
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        sessionId = c.substring(name.length, c.length);
      }
    }
    this.state = {
      signedIn: sessionId ? true : false
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
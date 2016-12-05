import React, {Component} from 'react';
import Main from './main.js';
import Login from './login.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
  }
};

class App extends Component {
  constructor(props, context) {
    super(props, context);
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
      <MuiThemeProvider>
        {
          this.state.signedIn
            ? <Main toggleSignIn={ this.toggleSignIn.bind(this) } />
            : <Login toggleSignIn={ this.toggleSignIn.bind(this) } />
        }
      </MuiThemeProvider>
    );
  }
}

export default App;
//window.App = App;
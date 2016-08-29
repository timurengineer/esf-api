class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }
  render() {
    return (
      <div>
        {
          this.state.loggedIn
            ? <Main />
            : <Login />
        }
      </div>
    );
  }
}

window.App = App;
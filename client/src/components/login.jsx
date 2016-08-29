class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      cert: null
    }
  }
  handleFileLoad(e) {
    var context = this;
    var file = e.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var re = /-----BEGIN CERTIFICATE-----[\n\r\w\W]*-----END CERTIFICATE-----/;
        if (reader.result.match(re)){
          var username = '';
          var certBase64 = reader.result.match(re)[0];
          certBase64 = certBase64.replace('-----BEGIN CERTIFICATE-----','');
          certBase64 = certBase64.replace('-----END CERTIFICATE-----','');
          certBase64 = certBase64.replace(/[\n\r\s]/g,'');
          username = atob(certBase64).match(/IIN\d{12}/)[0];
          username = username.replace(/IIN/,'');
          context.setState({username: username});
          context.setState({cert: certBase64});
        } else {
          console.log('Invalid certificate file');
        }
      }
      reader.readAsText(file);
    }
  }
  handlePasswordEnter(e) {

  }
  render() {
    return (
      <div>
        <h2>Login</h2>
        <div>
          Certificate:
          <input type="file" onChange={ this.handleFileLoad.bind(this) }/>
        </div>
        <div>
          Username:
          <input type="text" value={ this.state.username }/>
        </div>
        <div>
          Password:
          <input type="password" onKeyUp={ this.handlePasswordEnter.bind(this) }/>
        </div>
        <div>
          Company:
          <select>
            <option></option>
            <option></option>
          </select>
        </div>
      </div>
    );
  }
}

window.Login = Login;
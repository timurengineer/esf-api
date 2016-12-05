import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: '100%',
    width: '100%',
    justifyContent: 'center'
  },
  loginContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  fileInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: '0',
    bottom: '0',
    right: '0',
    left: '0',
    width: '100%',
    opacity: '0'
  },
  certLink: {
    position: 'fixed',
    bottom: '10px',
    right: '10px'
  },
  paperStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: '20px',
    width: '450px'
  }
};

class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      password: '',
      cert: null,
      companyList: [],
      company: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
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
    var context = this
    if (e.keyCode === 13) {
      this.setState({ password: e.target.value }, function(){
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "/api/users/info",
          "method": "POST",
          "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache",
          },
          "processData": false,
          "data": JSON.stringify({
            username: this.state.username,
            password: this.state.password,
            data: {
              tin: this.state.username,
              x509Certificate: this.state.cert
            }
          })
        }
        $.ajax(settings).done(function (response) {
          var results = [];
          for (var i = 0; i < response.user.enterpriseEntries.length; i++) {
            results.push({
              id: response.user.enterpriseEntries[i].tin,
              name: response.user.enterpriseEntries[i].enterpriseTaxpayerInfo.nameRu
            });
          }

          context.setState({ companyList: results });
          context.setState({ company: results[0].id });
        });
      });
    }
  }
  handleSubmit() {
    var context = this;
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "/api/users/session",
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
      "processData": false,
      "data": JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        data: {
          tin: this.state.company,
          x509Certificate: this.state.cert
        }
      })
    }
    $.ajax(settings).done(function(response) {
      console.log(context.props);
      // set sessionId cookie
      var d = new Date();
      d.setTime(d.getTime() + (30*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = "sessionId=" + response.sessionId + "; " + expires;
      // toggle signIn
      context.props.toggleSignIn();
    });
  }
  handleSelect(e, i, v) {
    this.setState({company: v});
  }
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.loginContent}>
          <h3>Select your Key file to get started</h3>
          <Paper style={styles.paperStyle} zDepth={1}>
            <FlatButton label="Browse key" labelPosition="before">
              <input type="file" onChange={ this.handleFileLoad.bind(this) } style={styles.fileInput} />
            </FlatButton><br />
            <TextField
              floatingLabelText="Username"
              value={ this.state.username }
              fullWidth
            /><br />
            <TextField
              floatingLabelText="Password"
              type="password"
              onKeyUp={ this.handlePasswordEnter.bind(this) }
              fullWidth
            /><br />
            <SelectField 
              value={this.state.company} 
              onChange={this.handleSelect.bind(this)}
              fullWidth
            >
              {this.state.companyList.map(function(item) {
                return (<MenuItem key={item.id} value={item.id} primaryText={item.name} />)
              })}
            </SelectField><br />
            <RaisedButton label="Sign In" onTouchTap={ this.handleSubmit } /><br />
            <a style={styles.certLink} href='/customer_auth.pem'>Test Certificate</a>
          </Paper>
        </div>
      </div>
    );
  }
}

export default Login;
//window.Login = Login;

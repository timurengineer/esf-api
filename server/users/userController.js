var soap = require('soap');
var soapClient = require('./userSoap');

var client;

soapClient(function(cl) {
  client = cl;
  console.log('SessionService SOAP client loaded.')
});

module.exports = {
  getInfo: function(req, res, next) {
    // ---------- Request body example:----------
    // {
    // "username": "[ESF username (IIN or BIN)]",
    // "password": "[ESF password]",
    // "data": {
    //     "tin": "[use IIN or BIN]",
    //     "x509Certificate": "[user's public certificate (PEM)]"
    //   }
    // }
    // ------------------------------------------
    // set security headers
    client.setSecurity(new soap.WSSecurity(req.body.username, req.body.password, {
      hasTimeStamp: false,
      hasTokenCreated: false
    }));
    // call SOAP API
    client.getUser(req.body.data, function(err, result) {
      if (err) { return res.send(err); }
      res.send(result);
    }, {rejectUnauthorized: false});
  },
  createSession: function(req, res, next) {
    // set security headers
    client.setSecurity(new soap.WSSecurity(req.body.username, req.body.password, {
      hasTimeStamp: false,
      hasTokenCreated: false
    }));
    // call SOAP API
    client.createSession(req.body.data, function(err, result) {
      if (err) { return res.send(err); }
      res.send(result);
    }, {rejectUnauthorized: false});
  }
}
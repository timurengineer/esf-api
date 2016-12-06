var soap = require('soap');
var config = require('../config/config');

var wsdl = config.env === 'PROD' ? config.soapProd : config.soapTest;

wsdl += '/esf-web/ws/SessionService?wsdl';

var wsdlOptions = {
    overrideRootElement: {
        namespace: 'tns'
    },
    ignoredNamespaces: {
      namespaces: [],
      override: true
    },
    ignoreBaseNameSpaces: false
};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

module.exports = function(callback) {
  soap.createClient(wsdl, wsdlOptions, function(err, client) {
    if (err) { throw err; }
    callback(client);
  });
}

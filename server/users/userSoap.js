var soap = require('soap');

var wsdl = 'https://92.46.122.150:8443/esf-web/ws/SessionService?wsdl';

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
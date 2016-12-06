var soap = require('soap');
var config = require('../config/config');

var wsdl = config.env === 'PROD' ? config.soapProd : config.soapTest; 

wsdl += '/esf-web/ws/InvoiceService?wsdl';

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

var client;

soap.createClient(wsdl, wsdlOptions, function(err, cl) {
  if (err) { throw err; }
  client = cl;
  console.log('InvoiceService SOAP client loaded.')
});

module.exports = {
  queryInvoice: function(params, callback) {
    // organize query params
    // call SOAP API
    // ---------- Request body example:----------
    // order is important!
    // {
    //   "sessionId": "[ESF username (IIN or BIN)]",
    //   "criteria": {
    //     "direction": "[INBOUND or OUTBOUND]", //required
    //     "contragentTin": "[BIN or IIN]",
    //     "dateFrom": [timestamp],
    //     "dateTo": [timestamp],
    //     "invoiceStatus": [],
    //     "invoiceType": [],
    //     "orderBy": [],
    //     "asc": [true or false],  //required
    //     "pageNum": []
    //   }
    // }
    // ------------------------------------------
    var queryParams = {
      sessionId: params.sessionId,
      criteria: {
        direction: params.direction
      }
    }
    if (params.contragentTin) { queryParams.criteria.contragentTin = params.contragentTin }
    if (params.dateFrom) { queryParams.criteria.dateFrom = params.dateFrom }
    if (params.dateTo) { queryParams.criteria.dateTo = params.dateTo }
    if (params.invoiceStatus) { queryParams.criteria.invoiceStatus = params.invoiceStatus }
    if (params.invoiceType) { queryParams.criteria.invoiceType = params.invoiceType }
    if (params.orderBy) { queryParams.criteria.orderBy = params.orderBy }
    queryParams.criteria.asc = params.asc;
    if (params.pageNum) { queryParams.criteria.pageNum = params.pageNum }
    // call SOAP 
    client.queryInvoice(queryParams, function(err, result) {
      if (err) { return callback(err, null); }
      callback(null, result);
    }, {rejectUnauthorized: false});
  },
  queryInvoiceById: function(params, callback) {
    // organize query params
    var queryParams = {
      sessionId: params.sessionId,
      idList: {
        id: params.idList
      }
    }
    // call SOAP
    client.queryInvoiceById(queryParams, function(err, result) {
      if (err) { return callback(err, null); }
      callback(null, result);
    }, {rejectUnauthorized: false});
  }
}

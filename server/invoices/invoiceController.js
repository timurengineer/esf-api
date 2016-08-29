var soapClient = require('./invoiceSoap');

module.exports = {
  query: function(req, res, next) {
    soapClient.queryInvoice(req.query, function(err, result) {
      if (err) { return res.send(err) }
      res.send(result);
    });
  },
  queryById: function(req, res, next) {
    soapClient.queryInvoiceById(req.query, function(err, result) {
      if (err) { return res.send(err) }
      res.send(result);
    });
  }
}
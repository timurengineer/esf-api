var pdfCreator = require('./pdfCreator');

module.exports = {
  order: function(req, res, next) {
    // takes a list of invoice ids, returns a download url
    console.log('invoiceIds in pfdController.order:', req.query.idList);

    pdfCreator.order(req.query, function(err, orderId) {
      if (err) { return res.send(err); }
      res.send({ orderId: orderId });
    });
  },
  download: function(req, res, next) {
    // takes an orders id, retuns a file
    pdfCreator.download(req.query.orderId, function(err, archive) {
      archive.pipe(res);
    })
  }
}
var userController = require('../users/userController');
var invoiceController = require('../invoices/invoiceController');
var pdfController = require('../pdfs/pdfController');

module.exports = function(app, express) {
  app.post('/users/info', userController.getInfo);
  app.post('/users/session', userController.createSession);

  app.get('/invoices/query', invoiceController.query);
  app.get('/invoices/querybyid', invoiceController.queryById);

  app.get('/pdfs/order', pdfController.order);
  app.get('/pdfs/download', pdfController.download);
};

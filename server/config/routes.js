var userController = require('../users/userController');
var invoiceController = require('../invoices/invoiceController');
var pdfController = require('../pdfs/pdfController');

module.exports = function(app, express) {
  app.post('/api/users/info', userController.getInfo);
  app.post('/api/users/session', userController.createSession);

  app.get('/api/invoices/query', invoiceController.query);
  app.get('/api/invoices/querybyid', invoiceController.queryById);

  app.get('/api/pdfs/order', pdfController.order);
  app.get('/api/pdfs/download', pdfController.download);
};

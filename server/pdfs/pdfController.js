module.exports = {
  order: function(req, res, next) {
    // takes a list of invoice ids, returns a download url
    console.log('invoiceIds in pfdController.order:', req.query.idList);
    
    res.send('pdf order!')
  },
  download: function(req, res, next) {
    // takes an orders id, retuns a file
  }
}
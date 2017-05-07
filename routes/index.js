var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  _utils.send(res,2000,"hello","hello","hello");
  //res.render('index', { title: 'Express' });
});

module.exports = router;

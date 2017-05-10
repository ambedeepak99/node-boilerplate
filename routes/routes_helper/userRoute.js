/**
 * Created by deepak on 5/10/2017.
 */
var express = require('express');
var router = express.Router();

var userCtrl = require('../../app_modules/user/userCtrl');

router.get('/getUser', userCtrl.getUser);
router.post('/postUser', userCtrl.postUser);

_logger.debug("user route initialized");

module.exports = router;
/**
 * login_route
 * @memberof routes
 * @description initializing login module routes.
 * @author deepak.ambekar [5/25/2017].
 */

var express = require('express');
var router = express.Router();

var loginCtrl = require('../../app_modules/login/loginCtrl');

router.post('/signin', loginCtrl.signin);
router.post('/signup', loginCtrl.signUp);


_logger.debug("login route initialized");

module.exports = router;
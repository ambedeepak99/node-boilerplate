/**
 * @module login/loginCtrl
 * @description controller function of login module
 * @author deepak.ambekar [5/25/2017].
 */

var filePath = "login/loginCtrl.js";
var loginCtrl = {};

var dateUtil = require('date-format-utils');
var auth = require('../../lib/authenticate/auth');
var loginDbCtrl = require('./loginDbCtrl');

/**
 * validate username and password, send token to authorized user
 * @param request {object} service request
 * @param response {object} service response
 */
function signin(request, response) {
    var functionName = _utils.formatFunctionName(filePath, signin.name);
    var requiredParam = ['username', 'password'];
    var data = request.body;
    var missingParam = _utils.checkRequiredMissingParam(data, requiredParam);
    if (missingParam) {
        _utils.send(response, {
            type: _constants.RESPONSE_MESSAGES.INCOMPLETE,
            err: missingParam
        });
    } else {
        //compare username,password with database
        loginDbCtrl.dbValidateLogin(data, function (err, result) {
            if (err) {
                _utils.send(response, {type: _constants.RESPONSE_MESSAGES.FAILED, err: err});
            } else if (result.length > 0) {
                var loginData = result[0];
                loginData.loginTime = dateUtil.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss tt');
                var passwordHmac = _utils.getHmac(data.password, loginData.salt_value, loginData.encode_method);
                if (loginData.password != passwordHmac) {
                    _utils.send(response, {
                        type: _constants.RESPONSE_MESSAGES.LOGIN_FAILED,
                        custom_msg: _constants.CUSTOM_MESSAGES.WRONG_PASSWORD});
                } else {
                    var token = auth.generateToken(loginData);
                    response.setHeader('Authorization', token);
                    _utils.send(response, {
                        type: _constants.RESPONSE_MESSAGES.SUCCESS,
                        data: {
                            token: token
                        }
                    });
                }

            } else {
                _utils.send(response, {type: _constants.RESPONSE_MESSAGES.LOGIN_FAILED});
            }
        });
    }

}
loginCtrl.signin = signin;

/**
 * signup new user and send token once successful signup done.
 * @param request {object} service request
 * @param response {object} service response
 */
function signUp(request, response) {
    var functionName = _utils.formatFunctionName(filePath, signUp.name);
    var requiredParam = ['username', 'password', 'email'];
    var data = request.body;
    var missingParam = _utils.checkRequiredMissingParam(data, requiredParam);
    if (missingParam) {
        _utils.send(response, {
            type: _constants.RESPONSE_MESSAGES.INCOMPLETE,
            custom_msg: missingParam
        });
    } else {
        loginDbCtrl.dbValidateLogin(data,function(error,loginData){
            if (error) {
                _utils.send(response, {type: _constants.RESPONSE_MESSAGES.FAILED, err: error});
            }
            else if (loginData.length > 0) {
                _utils.send(response, {
                    type: _constants.RESPONSE_MESSAGES.FAILED,
                    custom_msg:_constants.CUSTOM_MESSAGES.USER_EXITS
                });
            }
            else{
                var saltValue = _utils.getHmac(data.username);
                var encodeMethod = "sha256";
                var passwordHmac = _utils.getHmac(data.password, saltValue, encodeMethod);
                var currentTime = new Date();
                var insertObj = {
                    username: data.username,
                    password: passwordHmac,
                    email: data.email,
                    salt_value: saltValue,
                    encode_method: encodeMethod,
                    created_at: dateUtil.formatDate(currentTime, 'yyyy-MM-dd HH:mm:ss tt'),
                    created_timestamp: dateUtil.toTimestamp(currentTime, 'sec')
                };
                loginDbCtrl.dbInsertLoginData(insertObj,function(err,result){
                    if (err) {
                        _utils.send(response, {type: _constants.RESPONSE_MESSAGES.FAILED, err: err});
                    } else if (result > 0) {
                        _logger.info(functionName+"signup success. record inserted "+result);
                        insertObj.loginTime = dateUtil.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss tt');
                        var token = auth.generateToken(insertObj);
                        response.setHeader('Authorization', token);
                        _utils.send(response, {
                            type: _constants.RESPONSE_MESSAGES.SUCCESS,
                            data: {
                                token: token
                            }
                        });
                    }
                    else{
                        _utils.send(response, {
                            type: _constants.RESPONSE_MESSAGES.LOGIN_FAILED,
                            custom_msg:_constants.CUSTOM_MESSAGES.SIGNUP_FAILED
                        });
                    }
                });
            }
        });


    }
}
loginCtrl.signUp = signUp;

module.exports = loginCtrl;



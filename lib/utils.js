/**
 * Created by deepak on 5/6/2017.
 */

var utils = {};

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * check valid response code [mention in constants>>MESSAGES].
 * @param code
 * @return {{valid: boolean, statusCode: number}}
 */
function validateResponseCode(code) {
    var obj = {
        valid: false,
        statusCode: 200
    };
    for (var key in _constants.MESSAGES) {
        if (_constants.MESSAGES[key].code == code) {
            obj.valid = true;
            obj.statusCode = _constants.MESSAGES[key].status_code;
            break;
        }
    }
    return obj;
};
utils.validateResponseCode = validateResponseCode;

/**
 * send response of service.
 * @param response
 * @param code
 * @param msg
 * @param data
 * @param err
 */
function send(response, code, msg, data, err) {
    var resData = {};
    var validCodeObj = validateResponseCode(code);
    if (!validCodeObj.valid)
        _logger.debug("add response code '" + code + "' in constants >> MESSAGES object");
    resData.code = code;
    resData.msg = msg;
    resData.data = data;
    if (process.env.NODE_ENV === _constants.DEV_ENV && err) {
        resData.error = err;
    }
    response.status(validCodeObj.statusCode || 200).json(resData);
};
utils.send = send;

/**
 * check any required parameter is missing from request object.
 * @param request
 * @param requiredParams
 * @return {*}
 */
function checkRequiredMissingParam(request, requiredParams) {
    var missingRequiredParam = [];
    for (var i = 0; i < requiredParams.length; i++) {
        var key = requiredParams[i];
        if (!hasOwnProperty.call(request, key) || request[key] === null)
            missingRequiredParam.push(key);
    }
    if (missingRequiredParam.length === 0)
        return false;
    else
        return missingRequiredParam;
}
utils.checkRequiredMissingParam = checkRequiredMissingParam;

module.exports = utils;

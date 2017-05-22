/**
 * Created by deepak on 5/6/2017.
 */

var utils = {};

//hasOwnProperty of object
var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Running the following code before any other code will create Array.isArray() if it's not natively available
 */
if (!Array.isArray) {
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}

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
/**
 * 'true' if object is empty otherwise 'false'
 * @param obj
 * @returns {boolean}
 */
function isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == undefined || obj == null || obj == "")
        return true;
    // Assume if it has a length property with a non-zero value
    // that property is correct.
    if (obj.length > 0)
        return false;
    if (obj.length <= 0)
        return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key))
            return false;
    }
    return true;
}
utils.isEmpty = isEmpty;

/**
 * 'true' if object is array otherwise 'false'
 * @param array
 */
function isArray(arr) {
    try {
        return Array.isArray(arr);
    } catch (e) {
        _logger.error("Error in isArray function, ", e);
        return false;
    }
}
utils.isArray = isArray;

module.exports = utils;

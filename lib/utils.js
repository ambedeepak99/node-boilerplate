/**
 * Created by deepak on 5/6/2017.
 */

var utils = {};

utils.validateResponseCode = function (code) {
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
utils.send = function (response, code, msg, data, err) {
    var resData = {};
    var validCodeObj = this.validateResponseCode(code);
    if (!validCodeObj.valid)
        _logger.debug("add response code '"+code+"' in constants >> MESSAGES object");
    resData.code = code;
    resData.msg = msg;
    resData.data = data;
    if (process.env.NODE_ENV === _constants.DEV_ENV && err) {
        resData.error=err;
    }
    response.status(validCodeObj.statusCode || 200).json(resData);
};

module.exports = utils;

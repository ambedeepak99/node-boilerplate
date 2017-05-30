/**
 * @module sample_module/sampleCtrl
 * @description controller function of sample module
 * @author deepak.ambekar [5/25/2017].
 */
var filePath = "sample_module/sampleCtrl.js";

var responseMsgs = _constants.RESPONSE_MESSAGES;
var auth = require('../../lib/authenticate/auth');
var sampleUtil = require('./sampleUtil');
var sampleCtrl = {};
/**
 * Sample get request
 * @param request
 * @param response
 */
function getSampleRequest(request, response) {
    var functionName = _utils.formatFunctionName(filePath, getSampleRequest.name);
    var data = {
        service_type: "SAMPLE GET REQUEST",
        param: request.params["requestParam"],
        request_query_data: {}
    };
    for (var key in request.query) {
        data.request_query_data[key] = request.query[key];
    }
    _utils.send(response, {
        type: responseMsgs.SUCCESS,
        data: data
    });

};
sampleCtrl.getSampleRequest = getSampleRequest;
/**
 * Sample post request
 * @param request
 * @param response
 */
function postSampleRequest(request, response) {
    var data = {
        service_type: "SAMPLE POST REQUEST",
        post_data: request.body
    };
    _utils.send(response, {
        type: responseMsgs.SUCCESS,
        data: data
    });
};
sampleCtrl.postSampleRequest = postSampleRequest;

function insertData(request, response) {
    var functionName = _utils.formatFunctionName(filePath, insertData.name);
    var data = request.body;
    sampleUtil.uInsertData(data, function (err, result) {
        if (err) {
            _utils.send(response, {
                type: responseMsgs.FAILED,
                err: err
            });
        }
        else {
            _utils.send(response, {
                type: responseMsgs.SUCCESS,
                data: result
            });
        }
    });
}
sampleCtrl.insertData = insertData;

function updateData(request, response) {
    var functionName = _utils.formatFunctionName(filePath, updateData.name);
    var data = request.body;
    sampleUtil.uUpdateData(data, function (err, result) {
        if (err) {
            _utils.send(response, {
                type: responseMsgs.FAILED,
                err: err
            });
        }
        else {
            _utils.send(response, {
                type: responseMsgs.SUCCESS,
                data: result
            });
        }
    });
}
sampleCtrl.updateData = updateData;

function selectData(request, response) {
    var functionName = _utils.formatFunctionName(filePath, selectData.name);
    var data = request.body;
    sampleUtil.uSelectData(data, function (err, result) {
        if (err) {
            _utils.send(response, {
                type: responseMsgs.FAILED,
                err: err
            });
        }
        else {
            if (result.length > 0)
                _utils.send(response, {
                    type: responseMsgs.SUCCESS,
                    data: result
                });
            else
                _utils.send(response, {
                    type: responseMsgs.NO_RECORDS_FOUND,
                    data: result
                });
        }
    });
}
sampleCtrl.selectData = selectData;

function deleteData(request, response) {
    var functionName = _utils.formatFunctionName(filePath, deleteData.name);
    var data = request.body;
    sampleUtil.uDeleteData(data, function (err, result) {
        if (err) {
            _utils.send(response, {
                type: responseMsgs.FAILED,
                err: err
            });
        }
        else {
            _utils.send(response, {
                type: responseMsgs.SUCCESS,
                data: result
            });
        }
    });
}
sampleCtrl.deleteData = deleteData;


module.exports = sampleCtrl;

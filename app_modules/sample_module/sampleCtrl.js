/**
 * Created by deepak on 5/10/2017.
 */
var responseMsgs = _constants.MESSAGES;
var auth = require('../../lib/authenticate/auth');
var sampleCtrl = {};
//var outFile=require('../../out/index.html');
/**
 * Sample get request
 * @param request
 * @param response
 */
function getSampleRequest(request, response) {
    var data = {
        service_type: "SAMPLE GET REQUEST",
        param: request.params["requestParam"],
        request_query_data: {
        }
    };
    for (var key in request.query) {
        data.request_query_data[key] = request.query[key];
    }
    data.token=auth.generateToken(data);
    _utils.send(response, responseMsgs.SUCCESS.code, responseMsgs.SUCCESS.message, data);
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
    _utils.send(response, responseMsgs.SUCCESS.code, responseMsgs.SUCCESS.message, data);
};
sampleCtrl.postSampleRequest = postSampleRequest;

module.exports = sampleCtrl;

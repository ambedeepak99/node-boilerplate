/**
 * Created by deepak on 5/10/2017.
 */
var responseMsgs = _constants.MESSAGES;
var SampleCtrl = {};

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
    _utils.send(response, responseMsgs.SUCCESS.code, responseMsgs.SUCCESS.message, data);
};
SampleCtrl.getSampleRequest = getSampleRequest;

function postSampleRequest(request, response) {
    var data = {
        service_type: "SAMPLE POST REQUEST",
        post_data: request.body
    };
    _utils.send(response, responseMsgs.SUCCESS.code, responseMsgs.SUCCESS.message, data);
};
SampleCtrl.postSampleRequest = postSampleRequest;

module.exports = SampleCtrl;

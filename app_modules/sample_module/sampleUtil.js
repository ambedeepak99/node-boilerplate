/**
 * @module sample_module/sampleUtilCtrl
 * @description util controller function of sample module
 * @author deepak.ambekar [5/25/2017].
 */
var filePath = "sample_module/sampleUtil.js";

var sampleDbCtrl = require('./sampleDbCtrl');

var utilCtrl = {};
/**
 * insert data
 * @param data
 * @param callback
 */
function uInsertData(data, callback) {
    var functionName = _utils.formatFunctionName(filePath, uInsertData.name);
    var requiredParam = ['firstName', 'lastName'];
    var missingParam = _utils.checkRequiredMissingParam(data.insertData, requiredParam);
    if (missingParam) {
        callback(missingParam, null);
    } else {
        sampleDbCtrl.dbInsertData(data.insertData, function (err, result) {
            if (err) {
                callback(err, null);
            } else {
                var finalData = {total_record_inserted: result};
                callback(null, finalData);
            }
        });
    }
}
utilCtrl.uInsertData = uInsertData;

/**
 * update data
 * @param data
 * @param callback
 */
function uUpdateData(data, callback) {
    var functionName = _utils.formatFunctionName(filePath, uUpdateData.name);
    var requiredParam = ['id', 'updateData'];
    var missingParam = _utils.checkRequiredMissingParam(data, requiredParam);
    if (missingParam) {
        callback(missingParam, null);
    } else {
        sampleDbCtrl.dbUpdateData(data, function (err, result) {
            if (err) {
                callback(err, null);
            } else {
                var finalData = {total_record_updated: result};
                callback(null, finalData);
            }
        });
    }
}
utilCtrl.uUpdateData = uUpdateData;

/**
 * select data
 * @param data
 * @param callback
 */
function uSelectData(data, callback) {
    var functionName = _utils.formatFunctionName(filePath, uSelectData.name);

    if (_utils.isEmpty(data.id)) {
        sampleDbCtrl.dbSelectAllData(data, function (err, result) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
    else {
        sampleDbCtrl.dbSelectDataWithId(data, function (err, result) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }


}
utilCtrl.uSelectData = uSelectData;

/**
 * delete data
 * @param data
 * @param callback
 */
function uDeleteData(data, callback) {
    var functionName = _utils.formatFunctionName(filePath, uDeleteData.name);
    var requiredParam = ['id'];
    var missingParam = _utils.checkRequiredMissingParam(data, requiredParam);
    if (missingParam) {
        callback(missingParam, null);
    } else {
        sampleDbCtrl.dbDeleteData(data, function (err, result) {
            if (err) {
                callback(err, null);
            } else {
                var finalData = {total_record_deleted: result};
                callback(null, finalData);
            }
        });
    }
}
utilCtrl.uDeleteData = uDeleteData;

module.exports = utilCtrl;


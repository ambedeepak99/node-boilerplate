/**
 * @module login/loginDbCtrl
 * @description database controller function of login module [database activity]
 * @author deepak.ambekar [5/25/2017].
 */

var filePath = "login/loginDbCtrl.js";
var loginDbCtrl = {};

/**
 * send user data based on username
 * @param data {object} data to validate login
 * @param callback {function} callback function
 */
function dbValidateLogin(data, callback) {
    var functionName = _utils.formatFunctionName(filePath, dbValidateLogin.name);
    var collection = _mongoConnections.testMongoDb.db.collection(_mongoConnections.testMongoDb.collectionList.login);
    var query = {
        username: data.username
    }
    collection.find(query).toArray(function (err, result) {
        if (err) {
            _logger.error(functionName + "Select error : ", err);
            callback(_constants.DB_ERROR, null);
        } else {
            callback(null, result);
        }
    });
}
loginDbCtrl.dbValidateLogin = dbValidateLogin;

/**
 * insert login data
 * @param data {object} login data
 * @param callback {function} callback function
 */
function dbInsertLoginData(data, callback) {
    var functionName = _utils.formatFunctionName(filePath, dbInsertLoginData.name);
    if (!_utils.isEmpty(data)) {
        var collection = _mongoConnections.testMongoDb.db.collection(_mongoConnections.testMongoDb.collectionList.login);
        var insertData = [];
        if (_utils.isArray(data)) {
            insertData = data;
        } else {
            insertData.push(data);
        }
        //multiple insert
        collection.insert(insertData, function (err, result) {
            if (err) {
                _logger.error(functionName + "Insert error : ", err);
                callback(_constants.DB_ERROR, null);
            }
            else {
                _logger.info(functionName + "Number of records inserted: " + result.insertedCount);
                callback(null, result.insertedCount);
            }
        });

    } else {
        callback("Insert data is empty.", null);
    }
}
loginDbCtrl.dbInsertLoginData = dbInsertLoginData;


module.exports = loginDbCtrl;

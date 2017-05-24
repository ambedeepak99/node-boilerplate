/**
 * Created by deepak on 5/17/2017.
 */
var filePath = "sample_module/sampleDbCtrl.js";
var dbCtrl = {};
/**
 * query mongo db to insert data
 * @param data
 * @param callback
 */
function dbInsertData(data, callback) {
    var functionName = _utils.formatFunctionName(filePath, dbInsertData.name);
    if (!_utils.isEmpty(data)) {
        var collection = _mongoConnections.testMongoDb.db.collection(_mongoConnections.testMongoDb.collectionList.test);
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
dbCtrl.dbInsertData = dbInsertData;

function dbUpdateData(data, callback) {
    var functionName = _utils.formatFunctionName(filePath, dbUpdateData.name);
    var query = { _id: _mongoObjectId(data.id) };
    var newvalues = data.updateData;
    var collection = _mongoConnections.testMongoDb.db.collection(_mongoConnections.testMongoDb.collectionList.test);
    collection.update(query, newvalues, function (err, res) {
        if (err) {
            _logger.error(functionName + "Update error : ", err);
            callback(_constants.DB_ERROR, null);
        } else {
            _logger.info(functionName + "Number of records updated: " + res.result.nModified);
            callback(null, res.result.nModified);
        }
    });
}
dbCtrl.dbUpdateData = dbUpdateData;

function dbSelectAllData(data, callback) {
    var functionName = _utils.formatFunctionName(filePath, dbSelectAllData.name);
    var collection = _mongoConnections.testMongoDb.db.collection(_mongoConnections.testMongoDb.collectionList.test);
    collection.find().toArray(function (err, result) {
        if (err) {
            _logger.error(functionName + "Select error : ", err);
            callback(_constants.DB_ERROR, null);
        } else {
            callback(null, result);
        }
    });
}
dbCtrl.dbSelectAllData = dbSelectAllData;

function dbSelectDataWithId(data, callback) {
    var functionName = _utils.formatFunctionName(filePath, dbSelectDataWithId.name);
    var collection = _mongoConnections.testMongoDb.db.collection(_mongoConnections.testMongoDb.collectionList.test);
    var query = {
        _id: _mongoObjectId(data.id)
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
dbCtrl.dbSelectDataWithId = dbSelectDataWithId;

function dbDeleteData(data, callback) {
    var functionName = _utils.formatFunctionName(filePath, dbSelectDataWithId.name);
    var collection = _mongoConnections.testMongoDb.db.collection(_mongoConnections.testMongoDb.collectionList.test);
    var query = {};
    if(data.id){
        query={
            _id: _mongoObjectId(data.id)
        }
    }
    collection.remove(query, function (err, obj) {
        if (err) {
            _logger.error(functionName + "Delete error : ", err);
            callback(_constants.DB_ERROR, null);
        } else {
            _logger.info(functionName + "Number of records deleted: " + obj.result.n);
            callback(null, obj.result.n);
        }
    });
}
dbCtrl.dbDeleteData = dbDeleteData;

module.exports = dbCtrl;
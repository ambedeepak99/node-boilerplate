/**
 * Created by deepak on 5/17/2017.
 */

var dbCtrl = {};
/**
 * query mongo db to insert data
 * @param data
 * @param callback
 */
function insertData(data, callback) {
    var functionName = __dirname+">>insertData >>";
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
                callback("DB Error", null);
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
dbCtrl.insertData = insertData;

function updateData(data, callback) {

}
dbCtrl.updateData = updateData;

function findData(data, callback) {

}
dbCtrl.findData = findData;

module.exports=dbCtrl;
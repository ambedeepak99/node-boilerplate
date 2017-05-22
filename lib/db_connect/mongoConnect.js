/**
 * Created by deepak on 5/6/2017.
 */
var mongoClient = require('mongodb').MongoClient;
var mongoConfig = _config.mongoConfig;
var connectionName = "** MONGO-DB ** ";

function connectMongoFunctionScope(config) {
    return function (fcallback) {
        mongoClient.connect(config.host, function (err, db) {
            if (err) {
                _logger.error(connectionName + "Database connection failed for " + config.key + ", HOST:" + config.host);
                fcallback(null, null);
            } else {
                var con = {
                    db: db,
                    collectionList: config.collection
                };
                fcallback(null, con);

                //region get collection name dynamic
                // db.listCollections().toArray(function (err, items) {
                //     if (err) {
                //         _logger.error(connectionName + "Query failed for " + config.key + ", HOST:" + config.host);
                //     } else {
                //         if (items.length > 0) {
                //             _logger.debug(connectionName+"Collection List for " + config.key + ", HOST:" + config.host+" ::"+items.toString());
                //             for (var i = 0; i < items.length; i++) {
                //                 con.collection[items[i]] = items[i];
                //             }
                //         }
                //     }
                //     fcallback(null, con);
                // });
                //endregion

            }
        });
    };
}

function createConnection(callback) {
    var connectionWrapper = {};
    for (var key in mongoConfig) {
        var config = mongoConfig[key];
        if (config.init == true) {
            _logger.info(connectionName + "Initializing connection for " + key + ", HOST:" + config.host);
            config.key = key;
            connectionWrapper[key] = connectMongoFunctionScope(config);
        }
        else {
            _logger.info(connectionName + "Connection initialization for " + key + " is false. HOST:" + config.host);
        }
    }
    _async.auto(connectionWrapper, function (err, result) {
        if (result) {
            _logger.info(connectionName + _.size(result) + " Connection initialized");
            callback(result);
        }
        else {
            _logger.info(connectionName + "0 Connection initialized");
            callback({});
        }
    });
};

module.exports = {
    createConnection: createConnection
}
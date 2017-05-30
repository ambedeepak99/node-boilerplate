/**
 * @namespace mysqlConnect
 * @description configuring mysql database connection based on mysqlConfig
 * @author deepak.ambekar [5/25/2017].
 */
var mysql = require('mysql');
var mysqlConfig = _config.mysqlConfig;
var connectionName = "** MYSQL ** ";

//region connection initialization
function initializeConnection(config) {
    function addDisconnectHandler(connection) {
        connection.on("error", function (error) {
            if (error instanceof Error) {
                if (error.code === "PROTOCOL_CONNECTION_LOST") {
                    _logger.error("Connection lost for HOST:" + config.host + " and DATABASE:" + database);
                    _logger.error(error.stack);
                    return initializeConnection(config);
                } else if (error.fatal) {
                    _logger.error(error);
                } else {
                    _logger.error(error.stack);
                }
            }
        });
    }

    var connection = mysql.createConnection(config);
    // Add handlers.
    addDisconnectHandler(connection);
    connection.connect();
    //_logger.info(connectionName+"Connection established for " + config.key + ", HOST:" + config.host + ", DATABASE:" + config.database);
    _logger.info(connectionName+"Initializing connection for " + config.key + ", HOST:" + config.host + ", DATABASE:" + config.database);
    return connection;
}

function initializePoolConnection(config) {
    var pool = mysql.createPool(config);
    pool.on('acquire', function (connection) {
        _logger.debug(connectionName + "Pool Connection %d acquired for " + config.key + ", HOST:" + config.host + " and DATABASE:" + database, connection.threadId);
    });
    pool.on('enqueue', function () {
        _logger.error(connectionName + "Waiting for available pool connection slot for " + config.key + ", HOST:" + config.host + " and DATABASE:" + database);
    });
    pool.on('release', function (connection) {
        _logger.debug(connectionName + "Pool connection %d released for " + config.key + ", HOST:" + config.host + " and DATABASE:" + database, connection.threadId);
    });
    _logger.info(connectionName + "Initializing pool connection for " + config.key + ", HOST:" + config.host + ", DATABASE:" + config.database);
    return pool;
}

function endConnectionGracefully(connection) {
    connection.end(function (err) {
        _logger.debug("The connection is terminated now");
    });
}

function endPoolGracefully(pool) {
    pool.end(function (err) {
        _logger.debug("all connections in the pool have ended");
    });
}

//endregion

//region create connection object for mysql config

function createConnection() {
    var connectionWrapper = {};
    for (var key in mysqlConfig) {
        var config = mysqlConfig[key];
        if (config.init == true) {
            if (config.port == "")
                delete config.port;
            config.key = key;
            connectionWrapper[key] = {
                connection: initializeConnection(config),
                pool: initializePoolConnection(config)
            };
            keepAlive(connectionWrapper[key].connection, config);
        }
        else {
            _logger.info(connectionName + "Connection initialization for " + key + " is false. HOST:" + config.host + ", DATABASE:" + config.database);
        }
    }
    return connectionWrapper;
}

function keepAlive(connection, config) {
    if (connection) {
        connection.query('select 1', [], function (err, result) {
            _logger.info(connectionName + "keep live connection ID:: " + connection.threadId + " for " + config.key + ", HOST:" + config.host + ", DATABASE:" + config.database);
            if (err) {
                _logger.error(connectionName + "Keep a live query failed. HOST:" + config.host + ", DATABASE:" + config.database);
                _logger.error(err);
            }
            setTimeout(function () {
                keepAlive(connection, config);
            }, 1000 * 60 * 5);
        });
    }
}

module.exports = createConnection();
//endregion

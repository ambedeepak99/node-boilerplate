/**
 * Created by deepak on 5/6/2017.
 */
var mysql = require('mysql');
var mysqlConfig = _config.mysqlConfig;

//region connection initialization
function initializeConnection(config) {
    function addDisconnectHandler(connection) {
        connection.on("error", function (error) {
            if (error instanceof Error) {
                if (error.code === "PROTOCOL_CONNECTION_LOST") {
                    _logger.error(error.stack);
                    _logger.error("Connection lost for HOST:" + config.host + " and DATABASE:" + database);
                    return initializeConnection(config);
                } else if (error.fatal) {
                    throw error;
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
    _logger.info("Connection established for " + config.key + ", HOST:" + config.host + ", DATABASE:" + config.database);
    return connection;
}

function initializePoolConnection(config) {
    var pool = mysql.createPool(config);
    pool.on('acquire', function (connection) {
        _logger.debug("Pool Connection %d acquired for " + config.key + ", HOST:" + config.host + " and DATABASE:" + database, connection.threadId);
    });
    pool.on('enqueue', function () {
        _logger.error("Waiting for available pool connection slot for " + config.key + ", HOST:" + config.host + " and DATABASE:" + database);
    });
    pool.on('release', function (connection) {
        _logger.debug("Pool connection %d released for " + config.key + ", HOST:" + config.host + " and DATABASE:" + database, connection.threadId);
    });
    _logger.info("Pool Connection created for " + config.key + ", HOST:" + config.host + ", DATABASE:" + config.database);
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
            _logger.info("Initializing connection for " + key + ", HOST:" + config.host + ", DATABASE:" + config.database);
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
            _logger.info("Connection initialization for " + key + " is false. HOST:" + config.host + ", DATABASE:" + config.database);
        }
    }
    return connectionWrapper;
}

function keepAlive(connection, config) {
    if (connection) {
        connection.query('select 1', [], function (err, result) {
            _logger.info("keep live connection ID:: " + connection.threadId + " for " + config.key + ", HOST:" + config.host + ", DATABASE:" + config.database);
            if (err) {
                _logger.error("Keep a live query failed. HOST:" + config.host + ", DATABASE:" + config.database);
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

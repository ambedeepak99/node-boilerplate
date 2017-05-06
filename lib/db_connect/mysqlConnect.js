/**
 * Created by deepak on 5/6/2017.
 */
var mysql = require('mysql');
var mysqlConfig=_config.mysqlConfig;

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
    return connection;
}

function initializePoolConnection(config) {
    var pool = mysql.createPool(config);
    pool.on('acquire', function (connection) {
        _logger.debug("Pool Connection %d acquired HOST:" + config.host + " and DATABASE:" + database, connection.threadId);
    });
    pool.on('enqueue', function () {
        _logger.error("Waiting for available pool connection slot, HOST:" + config.host + " and DATABASE:" + database);
    });
    pool.on('release', function (connection) {
        _logger.debug("Connection %d released HOST:" + config.host + " and DATABASE:" + database, connection.threadId);
    });
    return pool;
}

function endConnectionGracefully(connection)
{
    connection.end(function(err) {
        _logger.debug("The connection is terminated now");
    });
}

function endPoolGracefully(pool)
{
    pool.end(function(err) {
        _logger.debug("all connections in the pool have ended");
    });
}

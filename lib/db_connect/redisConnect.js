/**
 * @namespace redisConnect
 * @description configuring redis database connection based on redisConfig
 * @author deepak.ambekar [5/25/2017].
 */
var redis = require('redis');
var redisConfig = _config.redisConfig;
var connectionName = "** REDIS ** ";

function initializedRedisClient(config)
{
    var redisURL=(config.host=="localhost"?"":config.host);
    var rClient = redis.createClient(redisURL);
    rClient.on('connect', function () {
        _logger.info(connectionName+'Connection established for '+config.key+", HOST:"+config.host);
    });
    rClient.on('error', function (error) {
        _logger.error(connectionName+'Connection error for '+config.key+", HOST:"+config.host+"\n",error);
    });
    rClient.on('reconnecting', function () {
        _logger.debug(connectionName+'Reconnecting connection for '+config.key+", HOST:"+config.host);
    });
    return rClient;
}

function createConnection()
{
    var connectionWrapper = {};
    for (var key in redisConfig) {
        var config = redisConfig[key];
        if(config.host=="")
            config.host="localhost";
        if (config.init == true) {
            _logger.info(connectionName + "Initializing connection for " + key + ", HOST:" + config.host);
            config.key = key;
            connectionWrapper[key] = initializedRedisClient(config);
        }
        else {
            _logger.info(connectionName + "Connection initialization for " + key + " is false. HOST:" + config.host);
        }
    }
    return connectionWrapper;
}

module.exports=createConnection();


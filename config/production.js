/**
 * Created by deepak on 5/6/2017.
 */

/**
 *
 * @type {{logConfig: {logLevel: string, errorLogPath: string, infoLogPath: string}, mysqlConfig: {master_database: {init: boolean, host: string, connectionLimit: number, user: string, password: string, database: string, multipleStatements: boolean}, slave_database: {init: boolean, host: string, connectionLimit: number, user: string, password: string, database: string, multipleStatements: boolean}}, mongoConfig: {testMongoDb: {init: boolean, host: string, collection: {test: string}}}, redisConfig: {testRedisDb: {init: boolean, host: string}}}}
 */
var productionConfig = {
    logConfig: {
        logLevel: "info",
        errorLogPath: "./logs",
        infoLogPath:"./logs"
    },
    mysqlConfig: {
        master_database: {
            init: true,
            host: "localhost",
            connectionLimit: 20,
            user: "root",
            password: "",
            database: "test",
            multipleStatements: true
        },
        slave_database: {
            init: true,
            host: "localhost",
            connectionLimit: 20,
            user: "root",
            password: "",
            database: "test",
            multipleStatements: true
        }
    },
    mongoConfig: {
        testMongoDb: {
            init: true,
            host: "mongodb://localhost:27017/mongo_done",
            collection: {
                test: "test"
            }
        }
    },
    redisConfig: {
        testRedisDb: {
            init: true,
            host: ""
        }
    }
};

module.exports = productionConfig;
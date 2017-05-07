/**
 * Created by deepak on 5/6/2017.
 */

/**
 *
 * @type {{logConfig: {logLevel: string, errorLogPath: string, infoLogPath: string}, mysqlConfig: {master_database: {init: boolean, host: string, connectionLimit: number, user: string, password: string, database: string, multipleStatements: boolean}, slave_database: {init: boolean, host: string, connectionLimit: number, user: string, password: string, database: string, multipleStatements: boolean}}, mongoConfig: {testMongoDb: {init: boolean, host: string, collection: {test: string}}}, redisConfig: {testRedisDb: {init: boolean, host: string}}}}
 */
var developmentConfig = {
    logConfig: {
        logLevel: "debug",
        errorLogPath: "./logs/error",
        infoLogPath:"./logs"
    },
    mysqlConfig: {
        master_database: {
            init:true,
            host: "localhost",
            port:"3307",
            connectionLimit: 20,
            user: "root",
            password: "root",
            database: "test",
            multipleStatements: true
        },
        slave_database: {
            init:false,
            host: "localhost",
            port:"3307",
            connectionLimit: 20,
            user: "root",
            password: "root",
            database: "test",
            multipleStatements: true
        }
    },
    mongoConfig: {
        testMongoDb: {
            init:false,
            host: "mongodb://localhost:27017/mongo_done",
            collection: {
                test:"test"
            }
        }
    },
    redisConfig:{
        testRedisDb:{
            init:false,
            host:""
        }
    }
};

module.exports=developmentConfig;
/**
 * Created by deepak on 5/6/2017.
 */

var winston = require('winston');
var DailyRotateFile = require('winston-daily-rotate-file');
var logConfig = _config.logConfig;

winston.emitErrs = true;

var infoFilename = logConfig.infoLogPath + '/info.log';
var errorFilename = logConfig.errorLogPath + '/error.log';

//region create log folder if doesn't exits
if (!_fs.existsSync(logConfig.infoLogPath)) {

    try {
        console.log("Logging folder for 'info log' does not exist. Creating new folder... ");
        _fs.mkdirSync(logConfig.infoLogPath);
    }
    catch(e)
    {
        console.log("Error while creating new folder for 'info log', error::");
        console.log(e);
    }
}
if (!_fs.existsSync(logConfig.errorLogPath)) {

    try {
        console.log("Logging folder for 'error log' does not exist. Creating new folder... ");
        _fs.mkdirSync(logConfig.errorLogPath);
    }
    catch(e)
    {
        console.log("Error while creating new folder for 'error log', error::");
        console.log(e);
    }
}
//endregion

var transports = [
    new DailyRotateFile({
        name: 'info-file',
        level: 'info',
        localTime:true,
        datePattern: logConfig.datePattern,
        filename: infoFilename,
        handleExceptions: true,
        json: true,
        colorize: false
    }),
    new DailyRotateFile({
        level: 'error',
        localTime:true,
        datePattern: logConfig.datePattern,
        filename: errorFilename,
        handleExceptions: true,
        json: true,
        colorize: false
    })
];

transports.push(new winston.transports.Console({
    level: logConfig.logLevel,
    handleExceptions: true,
    json: false,
    colorize: true
}));

var logger = new winston.Logger({
    transports: transports,
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};

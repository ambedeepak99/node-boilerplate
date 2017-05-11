/**
 * Created by deepak on 5/6/2017.
 */
var devConfig = require('./development');
var prodConfig = require('./production');
var mergeJSON = require('deepmerge');
/**
 *
 * @type {{}}
 */
var config = {
    authAlias:"/v1",
    logConfig:{
        datePattern:".yyyy-MM-dd.HH-mm"
    }
};

var finalConfig = {};
if (process.env.NODE_ENV == _constants.DEV_ENV) {
    console.log("########### NODE ENVIRONMENT DEVELOPMENT ###########");
    finalConfig = mergeJSON(config, devConfig);
}
else {
    console.log("########### NODE ENVIRONMENT PRODUCTION ###########");
    finalConfig = mergeJSON(config, prodConfig);
}
module.exports = finalConfig;


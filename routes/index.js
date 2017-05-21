module.exports = function (app) {

    var authConfig = _config.authConfig;
    //region Initializing Route
    _logger.debug("Initializing Routes");

    //region Normal Route
    app.use('/sample/', require('./routes_helper/sampleRoute'));

    //endregion

    //region Authentication Route

    app.use(authConfig.basicAlias + '/sample/', require('./routes_helper/sampleRoute'));

    //endregion

    _logger.debug("Initializing Routes Completed");
    //endregion

};
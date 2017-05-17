module.exports = function (app) {

    var authAlias = _config.authAlias;
    //region Initializing Route
    _logger.debug("Initializing Routes");

    //region Normal Route
    app.use('/sample/', require('./routes_helper/sampleRoute'));

    //endregion

    //region Authentication Route

    app.use(authAlias.basic + '/sample/', require('./routes_helper/sampleRoute'));

    //endregion

    _logger.debug("Initializing Routes Completed");
    //endregion

};
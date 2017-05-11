module.exports = function (app) {

    //region Initializing Route
    _logger.debug("Initializing Routes");

    //region Normal Route
    app.use('/sample/', require('./routes_helper/sampleRoute'));

    //endregion

    //region Authentication Route
    var auth = _config.authAlias;
    app.use(auth + '/sample/', require('./routes_helper/sampleRoute'));

    //endregion

    _logger.debug("Initializing Routes Completed");
    //endregion

};
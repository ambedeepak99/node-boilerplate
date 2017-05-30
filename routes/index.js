/**
 * @namespace routes
 * @description initializing normal and authenticate routes.
 * @author deepak.ambekar [5/25/2017].
 */
module.exports = function (app) {

    var authConfig = _config.authConfig;
    //region Initializing Route
    _logger.debug("Initializing Routes");

    //region Normal Route

    app.use('/login/', require('./routes_helper/loginRoute'));

    //endregion

    //region Authentication Route

    app.use(authConfig.basicAlias + '/sample/', require('./routes_helper/sampleRoute'));

    //endregion

    _logger.debug("Initializing Routes Completed");
    //endregion

};
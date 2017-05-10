module.exports = function (app) {

    //region Initializing Route
    _logger.debug("Initializing Routes");

    //region Routes Without Authentication
    app.use('/user/', require('./routes_helper/userRoute'));

    //endregion

    //region Routes With Authentication
    app.use('/v1/', authRoutes());

    function authRoutes()
    {
        app.use('/user/',require('./routes_helper/userRoute'));
    };
    //endregion

    _logger.debug("Initializing Routes Completed");
    //endregion

};
/**
 * Created by deepak on 5/11/2017.
 */

var auth = {};

function authenticate(request, response, next) {
    if (request.method == 'OPTIONS') {
        _logger.debug("Auth options");
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        response.setHeader("access-control-expose-headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    }
    else {
        _logger.debug("Auth completed");
        //Write your authentication logic here
        next();
    }
};
auth.authenticate=authenticate;

function test() {
    _logger.info("Test Working");
}
auth.test=test;


module.exports = auth;

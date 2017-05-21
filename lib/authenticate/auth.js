/**
 * Created by deepak on 5/11/2017.
 */
var jwt = require('jwt-simple');
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
        _logger.debug("Auth Started");
        //Write your authentication logic here
        try {
            var token = request.headers['authorization'] || null;
            if(token)
            {
                var decoded = jwt.decode(token, _config.authConfig.secretKey);
                var inactiveTime = 0;
                if (decoded.last_modified < Date.now()) {
                    inactiveTime = Math.abs((Date.now() - decoded.last_modified) / 60000);
                }
                if(inactiveTime>=_config.authConfig.expireTimeFrame)
                {
                    _utils.send(response, _constants.MESSAGES.TOKEN_EXPIRED.code, _constants.MESSAGES.TOKEN_EXPIRED.message, null);
                }
                else{
                    request.decoded=decoded;
                    var newToken = generateToken(user);
                    response.setHeader('authorization', newToken);
                    next();
                }
            }
            else{
                _utils.send(response, _constants.MESSAGES.NOT_AUTHORIZED.code, _constants.MESSAGES.NOT_AUTHORIZED.message, null);
            }

        } catch (e) {
            _utils.send(response, _constants.MESSAGES.NOT_AUTHORIZED.code, _constants.MESSAGES.NOT_AUTHORIZED.message, null);
        }

        _logger.debug("Auth Finish");
    }
};
auth.authenticate = authenticate;

function generateToken(payload)
{
    var last_modified = Date.now();
    var token = jwt.encode({
        last_modified: last_modified,
        payload: payload,

    }, _config.authConfig.secretKey);
    return token;
}
auth.generateToken = generateToken;


module.exports = auth;

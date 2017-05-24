/**
 * Created by deepak on 5/11/2017.
 */
var jwt = require('jwt-simple');
var dateUtil = require('date-format-utils');
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
            if (token) {
                var decoded = jwt.decode(token, _config.authConfig.secretKey);
                _logger.debug("decoded msg::", JSON.stringify(decoded));
                if (decoded.expire_at <= Date.now()) {
                    _logger.debug("Token Force Expire done, expire_at:",dateUtil.formatDate(decoded.expire_at,'hh:mm:ss tt'));
                    _utils.send(response, {
                        type: _constants.RESPONSE_MESSAGES.TOKEN_EXPIRED
                    });
                } else {
                    var inactiveTime = 0;
                    if (decoded.last_modified < Date.now()) {
                        inactiveTime = Math.abs((Date.now() - decoded.last_modified) / 60000);
                    }
                    if (inactiveTime >= _config.authConfig.inactiveTimeFrame) {
                        _logger.debug("Token Expire due to inactive");
                        _utils.send(response, {
                            type: _constants.RESPONSE_MESSAGES.TOKEN_EXPIRED
                        });
                    }
                    else {
                        _logger.debug("Token authorized");
                        request.decoded = decoded;
                        var newToken = generateToken(decoded.payload, decoded.expire_at);
                        response.setHeader('Authorization', newToken);
                        next();
                    }
                }
            }
            else {
                _utils.send(response, {
                    type: _constants.RESPONSE_MESSAGES.NOT_AUTHORIZED
                });
            }

        } catch (e) {
            _logger.error("Error generating auth token, ",e);
            _utils.send(response, {
                type: _constants.RESPONSE_MESSAGES.NOT_AUTHORIZED
            });
        }

        _logger.debug("Auth Finish");
    }
};
auth.authenticate = authenticate;

function generateToken(payload, expire_at) {
    var last_modified = Date.now();
    if (_utils.isEmpty(expire_at)) {
        var time = 60 * 60;
        if (_config.authConfig.forceExpireTimeFrame && typeof _config.authConfig.forceExpireTimeFrame == "number")
            time = _config.authConfig.forceExpireTimeFrame * 60;
        else
            _logger.debug("Default 60min force expire time frame set.");
        expire_at = _utils.expiresAt(time);
    }
    var token = jwt.encode({
        last_modified: last_modified,
        expire_at: expire_at,
        payload: payload
    }, _config.authConfig.secretKey);

    return token;
}
auth.generateToken = generateToken;


module.exports = auth;

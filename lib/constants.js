/**
 * @namespace constants
 * @description application constants
 * @author deepak.ambekar [5/25/2017].
 */

/**
 * application constants object
 * @memberof constants
 * @type {{DEV_ENV: string, MESSAGES: {INVALID_REQUEST: {status_code: number, code: number, message: string}, TOKEN_EXPIRED: {status_code: number, code: number, message: string}, NOT_AUTHORIZED: {status_code: number, code: number, message: string}, SERVER_ERROR: {status_code: number, code: number, message: string}, NO_RECORDS_FOUND: {status_code: number, code: number, message: string}, SUCCESS: {status_code: number, code: number, message: string}}}}
 */
var constants = {
    DEV_ENV: "development",
    DATA_SF:{
        url:"https://data.sfgov.org/resource/6a9r-agq8.json"
    },
    CUSTOM_MESSAGES: {
        MISSING_PARAMETER: "Missing parameter in request.",
        DB_ERROR: "Database query error.",
        WRONG_PASSWORD: "Wrong password entered.",
        WRONG_USERNAME: "Wrong username entered.",
        SIGNUP_FAILED:"Signup failed",
        USER_EXITS:"Username already exits."
    },
    RESPONSE_MESSAGES: {
        INVALID_REQUEST: {
            status_code: 400,
            code: 400,
            message: 'Invalid request'
        },
        TOKEN_EXPIRED: {
            status_code: 401,
            code: 401,
            message: 'Access token is expired.'
        },
        NOT_AUTHORIZED: {
            status_code: 401,
            code: 402,
            message: 'Unauthorized access'
        },
        SERVER_ERROR: {
            status_code: 500,
            code: 500,
            message: 'Something went wrong. Please try again later.'
        },
        SUCCESS: {
            status_code: 200,
            code: 2000,
            message: 'Success'
        },
        NO_RECORDS_FOUND: {
            status_code: 200,
            code: 3000,
            message: 'No record found.'
        },
        INCOMPLETE: {
            status_code: 200,
            code: 3001,
            message: 'Incomplete request'
        },
        INVALID_CODE: {
            status_code: 200,
            code: 3002,
            message: 'Response code and msg not mention. please select valid response code.'
        },
        FAILED: {
            status_code: 200,
            code: 3003,
            message: 'Failed'
        },
        LOGIN_FAILED: {
            status_code: 200,
            code: 3004,
            message: 'login credential are wrong.'
        }
    }
};

module.exports = constants;

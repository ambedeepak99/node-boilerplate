/**
 * Created by deepak on 5/6/2017.
 */
/**
 *
 * @type {{DEV_ENV: string, MESSAGES: {INVALID_REQUEST: {status_code: number, code: number, message: string}, TOKEN_EXPIRED: {status_code: number, code: number, message: string}, NOT_AUTHORIZED: {status_code: number, code: number, message: string}, SERVER_ERROR: {status_code: number, code: number, message: string}, NO_RECORDS_FOUND: {status_code: number, code: number, message: string}, SUCCESS: {status_code: number, code: number, message: string}}}}
 */
var constants = {
    DEV_ENV: "development",
    MESSAGES: {
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
        NO_RECORDS_FOUND: {
            status_code: 200,
            code: 3000,
            message: 'No record found.'
        },
        SUCCESS: {
            status_code: 200,
            code: 2000,
            message: 'Success'
        }
    }
};

module.exports=constants;

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const SERVER_ERROR = 500;
const TOKEN_ERROR = 511;

const badRequestError = (message) => {
    var error = new Error;
    error.message = message;
    error.code = BAD_REQUEST;
    throw error;
}

const unauthorizedError = (message) => {
    var error = new Error;
    error.message = message;
    error.code = UNAUTHORIZED;
    throw error;
}

const serverError = (message) => {
    var error = new Error;
    error.message = message;
    error.code = SERVER_ERROR;
    throw error;
}

const tokenError = (message) => {
    var error = new Error;
    error.message = message;
    error.code = TOKEN_ERROR;
    throw error;
}

module.exports = {
    badRequestError,
    unauthorizedError,
    serverError,
    tokenError
}
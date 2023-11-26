const FAIL_RESPONSE = 'fail';
const SUCCESS_RESPONSE = 'success';
const ERROR_CODE = 500;
const SUCCESS_CODE = 200;
const ERROR_TYPE = 'POCS';

require('dotenv').config();

const sendErrorResponse = (res,req,err) => {
    var code, errorMessage;
    
    if(err.type === ERROR_TYPE){
        code = err.code;
        errorMessage = err.message;
    }else{
        code = ERROR_CODE;
        errorMessage = err.message;
    }
    res.status(code).send({
        status: FAIL_RESPONSE,
        code: code,
        message: errorMessage
    });
};

const sendSuccessResponse = (res, data, message, page = null) => {
    let value = {
        status: SUCCESS_RESPONSE,
        code: SUCCESS_CODE,
        message: message
    };

    if(page != null && page >= 0){
        value.page = page;
    }

    if(data){
        value.data = data;
    }

    res.status(SUCCESS_CODE).send(value);
}

module.exports = {
    sendErrorResponse,
    sendSuccessResponse
}
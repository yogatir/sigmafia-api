const error = require('../middleware/errorMiddleware');

const jsonReturn = async (data) => {
    try {
        const returnData = JSON.parse(JSON.stringify(data));

        return returnData;
    } catch (err) {
        error.serverError(err.message);
    }
};

module.exports = {
    jsonReturn
}
const bearerToken = require('../utils/bearerTokenUtil');
const response = require('../utils/responseUtil');

const validatingProcess = async (req, res, next) => {
    try{
        const authHeader = req.header('Authorization');
        const token = authHeader && authHeader.split(' ')[1];

        const payload = bearerToken.verifyToken(token);
        req.payload = payload;

        next();
    }catch(err){
        response.sendErrorResponse(res, req, err);
    }
};

module.exports = {
    validatingProcess
}
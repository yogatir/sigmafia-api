const jwt = require('jsonwebtoken');
const error = require('../middleware/errorMiddleware');

require('dotenv').config();

const generateToken = async (tokenPayload) => {
    const token = 'Bearer '+ jwt.sign(tokenPayload, process.env.JWT_PRIVATE_KEY, {
        expiresIn: 1440*60
    });

    return token;
};

const verifyToken = (token) => {
    try{
        if(token){
            var verifiedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            if(verifiedToken != null){
                return verifiedToken;
            }else{
                error.badRequestError("Unable to read the token.");
            }
        }else{
            error.unauthorizedError("You not authenticated to access.");
        }
    }catch(err){
        if(err.name == "TokenExpiredError"){
            error.tokenError("Your token is expired.");
        }else{
            error.serverError(err.message);
        }
    }
}

const decodeToken = async (token) => {
    if(token){
        var decodedToken = jwt.decode(token, process.env.JWT_PRIVATE_KEY);
        if(decodedToken != null){
            return decodedToken;
        }else{
            error.badRequestError("Unable to read the token.");
        }
    }else{
        error.unauthorizedError("Unable to read the token.");
    }
}

module.exports = {
    generateToken,
    verifyToken,
    decodeToken
}
const bcrypt = require('bcrypt');
const error = require('../middleware/errorMiddleware');

const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        return hashedPassword;
    } catch (err) {
        error.serverError(err.message);
    }
};

const comparePasswords = async (inputPassword, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
        console.log(isMatch);
        
        if(isMatch){
            return;
        }else{
            error.badRequestError('Password not match.');
        }
    } catch (err) {
        error.serverError(err.message);
    }
};

module.exports = {
    hashPassword,
    comparePasswords
}
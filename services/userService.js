const { User, RoleAccessCode, UserRoleAccess } = require('../models/modelAssociations');

const error = require('../middleware/errorMiddleware');
const { comparePasswords } = require('../utils/hashUtil');
const { literal } = require('sequelize');
const { jsonReturn } = require('../utils/serviceUtil');

const signIn = async(email, password) => {
    try{
        var user = await getUser(email);
        await comparePasswords(password, user.password);

        return user;
    }catch(err){
        error.badRequestError(err.message);
    }
}

const setUser = async (userData) => {
    try{
        const user = await User.create(userData);

        return user;
    } catch (err) {
        error.serverError(err.original.sqlMessage);
    }
}

const getUser = async (identifier) => {
    try {
        var whereCondition = {};
        
        if (/^\S+@\S+\.\S+$/.test(identifier)) {
            whereCondition = {
                email: identifier
            }
        } else {
            whereCondition = {
                id: identifier
            }
        }

        const user = await User.findOne({
            attributes: [
                'id',
                'name',
                'email',
                'password',
                'school',
                'major',
                'user_level',
                [literal('(SELECT GROUP_CONCAT(DISTINCT role_access_code_id SEPARATOR ", ") FROM user_role_access WHERE user_role_access.user_id = user.id)'), 'role_access_code_id']
            ],
            where: whereCondition
        });
      
        if (user) {
            return jsonReturn(user);
        } else {
            error.badRequestError('User not found.');
        }
    } catch (err) {
        error.serverError(err.message);
    }
};

const getUsers = async () => {
    try {
        const users = await User.findAll({
            attributes: [
                'id',
                'email',
                'password',
                'user_level',
                [literal('(SELECT GROUP_CONCAT(DISTINCT role_access_code_id SEPARATOR ", ") FROM user_role_access WHERE user_role_access.user_id = user.id)'), 'role_access_code_id']
            ]
        });

        if ( users ) {
            return jsonReturn(users);
        } else {
            error.serverError('No data found.');
        }
    } catch (err) {
        console.log(err);
        error.serverError(err.message);
    }
}

module.exports = {
    signIn,
    setUser,
    getUser,
    getUsers
}
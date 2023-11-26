const userService = require('../services/userService');
const response = require('../utils/responseUtil');
const bearerToken = require('../utils/bearerTokenUtil');
const { hashPassword } = require('../utils/hashUtil');

const controller = {};

controller.userSignIn = async function(req, res) {
    const {email, password} = req.body;
    try{ 
        const user = await userService.signIn(email, password);

        const tokenPayload = {
            user_id: user.id,
            name: user.name,
            email: user.email,
            school: user.school,
            major: user.major,
            user_level: user.user_level,
            role_access_code_id: user.role_access_code_id
        }

        const token = await bearerToken.generateToken(tokenPayload);

        response.sendSuccessResponse(res, {bearer_token: token, user: user}, "Successfully sign in.");
    }catch(err){
        response.sendErrorResponse(res, req, err);
    }
}

controller.userSignUp = async function(req, res) {
    try{ 
        const hashedPassword = await hashPassword(req.body.password)
        const userData = {
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name,
            school: req.body.school,
            major: req.body.major,
            gender: req.body.gender,
            user_level: req.body.user_level
        }
        
        await userService.setUser(userData);

        response.sendSuccessResponse(res, null, "Successfully sign up.");
    }catch(err){
        response.sendErrorResponse(res, req, err);
    }
}

controller.getUsers = async function(req, res) {
    try{
        const users = await userService.getUsers();
        
        response.sendSuccessResponse(res, users, "Successfully get users.");
    } catch(err) {
        response.sendErrorResponse(res, req, err);
    }
}

controller.getUserDetail = async function(req, res) {
    try{
        const userId = req.payload.user_id;
        const user = await userService.getUser(userId);

        const userObject = {
            name: user.name,
            email: user.email,
            school: user.school,
            major: user.major
        }
        
        response.sendSuccessResponse(res, userObject, "Successfully get user.");
    } catch(err) {
        response.sendErrorResponse(res, req, err);
    }
}

module.exports = controller;
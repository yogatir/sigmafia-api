const tryoutService = require('../services/tryoutService');
const response = require('../utils/responseUtil');

const controller = {};

controller.getTryouts = async function(req, res) {
    try{
        const roleAccessCodeId = req.payload.role_access_code_id;
        const tryouts = await tryoutService.getTryouts(roleAccessCodeId);
        
        response.sendSuccessResponse(res, tryouts, "Successfully get tryouts.");
    } catch(err) {
        response.sendErrorResponse(res, req, err);
    }
}

controller.getTryoutQuestions = async function(req, res) {
    try{
        const tryoutId = req.body.tryout_id;
        const tryoutQuestions = await tryoutService.getTryoutQuestions(tryoutId);
        
        response.sendSuccessResponse(res, tryoutQuestions, "Successfully get tryout questions.");
    } catch(err) {
        response.sendErrorResponse(res, req, err);
    }
}

module.exports = controller;
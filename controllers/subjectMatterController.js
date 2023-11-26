const subjectMatterService = require('../services/subjectMatterService');
const response = require('../utils/responseUtil');

const controller = {};

controller.getSubjectMatters = async function(req, res) {
    try{
        const roleAccessCodeId = req.payload.role_access_code_id;
        const subjectMatters = await subjectMatterService.getSubjectMatters(roleAccessCodeId);
        
        response.sendSuccessResponse(res, subjectMatters, "Successfully get subject matters.");
    } catch(err) {
        response.sendErrorResponse(res, req, err);
    }
}

controller.getSubjectMatterDetails = async function(req, res) {
    try{
        const subjectMatterId = req.body.subject_matter_id;
        const subjectMatterFiles = await subjectMatterService.getSubjectMatterDetails(subjectMatterId);
        
        response.sendSuccessResponse(res, subjectMatterFiles, "Successfully get files.");
    } catch(err) {
        response.sendErrorResponse(res, req, err);
    }
}

module.exports = controller;
const { SubjectMatter, SubjectMatterFile } = require('../models/modelAssociations');

const error = require('../middleware/errorMiddleware');
const { Op } = require('sequelize');

const getSubjectMatters = async (roleAccessCodeId) => {
    try {
        if(!roleAccessCodeId){
            error.badRequestError('Subject matter not found.')
        }
        const roleAccessCodeIds = roleAccessCodeId.split(',').map(code => parseInt(code.trim()));
        const subjectMatters = await SubjectMatter.findAll({
            attributes: ['id','name', 'description'],
            where: {
                role_access_code_id: {
                    [Op.in]: roleAccessCodeIds
                }
            }
        })
      
        if (subjectMatters) {
            return subjectMatters;
        } else {
            error.badRequestError('Subject matter not found.');
        }
    } catch (err) {
        error.serverError(err.message);
    }
};

const getSubjectMatterDetails = async (subjectMatterId) => {
    try {
        const subjectMatters = await SubjectMatter.findOne({
            attributes: ['id','name', 'description'],
            where: {
                id: subjectMatterId
            },
            include: [
                {
                    model: SubjectMatterFile,
                    as: 'subject_matter_files',
                    attributes: ['id', 'name', 'google_file_id', 'category', 'order_sequence'],
                    order: [['user_level', 'ASC']]
                }
            ]
        })
      
        if (subjectMatters) {
            return subjectMatters;
        } else {
            error.badRequestError('Subject matter not found.');
        }
    } catch (err) {
        error.serverError(err.message);
    }
};

module.exports = {
    getSubjectMatters,
    getSubjectMatterDetails
}
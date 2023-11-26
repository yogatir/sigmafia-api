const { Tryout, TryoutQuestion, RoleAccessCode, CourseHierarchy } = require('../models/modelAssociations');

const error = require('../middleware/errorMiddleware');
const { Op, literal } = require('sequelize');
const { jsonReturn } = require('../utils/serviceUtil');

const getTryouts = async (roleAccessCodeId) => {
    try {
        if(!roleAccessCodeId){
            error.badRequestError('Subject matter not found.')
        }
        const roleAccessCodeIds = roleAccessCodeId.split(',').map(code => parseInt(code.trim()));
        const tryouts = await Tryout.findAll({
            attributes: [
                [literal('Tryout.id'), 'id'],
                [literal('Tryout.name'), 'tryout_name'],
                [literal('Tryout.time_limit'), 'time_limit'],
                [literal('`role_access_code->school`.`name`'), 'school_name'],
                [literal('`role_access_code->class`.`name`'), 'class_name'],
                [literal('`role_access_code->subject`.`name`'), 'subject_name'],
                [literal('`role_access_code->curriculum`.`name`'), 'curriculum_name'],
            ],
            where: {
                role_access_code_id: {
                    [Op.in]: roleAccessCodeIds
                }
            },
            include: [
                {
                    model: RoleAccessCode,
                    attributes: [],
                    include: [
                        {
                            model: CourseHierarchy,
                            as: 'class',
                            attributes: []
                        },
                        {
                            model: CourseHierarchy,
                            as: 'subject',
                            attributes: []
                        },
                        {
                            model: CourseHierarchy,
                            as: 'school',
                            attributes: []
                        },
                        {
                            model: CourseHierarchy,
                            as: 'curriculum',
                            attributes: []
                        }
                    ]
                }
            ]
        });
      
        if (tryouts) {
            return jsonReturn(tryouts);
        } else {
            error.badRequestError('Tryout not found.');
        }
    } catch (err) {
        error.serverError(err.message);
    }
};

const getTryoutQuestions = async (tryoutId) => {
    try {
        const tryout = await Tryout.findOne({
            attributes: [
                [literal('Tryout.id'), 'id'],
                [literal('Tryout.name'), 'tryout_name'],
                [literal('Tryout.time_limit'), 'time_limit'],
                [literal('`role_access_code->school`.`name`'), 'school_name'],
                [literal('`role_access_code->class`.`name`'), 'class_name'],
                [literal('`role_access_code->subject`.`name`'), 'subject_name'],
                [literal('`role_access_code->curriculum`.`name`'), 'curriculum_name'],
            ],
            where: {
                id: tryoutId
            },
            include: [
                {
                    model: TryoutQuestion,
                    as: 'tryout_questions',
                    attributes: [
                        'id','question', 'first_option', 'second_option', 'third_option', 'fourth_option', 'fifth_option', 'correct_option', 'score'
                    ]
                },
                {
                    model: RoleAccessCode,
                    attributes: [],
                    include: [
                        {
                            model: CourseHierarchy,
                            as: 'class',
                            attributes: []
                        },
                        {
                            model: CourseHierarchy,
                            as: 'subject',
                            attributes: []
                        },
                        {
                            model: CourseHierarchy,
                            as: 'school',
                            attributes: []
                        },
                        {
                            model: CourseHierarchy,
                            as: 'curriculum',
                            attributes: []
                        }
                    ]
                }
            ]
        });

        if (tryout) {
            return jsonReturn(tryout);
        } else {
            error.badRequestError('Tryout not found.');
        }
    } catch (err) {
        error.serverError(err.message);
    }
};

module.exports = {
    getTryouts,
    getTryoutQuestions
}
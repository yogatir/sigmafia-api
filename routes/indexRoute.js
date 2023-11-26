const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const tryoutController = require('../controllers/tryoutController');
const subjectMatterController = require('../controllers/subjectMatterController');

const { validatingProcess } = require('../middleware/authenticationMiddleware');

router.post('/user-sign-in', userController.userSignIn);
router.post('/user-sign-up', userController.userSignUp);
router.post('/get-users', validatingProcess, userController.getUsers);
router.post('/get-user-detail', validatingProcess, userController.getUserDetail);

router.post('/get-tryouts', validatingProcess, tryoutController.getTryouts);
router.post('/get-tryout-questions', validatingProcess, tryoutController.getTryoutQuestions);

router.post('/get-subject-matters', validatingProcess, subjectMatterController.getSubjectMatters);
router.post('/get-subject-matter-details', validatingProcess, subjectMatterController.getSubjectMatterDetails);

module.exports = router;
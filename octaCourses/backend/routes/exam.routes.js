const express = require('express');
const router = express.Router();
const ExamController = require('../controllers/exam.controller')
const PermissionMiddleware = require('../middlewares/auth.permission.middleware');
const TokenValidationMiddleware = require('../middlewares/token.validation.middleware');
const  CourseAuthorizationMiddleware = require('../middlewares/course.authorization.middleware');
const { NORMAL_PROVIDER, NORMAL_USER} = require('../config/config.json').permissionLevels;



router.post('/courses/:id/exam/add', [
    TokenValidationMiddleware.validJWTRequired,
    PermissionMiddleware.minimumPermissionLevelRequired(NORMAL_PROVIDER),
    CourseAuthorizationMiddleware.ownerIsAuthorized,
    ExamController.addExamToCourse
])

router.post('/courses/:id/question', [
    TokenValidationMiddleware.validJWTRequired,
    PermissionMiddleware.minimumPermissionLevelRequired(NORMAL_USER),
    CourseAuthorizationMiddleware.onlyEnrolledStudentsAuthorized,
    ExamController.getExamQuestions
])

router.post('/courses/:id/exam/result', [
    TokenValidationMiddleware.validJWTRequired,
    PermissionMiddleware.minimumPermissionLevelRequired(NORMAL_USER),
    CourseAuthorizationMiddleware.onlyEnrolledStudentsAuthorized,
    ExamController.SubmitExamAnswerAndGetResults
])

module.exports = router
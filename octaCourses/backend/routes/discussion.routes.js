const express = require('express');
const router = express.Router();
const TokenValidationMiddleware = require('../middlewares/token.validation.middleware')
const PermissionMiddleware = require('../middlewares/auth.permission.middleware')
const { NORMAL_PROVIDER, NORMAL_USER } = require('../config/config.json').permissionLevels
const CourseAuthorizationMiddleware = require('../middlewares/course.authorization.middleware')
const DiscussionController = require('../controllers/discussion.controller')

// get route for getting course questions
router.get('/courses/:id/questions', [
    TokenValidationMiddleware.validJWTRequired,
    CourseAuthorizationMiddleware.ownerIsAuthorized,
    CourseAuthorizationMiddleware.onlyEnrolledStudentsAuthorized,
    DiscussionController.getQuestions
])

router.post('/courses/:id/questions/add', [
    TokenValidationMiddleware.validJWTRequired,
    PermissionMiddleware.minimumPermissionLevelRequired(NORMAL_USER || NORMAL_PROVIDER),
    CourseAuthorizationMiddleware.ownerIsAuthorized,
    CourseAuthorizationMiddleware.onlyEnrolledStudentsAuthorized,
    DiscussionController.addQuestion
])

router.post('/courses/:id/questions/:qid/reply', [
    TokenValidationMiddleware.validJWTRequired,
    PermissionMiddleware.minimumPermissionLevelRequired(NORMAL_USER || NORMAL_PROVIDER),
    CourseAuthorizationMiddleware.ownerIsAuthorized,
    CourseAuthorizationMiddleware.onlyEnrolledStudentsAuthorized,
    DiscussionController.addReply
])


module.exports = router
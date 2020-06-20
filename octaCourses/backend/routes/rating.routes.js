const express = require('express');
const router = express.Router();
const TokenValidationMiddleware = require('../middlewares/token.validation.middleware')
const PermissionMiddleware = require('../middlewares/auth.permission.middleware')
const FREE = require('../config.json').permissionLevels.NORMAL_USER;
const CourseAuthorizationMiddleware = require('../middlewares/course.authorization.middleware')
const RatingController = require('../controllers/rating.controller')

router.post('/courses/:id/rate', [
    TokenValidationMiddleware.validJWTRequired,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    CourseAuthorizationMiddleware.onlyEnrolledStudentsAuthorized,
    RatingController.rateCourse
])

router.post('/courses/:id/reviews', [
    RatingController.getRatingsOfCourse
])

module.exports = router
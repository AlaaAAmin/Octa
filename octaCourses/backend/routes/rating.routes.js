const express = require('express');
const router = express.Router();
const TokenValidationMiddleware = require('../middlewares/token.validation.middleware')
const PermissionMiddleware = require('../middlewares/auth.permission.middleware')
const { NORMAL_USER } = require('../config/config.json').permissionLevels;
const CourseAuthorizationMiddleware = require('../middlewares/course.authorization.middleware')
const RatingController = require('../controllers/rating.controller')

// post route endpoint for rating
// middlewares
// is a functions that considered a gateway that can prevent or allow request according to irs validity
router.post('/courses/:id/rate', [
    TokenValidationMiddleware.validJWTRequired,
    PermissionMiddleware.minimumPermissionLevelRequired(NORMAL_USER),
    CourseAuthorizationMiddleware.onlyEnrolledStudentsAuthorized,
    RatingController.rateCourse
])

module.exports = router
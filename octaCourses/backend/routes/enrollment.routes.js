const express = require('express');
const router = express.Router();
const TokenValidationMiddleware = require('../middlewares/token.validation.middleware')
const PermissionMiddleware = require('../middlewares/auth.permission.middleware')
const FREE = require('../config/config.json').permissionLevels.NORMAL_USER;
const PROVIDER = require('../config/config.json').permissionLevels.NORMAL_PROVIDER;
const EnrollmentController = require('../controllers/enrollment.controller')
const CourseAuthorizationMiddleware = require('../middlewares/course.authorization.middleware')
router.post('/courses/:id/enroll', [
    TokenValidationMiddleware.validJWTRequired,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    // here we use payment gateway and modify enrollemnt model and controller
    EnrollmentController.enroll
])

// check for student is enrolled or not through 
router.post('/courses/:id/check', [
    TokenValidationMiddleware.validJWTRequired,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    EnrollmentController.isStudentEnrolledInCourse
])

router.post('/courses/:id/students', [
    TokenValidationMiddleware.validJWTRequired,
    PermissionMiddleware.minimumPermissionLevelRequired(PROVIDER),
    CourseAuthorizationMiddleware.ownerIsAuthorized,
    EnrollmentController.getEnrolledStudentsOfCourse
])

module.exports = router;
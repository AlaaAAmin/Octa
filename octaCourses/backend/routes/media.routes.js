const express = require('express');
const router = express.Router();
const CourseAuthorizationMiddleware = require('../middlewares/course.authorization.middleware')
const CourseValidationMiddleware = require('../middlewares/media.validation.middleware');
const MediaController = require('../controllers/media.controller')
const TokenValidationMiddleware = require('../middlewares/token.validation.middleware')
const PermissionMiddleware = require('../middlewares/auth.permission.middleware')
const FREE = require('../config.json').permissionLevels.NORMAL_USER;

router.get('/courses/:id/:moduleId', [
    TokenValidationMiddleware.validJWTRequired,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    CourseValidationMiddleware.checkModuleExistsOrNot,
    CourseAuthorizationMiddleware.ownerIsAuthorized,
    CourseAuthorizationMiddleware.onlyEnrolledStudentsAuthorized,
    MediaController.sendModule
])

router.get('/courses/:id/:moduleId/:videoId', [
    TokenValidationMiddleware.validJWTRequired,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    CourseAuthorizationMiddleware.onlyEnrolledStudentsAuthorized,
    CourseValidationMiddleware.checkModuleExistsOrNot,
    CourseValidationMiddleware.checkVideoExistsOrNot,
    CourseValidationMiddleware.retrieveMediaFile,
    MediaController.sendMediaFile
])

module.exports = router;
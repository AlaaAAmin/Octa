const express = require('express');
const router = express.Router();
const StorageMiddleware = require('../middlewares/storage.middleware');
const PermissionMiddleware = require('../middlewares/auth.permission.middleware')
const TokenValidationMiddleware = require('../middlewares/token.validation.middleware')
const PROVIDER = require('../config.json').permissionLevels.NORMAL_PROVIDER
const FREE = require('../config.json').permissionLevels.NORMAL_USER
const CourseController = require('../controllers/course.controller');
const CourseAuthorizationMiddleware = require('../middlewares/course.authorization.middleware')

router.post('/course/add', [
    TokenValidationMiddleware.validJWTRequired,
    PermissionMiddleware.minimumPermissionLevelRequired(PROVIDER),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    StorageMiddleware.fetchFormData,
    StorageMiddleware.reshapeFormDataFields,
    StorageMiddleware.reshapeFormDataFiles,
    CourseController.createCourse
])

router.get('/course/:id', [
    // TokenValidationMiddleware.validJWTRequired,
    // PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    // CourseAuthorizationMiddleware.isStudentEnrolled,
    CourseController.getCourseById
])
router.get('/courses', [

])

router.post('/course/:id/enroll', [

])

router.patch('/course/:id', [
    TokenValidationMiddleware.validJWTRequired,
    PermissionMiddleware.minimumPermissionLevelRequired(PROVIDER),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    StorageMiddleware.fetchFormData,
    StorageMiddleware.reshapeFormDataFields,
    StorageMiddleware.reshapeFormDataFiles,
    CourseController.updateCourse
])

module.exports = router;
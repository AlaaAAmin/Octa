const express = require('express');
const router = express.Router();
const StorageMiddleware = require('../middlewares/storage.middleware');
const PermissionMiddleware = require('../middlewares/auth.permission.middleware')
const TokenValidationMiddleware = require('../middlewares/token.validation.middleware')
const { NORMAL_PROVIDER, NORMAL_USER } = require('../config/config.json').permissionLevels
const CourseController = require('../controllers/course.controller');
const CourseAuthorizationMiddleware = require('../middlewares/course.authorization.middleware')

// route for search 
// should be fetched with rate data *review*
router.get('/courses/search', [
    CourseController.searchForCourse
])

// route for course page
router.get('/courses/:id', [
    CourseController.getCourseById
])

// route to get full course info for enrolled students
router.post('/courses/:id', [
    // valid jwt req
    TokenValidationMiddleware.validJWTRequired,
    PermissionMiddleware.minimumPermissionLevelRequired(NORMAL_USER),
    CourseAuthorizationMiddleware.onlyEnrolledStudentsAuthorized,
    CourseController.getFullCourseInfo
])

// route to add new course 
router.post('/courses/add', [
    TokenValidationMiddleware.validJWTRequired,
    PermissionMiddleware.minimumPermissionLevelRequired(NORMAL_PROVIDER),
    StorageMiddleware.fetchFormData,
    StorageMiddleware.reshapeFormDataFields,
    StorageMiddleware.reshapeFormDataFiles,
    CourseController.createCourse
])

// route for update course
router.patch('/courses/:id', [
    TokenValidationMiddleware.validJWTRequired,
    PermissionMiddleware.minimumPermissionLevelRequired(NORMAL_PROVIDER),
    CourseAuthorizationMiddleware.onlyOwnerOfCourseAuthorized,
    StorageMiddleware.fetchFormData,
    StorageMiddleware.reshapeFormDataFields,
    StorageMiddleware.reshapeFormDataFiles,
    CourseController.updateCourse
])

router.post('/courses/:id/checkout', [
    TokenValidationMiddleware.validJWTRequired,
    PermissionMiddleware.minimumPermissionLevelRequired(NORMAL_USER),
    CourseAuthorizationMiddleware.onlyEnrolledStudentsAuthorized,
    CourseController.checkout
])


module.exports = router;
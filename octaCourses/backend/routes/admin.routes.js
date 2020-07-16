const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin.controller')
const TokenValidationMiddleware = require('../middlewares/token.validation.middleware')
const AuthPermissionMiddleware = require('../middlewares/auth.permission.middleware')

// handle expired token also and dont forget


// admin jobs 
// review courses, assign labels 
// eula violations for users (providers and students)
// get contact us messages

// this route for get raw courses that will be reviewed
router.get('/admin/courses/review', [
    TokenValidationMiddleware.validJWTRequired,
    AuthPermissionMiddleware.onlyAdminsAreAllowed,
    AdminController.getUnReviewedCourses
])

// this route for review and label course by id
router.post('/admin/courses/review', [
    TokenValidationMiddleware.validJWTRequired,
    AuthPermissionMiddleware.onlyAdminsAreAllowed,
    AdminController.reviewAndLabelCourseById
])

// this route to get ban ready students
router.get('/admin/ban_ready/students', [
    TokenValidationMiddleware.validJWTRequired,
    AuthPermissionMiddleware.onlyAdminsAreAllowed,
    AdminController.getReadyStrikeStudents
])

// this route to get ban ready students
router.get('/admin/ban_ready/providers', [
    TokenValidationMiddleware.validJWTRequired,
    AuthPermissionMiddleware.onlyAdminsAreAllowed,
    AdminController.getReadyStrikeProviders
])

// this route to ban student by id
router.post('admin/ban/student',[
    TokenValidationMiddleware.validJWTRequired,
    AuthPermissionMiddleware.onlyAdminsAreAllowed,
    AdminController.banStudentById
])

// this route to ban provider by id
router.post('admin/ban/provider',[
    TokenValidationMiddleware.validJWTRequired,
    AuthPermissionMiddleware.onlyAdminsAreAllowed,
    AdminController.banProviderById
])
// answer inquiries


module.exports = router
const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/student.controller');
const PermissionMiddleware = require('../middlewares/auth.permission.middleware');
const TokenValidationMiddleware = require('../middlewares/token.validation.middleware')
const config = require('../config/config.json');

// permission levels
const FREE = config.permissionLevels.NORMAL_USER;

// register
router.post('/student/register', StudentController.register);

// get by id (personal page or account)
router.get('/student/:id', [
    TokenValidationMiddleware.validJWTRequired,
    // permission level
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    StudentController.getStudentById
])

router.patch('/student/:id', [
    TokenValidationMiddleware.validJWTRequired,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    StudentController.updateStudentAccount
]);

router.delete('/student/:id', [
    TokenValidationMiddleware.validJWTRequired,
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    StudentController.removeById
]);

router.post('/student/:id/confirmation/resend', [
    TokenValidationMiddleware.validJWTRequired,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    StudentController.resendVerificationEmail
])

router.post('/student/:id/recommendations', [
    TokenValidationMiddleware.validJWTRequired,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    StudentController.getRecommendationsForStudent
])



module.exports = router;
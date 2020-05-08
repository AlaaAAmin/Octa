const express = require('express');
const router = express.Router();
const UserVerificationMiddleware = require('../middlewares/user.validation.middleware');
const AuthController = require('../controllers/auth.controller');
const TokenValidationMiddleware = require('../middlewares/token.validation.middleware')
const EmailVerificationMiddleware = require('../middlewares/email-verification.validation.middleware');
const StudentController = require('../controllers/student.controller');
const ProviderController = require('../controllers/provider.controller');

// student
router.post('/student/auth', [
    UserVerificationMiddleware.hasValidFields,
    UserVerificationMiddleware.isPasswordAndStudentMatch,
    AuthController.Login
]);

router.post('/student/auth/refresh', [
    TokenValidationMiddleware.validJWTRequired,
    TokenValidationMiddleware.verifyRefreshBodyField,
    TokenValidationMiddleware.validRefreshTokenNeeded,
    AuthController.refreshToken
]);

router.get('/student/confirmation/:code', [
    EmailVerificationMiddleware.hasValidFields,
    EmailVerificationMiddleware.validTokenRequired,
    StudentController.verifyEmailToken
])

// provider
router.post('/provider/auth', [
    UserVerificationMiddleware.hasValidFields,
    UserVerificationMiddleware.isPasswordAndProviderMatch,
    AuthController.Login
]);

router.post('/provider/auth/refresh', [
    TokenValidationMiddleware.validJWTRequired,
    TokenValidationMiddleware.verifyRefreshBodyField,
    TokenValidationMiddleware.validRefreshTokenNeeded,
    AuthController.refreshToken
]);

router.get('/provider/confirmation/:code', [
    EmailVerificationMiddleware.hasValidFields,
    EmailVerificationMiddleware.validTokenRequired,
    ProviderController.verifyEmailToken
])



module.exports = router;

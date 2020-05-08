const express = require('express');
const router = express.Router();
const ProviderController = require('../controllers/provider.controller');
const PermissionMiddleware = require('../middlewares/auth.permission.middleware');
const TokenValidationMiddleware = require('../middlewares/token.validation.middleware')
const config = require('../config.json');

// permission levels
const FREE = config.permissionLevels.NORMAL_PROVIDER;

// register
router.post('/provider/register', ProviderController.providerRegister);

// get by id (personal page or account)
router.get('/provider/:id', [
    TokenValidationMiddleware.validJWTRequired,
    // permission level
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    ProviderController.getById
])

router.patch('/provider/:id', [
    TokenValidationMiddleware.validJWTRequired,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    ProviderController.updateAccount // does not sending message
]);

router.delete('/provider/:id', [
    TokenValidationMiddleware.validJWTRequired,
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    ProviderController.removeById
]);

router.post('/provider/:id/confirmation/resend', [
    TokenValidationMiddleware.validJWTRequired,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    ProviderController.resendVerificationEmail
])

module.exports = router;




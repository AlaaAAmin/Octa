const express = require('express');
const router = express.Router();
const TokenValidationMiddleware = require('../middlewares/token.validation.middleware')
const WishListController = require('../controllers/wishlist.controller')
const PermissionMiddleware = require('../middlewares/auth.permission.middleware');
const { NORMAL_USER } = require('../config/config.json').permissionLevels

router.post('/courses/:id/wish', [
    TokenValidationMiddleware.validJWTRequired,
    PermissionMiddleware.minimumPermissionLevelRequired(NORMAL_USER),
    WishListController.addCourseToStudentWishlist
])

router.post('/courses/:id/unwish', [
    TokenValidationMiddleware.validJWTRequired,
    PermissionMiddleware.minimumPermissionLevelRequired(NORMAL_USER),
    WishListController.removeCourseFromStudentWishlist
])


module.exports = router
const { ADMIN } = require('../config/config.json').permissionLevels;

const minimumPermissionLevelRequired = (required_permission_level) => {
    return (req, res, next) => {
        let user_permission_level = req.jwt.permissionLevel;
        if (user_permission_level == required_permission_level) return next()
        else return res.status(403).send();
    }
}

const onlySameUserOrAdminCanDoThisAction = (req, res, next) => {
    let user_permission_level = parseInt(req.jwt.permissionLevel);
    let userId = req.jwt._id;
    if (req.params.id === req.params.id) return next();
    else {
        if (user_permission_level == ADMIN) return next();
        else return res.status(403).send();
    }
}

const sameUserCantDoThisAction = (req, res, next) => {
    let userId = req.jwt.userId;
    if (req.params.userId !== userId) return next();
    else return res.status(400).send();
};

const onlyAdminsAreAllowed = (req, res, next) => {
    let permissionLevel = req.jwt.permissionLevel
    if (permissionLevel == ADMIN ) return next()
    res.status(401).send()
}


module.exports.minimumPermissionLevelRequired = minimumPermissionLevelRequired;
module.exports.onlySameUserOrAdminCanDoThisAction = onlySameUserOrAdminCanDoThisAction;
module.exports.sameUserCantDoThisAction = sameUserCantDoThisAction;
module.exports.onlyAdminsAreAllowed = onlyAdminsAreAllowed
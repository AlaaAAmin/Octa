const StudentModel = require('../models/student.model');
const ProviderModel = require('../models/provider.model');
const jwt = require('jsonwebtoken');
const EMAIL_SECRET = require('../config/config.json').EMAIL_SECRET;

const hasValidFields = (req, res, next) => {
    if (req.body && req.body.email) return next();
    res.status(400).json({ message: 'Email field required.' });
}

const EmailAndStudentMatch = (req, res, next) => {
    StudentModel.getStudentByEmail(req.body.email)
        .then(user => {
            if (!user) return res.status(404).json('Student not found.');
            let data = user;
            delete data.timestamp;
            delete user.password;
            delete user.permissionLevel;
            delete user.email;
            req.body.user = data;
            return next();
        })
        .catch(err => {
            res.status(500).json({ success: false, error: err })
        })
}

const EmailAndProviderMatch = (req, res, next) => {
    ProviderModel.getProviderByEmail(req.body.email)
        .then(user => {
            if (!user) return res.status(404).json('Course Provider not found.');
            let data = user;
            delete data.timestamp;
            delete data.password;
            delete data.permissionLevel;
            delete data.email;
            req.body.user = data;
            return next();
        })
        .catch(err => {
            res.status(500).json({ success: false, error: err })
        })
}

const passwordResetHasValidFields = (req, res, next) => {
    if (req.body && req.body.password) return next();
    res.status(400).json({ message: 'Password field required.' });
}

const ValidTokenRequired = (req, res, next) => {
    req.jwt = jwt.verify(req.params.code, EMAIL_SECRET);
    if (req.jwt) return next();
    res.status(401).json({ success: false, message: 'Invalid token.' });
}

module.exports.hasValidFields = hasValidFields;
module.exports.EmailAndStudentMatch = EmailAndStudentMatch;
module.exports.EmailAndProviderMatch = EmailAndProviderMatch;
module.exports.passwordResetHasValidFields = passwordResetHasValidFields;
module.exports.ValidTokenRequired = ValidTokenRequired;
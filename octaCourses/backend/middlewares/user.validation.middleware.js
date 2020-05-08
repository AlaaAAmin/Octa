const StudentModel = require('../models/student.model');
const ProviderModel = require('../models/provider.model');
const crypto = require('crypto');

const hasValidFields = (req, res, next) => {
    let errors = [];
    if (!req.body) return res.status(400).send({ error: 'Missing email and password fields' });
    else {
        if (!req.body.email) errors.push('Missing email field');
        if (!req.body.password) errors.push('Missing password field');
        if (!errors.length) return next();
        else return res.status(400).send({ errors: errors.join(',') });
    }
}

const isPasswordAndStudentMatch = (req, res, next) => {
    StudentModel.getStudentByEmail(req.body.email)
        .then(user => {
            if (!user) return res.status(404).send('User not found.');
            let passwordFields = user.password.split('$');
            let salt = passwordFields[0];
            let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
            if (hash !== passwordFields[1]) return res.status(400).send({ error: 'Invalid user credentials.' });
            req.body = {
                _id: user._id,
                email: user.email,
                firstName: user.firstname,
                lastName: user.lastname,
                phone: user.phone,
                permissionLevel: user.permissionLevel
            };
            return next();
        })
}

const isPasswordAndProviderMatch = (req, res, next) => {
    ProviderModel.getProviderByEmail(req.body.email)
        .then(user => {
            if (!user) return res.status(404).send('Provider not found.');
            let passwordFields = user.password.split('$');
            let salt = passwordFields[0];
            let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
            if (hash !== passwordFields[1]) return res.status(400).send({ error: 'Invalid Course Provider credentials.' });
            req.body = {
                _id: user._id,
                email: user.email,
                firstName: user.firstname,
                lastName: user.lastname,
                phone: user.phone,
                permissionLevel: user.permissionLevel
            };
            return next();
        })
}


module.exports.hasValidFields = hasValidFields;
module.exports.isPasswordAndStudentMatch = isPasswordAndStudentMatch;
module.exports.isPasswordAndProviderMatch = isPasswordAndProviderMatch;
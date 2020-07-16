const StudentModel = require('../models/student.model');
const ProviderModel = require('../models/provider.model');
const AdminModel = require('../models/admin.model')
const crypto = require('crypto');

// hasValidFields is a function that validates if body has valid fields or not
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

// isPasswordAndStudentMatch checks if user exists or not 
const isPasswordAndStudentMatch = (req, res, next) => {
    StudentModel.getStudentByEmail(req.body.email)
        .then(user => {
            if (!user) return res.status(404).send('User not found.');
            let passwordFields = user.password.split('$');
            let salt = passwordFields[0];
            let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
            if (hash !== passwordFields[1]) return res.status(400).send({ error: 'Invalid user credentials.' });
            req.body = {
                id: user.id,
                email: user.email,
                firstName: user.firstname,
                lastName: user.lastname,
                phone: user.phone,
                permissionLevel: user.permissionLevel
            };
            return next();
        })
        .catch(err => {
            res.status(400).send({ success: false, error: err })
        })
}

// isPasswordAndProviderMatch checks if provider exists or not 
const isPasswordAndProviderMatch = (req, res, next) => {
    ProviderModel.getProviderByEmail(req.body.email)
        .then(user => {
            if (!user) return res.status(404).send('Provider not found.');
            let passwordFields = user.password.split('$');
            let salt = passwordFields[0];
            let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
            if (hash !== passwordFields[1]) return res.status(400).send({ error: 'Invalid Course Provider credentials.' });
            req.body = {
                id: user.id,
                email: user.email,
                name: user.name,
                phone: user.phone,
                permissionLevel: user.permissionLevel,
                verified: user.verified
            };

            return next();
        })
        .catch(err => {
            res.status(400).send({ success: false, error: err })
        })
}

// isPasswordAndAdminMatch checks if admin exists or not 
const isPasswordAndAdminMatch = (req, res, next) => {
    
    AdminModel.getAdminByEmail(req.body.email)
        .then(user => {
            if (!user) return res.status(404).send('Admin not found.');
            let passwordFields = user.password.split('$');
            let salt = passwordFields[0];
            let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
            if (hash !== passwordFields[1]) return res.status(400).send({ error: 'Invalid Admin credentials.' });
            
            req.body = {
                id: user._id,
                email: user.email,
                username: user.username,
                permissionLevel: user.permissionLevel
            };

            return next();
        })
        .catch(err => {
            console.log(err)
            res.status(400).send({ success: false, error: err })
        })
}

module.exports = {
    hasValidFields,
    isPasswordAndStudentMatch,
    isPasswordAndProviderMatch,
    isPasswordAndAdminMatch
}
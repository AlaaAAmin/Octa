const jwt = require('jsonwebtoken');
const EMAIL_SECRET = require('../config/config.json').EMAIL_SECRET;

const hasValidFields = (req, res, next) => {
    if (req.params && req.params.code) return next();
    res.status(400).send();
}

const validTokenRequired = (req, res, next) => {
    req.jwt = jwt.verify(req.params.code, EMAIL_SECRET);
    if (req.jwt) return next();
    return res.status(401).send({ success: false, message: 'Invalid token.' });
}

module.exports.hasValidFields = hasValidFields;
module.exports.validTokenRequired = validTokenRequired;
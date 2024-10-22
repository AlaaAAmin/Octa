const jwt = require('jsonwebtoken');
const SECRET = require('../config/config.json').JWT_SECRET;
const crypto = require('crypto');

// verifyRefreshBodyField is a function that validates if there is a body and refreshToken or not
const verifyRefreshBodyField = (req, res, next) => {
    if (req.body && req.body.refreshToken) return next();
    res.status(400).json({ error: 'Refresh token required' });
}

// validRefreshTokenNeeded is a function that validates if there is a valid refreshToken or not
const validRefreshTokenNeeded = (req, res, next) => {
    let b = new Buffer.from(req.body.refreshToken, 'base64');
    let refreshToken = b.toString();
    let hash = crypto.createHmac('sha512', req.jwt.refreshKey).update(req.jwt._id + SECRET).digest('base64'); // req.jwt.userId -->req.jwt._id
    if (hash !== refreshToken) return res.status(400).json({ error: 'Invalid refresh token.' });
    req.body = req.jwt;
    return next();
}

// validRefreshTokenNeeded is a function that validates if there is a valid jwt or not
const validJWTRequired = (req, res, next) => {
    if (!req.headers['authorization']) return res.status(401).send();
    else {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') return res.status(401).send();
            req.jwt = jwt.verify(authorization[1], SECRET);
            return next();
        } catch (err) {
            return res.status(403).send();
        }
    }
};

module.exports.verifyRefreshBodyField = verifyRefreshBodyField;
module.exports.validRefreshTokenNeeded = validRefreshTokenNeeded;
module.exports.validJWTRequired = validJWTRequired;

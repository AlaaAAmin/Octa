const SECRET = require('../config/config.json').JWT_SECRET;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const Login = (req, res, next) => {
    try {
        let refreshId = req.body.id + SECRET;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest('base64');
        req.body.refreshKey = salt;
        // expire date after 1 day of login
        let token = jwt.sign(req.body, SECRET, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60 * 24) });
        let b = Buffer.from(hash)
        let refreshToken = b.toString('base64');
        res.status(201).send({ status: 'success', accessToken: token, refreshToken: refreshToken });
    } catch (err) { next(err) }
}

const refreshToken = (req, res, next) => {
    try {
        req.body = req.jwt;
        let token = jwt.sign(req.body, SECRET, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60 * 24) });
        res.status(201).send({ status: 'success',token: token });
    } catch (err) { next(err) }
}


module.exports.Login = Login;
module.exports.refreshToken = refreshToken;
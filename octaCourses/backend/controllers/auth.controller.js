const SECRET = require('../config.json').JWT_SECRET;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const Login = (req, res) => {
    try {
        let refreshId = req.body._id + SECRET;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest('base64');
        req.body.refreshKey = salt;
        let token = jwt.sign(req.body, SECRET);
        let b = Buffer.from(hash)
        let refreshToken = b.toString('base64');
        res.status(201).send({ accessToken: token, refreshToken: refreshToken });
    } catch (err) {
        res.status(500).send({ success: false, error: err });
    }
}

const refreshToken = (req, res) => {
    try {
        req.body = req.jwt;
        let token = jwt.sign(req.body, SECRET);
        res.status(201).send({ token: token });
    } catch (err) {
        res.status(500).send({ errors: err });
    }
}


module.exports.Login = Login;
module.exports.refreshToken = refreshToken;
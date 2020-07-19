const StudentModel = require('../models/student.model');
const mailer = require('../services/mailer.service');
const Token = require('../models/token.model');
const crypto = require('crypto');
const EMAIL_SECRET = require('../config/config.json').EMAIL_SECRET;
const jwt = require('jsonwebtoken');
const _EventEmitter = require('../services/event.service');
const _Error = require('../classes/error.class');

const register = (req, res, next) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
    req.body.password = salt + '$' + hash;
    let userId;
    StudentModel.createStudent(req.body)
        .then(result => {
            userId = result._id
            return Token.generateToken(result._id, 'email-verification');
        })
        .then(token => {
            let data = {
                token: token.get('token'),
                userId: userId
            }
            let code = jwt.sign(data, EMAIL_SECRET);
            const url = `http://${req.get('host')}/student/confirmation/${code}`
            const html = `
                    <h1>Just one more step</h1>
                    <p>you can activate your account through this link:<br> <a href='${url}'>Confirm Email</a></p>
                    `;
            const text = `Just one more step \n you can activate your account through this link: \n
                ${url}`
            const options = {
                recievers: req.body.email,
                subject: 'OctaCourses Support',
                text: text,
                html: html
            }
            return mailer.sendMail(options);
        })
        .then(() => {
            res.status(201).send({ status: 'success', id: userId });
        })
        .catch(err => next(err));
}

const updateStudentAccount = (req, res, next) => {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
        req.body.password = salt + '$' + hash;
    }

    StudentModel.updateStudent(req.params.id, req.body)
        .then(result => {
            res.status(204).send({ status: 'success', message: 'user updated.' })
        })
        .catch(err => next(err));
}

const getStudentById = (req, res, next) => {
    StudentModel.getStudentById(req.params.id)
        .then(result => {
            let user = result;
            delete user.timestamp;
            delete user.password;
            delete user.permissionLevel;
            res.status(200).send(user)
        })
        .catch(error => next(err))
}

const updateById = (req, res, next) => {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
        password = salt + "$" + hash;
    }

    StudentModel.updateStudent(req.params.userId, req.body)
        .then((result) => {
            res.status(204).send();
        })
        .catch(error => next(error))
}

const removeById = (req, res, next) => {
    StudentModel.deleteById(req.params.userId)
        .then((result) => {
            res.status(204).send();
        })
        .catch(error => next(error))
}

const verifyEmailToken = (req, res, next) => {
    Token.Token.findOne({ token: req.jwt.token }, (err, token) => {
        if (err) return next(err)
        if (!token) return next(new _Error('Unable to find token, token my have expired.',400))
        StudentModel.Student.findOne({ _id: token._userId }, (err, user) => {
            if (err) return next(err)
            if (!user) return next(new _Error('Unable to find a user for this token.', 400))
            if (user.verified) return next(new _Error('This user has already been verified.', 400))
            user.verified = true;
            user.save((err) => {
                if (err) return next(err)
                res.status(200).send({ status: 'success', message: "The account has been verified. Please log in." });
            });
        }).catch(err => next(err))
    })
}

const resendVerificationEmail = (req, res, next) => {
    let userId = req.jwt._id;
    StudentModel.Student.findOne({ _id: userId }, (err, user) => {
        if (err) return next(err)
        if (!user) return next(new _Error('Unable to find a user for this token.', 400))
        if (user.verified) return next(new _Error('This user has already been verified.', 400))
        Token.generateToken(userId, 'email-verification')
            .then(token => {
                let data = {
                    token: token.get('token'),
                    userId: userId
                }
                let code = jwt.sign(data, EMAIL_SECRET);
                const url = `http://${req.get('host')}/student/confirmation/${code}`
                const html = `
                    <h1>Just one more step</h1>
                    <p>you can activate your account through this link:<br> <a href='${url}'>Confirm Email</a></p>
                    `;
                const text = `Just one more step \n you can activate your account through this link: \n
                ${url}`
                const options = {
                    recievers: user.email,
                    subject: 'OctaCourses Support',
                    text: text,
                    html: html
                }
                return mailer.sendMail(options);
            })
            .then(() => {
                res.status(200).send({ status: 'success', message: 'Email has been sent.' });
            })
            .catch(err => next(err))
    })
}

const SendPasswordReset = (req, res, next) => {
    Token.generateToken(req.body.user._id, 'password-reset')
        .then(token => {
            let data = {
                token: token.get('token'),
                userId: req.body.user.id
            }
            let code = jwt.sign(data, EMAIL_SECRET);
            const url = `http://${req.get('host')}/student/reset/${code}`;
            const html = `
                        <h1>Reset your password</h1>
                        <p>your password has been reset, just follow this link:<br>
                        <a href='${url}'>Reset password</a>
                        </p>
                        `
            const text = `Reset your password through this link: \n ${url}`
            const options = {
                recievers: req.body.email,
                subject: 'OctaCourses Support',
                text: text,
                html: html
            }
            return mailer.sendMail(options);
        })
        .then(() => {
            res.status(200).send({ status: 'success', message: 'Email has been sent.' });
        })
        .catch(err => next(err))
}

const resetPassword = (req, res, next) => {
    Token.Token.findOne({ token: req.jwt.token }, (err, token) => {
        if (err) return next(err)
        if (!token) return next(new _Error('Unable to find token, token my have expired.',400))
        StudentModel.Student.findOne({ _id: token._userId }, (err, user) => {
            if (err) return next(err)
            if (!user) return next(new _Error('Unable to find a user for this token.',400));

            let salt = crypto.randomBytes(16).toString('base64');
            let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
            req.body.password = salt + '$' + hash;
            user.password = req.body.password;
            user.save((err) => {
                if (err) return next(err)
                res.status(200).send({ status: 'success', message: "Password has been reset." });
            });
        });
    })
}


module.exports.studentRegister = register;
module.exports.updateAccount = updateStudentAccount;
module.exports.getById = getStudentById;
module.exports.updateById = updateById;
module.exports.removeById = removeById;
module.exports.verifyEmailToken = verifyEmailToken;
module.exports.resendVerificationEmail = resendVerificationEmail;
module.exports.SendPasswordReset = SendPasswordReset;
module.exports.resetPassword = resetPassword;
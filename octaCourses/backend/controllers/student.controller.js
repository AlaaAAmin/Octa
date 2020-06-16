const StudentModel = require('../models/student.model');
const mailer = require('../services/mailer.service');
const Token = require('../models/token.model');
const crypto = require('crypto');
const EMAIL_SECRET = require('../config.json').EMAIL_SECRET;
const jwt = require('jsonwebtoken');

const register = (req, res) => {
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
            res.status(201).send({ success: true, id: userId });
        })
        .catch(err => {
            res.status(400).send({ success: false, error: err });
        });
}

const updateStudentAccount = (req, res) => {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
        req.body.password = salt + '$' + hash;
    }

    StudentModel.updateStudent(req.params.id, req.body)
        .then(result => {
            res.status(204).send({ success: true, message: 'user updated.' })
        })
        .catch(err => {
            res.status(400).send({ success: false, error: err });
        });
}

const getStudentById = (req, res) => {
    StudentModel.getStudentById(req.params.id)
        .then(result => {
            let user = result;
            delete user.timestamp;
            delete user.password;
            delete user.permissionLevel;
            res.status(200).send(user)
        })
}

const updateById = (req, res) => {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
        password = salt + "$" + hash;
    }

    StudentModel.updateStudent(req.params.userId, req.body)
        .then((result) => {
            res.status(204).send();
        })
}

const removeById = (req, res) => {
    StudentModel.deleteById(req.params.userId)
        .then((result) => {
            res.status(204).send();
        })
}

const verifyEmailToken = (req, res, next) => {
    Token.Token.findOne({ token: req.jwt.token }, (err, token) => {
        if (err) return res.status(500).send({ success: false, error: err })
        if (!token) return res.status(400).send({ success: false, message: 'Unable to find token, token my have expired.' });
        StudentModel.Student.findOne({ _id: token._userId }, (err, user) => {
            if (err) return res.status(500).send({ success: false, error: err })
            if (!user) return res.status(400).send({ message: 'unable to find a user for this token.' });
            if (user.verified) return res.status(400).send({ type: 'already-verified', message: 'This user has already been verified.' });
            user.verified = true;
            user.save((err) => {
                if (err) return res.status(500).send({ success: false, error: err })
                res.status(200).send({ message: "The account has been verified. Please log in." });
            });
        }).catch(err => {
            res.status(500).send({ success: false, error: err })
        })
    })
}

const resendVerificationEmail = (req, res) => {
    let userId = req.jwt._id;
    StudentModel.Student.findOne({ _id: userId }, (err, user) => {
        if (err) return res.status(500).send({ success: false, error: err });
        if (!user) return res.status(400).send({ message: 'unable to find a user for this token.' });
        if (user.verified) return res.status(400).send({ type: 'already-verified', message: 'This user has already been verified.' });
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
            .then(()=> {
                res.status(200).send({message: 'Email has been sent.'});
            })
            .catch(err => {
                res.status(400).send({ success: false, error: err });
            })
    })
}

const SendPasswordReset = (req, res) => {
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
            res.status(200).send({ message: 'Email has been sent.' });
        })
        .catch(err => {
            console.log(err)
            res.status(400).send({ success: false, error: err })
        })
}

const resetPassword = (req, res) => {
    Token.Token.findOne({ token: req.jwt.token }, (err, token) => {
        if (err) return res.status(500).send({ success: false, error: err })
        if (!token) return res.status(400).send({ success: false, message: 'Unable to find token, token my have expired.' });
        StudentModel.Student.findOne({ _id: token._userId }, (err, user) => {
            if (err) return res.status(500).send({ success: false, error: err })
            if (!user) return res.status(400).send({ message: 'Unable to find a user for this token.' });

            let salt = crypto.randomBytes(16).toString('base64');
            let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
            req.body.password = salt + '$' + hash;
            user.password = req.body.password;
            user.save((err) => {
                if (err) return res.status(500).send({ success: false, error: err })
                res.status(200).send({ message: "Password has been reset." });
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
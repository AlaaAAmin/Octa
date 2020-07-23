const ProviderModel = require('../models/provider.model');
const mailer = require('../services/mailer.service');
const Token = require('../models/token.model');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const _Error = require('../classes/error.class');
const stripe = require('../services/payment.service');
const EMAIL_SECRET = require('../config/config.json').EMAIL_SECRET;

const register = (req, res, next) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
    req.body.password = salt + '$' + hash;
    let userId;
    ProviderModel.createProvider(req.body)
        .then(result => {
            userId = result._id;
            return Token.generateToken(userId, 'email-verification')
        })
        .then(token => {
            let data = {
                token: token.get('token'),
                userId: userId
            }
            let code = jwt.sign(data, EMAIL_SECRET);
            const url = `http://${req.get('host')}/provider/confirmation/${code}`
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
            res.status(201).json({ status: 'success', data: { id: userId } });
        })
        .catch(err => next(err))
}

const updateProviderAccount = (req, res, next) => {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
        req.body.password = salt + '$' + hash;
    }

    ProviderModel.updateProvider(req.params.id, req.body)
        .then(result => {
            res.status(204).send() //.json({ status: 'success', message: 'Course provider account updated.' }); wont be sent at all
        })
        .catch(err => next(err))
}

const getProviderById = (req, res, next) => {
    ProviderModel.getProviderById(req.params.id)
        .then(result => {
            let user = result;
            delete user.timestamp;
            delete user.password;
            delete user.permissionLevel;
            res.status(200).json({ status: 'success', data: { user } })
        })
        .catch(err => next(err))
}

const updateById = (req, res, next) => {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
        password = salt + "$" + hash;
    }

    ProviderModel.updateProvider(req.params.userId, req.body)
        .then((result) => {
            res.status(204).send() //.send({ status: 'success', message: 'Course provider account updated.'});
        })
        .catch(err => next(err));
}

const removeById = (req, res, next) => {
    ProviderModel.deleteById(req.params.userId)
        .then((result) => {
            res.status(204).send();
        })
        .catch(err => next(err))
}

const verifyEmail = (req, res, next) => {
    Token.Token.findOne({ token: req.jwt.token }, (err, token) => {
        if (err) return next(err)
        if (!token) return next(new _Error('Unable to find token, token my have expired.', 400))
        ProviderModel.Provider.findOne({ _id: token._userId }, (err, user) => {
            if (err) return next(err)
            if (!user) return next(new _Error('unable to find a user for this token.', 400))
            if (user.verified) return next('This user has already been verified.', 400)
            user.verified = true;
            user.save((err) => {
                if (err) return next(err)
                res.status(200).json({ status: 'success', message: "The account has been verified. Please log in." });
            });
        }).catch(err => next(err))
    })
}

const resendVerificationEmail = (req, res, next) => {
    let userId = req.jwt._id;;
    ProviderModel.Provider.findOne({ _id: userId }, (err, user) => {
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
                const url = `http://${req.get('host')}/provider/confirmation/${code}`
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
                res.status(200).json({ status: 'success', message: 'Email has been sent.' });
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
            const url = `http://${req.get('host')}/provider/reset/${code}`;
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
            res.status(200).json({ status: 'success', message: 'Email has been sent.' });
        })
        .catch(err => next(err))
}

const resetPassword = (req, res, next) => {
    Token.Token.findOne({ token: req.jwt.token }, (err, token) => {
        if (err) return next(err)
        if (!token) return next(new _Error('Unable to find token, token my have expired.', 400))
        ProviderModel.Provider.findOne({ _id: token._userId }, (err, user) => {
            if (err) next(err)
            if (!user) return next(new _Error('Unable to find a user for this token.', 400))

            let salt = crypto.randomBytes(16).toString('base64');
            let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
            req.body.password = salt + '$' + hash;
            user.password = req.body.password;
            user.save((err) => {
                if (err) return next(err)
                res.status(200).json({ status: 'success', message: "Password has been reset." });
            });
        });
    })
}

const generateStripeForProvider = (req, res, next) => {
    // request must contain {firstname, lastname}
    stripe.accounts.create({
        type: 'custom',
        country: 'US',
        email: req.jwt.email,
        business_type: 'individual',
        individual: {
            first_name: req.body.firstname,
            last_name: req.body.lastname
        },
        requested_capabilities: ['transfers'],

    }, async function (err, account) {
        if (err) return next(err)
        try {
            const { id } = account


            await stripe.account.update(id, {
                tos_acceptance: {
                    date: Math.floor(Date.now() / 1000),
                    ip: req.connections.remoteAddress
                }
            })

            let bank = await stripe.accounts.createExternalAccount(id, {
                external_account: {
                    object: 'bank_account',
                    country: 'US',
                    currency: 'usd',
                    routing_number: '110000000',
                    account_number: '000123456789'
                }
            })

            await ProviderModel.bindStripeAccountToProvider(req.jwt._id, id, bank.id)


            res.status(200).json({ status: 'success', message: 'Created stripe account.' })

        } catch (err) { next(err) }

    })
}



module.exports.providerRegister = register;
module.exports.updateAccount = updateProviderAccount;
module.exports.getById = getProviderById;
module.exports.updateById = updateById;
module.exports.removeById = removeById;
module.exports.verifyEmail = verifyEmail;
module.exports.resendVerificationEmail = resendVerificationEmail;
module.exports.SendPasswordReset = SendPasswordReset;
module.exports.resetPassword = resetPassword;
module.exports.generateStripeForProvider = generateStripeForProvider
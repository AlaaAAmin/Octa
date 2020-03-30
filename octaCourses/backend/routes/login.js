const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const functions = require('./../common/functions');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/user/login', (req, res, next) => {
    let fetchUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                
                return res.status(401)
                    .send(functions.cbFailureJSON("auth failed"))
            }
            fetchUser = user;
            
            return bcrypt.compare(req.body.password, user.password)
        })
        .then(result => {
            if (!result) {
                
                return res.status(401)
                    .send(functions.cbFailureJSON("auth failed"))
            }
            
            const token = jwt.sign({ email: fetchUser.email, userId: fetchUser._id }, 'WImRfITrFni3903O', {
                expiresIn: '1h'
            });
            
            res.status(200)
            .send(functions.cbSuccessJSON(token))

        })
        .catch(err => {
            res.status(401)
                .send(functions.cbFailureJSON("Auth failed!"))
        })
})

module.exports = router
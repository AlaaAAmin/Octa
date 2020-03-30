const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const functions = require('./../common/functions');
router.post('/user/register', (req, res, next) => {
    // logic
    // save data to database then send 200 res to user
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                phone: "2" + req.body.phone,
                password: hash,
                timestamp: Date.now()
            });

            user.save()
                .then(result => {
                    res.status(201)
                        .json(functions.cbSuccessJSON("user created successfully!"))
                })
                .catch(err => {

                    res.status(500)
                        .json(functions.cbFailureJSON(err))
                });

        });
})

router.post('/provider/register', (req, res, next) => {

})

module.exports = router
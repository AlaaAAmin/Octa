const AdminModel = require('../models/admin.model')
const crypto = require('crypto')
const { JWT_SECRET } = require('../config/config.json')
const jwt = require('jsonwebtoken')
const { addLabelsToCourseAndReview, getRawCourses } = require('../models/course.model')
const { getBanReadyStudents, Student } = require('../models/student.model')
const { getBanReadyProviders, Provider } = require('../models/provider.model')
// admin jobs

// this function handles adding admins
const createUser = (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
    req.body.password = salt + '$' + hash;

    AdminModel.addAdmin(req.body).then(doc => res.status(200).send(doc.toJSON()))
}

// this function reviews course
const reviewAndLabelCourseById = (req, res) => {
    addLabelsToCourseAndReview(req.params.id, req.body.labels)
        .then(raw => {
            res.status(200).send({ success: true, message: 'Course reviewed.' })
        })
        .catch(err => {
            res.status(400).send({ success: false, error: err })
        })
}

const getUnReviewedCourses = (req, res) => {
    getRawCourses()
        .then(docs => {
            res.status(200).send(docs)
        })
        .catch(err => {
            res.status(400).send({success: false, error: err})
        })
}

// getReadyStrikeUsers is a function that fetches data of students that violates terms
const getReadyStrikeStudents = (req, res) => {
    getBanReadyStudents()
        .then(docs => {
            res.status(200).send(docs)
        })
        .catch(err => {
            res.status(400).send(err)
        })
}
// getReadyStrikeUsers is a function that fetches data of providers that violates terms

const getReadyStrikeProviders = (req, res) => {
    getBanReadyProviders()
        .then(docs => {
            res.status(200).send(docs)
        })
        .catch(err => {
            res.status(400).send({ success: false, error: err })
        })
}
// getReadyStrikeUsers is a function that make account banned for student
const banStudentById = (req, res) => {
    Student.updateOne({ _id: req.body.studentId }, { meta: { banned: true } }, (err, raw) => {
        if (err) return res.status(400).send({ success: false, error: err })
        res.status(200).send('Student banned.')
    })
}

// getReadyStrikeUsers is a function that make account banned for provider

const banProviderById = (req, res) => {
    Provider.updateOne({ _id: req.body.providerId }, { meta: { banned: true } }, (err, raw) => {
        if (err) return res.status(400).send({ success: false, error: err })
        res.status(200).send('Provider banned.')
    })
}
module.exports = {
    createUser,
    reviewAndLabelCourseById,
    getReadyStrikeProviders,
    getReadyStrikeStudents,
    banStudentById,
    banProviderById,
    getUnReviewedCourses
}

const AdminModel = require('../models/admin.model')
const crypto = require('crypto')
const { addLabelsToCourseAndReview, getRawCourses } = require('../models/course.model')
const { getBanReadyStudents, Student } = require('../models/student.model')
const { getBanReadyProviders, Provider } = require('../models/provider.model')
const { getInquiries, respondToInquiryById } = require('../models/inquiries.model')
const _Error = require('../classes/error.class')

// this function handles adding admins
const createUser = (req, res, next) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
    req.body.password = salt + '$' + hash;

    AdminModel.addAdmin(req.body)
        .then(doc => res.status(200).send({ status: 'success', data: doc.toJSON() }))
        .catch(err => next(err))
}

// this function reviews course
const reviewAndLabelCourseById = (req, res, next) => {
    addLabelsToCourseAndReview(req.params.id, req.body.labels)
        .then(raw => {
            res.status(200).send({ status: 'success', message: 'Course reviewed.' })
        })
        .catch(err => next(err))
}

const getUnReviewedCourses = (req, res, next) => {
    getRawCourses()
        .then(docs => {
            res.status(200).send({ status: 'success', data: { docs } })
        })
        .catch(err => next(err))
}

// getReadyStrikeUsers is a function that fetches data of students that violates terms
const getReadyStrikeStudents = (req, res, next) => {
    getBanReadyStudents()
        .then(docs => {
            res.status(200).send({ status: 'success', data: { docs } })
        })
        .catch(err => next(err))
}
// getReadyStrikeUsers is a function that fetches data of providers that violates terms

const getReadyStrikeProviders = (req, res, next) => {
    getBanReadyProviders()
        .then(docs => {
            res.status(200).send({ status: 'success', data: { docs } })
        })
        .catch(err => next(err))
}
// getReadyStrikeUsers is a function that make account banned for student
const banStudentById = (req, res, next) => {
    Student.updateOne({ _id: req.body.studentId }, { meta: { banned: true } }, (err, raw) => {
        if (err) return next(err)
        res.status(200).send({ status: 'success', message: 'Student banned.' })
    })
}

// getReadyStrikeUsers is a function that make account banned for provider

const banProviderById = (req, res, next) => {
    Provider.updateOne({ _id: req.body.providerId }, { meta: { banned: true } }, (err, raw) => {
        if (err) return next(err)
        res.status(200).send({ status: 'success', message: 'Provider banned.' })
    })
}

// 
const getAllInquiries = (req, res, next) => {
    getInquiries()
        .then(docs => {
            res.status(200).send({ status: 'success', data: { docs } })
        })
        .catch(err => next(err))
}

// 
const respondToInquiry = (req, res, next) => {
    respondToInquiryById(req.body.inquiryId)
        .then()
        .catch(err => next(err))
}

module.exports = {
    createUser,
    reviewAndLabelCourseById,
    getReadyStrikeProviders,
    getReadyStrikeStudents,
    banStudentById,
    banProviderById,
    getUnReviewedCourses,
    getAllInquiries,
    respondToInquiry
}

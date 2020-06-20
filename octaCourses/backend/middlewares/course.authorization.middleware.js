const CourseModel = require('../models/course.model')
const EnrollmentModel = require('../models/enrollment.model')

const onlyEnrolledStudentsAuthorized = async (req, res, next) => {
    try {
        let result = await EnrollmentModel.isStudentEnrolledOrNot(req.jwt._id, req.params.id)
        result ? next() : res.status(403).send()
    } catch (err) {
        res.status(404).send({ success: false, error: err })
    }
}

const onlyOwnerOfCourseCanEdit = async (req, res, next) => {
    try {
        let course = await CourseModel.getCourseById(req.params.id)
        if (course.ownerId == req.jwt._id) return next()
        res.status(403).send()
    } catch (err) {
        res.status(404).send({ success: false, error: err })
    }
}

const ownerIsAuthorized = async (req, res, next) => {
    try {
        let owner = CourseModel.isOwnerOfCourse(req.jwt._id, req.params.id)
        // req.jwt.permissionLevel == 10 ? owner ? next() : res.status(403).send() : next()
        if (req.jwt.permissionLevel == 10) {
            if (owner) return next()
            res.status(403).send()
        }
        next()
    } catch (err) {
        res.status(404).send({ success: false, error: err })

    }
}

module.exports.onlyEnrolledStudentsAuthorized = onlyEnrolledStudentsAuthorized
module.exports.onlyOwnerOfCourseCanEdit = onlyOwnerOfCourseCanEdit
module.exports.ownerIsAuthorized = ownerIsAuthorized

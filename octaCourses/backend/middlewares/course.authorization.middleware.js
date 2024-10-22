const CourseModel = require('../models/course.model')
const EnrollmentModel = require('../models/enrollment.model')

const onlyEnrolledStudentsAuthorized = async (req, res, next) => {
    try {
        let result = await EnrollmentModel.isStudentEnrolledOrNot(req.jwt._id, req.params.id)
        result ? next() : res.status(403).send()
    } catch (err) {
        res.status(404).json({ success: false, error: err })
    }
}

const onlyOwnerOfCourseAuthorized = async (req, res, next) => {
    try {
        let course = await CourseModel.getCourseById(req.params.id)
        if (course.ownerId == req.jwt._id) return next()
        res.status(403).send()
    } catch (err) {
        res.status(404).json({ success: false, error: err })
    }
}

const ownerIsAuthorized = async (req, res, next) => {
    try {
        let owner = await CourseModel.isOwnerOfCourse(req.jwt._id, req.params.id)
        // req.jwt.permissionLevel == 10 ? owner ? next() : res.status(403).send() : next()
        if (req.jwt.permissionLevel == 10) {
            if (owner) return next()
            res.status(403).send()
        }
        next()
    } catch (err) {
        res.status(404).json({ success: false, error: err })

    }
}
// this middleware handles authorization for both student enrolled and owner of course
const EnrolledStudentsAndOwnerIsAuthorized = (req, res, next) => {
    try {
        
    } catch (err) {
        res.status(404).json({ success: false, error: err })

    }
}

module.exports.EnrolledStudentsAndOwnerIsAuthorized = EnrolledStudentsAndOwnerIsAuthorized
module.exports.onlyEnrolledStudentsAuthorized = onlyEnrolledStudentsAuthorized
module.exports.onlyOwnerOfCourseAuthorized = onlyOwnerOfCourseAuthorized
module.exports.ownerIsAuthorized = ownerIsAuthorized

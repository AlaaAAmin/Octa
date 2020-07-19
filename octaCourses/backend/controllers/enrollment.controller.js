const EnrollmentModel = require('../models/enrollment.model')
const CourseModel = require('../models/course.model')
const enroll = async (req, res, next) => {
    try {
        await EnrollmentModel.enrollStudentToCourse(req.jwt._id, req.params.id)
        res.status(200).send({ status: 'success', message: 'student enrolled to this course.' })
    } catch (err) { next(err) }
    // EnrollmentModel.enrollStudentToCourse(req.jwt._id,req.params.id,)
}

const isStudentEnrolledInCourse = async (req, res, next) => {
    try {
        let enrollment = await EnrollmentModel.isStudentEnrolledOrNot(req.jwt._id, req.params.id)
        res.status(200).send(enrollment)
    } catch (err) { next(err) }
}

const getEnrolledStudentsOfCourse = async (req, res, next) => {
    try {
        let students = await EnrollmentModel.getStudents(req.params.id)
        res.status(200).send({ status: 'success', data: { students } })
    } catch (err) { next(err) }
}

module.exports.enroll = enroll
module.exports.isStudentEnrolledInCourse = isStudentEnrolledInCourse
module.exports.getEnrolledStudentsOfCourse = getEnrolledStudentsOfCourse
const EnrollmentModel = require('../models/enrollment.model')
const CourseModel = require('../models/course.model')
const enroll = async (req, res) => {
    try {
        await EnrollmentModel.enrollStudentToCourse(req.jwt._id, req.params.id)
        res.status(200).send({ success: true, message: 'student enrolled to this course.' })
    } catch (err) {
        res.status(400).send({ success: false, error: err })
    }
    // EnrollmentModel.enrollStudentToCourse(req.jwt._id,req.params.id,)
}

const isStudentEnrolledInCourse = async (req, res) => {
    try {
        let enrollment = await EnrollmentModel.isStudentEnrolledOrNot(req.jwt._id, req.params.id)
        res.status(200).send(enrollment)
    } catch (err) {
        res.status(400).send({ success: false, error: err })
    }
}

const getEnrolledStudentsOfCourse = async (req, res) => {
    try{
        let students = await EnrollmentModel.getStudents(req.params.id)
        res.status(200).send(students)
    } catch(err) {
        res.status(400).send({ success: false, error: err })
    }
}

module.exports.enroll = enroll
module.exports.isStudentEnrolledInCourse = isStudentEnrolledInCourse
module.exports.getEnrolledStudentsOfCourse = getEnrolledStudentsOfCourse
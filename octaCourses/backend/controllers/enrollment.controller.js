const EnrollmentModel = require('../models/enrollment.model')
const CourseModel = require('../models/course.model')
const stripe = require('../services/payment.service')
const { getOrderByCourseIdAndStudentId, deleteOrder } = require('../models/order.model')
const enroll = async (req, res, next) => {
    try {
        await EnrollmentModel.enrollStudentToCourse(req.jwt._id, req.params.id)
        res.status(200).json({ status: 'success', message: 'student enrolled to this course.' })
    } catch (err) { next(err) }
    // EnrollmentModel.enrollStudentToCourse(req.jwt._id,req.params.id,)
}

const isStudentEnrolledInCourse = async (req, res, next) => {
    try {
        let enrollment = await EnrollmentModel.isStudentEnrolledOrNot(req.jwt._id, req.params.id)
        res.status(200).json({ status: 'success', data: enrollment })
    } catch (err) { next(err) }
}

const getEnrolledStudentsOfCourse = async (req, res, next) => {
    try {
        let students = await EnrollmentModel.getStudents(req.params.id)
        res.status(200).json({ status: 'success', data: { students } })
    } catch (err) { next(err) }
}

const closeEnrollmentForCourse = (req, res, next) => {
    EnrollmentModel.closeEnrollmentForCourse(req.params.id)
        .then((raw) => {
            res.status(200).json({ status: 'success', message: 'Enrollment closed for this course.' })
        })
        .catch(err => next(err))
}

// also refund done here
const unenrollStudent = async (req, res, next) => {

    try {
        let order = await getOrderByCourseIdAndStudentId(req.params.id, req.jwt._id)

        stripe.refunds.create(
            {
                charge: order.paymentId,
                amount: order.amount - (order.amount * 0.15) // our cut 
            },
            async function (err, refund) {
                if (err) return next(err)
                // tell user refunded $ XX and we took X dollars 
                await EnrollmentModel.unEnrollStudentFromCourse(req.params.id, req.jwt._id)
                await deleteOrder(order._id)
                res.status(200).json({status: 'success', message: 'Course price refunded.'})
            })
    } catch (e) { next(e) }

}

module.exports = {
    enroll,
    isStudentEnrolledInCourse,
    getEnrolledStudentsOfCourse,
    closeEnrollmentForCourse,
    unenrollStudent
}
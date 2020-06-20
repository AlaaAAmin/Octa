const mongoose = require('../services/mongodb.service').mongoose
const uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

const enrolledStudentSchema = new Schema({
    studentId: { required: true, type: mongoose.Types.ObjectId, ref: 'students' },
    timestamp: { required: true, type: Date, default: Date.now() }
})

const enrollmentSchema = new Schema({
    courseId: { required: true, type: mongoose.Types.ObjectId, ref: 'courses', unique: true },
    providerId: { required: true, type: mongoose.Types.ObjectId, ref: 'providers' },
    students: [enrolledStudentSchema]
})

mongoose.plugin(uniqueValidator);
const Enrollment = mongoose.model('enrollments', enrollmentSchema)

const enrollStudentToCourse = (studentId, courseId, providerId) => {
    return new Promise((resolve, reject) => {
        Enrollment.findOne({ courseId: courseId }, (err, doc) => {
            if (err) reject(err)
            if (doc) {
                let exists = false
                doc.toJSON().students.forEach(e => e.studentId == studentId ? exists = true : exists = false)
                if (exists) reject('this student already enrolled to this course.')
                else {
                    doc.toJSON().students.push({ studentId: new mongoose.mongo.ObjectId(studentId) })
                    resolve(doc.save())
                }
            } else {
                let data = {
                    courseId: courseId,
                    providerId: providerId,
                    students: []
                }
                data.students.push({ studentId: new mongoose.mongo.ObjectId(studentId) })
                let enrollDoc = new Enrollment(data)
                resolve(enrollDoc.save())
            }
        })
    })
}

const getEnrollmentsOfCourse = (courseId) => {
    return new Promise((resolve, reject) => {
        Enrollment.findOne({ courseId: courseId }, (err, doc) => {
            if (err) reject(err)
            doc ? resolve(doc.toJSON().students) : reject('Course has no enrollments.')
        })
    })
}

const isStudentEnrolledOrNot = (studentId, courseId) => {
    return new Promise((resolve, reject) => {
        Enrollment.findOne({ courseId: courseId }, (err, doc) => {
            if (err) reject(err)
            if (!doc) reject('Course has no enrollments.')
            else {
                let enrolled = false
                doc.toJSON().students.forEach(e => e.studentId == studentId ? enrolled = true : enrolled = false)
                resolve(enrolled)
            }
        })
    })
}

const getStudents = (courseId) => {
    return new Promise((resolve, reject) => {
        Enrollment.findOne({ courseId: courseId }, (err, doc) => {
            if (err) reject(err)
            if (!doc) reject('Course has no enrollments.')
            else resolve(doc.toJSON().students)
        })
    })
}

module.exports.enrollStudentToCourse = enrollStudentToCourse
module.exports.isStudentEnrolledOrNot = isStudentEnrolledOrNot
module.exports.getEnrollmentsOfCourse = getEnrollmentsOfCourse
module.exports.getStudents = getStudents

const mongoose = require('../services/mongodb.service').mongoose
const uniqueValidator = require('mongoose-unique-validator');
const _Error = require('../classes/error.class');

var Schema = mongoose.Schema;

// subdocument of enrollment
const enrolledStudentSchema = new Schema({
    studentId: { required: true, type: mongoose.Types.ObjectId, ref: 'students' },
    timestamp: { required: true, type: Date, default: Date.now() }
})

// generating new collection schema for enrollment 
// collection schema here is like when we create database tables schema in sql database
const enrollmentSchema = new Schema({
    courseId: { required: true, type: mongoose.Types.ObjectId, ref: 'courses', unique: true },
    students: [enrolledStudentSchema]
})

mongoose.plugin(uniqueValidator);

// this line means the mongodb realizes this is a model and gives it a name which is 'enrollments'
const Enrollment = mongoose.model('enrollments', enrollmentSchema)

// enrollStudentToCourse is a method that enrolls a student to spcefic course
const enrollStudentToCourse = (studentId, courseId) => {
    return new Promise((resolve, reject) => {
        Enrollment.findOne({ courseId: courseId }, (err, doc) => {
            if (err) return reject(err)
            if (!doc) return reject(new _Error('Course does not exist.',400))
            let exists = false
            doc.toJSON().students.forEach(e => e.studentId == studentId ? exists = true : exists = false)
            if (exists) return reject(new _Error('This student already enrolled to this course.',400))
            else {
                doc.toJSON().students.push({ studentId: new mongoose.mongo.ObjectId(studentId) })
                resolve(doc.save())
            }

        })
    })
}

// getEnrollmentsOfCourse is a method that gets enrollment of a course
const getEnrollmentsOfCourse = (courseId) => {
    return new Promise((resolve, reject) => {
        Enrollment.findOne({ courseId: courseId }, (err, doc) => {
            if (err) return reject(err)
            doc ? resolve(doc.toJSON().students) : reject(new _Error('Course has no enrollments.',400))
        })
    })
}

// isStudentEnrolledOrNot is a method that checks a student is enrolled in course or not
const isStudentEnrolledOrNot = (studentId, courseId) => {
    return new Promise((resolve, reject) => {
        Enrollment.findOne({ courseId: courseId }, (err, doc) => {
            if (err) return reject(err)
            if (!doc) return reject(new _Error('Course has no enrollments.',400))
            let enrolled = false
            doc.toJSON().students.forEach(e => e.studentId == studentId ? enrolled = true : enrolled = false)
            resolve(enrolled)

        })
    })
}

// getStudents is a method that gets a students of course 
const getStudents = (courseId) => {
    return new Promise((resolve, reject) => {
        Enrollment.findOne({ courseId: courseId }, (err, doc) => {
            if (err) return reject(err)
            if (!doc) return reject(new _Error('Course has no enrollments.',400))
            resolve(doc.toJSON().students)
        })
    })
}

module.exports.enrollStudentToCourse = enrollStudentToCourse
module.exports.isStudentEnrolledOrNot = isStudentEnrolledOrNot
module.exports.getEnrollmentsOfCourse = getEnrollmentsOfCourse
module.exports.getStudents = getStudents
module.exports.Enrollment = Enrollment
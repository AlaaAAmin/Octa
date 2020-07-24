const mongoose = require('../services/mongodb.service').mongoose
const uniqueValidator = require('mongoose-unique-validator');
const _Error = require('../classes/error.class');

var Schema = mongoose.Schema;

// subdocument of quiz
const quizSchema = new Schema({
    quizId: { type: mongoose.Types.ObjectId, required: true },
    completed: { type: Boolean, required: true, default: false }
})

// subdocument of lectures
const lectureSchema = new Schema({
    lectureId: { type: mongoose.Types.ObjectId, required: true },
    completed: { type: Boolean, required: true, default: false }
})

// subdocument of modules
const modulesSchema = new Schema({
    moduleId: { type: mongoose.Types.ObjectId, required: true },
    content: [lectureSchema | quizSchema],
})

// subdocument of progress of student course completion
const progressSchema = new Schema({
    modules: [modulesSchema],
    certificateId: { type: mongoose.Types.ObjectId, required: true, default: null }
})

// subdocument of enrollment
const enrolledStudentSchema = new Schema({
    studentId: { required: true, type: mongoose.Types.ObjectId, ref: 'students' },
    timestamp: { required: true, type: Date, default: Date.now() },
    progress: progressSchema | null
})

// generating new collection schema for enrollment 
// collection schema here is like when we create database tables schema in sql database
const enrollmentSchema = new Schema({
    courseId: { required: true, type: mongoose.Types.ObjectId, ref: 'courses', unique: true },
    enrollmentAvailable: { required: true, type: Boolean, default: true },
    students: [enrolledStudentSchema]
})

mongoose.plugin(uniqueValidator);

// this line means the mongodb realizes this is a model and gives it a name which is 'enrollments'
const Enrollment = mongoose.model('enrollments', enrollmentSchema)

// enrollStudentToCourse is a method that enrolls a student to spcefic course
const enrollStudentToCourse = (studentId, courseId) => {
    return new Promise((resolve, reject) => {
        Enrollment.findOne({ courseId: new mongoose.Types.ObjectId(courseId), enrollmentAvailable: true }, (err, doc) => {
            if (err) return reject(err)
            if (!doc) return reject(new _Error('Course does not exist.', 400))
            let exists = false
            doc.toJSON().students.forEach(e => e.studentId == studentId ? exists = true : exists = false)
            if (exists) return reject(new _Error('This student already enrolled to this course.', 400))
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
        Enrollment.findOne({ courseId: new mongoose.Types.ObjectId(courseId) }).select('students.studentId students.timestamp')
            .then(doc => {
                if (!doc) return reject(new _Error('Course has no enrollments.', 400))
                resolve(doc)
            })
            .catch(reject)
    })
}

// isStudentEnrolledOrNot is a method that checks a student is enrolled in course or not
const isStudentEnrolledOrNot = (studentId, courseId) => {
    return new Promise((resolve, reject) => {
        Enrollment.findOne({ courseId: new mongoose.Types.ObjectId(courseId) }, (err, doc) => {
            if (err) return reject(err)
            if (!doc) return reject(new _Error('Course has no enrollments.', 400))
            let enrolled = false
            doc.toJSON().students.forEach(e => e.studentId == studentId ? enrolled = true : enrolled = false)
            resolve(enrolled)

        })
    })
}


const getEnrolledCoursesForStudent = (studentId) => {
    return new Promise((resolve, reject) => {
        Enrollment.find({ "students.studentId": new mongoose.Types.ObjectId(studentId) }).select('courseId')
            .then(resolve)
            .catch(reject)
    })
}

// updateStudentProgressForCourse is a method that updating progress when user watches videos
const updateStudentProgressForCourse = (courseId, studentId, moduleId, contentType, contentId) => {
    return new Promise((resolve, reject) => {
        let query = { courseId: new mongoose.Types.ObjectId(courseId) }
        let arrayFilter = contentType == 'lecture' ? [{ "stud.studentId": new mongoose.mongo.ObjectID(studentId) }, { "cont.lectureId": new mongoose.mongo.ObjectID(contentId) }, { "module.moduleId": new mongoose.mongo.ObjectID(moduleId) }] : [{ "cont.quizId": new mongoose.mongo.ObjectID(contentId) }, { "stud.studentId": new mongoose.mongo.ObjectID(studentId) }, { "module.moduleId": new mongoose.mongo.ObjectID(moduleId) }]
        let updateQuery = { $set: { "students.$[stud].progress.modules.$[module].content.$[cont].completed": true } }
        Enrollment.updateOne(query, updateQuery, { arrayFilters: arrayFilter })
            .then(resolve)
            .catch(reject)
    })
}

const BindCertificateToStudent = (courseId, studentId, certId) => {
    return new Promise((resolve, reject) => {
        let query = { courseId: new mongoose.Types.ObjectId(courseId) }
        let arrayFilter = [{ "stud.studentId": new mongoose.mongo.ObjectID(studentId) }]
        let updateQuery = { $set: { "students.$[stud].progress.certificateId": new mongoose.mongo.ObjectID(certId) } }
        Enrollment.updateOne(query, updateQuery, { arrayFilters: arrayFilter })
            .then(resolve)
            .catch(reject)
    })
}

const closeEnrollmentForCourse = (courseId) => {
    return new Promise((resolve, reject) => {
        Enrollment.updateOne({ courseId: new mongoose.Types.ObjectId(courseId) }, { enrollmentAvailable: false }).then(resolve).catch(reject)
    })
}

const unEnrollStudentFromCourse = (courseId, studentId) => {
    return new Promise((resolve, reject) => {
        Enrollment.updateOne({ courseId: new mongoose.Types.ObjectId(courseId), "students.studentId": new mongoose.Types.ObjectId(studentId) }, { $pull: { "students.studentId": studentId } }, (err, raw) => {
            if(err) return reject(err)
            resolve(raw)
        })
    })
}


module.exports = {
    enrollStudentToCourse,
    isStudentEnrolledOrNot,
    getEnrollmentsOfCourse,
    getEnrolledCoursesForStudent,
    updateStudentProgressForCourse,
    BindCertificateToStudent,
    closeEnrollmentForCourse,
    Enrollment,
    unEnrollStudentFromCourse
}

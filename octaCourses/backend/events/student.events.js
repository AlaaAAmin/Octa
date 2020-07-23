let _EventEmitter = require('../services/event.service')
const { addStrikeToStudent } = require('../models/student.model')
const { updateStudentProgressForCours, BindCertificateToStudent } = require('../models/enrollment.model')
const { addExpToStudentById } = require('../models/student.model')
const { EXP_PER_VIDEO } = require('../config/config.json')
const { logger } = require('../middlewares/logger.middleware')
const { generateCertificate } = require('../models/certificate.model')

_EventEmitter.on('strike-student', async (data) => {
    try {
        let strikeData = {
            strike: data.strike,
            happenedIn: data.happenedIn
        }
        await addStrikeToStudent(data.studentId, strikeData)
        logger.info(`student ${data.studentId} had a strike`)
    } catch (err) {
        eventHandler(err)
    }
})

// when video watched, id of course, module, file and student sent here
// then emits updated and this reflects to his socket in socket service 
_EventEmitter.on('video-watched', async (data) => {
    try {
        // add points to student
        await addExpToStudentById(data.studentId, EXP_PER_VIDEO)
        // update his progress
        await updateStudentProgressForCourse(data.courseId, data.studentId, data.moduleId, "lecture", data.lectureId)
        _EventEmitter.emit('updated-student-info', { message: 'Added ' + EXP_PER_VIDEO + 'exp to students and updated progress for course.' })
    } catch (err) {
        _EventEmitter('error', err)
    }
})

_EventEmitter.on('quiz-solved', async (data) => {
    // update his progress
    try {
        await updateStudentProgressForCourse(data.courseId, data.studentId, data.moduleId, "quiz", data.lectureId)
        _EventEmitter.emit('updated-student-info', { message: ' updated progress for course.' })

    } catch (err) {
        _EventEmitter('error', err)
    }
})

_EventEmitter.on('exam-passed', async (data) => {
    try {
        let cert = await generateCertificate({ student: data.studentId, course: data.courseId })
        await BindCertificateToStudent(data.studentId, data.courseId, cert.certificateId)
    } catch (err) { _EventEmitter('error', err) }
})

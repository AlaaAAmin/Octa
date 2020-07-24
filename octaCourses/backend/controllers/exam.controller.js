const ExamModel = require('../models/exam.model')
const _EventEmitter = require('../services/event.service')

const addExamToCourse = (req, res, next) => {
    ExamModel.addExamToCourse(req.params.id, req.body)
        .then(() => res.status(200).json({ status: 'success', message: 'Exam added successfully for this course' }))
        .catch(err => next(err))
}

const getExamQuestions = (req, res, next) => {
    ExamModel.getCourseExamQuestions(req.params.id)
        .then(doc => res.status(200).json({ status: 'success', data: { doc } }))
        .catch(err => next(err))
}

const SubmitExamAnswerAndGetResults = (req, res, next) => {
    ExamModel.getCourseExamAnswers(req.params.id)
        .then(doc => {
            let questions = req.body
            let score = 0
            for (let i = 0; i < doc.exam.questions.length; i++) { questions[i].answer == r.exam.questions[i].answer ? score = score + 1 : score = score }

            let percentage = ((score / doc.exam.questions.length) * 100)
            if (percentage >= 60) _EventEmitter.emit('exam-passed', { studentId: req.jwt._id, courseId: req.params.id })
            res.status(200).json({ status: 'success', data: { result: ((score / doc.exam.questions.length) * 100) + "%" } })
        })
        .catch(err => next(err))
}

module.exports = {
    addExamToCourse,
    getExamQuestions,
    SubmitExamAnswerAndGetResults
}
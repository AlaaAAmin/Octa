const DiscussionModel = require('../models/discussion.model')
const _EventEmitter = require('../services/event.service')
// getQuestions is a method that fetches questions from database
const getQuestions = (req, res, next) => {
    DiscussionModel.getDiscussionOfCourse(req.params.id)
        .then((discussion) => {
            res.status(200).json({ status: 'success', data: { discussion } })
        })
        .catch((err) => next(err))
}

// addQuestion is a method that adds new question to database
const addQuestion = (req, res, next) => {
    DiscussionModel.addQuestionToCourse(req.params.id, req.body.question, req.jwt._id)
        .then((doc) => {
            // here event fired to course author
            _EventEmitter.emit('student-asked', { courseId: req.params.id, writerId: req.jwt._id, providerId: doc.providerId })
            res.status(200).json({ status: 'success', message: 'Question submitted successfully.' })
        })
        .catch((err) => next(err))
}

// addReply is a method that adds reply question and save it to database
const addReply = (req, res, next) => {
    DiscussionModel.addReplyToCourseQuestion(req.params.id, req.body.reply, req.jwt._id, req.params.qid)
        .then(() => {
            // here event fired to course author
            res.status(200).json({ status: 'success', message: 'reply submitted successfully.' })
        })
        .catch((err) => next(err))
}

module.exports = {
    getQuestions,
    addQuestion,
    addReply
}
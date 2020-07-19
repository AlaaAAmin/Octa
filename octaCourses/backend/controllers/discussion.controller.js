const DiscussionModel = require('../models/discussion.model')
// getQuestions is a method that fetches questions from database
const getQuestions = (req, res, next) => {
    DiscussionModel.getDiscussionOfCourse(req.params.id)
        .then((discussion) => {
            res.status(200).send({status: 'success', data: {discussion}})
        })
        .catch((err) => next(err))
}

// addQuestion is a method that adds new question to database
const addQuestion = (req, res, next) => {
    DiscussionModel.addQuestionToCourse(req.params.id, req.body.question, req.jwt._id)
        .then(() => {
            // here event fired to course author
            res.status(200).send({ status: 'success', message: 'Question submitted successfully.' })
        })
        .catch((err) => next(err))
}

// addReply is a method that adds reply question and save it to database
const addReply = (req, res, next) => {
    DiscussionModel.addReplyToCourseQuestion(req.params.id, req.body.reply, req.jwt._id, req.params.qid)
        .then(() => {
            // here event fired to course author
            res.status(200).send({ status: 'success', message: 'reply submitted successfully.' })
        })
        .catch((err) => next(err))
}

module.exports = {
    getQuestions,
    addQuestion,
    addReply
}
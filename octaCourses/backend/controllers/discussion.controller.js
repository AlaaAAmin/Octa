const DiscussionModel = require('../models/discussion.model')
// getQuestions is a method that fetches questions from database
const getQuestions = (req, res) => {
    DiscussionModel.getDiscussionOfCourse(req.params.id)
        .then((discussion) => {
            res.status(200).send(discussion)
        })
        .catch((err) => {
            res.status(500).send({ success: false, error: err })
        })
}

// addQuestion is a method that adds new question to database
const addQuestion = (req, res) => {
    DiscussionModel.addQuestionToCourse(req.params.id, req.body.question, req.jwt._id)
        .then(() => {
            // here event fired to course author
            res.status(200).send('question submitted successfully.')
        })
        .catch((err) => {
            res.status(500).send({ success: false, error: err })
        })
}

// addReply is a method that adds reply question and save it to database
const addReply = (req, res) => {
    DiscussionModel.addReplyToCourseQuestion(req.params.id, req.body.reply, req.jwt._id, req.params.qid)
        .then(() => {
            // here event fired to course author
            res.status(200).send('reply submitted successfully.')
        })
        .catch((err) => {
            res.status(500).send({ success: false, error: err })
        })
}

module.exports = {
    getQuestions,
    addQuestion,
    addReply
}
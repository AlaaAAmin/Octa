const mongoose = require('../services/mongodb.service').mongoose
const Schema = mongoose.Schema

const alternativesSchema = new Schema({
    text: { type: String, required: true },
    isCorrect: { type: Boolean, required: true, default: false }
})

const quizzesSchema = new Schema({
    description: { required: true, type: String },
    alternatives: [alternativesSchema]
})

const quizModuleSchema = new Schema({
    moduleId: { required: true, type: mongoose.mongo.ObjectId },
    quizzes: [quizzesSchema]
})

const quizSchema = new Schema({
    courseId: { required: true, type: mongoose.mongo.ObjectId, ref: 'courses' },
    modules: [quizModuleSchema]
})

const Quizzes = mongoose.model('quizzes', quizSchema)


const addQuizzes = (quizzes) => {

}

const getQuizQuestionById = (id) => {

}

const getQuizAnswerById = (id) => {

}

const updateQuizById = (id) => {

}

const removeQuizById = (id) => {

}

module.exports.addQuizzes = addQuizzes
module.exports.getQuizQuestionById = getQuizQuestionById
module.exports.getQuizAnswerById = getQuizAnswerById
module.exports.updateQuizById = updateQuizById
module.exports.removeQuizById = removeQuizById
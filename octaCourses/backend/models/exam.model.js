const mongoose = require('../services/mongodb.service').mongoose
const Schema = mongoose.Schema

const questionSchema = new Schema({
    question: { required: true, type: String },
    options: { required: true, type: Array },
    answer: { required: true, type: String }
})

const courseExamSchema = new Schema({
    examTime: { required: true, type: String },
    questions: [questionSchema]
})

const examSchema = new Schema({
    courseId: { required: true, type: mongoose.mongo.ObjectId, ref: 'courses', unique: true},
    exam: courseExamSchema
})

const Exam = mongoose.model('exams', examSchema)

const addExamToCourse = (courseId, examData) => {
    let exam = new Exam({ courseId: courseId, exam: examData })
    return exam.save()
}

const getCourseExamQuestions = (courseId) => {
    return new Promise((resolve, reject) => {
        Exam.findOne({courseId: courseId}).select('-_id exam.examTime exam.questions.question exam.questions.options').then(resolve).catch(reject)
    })
}

const getCourseExamAnswers = (courseId) => {
    return new Promise((resolve, reject) => {
        Exam.findOne({courseId: courseId}).select('-_id exam.questions.answer').then(resolve).catch(reject)
    })
}

module.exports = {
    Exam,
    addExamToCourse,
    getCourseExamQuestions,
    getCourseExamAnswers
}
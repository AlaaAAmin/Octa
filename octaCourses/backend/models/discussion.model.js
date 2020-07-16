const { mongoose } = require('../services/mongodb.service');
const Filter = require('bad-word-ar');
const _EventEmitter = require('../services/event.service')
const Schema = mongoose.Schema

// subdocument of reply 
const replySchema = new Schema({
    reply: {
        required: true, type: String, validate: {
            validator: async (v) => {
                let result = await Promise.resolve(new Filter('ar').check(v) || new Filter('en').check(v))
                result == true ? _EventEmitter.emit('strike-student', { happenedIn: 'reply', studentId: this.studentId }) : null
                return !result
            },
            message: 'Reply contains inappropriate words.'
        }
    }, // will be validated 
    by: { required: true, type: mongoose.Types.ObjectId },
    timestamp: { required: true, type: Date, default: Date.now() }
})

// this hook runs after validation to save strikees for who wrote the comment
replySchema.pre('validate', async function (next) {
    let result = await Promise.resolve(new Filter('ar').check(this.reply) || new Filter('en').check(this.reply))
    result ? _EventEmitter.emit('strike-provider', { happenedIn: 'reply', studentId: this.by, strike: this.reply }) : next()
})

// subdocument of question 
const questionSchema = new Schema({
    question: {
        required: true, type: String, validate: {
            validator: async (v) => {
                let result = await Promise.resolve(new Filter('ar').check(v) || new Filter('en').check(v))
                return !result
            },
            message: 'Question contains inappropriate words.'
        }
    },
    by: { required: true, type: mongoose.Types.ObjectId },
    timestamp: { required: true, type: Date, default: Date.now() },
    reply: replySchema
})

// this hook runs after validation to save strikees for who wrote the comment
questionSchema.pre('validate', async function (next) {
    let result = await Promise.resolve(new Filter('ar').check(this.question) || new Filter('en').check(this.question))
    result ? _EventEmitter.emit('strike-student', { happenedIn: 'question', studentId: this.by, strike: this.question }) : next()
})

// generating new collection schema for discussion 
// collection schema here is like when we create database tables schema in sql database

const discussionSchema = new Schema({
    courseId: { required: true, type: mongoose.Types.ObjectId },
    providerId: { required: true, type: mongoose.Types.ObjectId },
    questions: [questionSchema]
})

// this line means the mongodb realizes this is a model and gives it a name which is 'discussions'
const Discussion = mongoose.model('discussions', discussionSchema)

// addQuestionToCourse is a method that handles adding question to question section in course
const addQuestionToCourse = (courseId, question, writerId) => {
    return new Promise((resolve, reject) => {
        Discussion.findOne({ courseId: new mongoose.mongo.ObjectId(courseId) }, (err, doc) => {
            if (err) return reject(err)
            if (!doc) return reject('Course does not exist.')
            doc.questions.push({
                by: new mongoose.mongo.ObjectId(writerId),
                question: question
            })
            resolve(doc.save())
        })
    })
}

// addReplyToCourseQuestion is a method that handles replying to questions
const addReplyToCourseQuestion = (courseId, reply, writerId, questionId) => {
    return new Promise((resolve, reject) => {
        Discussion.findOne({ courseId: courseId }, (err, doc) => {
            if (err) return reject(err)
            if (!doc) return reject('Course does not exist.')
            doc.questions.forEach(e => {
                if (e._id == new mongoose.mongo.ObjectId(questionId)) {
                    e.reply = {
                        by: new mongoose.mongo.ObjectId(writerId),
                        reply: reply
                    }
                }
            })
            resolve(doc.save())
        })
    })
}

// getDiscussionOfCourse is a method that gets the whole discussion of course
const getDiscussionOfCourse = (courseId) => {
    return new Promise((resolve, reject) => {
        Discussion.findOne({ courseId: courseId }, (err, doc) => {
            if (err) return reject(err)
            if (!doc) return reject('Course does not exist.')
            resolve(doc.toJSON())
        })
    })
}

module.exports = {
    addQuestionToCourse,
    addReplyToCourseQuestion,
    Discussion,
    getDiscussionOfCourse
}
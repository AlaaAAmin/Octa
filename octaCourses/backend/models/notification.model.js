const { mongoose } = require('../services/mongodb.service');
const Schema = new mongoose.Schema

const contentSchema = new Schema({
    studentId: { type: mongoose.Types.ObjectId, required: true },
    courseId: { type: mongoose.Types.ObjectId, required: true },
    questionId: { type: mongoose.Types.ObjectId, required: true },
    timestamp: { type: Date, required: true, default: Date.now() },
    isRed: { type: Boolean, required: true, default: false }
})

const notificationSchema = new Schema({
    providerId: { type: mongoose.Types.ObjectId, required: true },
    content: [contentSchema]
})

const Notification = mongoose.model('notifications', notificationSchema)

// gets notification from database
const getNotifications = (providerId) => {
    return new Promise((resolve, reject) => {
        Notification.findOne({ providerId: providerId }, (err, doc) => {
            if (err) return reject(err)
            if (!doc) return reject('Course Provider does not exist.')
            resolve(doc.toJSON())
        })
    })
}

// add notification to user to be viewed later
// notification cycle:
// student asks a question -> new notification for course provider
const addNotification = (providerId, notificationData) => {
    return new Promise((resolve, reject) => {
        Notification.findOne({ providerId: providerId }, (err, doc) => {
            if (err) return reject(err)
            if (!doc) return reject('Course Provider does not exist.')

            doc.content.push({
                studentId: notificationData.studentId,
                courseId: notificationData.courseId,
                questionId: notificationData.questionId
            })

            resolve(doc.save())

        })
    })
}


module.exports = {
    Notification,
    getNotifications,
    addNotification
}


const mongoose = require('../services/mongodb.service').mongoose;
var Schema = mongoose.Schema;

const studentRatingSchema = new Schema({
    studentId: { required: true, type: mongoose.Types.ObjectId, ref: 'students' },
    rate: { required: true, type: Number },
    comment: { required: true, type: String },
    timestamp: { required: true, type: Date, default: Date.now() }
})

const ratingSchema = new Schema({
    courseId: { required: true, type: mongoose.Types.ObjectId, ref: 'courses' },
    ratings: [studentRatingSchema]
})

const Rating = mongoose.model('ratings', ratingSchema)

const addRatingToCourse = (ratingData) => {
    return new Promise((resolve, reject) => {
        Rating.findOne({ courseId: ratingData.courseId }, (err, doc) => {
            if (err) reject(err)
            console.log(doc)
            if (!doc) {
                let data = {
                    courseId: new mongoose.mongo.ObjectId(ratingData.courseId),
                    ratings: []
                }
                data.ratings.push({
                    studentId: new mongoose.mongo.ObjectId(ratingData.studentId),
                    rate: ratingData.rate,
                    comment: ratingData.comment
                })
                let rateDoc = new Rating(data)
                return resolve(rateDoc.save())
            }
            let exists = false
            doc.toJSON().ratings.forEach(e => e.studentId == ratingData.studentId ? exists = true : exists = false)
            if (exists) return reject('Student already rated this course.')
            doc.toJSON().ratings.push({
                studentId: ratingData.studentId,
                rate: ratingData.rate,
                comment: ratingData.comment
            })
            resolve(doc.save())

        })
    })
}

const getRatingsOfCourse = (courseId) => {
    return new Promise((resolve, reject) => {
        Rating.findOne({ courseId: courseId }, (err, doc) => {
            if (err) reject(err)
            if (!doc) reject('Course has no ratings.')
            resolve(doc.toJSON().ratings)
        })
    })
}

module.exports.addRatingToCourse = addRatingToCourse
module.exports.getRatingsOfCourse = getRatingsOfCourse

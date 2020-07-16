const mongoose = require('../services/mongodb.service').mongoose;
var Schema = mongoose.Schema;

// subdocument is some information encapsulated with id that is saved either for a field or in array
// subdocument for student rating
const studentRatingSchema = new Schema({
    studentId: { required: true, type: mongoose.Types.ObjectId, ref: 'students' },
    rate: { required: true, type: Number },
    comment: { required: true, type: String },
    timestamp: { required: true, type: Date, default: Date.now() }
})

// subdocument is some information encapsulated with id that is saved either for a field or in array
// subdocument for course rating
const courseRatingSchema = new Schema({
    courseId: { required: true, type: mongoose.Types.ObjectId, ref: 'courses' },
    ratings: [studentRatingSchema],
})

//  generating new collection schema for rating
// collection schema here is like when we create database tables schema in sql database
const ratingSchema = new Schema({
    providerId: { required: true, type: mongoose.Types.ObjectId, ref: 'providers' },
    courses: [courseRatingSchema]
})

const Rating = mongoose.model('ratings', ratingSchema)

// addRatingToCourse is a function that submits rate for one student to course using info provided
// info: providerId, studentId, rate, comment, courseId
const addRatingToCourse = (ratingData) => {
    return new Promise((resolve, reject) => {
        Rating.findOne({ providerId: ratingData.providerId }, (err, doc) => {
            if (err) return reject(err)
            if (!doc) return reject('Course provider does not exists.')
            let exists = false
            doc.toJSON().courses.forEach(c => { c.ratings.forEach(r => r.studentId == ratingData.studentId ? exists = true : exists = false) })
            if (exists) return reject('Student already rated this course.')
            doc.courses.find(c => c.courseId == ratingData.courseId).ratings.push({
                studentId: ratingData.studentId,
                rate: ratingData.rate,
                comment: ratingData.comment
            })
            resolve(doc.save())
        })
    })
}

// getRatingsOfCourse is a function that gets ratings of course 
// aggregate : a function embedded in mongodb that fetches data and make some transformations and reshape data
// operations u can do with aggregate: join 2 collections, project data to 1 resource
const getRatingsOfCourse = (courseId) => {
    return new Promise((resolve, reject) => {
        Rating.findOne({ 'courses.courseId': courseId }, (err, doc) => {
            if (err) return reject(err)
            if (!doc) return reject('Course does not exist')
            if (doc.courses.find(c => courseId == c.courseId).ratings.length == 0) return resolve('Course has no ratings.')
            Rating.aggregate([
                { $unwind: "$courses" },
                { $match: { "courses.courseId": new mongoose.mongo.ObjectId(courseId) } },
                { $unwind: "$courses.ratings" },
                { $lookup: { from: "students", localField: "courses.ratings.studentId", foreignField: "_id", as: "student" } },
                { $unwind: "$student" },
                {
                    $group: {
                        _id: "$courses.courseId", // add id of course to the result
                        Average_Rating: { $avg: "$courses.ratings.rate" }, // add Average_Rating field to result
                        Number_Of_Students_Rated: { $sum: 1 }, // // add field to contain number of ratings,
                        Ratings_And_Comments: {
                            $push: {
                                $cond: [{ $eq: ["$student._Id", "$courses.ratings.studentId"] }, null, {
                                    "studentname": { $concat: ["$student.firstname", " ", "$student.lastname"] },
                                    "comment": "$courses.ratings.comment",
                                    "rating": "$courses.ratings.rate"
                                }]
                            }
                        }
                    }
                },

            ], (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    })
}



module.exports.addRatingToCourse = addRatingToCourse
module.exports.getRatingsOfCourse = getRatingsOfCourse
module.exports.Rating = Rating
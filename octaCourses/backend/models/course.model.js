const mongoose = require('../services/mongodb.service').mongoose;
const _EventEmitter = require('../services/event.service')
const RatingModel = require('../models/rating.model')
var Schema = mongoose.Schema;

// subdocument is some information encapsulated with id that is saved either for a field or in array
// subdocument for quiz
const quizSchema = new Schema({
    question: { required: true, type: String },
    choices: { required: true, type: Array },
    correctAnswer: { required: true, type: String }
})

// subdocument for lecture
const lectureSchema = new Schema({
    name: { required: true, type: String },
    videoFileId: { required: true, type: mongoose.Types.ObjectId },
    fileId: { type: mongoose.Types.ObjectId },
    duration: { required: true, type: Number }
})

// subdocument of module
const moduleSchema = new Schema({
    name: { required: true, type: String },
    duration: { required: true, type: Number },
    description: { required: true, type: String },
    content: [lectureSchema | quizSchema]
})

// subdocument of metadata
const metadataSchema = new Schema({
    labels: { type: Array, required: true },
    reviewedAt: { type: Date, required: true, default: Date.now() }
})

// generating new collection schema for course 
// collection schema here is like when we create database tables schema in sql database
const courseSchema = new Schema({
    courseName: { required: true, type: String },
    ownerId: { required: true, type: mongoose.Types.ObjectId, ref: 'providers' },
    courseRequirments: { required: true, type: String },
    courseObjectives: { required: true, type: Array },
    description: { required: true, type: String },
    price: { required: true, type: Number },
    thumbnailId: { required: true, type: mongoose.Types.ObjectId },
    duration: { type: Number, default: undefined }, // this.type ? true : false => if true then course online otherwise offline
    type: { required: true, type: Boolean },
    // for offline courses
    hours: { type: Number, default: undefined },
    address: { type: Array, default: undefined },
    startOfEnrollmentDate: { type: Date, default: undefined },
    // for online courses
    modules: [moduleSchema] | null,
    reviewed: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, required: true, default: Date.now() },
    metadata: metadataSchema | null
})

// here we embed a method to get reviewed courses from db
courseSchema.findById = (cb) => {
    return this.model('courses').find({ id: this.id, reviewed: true }, cb);
}

// this line means the mongodb realizes this is a model and gives it a name which is 'courses'
const Course = mongoose.model('courses', courseSchema)

// methods

// createCourse is a function that create a course using info provided
// info: coursename, ownerId, course requirements, objectives, description, thumbnail, type and price
const createCourse = (courseData) => {
    const course = new Course(courseData);
    // emits event to create its rating schema in rating collection
    _EventEmitter.emit('course-created', {
        courseId: course._id,
        providerId: course.ownerId
    })
    return course.save()
}

// getCourseById is a function that gets course by id
// course in results is filtered from paid data
const getCourseById = (id) => {
    return new Promise((resolve, reject) => {
        Course.findById(id, (err, course) => {
            if (err) return reject(err)
            if (!course) return reject('Course not found')
            Course.aggregate([
                { $match: { "_id": new mongoose.mongo.ObjectId(id) } },
                { $lookup: { from: "providers", localField: "ownerId", foreignField: "_id", as: "provider" } },// searches in providers collection to get provider id
                { $unwind: { "path": "$provider", "preserveNullAndEmptyArrays": true } },
                {
                    $project: {
                        _id: "$_id",
                        ownerName: "$provider.name",
                        courseName: "$courseName",
                        courseRequirments: "$courseRequirments",
                        courseObjectives: "$courseObjectives",
                        description: "$description",
                        price: "$price",
                        thumbnailId: "$thumbnailId",
                        type: "$type",
                        // for offline
                        hours: "$hours",
                        address: "$address",
                        startOfEnrollmentDate: "$startOfEnrollmentDate",
                        // for online
                        // none unless he is enrolled
                    }
                },
            ], (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    })
}

//getFullCourseById is a method to get unfilterd course from data
const getFullCourseById = (courseId) => {
    return new Promise((resolve, reject) => {
        Course.findById(courseId, (err, course) => {
            if (err) return reject(err)
            if (!course) return reject('Course not found')
            Course.aggregate([
                { $match: { "_id": new mongoose.mongo.ObjectId(id) } },
                { $lookup: { from: "providers", localField: "ownerId", foreignField: "_id", as: "provider" } },// searches iin providers collection to get provider id
                { $unwind: "$provider" },
                {
                    $project: {
                        _id: "$_id",
                        ownerName: "$provider.name",
                        courseName: "$courseName",
                        courseRequirments: "$courseRequirments",
                        courseObjectives: "$courseObjectives",
                        description: "$description",
                        price: "$price",
                        thumbnailId: "$thumbnailId",
                        type: "$type",
                        // for offline
                        hours: "$hours",
                        address: "$address",
                        startOfEnrollmentDate: "$startOfEnrollmentDate",
                        // for online
                        // if paid then it will be fetched                        
                    }
                }

            ], (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })

        })
    })
}

// updateCourseById is a function that updates course by id
const updateCourseById = (id, courseData) => {
    return new Promise((resolve, reject) => {
        Course.updateOne({ _id: id }, courseData)
            .then(result => {
                resolve(result)
            })
            .catch(err => {
                reject(err)
            })
    })
}

// updateCourseById is a function that gets ownerId by course id
const getOwnerIdByCourseId = (id) => {
    return new Promise((resolve, reject) => {
        Course.findById(id, (err, doc) => {
            if (err) return reject(err)
            resolve(doc.toJSON().ownerId)
        })
    })
}

// isOwnerOfCourse is a function that checks a provider is owner of course or not
const isOwnerOfCourse = (ownerId, courseId) => {
    return new Promise((resolve, reject) => {
        Course.findOne({ _id: courseId }, (err, doc) => {
            if (err) return reject(err)
            if (!doc) return reject('Course does not exist.')
            doc.toJSON().ownerId == ownerId ? resolve(true) : resolve(false)
        })
    })
}

// isOwnerOfCourse is a function that filter courses 
// used in search
const filterCourses = (filter) => {
    return new Promise((resolve, reject) => {
        Course.find(filter, (err, res) => {
            if (err) return reject(err)
            resolve(res)
        })
    })
}

// this function used to review course
const addLabelsToCourseAndReview = (courseId, labels) => {
    return new Promise((resolve, reject) => {
        Course.updateOne({ _id: courseId }, { reviewed: true, metadata: { labels: labels } }, (err, raw) => {
            if (err) return reject(err)
            resolve(raw)
        })
    })
}

// this function used to get raw courses that is not reviewed yet
const getRawCourses = () => {
    return new Promise((resolve, reject) => {
        Course.find({ reviewed: false }, (err, doc) => {
            if (err) return reject(err)
            resolve(doc)
        })
    })
}

module.exports = {
    createCourse,
    getCourseById,
    updateCourseById,
    getOwnerIdByCourseId,
    isOwnerOfCourse,
    filterCourses,
    getFullCourseById,
    addLabelsToCourseAndReview,
    getRawCourses,
    Course
}
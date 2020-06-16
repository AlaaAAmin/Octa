const mongoose = require('../services/mongodb.service').mongoose;
const uniqueValidator = require('mongoose-unique-validator');
const { raw } = require('body-parser');
var Schema = mongoose.Schema;

const fileSchema = new Schema({
    name: { required: true, type: String },
    originalname: { required: true, type: String },
    fileId: { required: true, type: mongoose.Types.ObjectId, ref: 'Courses.files' },
    filename: { required: true, type: String },
    duration: { required: true, type: Number },
    type: { required: true, type: String }
})

const moduleSchema = new Schema({
    name: { required: true, type: String },
    duration: { required: true, type: Number },
    description: { required: true, type: String },
    files: [fileSchema]
})


const courseSchema = new Schema({
    name: { required: true, type: String },
    ownerId: { required: true, type: mongoose.Types.ObjectId, ref: 'providers' },
    ownerName: { required: true, type: String },
    modules: [moduleSchema],
    description: { required: true, type: String },
    price: { required: true, type: Number },
    enrolled: { required: true, type: Number, default: 0 },
    duration: { required: true, type: Number },
    // ratings: []
    //    attachmentId: { required: true, type: mongoose.Types.ObjectId, default: null }
})

courseSchema.findById = (cb) => {
    return this.model('courses').find({ id: this.id }, cb);
}

const Course = mongoose.model('courses', courseSchema)

// methods

const createCourse = (courseData) => {
    const course = new Course(courseData);
    return course.save()
}

const getCourseById = (id) => {
    return new Promise((resolve, reject) => {
        Course.findById(id, (err, course) => {
            if (err) reject(err)
            if (!course) reject('Course not found')
            let data = course.toJSON();
            delete data.__v;
            resolve(data)
        })
    })
}

const getCourseByOwner = (ownerId) => {
    return new Promise((resolve, reject) => {
        Course.find({ ownerId: ownerId }, (err, course) => {
            if (err) reject(err)
            if (!course) reject('Course not found')
            let data = course.toJSON();
            delete data.__v;
            resolve(data)
        })
    })
}

const updateCourseById = (id, courseData) => {
    return new Promise((resolve, reject) => {
        Course.updateOne({ _id: id }, courseData)
        .then(result => {
            resolve({success: true,result: result})
        })
        .catch(err => {
            reject({success:false, error: err})
        })
    })
}

module.exports.createCourse = createCourse;
module.exports.getCourseById = getCourseById;
module.exports.updateCourseById = updateCourseById


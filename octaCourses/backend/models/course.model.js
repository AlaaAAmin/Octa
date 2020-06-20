const mongoose = require('../services/mongodb.service').mongoose;
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
    enrolled: { required: true, type: Number, default: 0 }, // try to get value using pre hook
    duration: { required: true, type: Number },
    type: { required: true, type: Boolean }
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
            if (!course) return reject('Course not found')
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
                resolve(result)
            })
            .catch(err => {
                reject(err)
            })
    })
}

const getOwnerIdByCourseId = (id) => {
    return new Promise((resolve, reject) => {
        Course.findById(id, (err, doc) => {
            if (err) return reject(err)
            resolve(doc.toJSON().ownerId)
        })
    })
}

const isOwnerOfCourse = (ownerId, courseId) => {
    return new Promise((resolve, reject) => {
        Course.findOne({ _id: courseId }, (err, doc) => {
            if (err) return reject(err)
            if (!doc) return reject('Course does not exist.')
            doc.toJSON().ownerId == ownerId ? resolve(true) : resolve(false)
        })
    })
}

const filterCourses = (filter) => {
    return new Promise((resolve, reject) => {
        Course.find(filter, (err, res) => {
            if(err) return reject(err)
            resolve(res)
        })
    })
}

module.exports.createCourse = createCourse;
module.exports.getCourseById = getCourseById;
module.exports.updateCourseById = updateCourseById
module.exports.getOwnerIdByCourseId = getOwnerIdByCourseId
module.exports.isOwnerOfCourse = isOwnerOfCourse
module.exports.filterCourses = filterCourses
module.exports.Course = Course;
const mongoose = require('../services/mongodb.service').mongoose
const Schema = mongoose.Schema


const examSchema = new Schema({
    courseId: { required: true, type: mongoose.mongo.ObjectId, ref: 'courses' },
    
})
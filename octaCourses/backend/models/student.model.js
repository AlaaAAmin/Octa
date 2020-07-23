const mongoose = require('../services/mongodb.service').mongoose;
const EXP_PER_LEVEL = require('../config/config.json').EXP_PER_LEVEL
const uniqueValidator = require('mongoose-unique-validator');
const _Error = require('../classes/error.class');
var Schema = mongoose.Schema;

// subdocument for strikes
const strikesSchema = new Schema({
    strike: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), required: true },
    happenedIn: { type: String, required: true }
})

// subdocument for metadata
const metaSchema = new Schema({
    strikes: [strikesSchema] | null,
    banned: { type: Boolean, required: true, default: false },
})

// generating new collection schema for student 
// collection schema here is like when we create database tables schema in sql database
const studentSchema = new Schema({
    firstname: { required: true, type: String },
    lastname: { required: true, type: String },
    email: {
        required: true, type: String, unique: true, lowercase: true, validate: {
            validator: (email) => {
                var re = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                return re.test(String(email).toLowerCase());
            },
            message: props => `${props.value} is not a valid email address!`
        },
    },
    phone: {
        required: true, unique: true, type: String, validate: {
            validator: (phone) => {
                var re = new RegExp(/^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/);
                return re.test(String(phone).toLowerCase());
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    password: { required: true, type: String },
    verified: { required: true, type: Boolean, default: false },
    timestamp: { required: false, type: Number, default: Date.now() },
    permissionLevel: { required: true, default: 1, type: Number },

    experience: { required: true, type: Number, default: 0 },
    level: { required: true, type: Number, default: 1 },
    points: { required: true, type: Number, default: 0 },
    interests: { required: true, type: Array },
    date_of_birth: { type: Date, required: true, default: null },
    meta: metaSchema

})

// apply this plugin enables the database to detect uniqueness of emails and phone numbers
mongoose.plugin(uniqueValidator);

// this line means the mongodb realizes this is a model and gives it a name which is 'students'
const Student = mongoose.model('students', studentSchema)

// methods 
// createStudent is a function that creates new student using info provided to this function
// info: firstname, lastname, email, phone, and password
const createStudent = (studentData) => {
    const student = new Student(studentData);
    return student.save();
}

// getStudentById is a function that finds student by id
const getStudentById = (id) => {
    return new Promise((resolve, reject) => {
        Student.findById(id, (err, user) => {
            if (err) return reject(err)
            if (!user) return reject(new _Error('User does not exist.', 400));
            let data = user.toJSON();
            delete data.__v;
            if(user.meta != undefined) {
                if (user.meta.banned) return resolve('This student is banned')
            }
            resolve(data)
        })
    })
}

// getStudentByEmail is a function that finds student by id
const getStudentByEmail = (email) => {
    return new Promise((resolve, reject) => {
        Student.findOne({ email: email }, (err, user) => {
            if (err) return reject(err)
            if (!user) return reject(new _Error('User does not exist.', 400));
            let data = user.toJSON();
            delete data.__v;
            resolve(data);
        })
    })
}
// updateStudent is a function that finds student by id
const updateStudent = (id, userData) => {
    return new Promise((resolve, reject) => {
        Student.updateOne({_id: id},userData ,(err, raw) => {
            if (err) return reject(err);
            resolve(raw)
        })
    });
}

// deleteById is a function that finds student by id
const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        Student.remove({ _id: id }, (err) => {
            if (err) return reject(err);
            resolve({ status: 'success', message: 'User deleted.' });
        })
    })
}

// addExpToStudent is a method that runs when video reaches a certain point and add some points to him
const addExpToStudentById = (studentId, experience) => {
    return new Promise((resolve, reject) => {
        Student.findOne({ studentId: new mongoose.mongo.ObjectId(studentId) }, (err, doc) => {
            if (err) return reject(err)
            if (!doc) return reject(new _Error('User does not exist.', 400));
            doc.experience = doc.experience + experience
            doc.points = doc.points + experience
            doc.level = 1 + parseInt(doc.experience / EXP_PER_LEVEL)
            resolve(doc.save())
        })
    })
}

// addStrikeToStudent is a method that adds a strikes to student if violates terms
const addStrikeToStudent = (studentId, strikeData) => {
    return new Promise((resolve, reject) => {
        Student.findOne({ studentId: studentId }, (err, doc) => {
            if (err) return reject(err)
            if (!doc) return reject(new _Error('User does not exist.', 400));
            doc.meta.strikes.push(strikeData)
            if (doc.meta.strikes.length >= 3) _EventEmitter.emit('student-ready-to-be-banned', { studentId: studentId, strikes: doc.meta.strikes })
            resolve(doc.save())
        })
    })
}

// getBanReadyStudents is a method that fetches every student that have 3 strikes or more
const getBanReadyStudents = () => {
    return new Promise((resolve, reject) => {
        Student.find({ "meta.strikes.2": { "$exists": true } }, (err, docs) => {
            if (err) return reject(err)
            resolve(docs)
        })
    })
}

const getStudentInterests = (studentId) => {
    return new Promise((resolve, reject) => {
        Student.find({ _id: studentId }).select('interests -_id').then(resolve).catch(reject)
    })
}

module.exports = {
    createStudent,
    getStudentById,
    getStudentByEmail,
    updateStudent,
    deleteById,
    Student,
    addExpToStudentById,
    addStrikeToStudent,
    getBanReadyStudents,
    getStudentInterests
}
const mongoose = require('../services/mongodb.service').mongoose;
const uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

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
    permissionLevel: { required: true, default: 1, type: Number }
})

mongoose.plugin(uniqueValidator);

studentSchema.virtual('id').get((_id) => { return _id.toString('hex') });

studentSchema.set('toJSON', {
    virtuals: true
});

studentSchema.findById = (cb) => {
    return this.model('students').find({ id: this.id }, cb);
}

const Student = mongoose.model('students', studentSchema)

// methods 
const createStudent = (studentData) => {
    const student = new Student(studentData);
    return student.save();
}

const getStudentById = (id) => {
    return new Promise((resolve, reject) => {
        Student.findById(id, (err, user) => {
            if (err) reject(err)
            if (!user) reject('User not found')
            let data = user.toJSON();
            delete data.__v;
            resolve(data)
        })
    })
}

const getStudentByEmail = (email) => {
    return new Promise((resolve, reject) => {
        Student.findOne({ email: email }, (err, user) => {
            if (err) reject(err)
            if (!user) return reject({ message: 'User not found!' });
            let data = user.toJSON();
            delete data.__v;
            resolve(data);
        })
    })
}

const updateStudent = (id, userData) => {
    return new Promise((resolve, reject) => {
        Student.findById(id, (err, user) => {
            if (err) reject(err);
            for (let i in userData) {
                user[i] = userData[i];
            }
            user.save((err, updatedUser) => {
                if (err) reject(err);
                resolve(updatedUser);
            })
        })
    });
}

const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        Student.remove({ _id: id }, (err) => {
            if (err) reject(err);
            resolve({ success: true, message: 'User deleted.' });
        })
    })
}

module.exports.createStudent = createStudent;
module.exports.getStudentById = getStudentById;
module.exports.getStudentByEmail = getStudentByEmail;
module.exports.updateStudent = updateStudent;
module.exports.deleteById = deleteById;
module.exports.Student = Student;
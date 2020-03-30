const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

const studentSchema = new Schema({
    firstname: { required: true, type: String },
    lastname: { required: true, type: String },
    email: {
        required: true, type: String, unique: true, validate: {
            validator: (email) => {
                var re = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                return re.test(String(email).toLowerCase());
            },
            message: props => `${props.value} is not a valid email address!`
        },
    },
    phone: {
        required: true, type: String, validate: {
            validator: (phone) => {
                var re = new RegExp(/^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/);
                return re.test(String(phone).toLowerCase());
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    password: { required: true, type: String },
    verified: { required: false, type: Boolean, default: false },
    timestamp: { required: false, type: Number, default: Date.now() },
})

mongoose.plugin(uniqueValidator)


module.exports = mongoose.model('students', studentSchema)
const { mongoose } = require('../services/mongodb.service');
const { ADMIN } = require('../config/config.json').permissionLevels
const _Error = require('../classes/error.class')

const Schema = mongoose.Schema

// generating new collection schema for admin 
// collection schema here is like when we create database tables schema in sql database
const adminSchema = new Schema({
    username: { type: String, required: true },
    email: {
        type: String, required: true, validator: (email) => {
            var re = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            return re.test(String(email).toLowerCase());
        }
    },
    password: { type: String, required: true },
    permissionLevel: { type: Number, required: true, default: ADMIN }
})

// this line means the mongodb realizes this is a model and gives it a name which is 'admins'
const Admin = mongoose.model('admins', adminSchema)

// addAdmin is a method that used to add new admin
const addAdmin = (adminData) => {
    const admin = new Admin(adminData)
    return admin.save()
}

// addAdmin is a method that used fetch admin data by email
const getAdminByEmail = (email) => {
    return new Promise((resolve, reject) => {
        Admin.findOne({ email: email }, (err, doc) => {
            if(err) return reject(err)
            if(!doc) return reject(new _Error('Admin does not exist.', 400))
            resolve(doc)
        })
    })
}

// addAdmin is a method that used to remove admins
const removeAdmin = (adminId) => {
    return new Promise((resolve, reject) => {
        Admin.findById(adminId, (err, doc) => {
            if (err) return reject(err)
            if (!doc) return reject(new _Error('Admin does not exist',400))
            resolve(doc.remove())
        })
    })
}

module.exports = {
    addAdmin,
    removeAdmin,
    getAdminByEmail
}
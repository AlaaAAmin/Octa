const { mongoose } = require('../services/mongodb.service')
const { v4 } = require('uuid');
const Schema = mongoose.Schema

const certificateSchema = new Schema({
    student: { required: true, type: mongoose.Types.ObjectId },
    course: { required: true, type: mongoose.Types.ObjectId },
    acquiredDate: { required: true, type: Date, default: Date.now() },
    certificateId: { required: true, type: String, default: v4() }
})

const Certificate = mongoose.model('certificates', certificateSchema)

// fired when pass exam
const generateCertificate = (certData) => {
    const cert = new Certificate(certData)
    return cert.save()
}

const getCertificatesOfStudent = (studentId) => {
    return new Promise((resolve, reject) => {
        Certificate.find({ student: studentId }, (err, docs) => {
            if(err) return reject(err)
            resolve(docs)
        })
    })
}

module.exports = {
    Certificate,
    generateCertificate,
    getCertificatesOfStudent
}
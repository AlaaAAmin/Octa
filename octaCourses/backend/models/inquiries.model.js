const { mongoose } = require('../services/mongodb.service');
const _Error = require('../classes/error.class');
const Schema = mongoose.Schema

// generating new collection schema for discussion 
// collection schema here is like when we create database tables schema in sql database
const inquirySchema = new Schema({
    email: {
        type: String, required: true, validator: (email) => {
            var re = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            return re.test(String(email).toLowerCase());
        }
    },
    name: { type: String, required: true },
    message: { type: String, required: true },
    responded: { type: Boolean, default: false, required: true }
})

// this line means the mongodb realizes this is a model and gives it a name which is 'discussions'
const Inquiry = mongoose.model('inquiries', inquirySchema)

// this function handles getting all unresponded inquiries
const getInquiries = () => {
    return new Promise((resolve, reject) => {
        Inquiry.find({ responded: false }, (err, docs) => {
            if (err) return reject(err)
            resolve(docs)
        })
    })
}

// this function handles responding to inquiries by inquiry id
const respondToInquiryById = (InqId) => {
    return new Promise((resolve, reject) => {
        Inquiry.findOne({ _id: InqId }, (err, doc) => {
            if (err) return reject(err)
            if (!doc) return reject(new _Error('Inquiry does not exist.', 400))
            resolve(doc)
        })
    })
}

module.exports = {
    Inquiry,
    getInquiries,
    respondToInquiryById
}
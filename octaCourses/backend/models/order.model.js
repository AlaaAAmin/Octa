const { mongoose } = require('../services/mongodb.service')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    student: { required: true, type: mongoose.Types.ObjectId, ref: 'students' },
    course: { required: true, type: mongoose.Types.ObjectId, ref: 'courses' },
    provider: { required: true, type: mongoose.Types.ObjectId, ref: 'providers' },
    paymentId: { required: true, type: String },
    amount: { required: true, type: Number },
    paidToProvider: { required: true, type: Boolean, default: false }
})

const Order = mongoose.model('orders', orderSchema)

const createOrder = (orderData = { student, course, provider, payment, amount }) => {
    var order = new Order(orderData)
    return order.save()
}

const getOrderByPaymentId = (paymentId) => {
    return new Promise((resolve, reject) => {
        Order.findOne({ paymentId: paymentId }, (err, doc) => {
            if (err) return reject(err)
            resolve(doc.toJSON())
        })
    })
}

const getUnPaidOrdersByProvider = (providerId) => {
    return new Promise((resolve, reject) => {
        Order.find({ provider: new mongoose.mongo.ObjectId(providerId), paidToProvider: false }, (err, docs) => {
            if (err) return reject(err)
            resolve(docs)
        })
    })
}

const makeOrdersPaidForProvider = (idsArray) => {
    return new Promise((resolve, reject) => {
        Order.update({ _id: { "$in": idsArray } }, { paidToProvider: true }, { multi: true }, (err, raw) => {
            if (err) return reject(err)
            resolve(raw)
        })
    })
}

// create payouts to transfer money to provider credit card
// create refund to refund student money 

const getOrderByCourseIdAndStudentId = (courseId, studentId) => {
    return new Promise((resolve, reject) => {
        Order.findOne({ course: new mongoose.mongo.ObjectId(courseId), student: new mongoose.mongo.ObjectId(studentId) }, (err, doc) => {
            if (err) return reject(err)
            resolve(doc)
        })
    })
}

const deleteOrder = (orderId) => {
    return new Promise((resolve, reject) => {
        Order.deleteOne({ _id: new mongoose.mongo.ObjectId(orderId) }, (err) => {
            if (err) return reject(err)
            resolve(true)
        })
    })
}





module.exports = {
    Order,
    createOrder,
    getUnPaidOrdersByProvider,
    getOrderByPaymentId,
    getOrderByCourseIdAndStudentId,
    makeOrdersPaidForProvider,
    deleteOrder

}
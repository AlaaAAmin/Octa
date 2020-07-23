const { mongoose } = require("../services/mongodb.service");
const Schema = mongoose.Schema

const wishlistSchema = new Schema({
    studentId: { type: mongoose.Types.ObjectId, required: true, ref: 'students' },
    wishlist: { type: Array, required: true, default: null }
})

const WishList = mongoose.model('wishlists', wishlistSchema)

const addCourseToStudentWishlist = (studentId, courseId) => {
    return new Promise((resolve, reject) => {
        WishList.updateOne({ studentId: studentId }, { $addToSet: { wishlist: new mongoose.mongo.ObjectId(courseId) } }, (err, raw) => { if (err) return reject(err); resolve(raw) })
    })
}

const removeCourseFromStudentWishlist = (studentId, courseId) => {
    return new Promise((resolve, reject) => {
        WishList.updateOne({ studentId: studentId }, { $pull: { wishlist: new mongoose.mongo.ObjectId(courseId) } }, (err, raw) => { if (err) return reject(err); resolve(raw) })
    })
}

module.exports = {
    addCourseToStudentWishlist,
    removeCourseFromStudentWishlist,
    WishList
}
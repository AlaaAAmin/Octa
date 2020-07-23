const WishlistModel = require('../models/wishlist.model')

const addCourseToStudentWishlist = (req, res, next) => {
    WishlistModel.addCourseToStudentWishlist(req.jwt._id, req.params.id)
        .then(data => {
            data.nModified == 1 ? res.status(200).json({ status: 'success', message: 'course added to wishlist' }) : res.status(400).json({ status: 'fail', message: 'course already in wishlist' })
        })
        .catch(err => next(err))
}

const removeCourseFromStudentWishlist = (req, res, next) => {
    WishlistModel.removeCourseFromStudentWishlist(req.jwt._id, req.params.id)
        .then(data => {
            data.nModified == 1 ? res.status(200).json({ status: 'success', message: 'course removed from wishlist' }) : res.status(400).json({ status: 'fail', message: 'course not in wishlist' })
        })
        .catch(err => next(err))
}

module.exports = {
    addCourseToStudentWishlist,
    removeCourseFromStudentWishlist
}
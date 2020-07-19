const RatingModel = require('../models/rating.model')

// rateCourse is a method that rates course using info provided
// info provided : studentId, courseId, providerId, rate, message
const rateCourse = (req, res, next) => {
    req.body.courseId = req.params.id
    req.body.studentId = req.jwt._id
    if (req.body.rate < 0 || req.body.rate > 5) return res.status(400).send({ success: false, message: 'Invalid rate number.' })
    RatingModel.addRatingToCourse(req.body)
        .then((val) => {
            res.status(201).send({ status: 'success', message: 'User rated course.' })
        })
        .catch(err => next(err))
}

module.exports = {
    rateCourse
}


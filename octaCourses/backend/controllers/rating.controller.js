const RatingModel = require('../models/rating.model')

const rateCourse = (req, res) => {
    req.body.courseId = req.params.id
    req.body.studentId = req.jwt._id
    if (req.body.rate < 0 || req.body.rate > 5) return res.status(400).send({ success: false, message: 'Invalid rate number.' })
    RatingModel.addRatingToCourse(req.body)
        .then((val) => {
            res.status(201).send({ success: true, message: 'User rated course.' })
        })
        .catch(err => {
            res.status(400).send({ success: false, error: err })
        })
}

const getRatingsOfCourse = (req, res) => {
    RatingModel.getRatingsOfCourse(req.params.id)
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => {
            res.status(400).send({ success: false, error: err })
        })
}

module.exports.rateCourse = rateCourse
module.exports.getRatingsOfCourse = getRatingsOfCourse
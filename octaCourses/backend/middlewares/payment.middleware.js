const { getOrderByCourseIdAndStudentId } = require('../models/order.model')

const OnlyStudentsWhoBuyCourseAuthorized = (req, res, next) => {
    getOrderByCourseIdAndStudentId(req.params.id, req.jwt._id)
        .then(doc => {if (doc) return next(); else res.status(402).send()})
        .catch(e => next(e))
}
module.exports = {
    OnlyStudentsWhoBuyCourseAuthorized
}
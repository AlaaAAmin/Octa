const CourseModel = require('../models/course.model');
const MediaService = require('../services/media.service');

const checkModuleExistsOrNot = (req, res, next) => {
    CourseModel.getCourseById(req.params.id)
        .then(course => {
            if (!course) return res.status(404).send('Course not found.')
            course.modules.forEach(element => {
                if (element._id == req.params.moduleId) {
                    req.module = element
                    return
                }
            });
            if (req.module) return next()
            res.status(404).send('Module does not exist.')
        })
        .catch(error => {
            res.status(400).send({ success: false, error: error })
        })
}

const checkVideoExistsOrNot = (req, res, next) => {
    if (req.module)
        req.module.files.forEach(element => {
            if (element._id == req.params.videoId) {
                req.media = element
                return
            }
        })
    if (req.media) return next()
    res.status(404).send('Video does not exist.')
}

const retrieveMediaFile = async (req, res, next) => {
    try {
        req.file = await MediaService.getMediaById(req.media.fileId)
        if (req.file && req.file._id) return next()
    } catch (error) {
        return res.status(404).send(error)
    }
}

module.exports.checkModuleExistsOrNot = checkModuleExistsOrNot
module.exports.checkVideoExistsOrNot = checkVideoExistsOrNot
module.exports.retrieveMediaFile = retrieveMediaFile
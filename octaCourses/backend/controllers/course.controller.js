const crypto = require('crypto');
const CourseModel = require('../models/course.model');
const MediaService = require('../services/media.service');


const addCourse = async (req, res) => {
    let errors = []
    let data = req.body.converted
    data.ownerId = req.jwt._id
    data.ownerName = req.jwt.name
    for (let module in data.modules) {
        for (file in data.modules[module].files) {
            try {
                let result = await MediaService.uploadMedia(data.modules[module].files[file].file)
                data.modules[module].files[file].filename = result.info.name
                data.modules[module].files[file].fileId = result.info.fileId

            } catch (err) {
                errors.push(err)
            }
            delete data.modules[module].files[file].file
        }
    }
    if (errors.length) {
        return res.status(400).send({ success: false, errors: errors })
    }
    CourseModel.createCourse(data)
        .then(doc => {
            return res.status(201).send({ success: true, message: 'course added successfully.' })
        })
        .catch(err => {
            return res.status(500).send({ success: false, error: err })
        })

}

const editCourse = async (req, res) => {
    let errors = []
    let data = req.body.converted
    for (let module in data.modules) {
        for (file in data.modules[module].files) {
            try {
                if (data.modules[module].files[file].file) {
                    // try to use Promise.all()
                    let deleteResult = await MediaService.deleteMedia(data.modules[module].files[file].fileId)
                    if (deleteResult.success) {
                        let result = await MediaService.uploadMedia(data.modules[module].files[file].file)
                        data.modules[module].files[file].filename = result.info.name
                        data.modules[module].files[file].fileId = result.info.fileId
                    } else
                        errors.push({ success: false, error: 'Problem in deleting media.' })
                }
            } catch (err) {
                console.log(err)
                errors.push(err)
            }
            delete data.modules[module].files[file].file
        }
    }

    if (errors.length) {
        return res.status(400).send({ success: false, errors: errors })
    }
    try {
        let result = await CourseModel.updateCourseById(req.params.id, req.body.converted)
        if (result.nModified == 1 && result.ok == 1 && result.n == 1) return res.status(204).send({ success: true, message: 'course updated successfully.' })
        res.status(400).send({ success: false, message: 'course could not be updated.' })
    } catch (err) {
        res.status(500).send({ success: false, error: err })
    }
}

const getCourseById = (req, res) => {
    CourseModel.getCourseById(req.params.id)
        .then(course => {
            if (!course) return res.status(404).send('Course not found.')
            res.status(200).send(course)
        })
        .catch(err => {
            res.status(400).send({ success: false, error: err })
        })
}

const searchForCourse = (req, res) => {
    // query keys are
    // name,ownerName
    CourseModel.filterCourses(req.query)
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => {
            res.status(400).send({ success: false, error: err })
        })
}
module.exports.createCourse = addCourse;
module.exports.updateCourse = editCourse;
module.exports.getCourseById = getCourseById
module.exports.searchForCourse = searchForCourse
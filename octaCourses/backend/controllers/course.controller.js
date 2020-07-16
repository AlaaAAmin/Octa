const CourseModel = require('../models/course.model')
const MediaService = require('../services/media.service')
const _EventEmitter = require('../services/event.service')
const { getRatingsOfCourse } = require('../models/rating.model')

// addCourse is a function that used when new course added
// operations done within this function:
// upload media, whether it is video or image or file 
// after successful uploading, data submitted to database
const addCourse = async (req, res) => {
    let errors = []
    let data = req.body.converted
    data.ownerId = req.jwt._id
    data.ownerName = req.jwt.name

    try {
        let result = await MediaService.uploadMedia(data.thumbnail)
        data.thumbnail = null
        data.thumbnailId = result.info.fileId
        for (let module in data.modules) {
            for (let content in data.modules[module].content) {
                if (content.question) continue
                else {
                    if (data.modules[module].content[content].video) {
                        let lectureResult = await MediaService.uploadMedia(data.modules[module].content[content].video)
                        data.modules[module].content[content].videoId = lectureResult.info.fileId
                        delete data.modules[module].content[content].video
                    }
                    if (data.modules[module].content[content].file) {
                        let fileResult = await MediaService.uploadMedia(data.modules[module].content[content].file)
                        data.modules[module].content[content].fileId = fileResult.info.fileId
                        delete data.modules[module].content[content].file
                    }
                }
            }
        }
    } catch (err) {
        errors.push(err)
    }
    if (errors.length) {
        return res.status(400).send({ success: false, errors: errors })
    }
    CourseModel.createCourse(data)
        .then(doc => {
            _EventEmitter.emit('new-course', { id: doc._id })
            return res.status(201).send({ success: true, message: 'course added successfully.' })
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send({ success: false, error: err })
        })

}

// editCourse is a function that edits course
// operations within this function
// checks if there is new file to be uploaded
// if there is a file, then deletes old file and uploads new file else add new content or file 
// then create course in database
const editCourse = async (req, res) => {
    let errors = []
    let data = req.body.converted
    // check if thumbnail is in request

    try {
        if (data.thumbnail) {
            let thumbnailResult = await MediaService.deleteMedia(data.thumbnailId)
            if (thumbnailResult.success) {
                let thumbnail = await MediaService.uploadMedia(data.thumbnail)
                data.thumbnailId = result.info.fileId
                delete data.thumbnail
            } else errors.push({ success: false, error: 'Problem in deleting media.' })
        } else {
            for (let module in data.modules) {
                for (let content in data.modules[module].content) {
                    if (content.question) continue
                    else {
                        if (data.modules[module].content[content].video) {
                            let oldVideoResult = await MediaService.deleteMedia(data.modules[module].content[content].videoId)
                            if (oldVideoResult.success) {
                                let lectureResult = await MediaService.uploadMedia(data.modules[module].content[content].video)
                                data.modules[module].content[content].videoId = lectureResult.info.fileId
                                delete data.modules[module].content[content].video
                            } else errors.push({ success: false, error: 'Problem in deleting media.' })

                        }
                        if (data.modules[module].content[content].file) {
                            let oldFileResult = await MediaService.deleteMedia(data.modules[module].content[content].fileId)
                            if (oldFileResult.success) {
                                let fileResult = await MediaService.uploadMedia(data.modules[module].content[content].file)
                                data.modules[module].content[content].fileId = fileResult.info.fileId
                                delete data.modules[module].content[content].file
                            } else errors.push({ success: false, error: 'Problem in deleting media.' })
                        }
                    }
                }
            }
        }

    } catch (error) {
        errors.push(err)
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

// getCourseById is a functon that gets course from model 
// model gets course and reshapes it from database
const getCourseById = (req, res) => {
    let courseData
    CourseModel.getCourseById(req.params.id)
        .then(course => {
            if (!course) return res.status(404).send('Course not found.')
            courseData = course[0]
            return getRatingsOfCourse(req.params.id)
        })
        .then(ratings => {
            delete ratings[0]._id
            let data = Object.assign(courseData, ratings[0])
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(400).send({ success: false, error: err })
        })
}

// searchForCourse is a method that searches for course by labels or ownername or coursename
const searchForCourse = (req, res) => {
    // query keys are
    // name,ownerName
    CourseModel.filterCourses(req.query)
        .then(result => {
            result.forEach(e => { delete e.reviewed; delete e.__v })
            res.status(200).send(result)
        })
        .catch(err => {
            res.status(400).send({ success: false, error: err })
        })
}

// getFullCourseInfo is a method that fetch full info of course for enrolled students
const getFullCourseInfo = (req, res) => {
    let courseData
    CourseModel.getFullCourseById(req.params.id)
        .then(course => {
          courseData = course[0]  
          return getRatingsOfCourse(req.params.id)
        })
        .then(rating => {
            delete rating[0]._id
            let data = Object.assign(courseData, rating[0])
            res.status(200).send(data)
        })
}
module.exports.createCourse = addCourse;
module.exports.updateCourse = editCourse;
module.exports.getCourseById = getCourseById
module.exports.searchForCourse = searchForCourse
module.exports.getFullCourseInfo = getFullCourseInfo
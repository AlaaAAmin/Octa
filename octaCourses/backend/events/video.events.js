let _EventEmitter = require('../services/event.service')
let EXP_PER_VIDEO = require('../config/config.json').EXP_PER_VIDEO
const { addExpToStudentById } = require('../models/student.model')
// here will add exp to student when student reach 75% of video
_EventEmitter.on('video-watched', (data) => {
    addExpToStudentById(data.studentId, EXP_PER_VIDEO)
        .then(() => {
            // send to user new info through socket
            
        })
        .catch(error => {
            // handle error
            _EventEmitter.emit('error', error)
        })
})
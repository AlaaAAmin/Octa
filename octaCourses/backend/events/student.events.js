let _EventEmitter = require('../services/event.service')
const { addStrikeToStudent } = require('../models/student.model')

_EventEmitter.on('strike-student', async (data)=> {
    try {
        let strikeData = {
            strike: data.strike,
            happenedIn: data.happenedIn
        }
        await addStrikeToStudent(data.studentId, strikeData)
    } catch(err) {
        console.log(err)
    }
})

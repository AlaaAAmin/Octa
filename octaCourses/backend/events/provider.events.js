// here notification will send to course provider when student ask in a specific course
let _EventEmitter = require('../services/event.service')
const { addStrikeToProvider } = require('../models/provider.model')

_EventEmitter.on('strike-provider', async (data) => {
    try {
        let strikeData = {
            strike: data.strike,
            happenedIn: data.happenedIn
        }
        await addStrikeToProvider(data.studentId, strikeData)
    } catch (err) {
        console.log(err)
    }
})




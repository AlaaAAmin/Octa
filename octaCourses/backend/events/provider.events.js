// here notification will send to course provider when student ask in a specific course
let _EventEmitter = require('../services/event.service')
const { addStrikeToProvider } = require('../models/provider.model')

// event listner for striking provider 
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

// event listner for getting new notification for provider
_EventEmitter.on('new-notification', () => {

})




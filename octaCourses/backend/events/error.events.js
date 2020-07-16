let _EventEmitter = require('../services/event.service')
const { response } = require('express')

_EventEmitter.on('error', (error) => {
    // also log every error even if response sent to user
    response.send({success: false, error: error})
})

let _EventEmitter = require('../services/event.service')
const { logger } = require('../middlewares/logger.middleware')

_EventEmitter.on('error', (error) => {
    // also log every error even if response sent to user
    logger.error(JSON.stringify(error))
    _EventEmitter('handle-error', error)
})

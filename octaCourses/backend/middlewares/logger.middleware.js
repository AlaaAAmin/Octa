var MongoDB = require('winston-mongodb').MongoDB;
const dbURL = require('../services/mongodb.service').dbURL
var express_winston = require('express-winston')
const { winston, format, errorFormat, transport, errorTransport} = require('../config/logger.config')


const logger = express_winston.logger({
    format: format,
    transports: [
        transport,
        new winston.transports.Console(),
        new MongoDB({
            db: dbURL,
            collection: `logs`,
            decolorize: true,
            options: { useUnifiedTopology: true },
            metaKey: 'meta'
        })
    ]
})
const errorLogger = express_winston.errorLogger({
    format: errorFormat,
    transports: [
        new winston.transports.Console(),
        errorTransport,
        new MongoDB({
            db: dbURL,
            collection: 'exceptions',
            decolorize: true,
            handleExceptions: true,
            options: { useUnifiedTopology: true },
            metaKey: 'error'
        })
    ]
})

express_winston.requestWhitelist.push('body');
express_winston.responseWhitelist.push('body');

module.exports.logger = logger;
module.exports.ErrorLogger = errorLogger

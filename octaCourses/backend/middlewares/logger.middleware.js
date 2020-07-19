var MongoDB = require('winston-mongodb').MongoDB;
const dbURL = require('../services/mongodb.service').dbURL
var express_winston = require('express-winston')
require('winston-daily-rotate-file')
const { winston, customPrintf } = require('../config/logger.config')

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        customPrintf
    ),
    transports: [
        new (winston.transports.DailyRotateFile)({
            level: 'info',
            filename: './logs/all-logs.log',
            handleExceptions: true,
            json: true,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            colorize: true,
        }),
        new MongoDB({
            db: dbURL,
            level: 'info',
            collection: `logs`,
            decolorize: true,
            options: { useUnifiedTopology: true },
        })
    ],
    exitOnError: false
})

const errorLogger = express_winston.errorLogger({
    transports: [
        new (winston.transports.DailyRotateFile)({
            filename:'./logs/Exception-%DATE%.log',
            handleExceptions:true,
            level:'error',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '7d'
        }),
        new winston.transports.Console({
            colorize: true
        }),
        new MongoDB({
            db: dbURL,
            level: 'error',
            collection: `exceptions`,
            decolorize: true,
            options: { useUnifiedTopology: true },
        })
    ]
})

const stream = {
    write: function (message, encoding) { logger.info(message); }
}

module.exports = {
    logger,
    errorLogger,
    stream
}
const winston = require('winston')
require('winston-daily-rotate-file');
const logLevels = {
    levels: {
        emerg: 0,
        alert: 1,
        crit: 2,
        error: 3,
        warning: 4,
        notice: 5,
        info: 6,
        debug: 7,
        trace: 8
    },
    colors: {
        emerg: 'inverse magenta',
        alert: 'inverse cyan',
        crit: 'inverse grey',
        error: 'bold red',
        warning: 'bold yellow',
        notice: 'blue',
        info: 'green',
        debug: 'italic white',
        trace: 'inverse white'
    }
}

winston.addColors(logLevels)

const format = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.printf((data) => {
        if (data.meta)
            return `${data.timestamp} [${data.level}] ${data.message} | ${data.meta.req.url} | [${data.meta.res.statusCode}] [${data.meta.responseTime} ms] [${data.meta.req.headers.host}]`

    })
)

const errorFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.metadata({ key: 'error' }),
    winston.format.printf(meta => { return `${meta.error.timestamp} - [${meta.level}] - Exception: ${meta.error.exception} \nstack: ${meta.error.error.stack}` })
)

const Transport = new winston.transports.DailyRotateFile({
    filename: `./logs/logs-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    format: winston.format.combine(format, winston.format.uncolorize())
})

const errorTransport = new (winston.transports.DailyRotateFile)({
    filename: `./logs/exceptions-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    format: winston.format.combine(format, winston.format.uncolorize()),
    handleExceptions: true
})

const createFileTransport = (name, exceptions, format) => {
    return new (winston.transports.DailyRotateFile)({
        filename: `./logs/${name}-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        format: winston.format.combine(format, winston.format.uncolorize()),
        handleExceptions: exceptions
    })
}


Transport.on('rotate', (oldname, newname) => {
    // save log to database if we want save file by file

})

errorTransport.on('rotate', (oldname, newname) => {
    // save log to database if we want save file by file
})

module.exports.winston = winston
module.exports.format = format
module.exports.errorFormat = errorFormat
module.exports.createFileTransport = createFileTransport
module.exports.transport = Transport
module.exports.errorTransport = errorTransport
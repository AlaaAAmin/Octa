const winston = require('winston');

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

const customPrintf = winston.format.printf(({ level, message, timestamp, ...metadata }) => {
    let msg = `${timestamp} [${level}] : ${message} `
    if (metadata.res) msg += ` | [${res.statusCode}] [${responseTime} ms]`
    return msg
})

module.exports = {
    winston,
    customPrintf
}
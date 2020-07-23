const { STATUS_CODES, MESSAGES } = require('../config/config.json').HTTP_RESPONSES
const { ENVIRONMENT } = require('../config/config.json')
const _Error = require('../classes/error.class')
const { logger } = require('./logger.middleware')
// handling mongoose errors
// mongoose error types: 
// cast error: when sumbitted invalid mongo ObjectId
const handleMongoCastError = (error) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new _Error(message, 400);
}

const handleMongoDuplicateFieldError = (error) => {
    const value = error.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/);
    const message = `Duplicate field value: ${value}. Please use anothe value!`;
    return new _Error(message, 400);
}

const handleMongoValidationError = (error) => {
    const errors = Object.values(error.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new _Error(message, 400);

}

// send errors in development mode
const handleErrorsInDevMode = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
}

// send errors in production mode
const handleErrorsInProdMode = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });

        // other unknown errors if existed
    } else {
        // 1) Log error to console
        logger.error(JSON.stringify(err))

        // handling payment error
        if(err.type == 'StripeCardError') return res.status(400).json({status:'fail', message: err.raw.message})
        
        // 2) Send generic message
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong.'
        });
    }
}


// handle rest of endpoints 
// when trying to send to unexisting route this will be executed
const handleRoutes = (req, res, next) => {
    res.status(STATUS_CODES.NOT_FOUND).json({ message: MESSAGES.NOT_FOUND })
}

// handling database error if occured
// handling object not found if not exist in db then send error code 400
// handling unauthorized error message
// handling error for forbidden, forbidden happened when user try to access admin or provider routes
// handling error for payment required which is routes for course content
// if nothing specified then returned error 500 
const handler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // for development and production environment
    if (ENVIRONMENT == 'development') return handleErrorsInDevMode(err, res)
    else if (ENVIRONMENT == 'production') {
        let error = { ...err }

        if (error.name === 'CastError') error = handleMongoCastError(error);
        if (error.code == 11000) error = handleMongoDuplicateFieldError(error);
        if (error.name === 'ValidationError') error = handleMongoValidationError(error);
        handleErrorsInProdMode(error, res)
    }
}
module.exports = { handler, handleRoutes }
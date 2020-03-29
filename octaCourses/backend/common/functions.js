module.exports.cbSuccessJSON = (message) => {
    return { success: true, message: message }
}

module.exports.cbFailureJSON = (message) => {
    return { success: false, error: message }
}
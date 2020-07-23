const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./config.json')
const _EventEmitter = require('../services/event.service')
const { logger } = require('../middlewares/logger.middleware')
const { NORMAL_USER, NORMAL_PROVIDER, ADMIN } = require('../config/config.json').permissionLevels

var users = []
// validate jwt token provided by client/ student
const verifyUserToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decode) => {
            if (err) return reject(err) // handle error
            resolve(decode)
        })

    })
}

const getActivity = (users) => {
    let data = { students: 0, guests: 0, providers: 0, admins: 0 }

    users.forEach(u => {
        if (u.type == 'student') data.students = data.students + 1
        if (u.type == 'provider') data.providers = data.providers + 1
        if (u.type == 'guest') data.guests = data.guests + 1
        if (u.type == 'admin') data.admins = data.admins + 1
    })

    return data

}
// checkUserExists is a function that handle saving socketID and user together and also updating socketID to same user
const checkUserExists = (userId) => {
    return users.find(user => user.userId == userId)
}

// add new user for socket when opens site
const addUser = (userId, socketId, type) => {
    users.push({ userId: userId, sockets: [socketId], type: type })
}

// add new socket to existing user when open new tab 
const addSocketToUser = (userId, socketId) => {
    !users.find(user => user.userId == userId).sockets.find(socket => socket == socketId) ? users.find(user => user.userId == userId).sockets.push(socketId) : null
}
// remove socket from user when disconnects
const removeSocketOfUser = (userId, socketId) => {
    users.find(user => user.userId == userId).sockets.splice(users.find(user => user.userId == userId).sockets.indexOf(socketId), 1)
}

// this function used to create event listner actions for socket'
// events:
// authentication, authenticated, post-authentication, unauthorized, new-notification, disconnect
// progress-for-upload -> got from event emitter
const addHandlers = (socket) => {
    socket.on('authentication', async (data) => {
        const { token } = data
        try {
            const user = await verifyUserToken(token);
            let type = null
            if (user.permissionLevel == NORMAL_USER) type = 'student'
            else if (user.permissionLevel == NORMAL_PROVIDER) type = 'provider'
            else if (user.permissionLevel == ADMIN) type = 'admin'
            const exists = checkUserExists(user._id)
            exists ? addSocketToUser(user._id, socket.id) : addUser(user._id, socket.id, type)
            socket.user = user;
            socket.emit('authenticated')
        } catch (e) {
            socket.emit('guest')
            // when no token add as guest
            addUser(null, socket.id, 'guest')
            logger.error(JSON.stringify(e))
            logger.info(`Socket ${socket.id} is a guest.`);
        }
    })

    socket.on('post-authentication', () => {
        logger.info(`Socket ${socket.id} is connected by user ${socket.user._id}`)
    })

    // here data will be jwt and if admin send res
    socket.on('get-active-users', async (data) => {
        try {
            const user = await verifyUserToken(data.token)
            if(user.permissionLevel != ADMIN) return
            let siteData = getActivity(users)
            socket.emit('site-activity', siteData)
        } catch (err) {
            logger.error(JSON.stringify(e))
        }
    })

    _EventEmitter.on('new-notification', (data) => {
        // checks if provider is this or not
        if (socket.user._id == data.provider.providerId) socket.emit('new-notification', data)
    })

    // data = {courseId, moduleId, lectureId, "type lecture", studentId}
    socket.on('video-watched', (data) => {
        _EventEmitter.emit('video-watched', data)
    })

    // data = {courseId, moduleId, lectureId, "type quiz", studentId}
    socket.on('quiz-solved', (data) => {
        _EventEmitter.emit('quiz-solved', data)
    })

    // fired after watching video
    _EventEmitter.on('updated-student-info', data => {
        socket.emit('updated-student-info', data)
    })



    socket.on('disconnect', () => {
        if(!socket.user._id) return 
        checkUserExists(socket.user._id) ? removeSocketOfUser(socket.user._id, socket.id) : null
        logger.info(`Socket ${socket.id} is disconnected by user ${socket.user._id}`)
        socket.removeAllListeners()
    })
}


module.exports = {
    addHandlers
}
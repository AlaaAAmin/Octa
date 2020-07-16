const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./config.json')
const _EventEmitter = require('../services/event.service')

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
// checkUserExists is a function that handle saving socketID and user together and also updating socketID to same user
const checkUserExists = (userId) => {
    return users.find(user => user.userId == userId)
}

// add new user for socket when opens site
const addUser = (userId, socketId) => {
    users.push({ userId: userId, sockets: [socketId] })
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
            const exists = checkUserExists(user._id)
            exists ? addSocketToUser(user._id, socket.id) : addUser(user._id, socket.id)
            socket.user = user;
            socket.emit('authenticated')
        } catch (e) {
            console.log(e)
            console.log(`Socket ${socket.id} unauthorized.`);
            socket.emit('unauthorized')
        }
    })

    socket.on('post-authentication', () => {
        console.log(`Socket ${socket.id} is connected by user ${socket.user._id}`)
    })

    _EventEmitter.on('new-notification', (data)=> {
        socket.emit('new-feed', data)
    })

    socket.on('disconnect', () => {
        checkUserExists(socket.user._id) ? removeSocketOfUser(socket.user._id, socket.id) : null
        console.log(`Socket ${socket.id} is disconnected by user ${socket.user._id}`)
        socket.removeAllListeners()

    })
}


module.exports = {
    addHandlers
}
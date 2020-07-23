const { addHandlers } = require('../config/socket.config')


// users array
// will be store userID as key and socketID as value of the key

// how to store single socket per user
// 1- jwt used to store user data and authenticate if it is valid or not
// 2- socket of user will be stored in array with a key of his db id 
// 3- if exists then it will be returned to ui "already logged in"
// 4- if not then will create a new one and will store a new one and will emit "logged in"
// 


const createIOListners = (io) => {

    // once the connection established this event runs only once
    io.on('connection', (socket) => {

        addHandlers(socket)       
        
    })

}

module.exports = {
    createIOListners
}
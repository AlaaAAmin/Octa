const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const crypto = require('crypto');

const tokenSchema = new Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'students' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 },
    operation: { type: String, required: true }
});

const Token = mongoose.model(`tokens`, tokenSchema);

// methods
const generateToken = (userId, operation) => {
    const token = new Token({ _userId: userId, token: crypto.randomBytes(16).toString('base64'), operation: operation })
    return token.save();
}

const getUserIdByToken = (token) => {
    return new Promise((resolve, reject) => {
        Token.find({ token: token })
            .then(token => {
                let data = token.toJSON();
                resolve(data._userId);
            })
            .catch(err => reject(err))
    })
}

const getTokenByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        Token.find({ _userId: userId })
        .then(token => {
            resolve(token.toJSON());
        })
        .catch(err => reject(err))
    })
}



module.exports.getTokenByUserId = getTokenByUserId;
module.exports.generateToken = generateToken;
module.exports.getUserIdByToken = getUserIdByToken;
module.exports.Token = Token;
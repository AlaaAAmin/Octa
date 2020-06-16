const GridFS = require('../services/mongodb.service').gridFS
const fs = require('fs');
const crypto = require('crypto');
const { gridFS, mongoose } = require('./mongodb.service');
const chunkSize = 261120;

// add progress
const uploadMedia = (file, options = { noCursorTimeout: true }) => {
    return new Promise((resolve, reject) => {
        fs.createReadStream(file.path)
            .pipe(GridFS().openUploadStream(crypto.randomBytes(16).toString('base64'), options))
            .on('finish', (result) => {
                resolve({
                    success: true, info: {
                        name: result.filename,
                        originalname: file.name,
                        fileId: result._id
                    }
                })
            })
            .on('error', (err) => {
                reject({ success: false, error: err })
            })
    })
}

const deleteMedia = (fileId, options = { noCursorTimeout: true }) => {
    return new Promise((resolve, reject) => {
        gridFS().delete(new mongoose.mongo.ObjectId(fileId), (error, result) => {
            if (error) reject(error)
            resolve(result)
        })
    })
}

const getMedia = async (req, res, next) => {
    try {
        let file = await GridFS().find({ filename: req.body.name }).toArray()
        const range = req.headers["range"]
        if (range && typeof range === "string") {

        } else {
            res.header('Content-Length', file[0].length)
            res.header('Content-Type', file[0].contentType)
            let downloadStream = b.openDownloadStream(file[0]._id)
            downloadStream.pipe(res)
            downloadStream.on('error', () => {
                res.sendStatus(404)
            })
            downloadStream.on('end', () => {
                res.end()
            })
        }
    } catch (e) {

    }
}



module.exports.uploadMedia = uploadMedia
module.exports.getMedia = getMedia
module.exports.deleteMedia = deleteMedia
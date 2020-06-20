const fs = require('fs');
const crypto = require('crypto');
const { gridFS, mongoose } = require('./mongodb.service');
const chunkSize = 261120;

// add progress
const uploadMedia = (file, options = { noCursorTimeout: true }) => {
    return new Promise((resolve, reject) => {
        fs.createReadStream(file.path)
            .pipe(gridFS().openUploadStream(crypto.randomBytes(16).toString('base64'), options))
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

const getMediaById = (id, options = { noCursorTimeout: true }) => {
    return new Promise(async (resolve, reject) => {
        try {
            let media = await gridFS().find({ _id: new mongoose.mongo.ObjectId(id) }, options).toArray()
            if (!media[0]) reject({ success: false, message: 'no video found.' })
            resolve(media[0])
        } catch (err) {
            reject({ success: false, message: 'could not retrieve media file.' })
        }
    })
}



module.exports.uploadMedia = uploadMedia
module.exports.deleteMedia = deleteMedia
module.exports.getMediaById = getMediaById
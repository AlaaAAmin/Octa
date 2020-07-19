const fs = require('fs');
const crypto = require('crypto');
const { gridFS, mongoose } = require('./mongodb.service');
const chunkSize = 261120;

// add progress
const uploadMedia = (file, options = { noCursorTimeout: true }) => {
    return new Promise((resolve, reject) => {
        options.metadata = {
            type: file.type,
            originalname: file.name,
        }
        let progress = 0
        let fileSize = fs.statSync(file.path).size
        let startTime = Date.now()
        fs.createReadStream(file.path)
            .pipe(gridFS().openUploadStream(crypto.randomBytes(16).toString('base64'), options))
            .on('finish', (result) => {
                resolve({
                    status: 'success', info: {
                        fileId: result._id
                    }
                })
            })
            .on('drain', (chunk) => {
                let currentChunk = parseInt(chunk.n)
                progress = ((chunkSize * currentChunk) / parseInt(fileSize)) * 100
                let amountOfChunks = fileSize / chunkSize
                var elapsedTime = (new Date().getTime()) - startTime;
                var chunksPerTime = currentChunk / elapsedTime;
                var estimatedTotalTime = amountOfChunks / chunksPerTime;
                var timeLeftInSeconds = (estimatedTotalTime - elapsedTime) / 1000;

                var withOneDecimalPlace = Math.round(timeLeftInSeconds * 10) / 10;

                // emit progress event 
                // {progress: progress,estimated: withOneDecimalPlace}
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
const MediaService = require('../services/media.service');
const gridFS = require('../services/mongodb.service').gridFS

const sendModule = (req, res) => {
    res.status(200).send(req.module)
}

const sendMediaFile = (req, res) => {

    const range = req.headers['range']
    if (range && typeof range == 'string') {
        const parts = range.replace(/bytes=/, "").split("-")
        const partialStart = parts[0]
        const partialEnd = parts[1]

        const start = parseInt(partialStart, 10)
        const end = partialEnd ? parseInt(partialEnd, 10) : req.file.length - 1
        const chunkSize = (end - start) + 1

        res.writeHead(206, {
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Range': 'bytes ' + start + '-' + end + '/' + req.file.length,
            'Content-Type': req.media.type
        })
        let downloadStream = gridFS().openDownloadStream(req.file._id, { start: start, end: end + 1 })
        downloadStream.pipe(res)

        downloadStream.on('error', () => {
            res.status(404).send('Error happened while processing video file.\nplease try again.')
        })
        downloadStream.on('end', () => {
            res.end()
        })
    } else {
        res.setHeader('Content-Length', req.file.length)
        res.setHeader('Content-Type', req.media.type)
        let downloadStream = gridFS().openDownloadStream(req.file._id)
        downloadStream.pipe(res)
        downloadStream.on('error', () => {
            res.status(404).send('Error happened while processing video file.\nplease try again.')
        })
        downloadStream.on('end', () => {
            res.end()
        })
    }

}

module.exports.sendModule = sendModule
module.exports.sendMediaFile = sendMediaFile
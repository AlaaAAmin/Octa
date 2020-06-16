const formidable = require('formidable')
const mongoose = require('../services/mongodb.service').mongoose
const crypto = require('crypto')
const fs = require('fs')
const serv = require('../services/media.service')

// steps
// ui sends form
// backend reshape form
// files upload
// save data to textdb after insert video id


const fetchFormData = (req, res, next) => {
    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(400).send({ success: false, message: "Video could not be uploaded." })
        req.fields = fields
        req.files = files
        return next()
    })
}

const reshapeFormDataFields = (req, res, next) => {

    let data = req.fields
    let converted = {}
    for (let key in data) {

        if (!converted.modules) {
            converted.modules = []
        }

        if (!(key.includes('[') || key.includes(']'))) {
            converted[key] = data[key]
            continue
        }

        let modulesArrayIndex = key.slice(key.indexOf('[') + 1, key.indexOf(']'))
        let modulesArrayKey = key.slice(key.indexOf('][') + 2, key.indexOf(']', key.indexOf('][') + 1))

        if (!converted.modules[modulesArrayIndex]) {
            converted.modules.push({})
            converted.modules[modulesArrayIndex][modulesArrayKey] = data[key]
            continue
        }
        let fileArrayIndex = key.slice(key.indexOf(']['), key.lastIndexOf('][')).slice(key.slice(key.indexOf(']['), key.lastIndexOf('][')).lastIndexOf('[') + 1)
        let fileArrayKey = key.slice(key.lastIndexOf('[') + 1, key.lastIndexOf(']'))

        if (modulesArrayKey == 'files') {
            if (!converted.modules[modulesArrayIndex][modulesArrayKey]) {
                converted.modules[modulesArrayIndex][modulesArrayKey] = []
                converted.modules[modulesArrayIndex][modulesArrayKey].push({})
                converted.modules[modulesArrayIndex][modulesArrayKey][fileArrayIndex][fileArrayKey] = data[key]
                continue
            } else {
                if (!converted.modules[modulesArrayIndex][modulesArrayKey][fileArrayIndex]) {
                    converted.modules[modulesArrayIndex][modulesArrayKey].push({})
                    converted.modules[modulesArrayIndex][modulesArrayKey][fileArrayIndex][fileArrayKey] = data[key]
                    continue
                } else {
                    converted.modules[modulesArrayIndex][modulesArrayKey][fileArrayIndex][fileArrayKey] = data[key]
                    continue
                }
            }
        } else {
            converted.modules[modulesArrayIndex][modulesArrayKey] = data[key]
        }
    }
    req.fields = undefined
    req.body.converted = converted;
    return next()
}

const reshapeFormDataFiles = (req, res, next) => {
    let data = req.files
    for (let key in data) {
        let modulesArrayIndex = key.slice(key.indexOf('[') + 1, key.indexOf(']'))
        let modulesArrayKey = key.slice(key.indexOf('][') + 2, key.indexOf(']', key.indexOf('][') + 1))
        let fileArrayIndex = key.slice(key.indexOf(']['), key.lastIndexOf('][')).slice(key.slice(key.indexOf(']['), key.lastIndexOf('][')).lastIndexOf('[') + 1)
        let fileArrayKey = key.slice(key.lastIndexOf('[') + 1, key.lastIndexOf(']'))
        req.body.converted.modules[modulesArrayIndex][modulesArrayKey][fileArrayIndex][fileArrayKey] = data[key]
    }
    req.files = undefined;
    next()
}


module.exports.fetchFormData = fetchFormData;
module.exports.reshapeFormDataFields = reshapeFormDataFields;
module.exports.reshapeFormDataFiles = reshapeFormDataFiles;
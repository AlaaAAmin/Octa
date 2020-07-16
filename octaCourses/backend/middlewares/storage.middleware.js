const formidable = require('formidable')
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

// unflatten data
const unflatten = function (data) {
    "use strict";
    if (Object(data) !== data || Array.isArray(data)) return data;
    var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
        resultholder = {};
    for (var p in data) {
        var cur = resultholder,
            prop = "",
            m;
        while (m = regex.exec(p)) {
            cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
            prop = m[2] || m[1];
        }
        cur[prop] = data[p];
    }
    return resultholder[""] || resultholder;
};


const reshapeFormDataFields = (req, res, next) => {
    req.body.converted = unflatten(req.fields)
    req.fields = undefined
    return next()
}

const reshapeFormDataFiles = (req, res, next) => {
    let data = req.files
    for (let key in data) {
        if (key == 'thumbnail') {
            req.body.converted.thumbnail = data[key]
        } else {
            let moduleArrayIndex = key.slice(key.indexOf('[') + 1, key.indexOf(']'))
            let moduleArrayKey = key.slice(key.indexOf('][') + 2, key.indexOf(']', key.indexOf('][') + 1))
            let fileArrayIndex = key.slice(key.indexOf(']['), key.lastIndexOf('][')).slice(key.slice(key.indexOf(']['), key.lastIndexOf('][')).lastIndexOf('[') + 1)
            let fileArrayKey = key.slice(key.lastIndexOf('[') + 1, key.lastIndexOf(']'))
            req.body.converted.modules[moduleArrayIndex][moduleArrayKey][fileArrayIndex][fileArrayKey] = data[key]
        }
    }
    req.files = undefined;
    next()
}


module.exports.fetchFormData = fetchFormData;
module.exports.reshapeFormDataFields = reshapeFormDataFields;
module.exports.reshapeFormDataFiles = reshapeFormDataFiles;


const nodemailer = require("nodemailer");
const fs = require('fs');
const config = require('./../config/config.json');

const sendMail = (options) => {
    // should contain 
    // to  -> list of receivers, subject -> Subject line, text -> plain text body, html -> html body

    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: config.mailer.auth.email,
            pass: config.mailer.auth.password
        }
    })

    return transporter.sendMail({
        from: 'no-reply@OctaCourses.com',
        to: options.recievers,
        subject: options.subject, // Subject line
        text: options.text, // plain text body
        html: options.html // html body
    })
}
module.exports.sendMail = sendMail;

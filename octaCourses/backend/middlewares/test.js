
// const direc = "E:\\Completed-Torrents\\Courses\\[FreeCourseLab.com] Udemy - Master Hibernate and JPA with Spring Boot in 100 Steps\\2. Introduction to Spring Boot in 10 Steps\\2. Step 1  Introduction to Spring Boot - Goals and Important Features.mp4"
// const file = require('fs').createReadStream(direc)
// const serv = require('../services/media.service')


// setTimeout(() => {
//     serv.uploadMedia(file)
//         .then(d => console.log(d))
//         .catch(err => console.log(err))
// }, 750);


// const { createLogger, format, transports, addColors } = require('winston');
// const winston = require('winston/lib/winston/config');

// const logConfig =
// {
//     levels: {
//         emerg: 0,
//         alert: 1,
//         crit: 2,
//         error: 3,
//         warning: 4,
//         notice: 5,
//         info: 6,
//         debug: 7
//     },
//     colors:
//     {
//         emerg: 'bold red',
//         alert: 'bold orange',
//         crit: 'red',
//         error: 'cyan',
//         warning: 'yellow',
//         notice: 'blue',
//         info: 'green',
//         debug: 'white',
//     }
// }
// addColors({
//     info: 'bold white',
//     error: 'italic red'
// })



// const metadata = format.metadata({
//     host: 'localhost',
//     port: '12721',
//     reqType: 'get',
//     resCode: '200',

// })


// var MongoDB = require('winston-mongodb').MongoDB;
// const url = require('../services/mongodb.service').dbURL

// const logger = createLogger({
//     levels: logConfig.levels,
//     format: logFormat,
//     transports: [
//         new transports.File({
//             level: 'info',
//             filename: './logs/info.log',
//             json: false,
//         }),
//         new transports.Console,
//         new MongoDB({
//             db: url,
//             collection: 'logs',
//             decolorize: true,
//             format: logFormat,
//             options: {
//                 useUnifiedTopology: true,
//             }
//         })
//     ]
// })

// const logLevels = {
//     levels: {
//         emerg: 0,
//         alert: 1,
//         crit: 2,
//         error: 3,
//         warning: 4,
//         notice: 5,
//         info: 6,
//         debug: 7
//     },
//     colors: {
//         emerg: 'inverse magenta',
//         alert: 'inverse cyan',
//         crit: 'inverse grey',
//         error: 'bold red',
//         warning: 'bold yellow',
//         notice: 'blue',
//         info: 'green',
//         debug: 'italic white'
//     }
// }

// // winston.addColors(logLevels)
// const { winston, transports, format } = require('winston');
// const { dbURL } = require('../services/mongodb.service');
// let win = require('express-winston');

// const printf = format.printf(({ level, message, timestamp, meta, ...args }) => {
//     return `${timestamp} [${level}] ${message} ${JSON.stringify(meta.req.body)} | [${meta.res.statusCode}] [${meta.responseTime}] [${meta.req.headers.host}] ${JSON.stringify(meta.res.body)}`
// });

// const logFormat = format.combine(
//     format.colorize(),
//     format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
//     printf
// )
// const loggerMW = win.logger({
//     format: logFormat,
//     transports: [
//         new transports.Console,
//         new MongoDB({
//             db: dbURL,
//             collection: 'logs',
//             decolorize: true,
//             options: {
//                 useUnifiedTopology: true
//             },
//             metaKey: 'meta'
//         })
//     ],

// })
// win.requestWhitelist.push('body');
// win.responseWhitelist.push('body');
// const errLog = win.errorLogger({
//     format: format.combine(
//         format.timestamp(),
//         format.metadata({key: 'error'}),
//         format.printf((meta) => { return `${meta.error.timestamp} - [${meta.level}] - Exception: ${meta.error.exception} \nstack: ${meta.error.stack}` })
//     ),
//     transports: [
//         new transports.Console({
//         }),
//         new MongoDB({
//             db: dbURL,
//             collection: 'log',
//             decolorize: true,
//             options: {
//                 useUnifiedTopology: true
//             },
//             metaKey: 'error',

//         }),
//     ]
// })

// let m = 'test'
// module.exports.logger = loggerMW
// module.exports.errLog = errLog

// how filter works
// 1- it takes sentence
// then it stems it
// 2- use eucludean destance or any algo to find similarity (dice coefficient)
// 3- if score of word is between 0.7 and 1 then the word is bad
// 4- if the word is bad then there is no string to be saved to database and will give a strike

// dependencies
// string-similarity 
// const jwt = require('jsonwebtoken')
// const { JWT_SECRET } = require('../config/config.json')
// let b = {
//     _id: '5eb4bd79b355700c28fdfac7',
//     email: 'ahmedashraf1705@gmail.com',
//     name: 'ahmed ashroof',
//     phone: '01061091770',
//     permissionLevel: 10,
//     verified: true,
// }
// let t = jwt.sign(b,JWT_SECRET, {expiresIn: 10})
// jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWI0YmQ3OWIzNTU3MDBjMjhmZGZhYzciLCJlbWFpbCI6ImFobWVkYXNocmFmMTcwNUBnbWFpbC5jb20iLCJuYW1lIjoiYWhtZWQgYXNocm9vZiIsInBob25lIjoiMDEwNjEwOTE3NzAiLCJwZXJtaXNzaW9uTGV2ZWwiOjEwLCJ2ZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNTk0MjkwMDA0LCJleHAiOjE1OTQyOTAwMTR9.EEVF7g8gTM4iSsB2WhPl892BrSCEJuQBGlDGdJcwF14', JWT_SECRET, 
// (err, decode) => {
//     if(err) console.log(err.message, err.name)
//     else console.log(decode)
// })

// // here is the plan:
//     // token will be used to verify user to get notification
//     // if(permissionLevel == 10) and token valid and not expired then he will get notification if fired for his course
//     // and added to array 
//     // else he will disconnected from notification
//     // 
// const users = [
//     { name: 'test', id: 1 }
// ]

// const user = users.find((user) => user.id === 2)

// console.log(user)
// let users = [
//     {userId: '1', sockets: [1,2]}
// ]

// let user = users.find(user => user.userId == '2')

// // console.log(user)
// const _EventEmitter = require('../services/event.service')

// setTimeout(() => {
//     _EventEmitter.emit('new-notification', 'test data for notification')
// }, 5000);

// testing for rating is working or not

// const m = require('../models/rating.model');
// let d = {
//     providerId: '5eb4bd79b355700c28fdfac7',
//     courseId: '5f0ca4b3398da233f81cc384',
//     studentId: '5f0ca4de77b4092380998596',
//     rate: 4,
//     comment: 'test comment'
// }

// m.getRatingsOfCourse(d.courseId)
// .then( c => console.log(c[0].Ratings_And_Comments))
// .catch(console.log)


// add students

// const s = require('../models/student.model')
// let sData = {
//     firstname: 'ahmed',
//     lastname: 'ashraf',
//     email: 'ahmedashraf@gmc.csa',
//     password: 'asdadslkndaslkdnasasdn',
//     phone: '+201061091771'
// }

// let sData2 = {
//     firstname: 'alaa',
//     lastname: 'ahmed',
//     email: 'ahmedashraf@gme.csa',
//     password: 'asdadslkndaslkdnasasdn',
//     phone: '+201061091772'
// }

// let sData3 = {
//     firstname: 'mostafa',
//     lastname: 'kholy',
//     email: 'ahmedashraf@gmd.csa',
//     password: 'asdadslkndaslkdnasasdn',
//     phone: '+201061091773'
// }

// s.createStudent(sData3)
// .then(console.log)
// .catch(console.log)

// s.createStudent(sData2)
// .then(console.log)
// .catch(console.log)

// s.createStudent(sData)
// .then(console.log)
// .catch(console.log)
// const { getProviderById, createProvider } = require('../models/provider.model');

// let pData = {
//     name: 'El3lo2 for courses',
//     email: '3lo24ever@gmail.com',
//     phone: +201061091772,
//     password: 'asjdbaksjdbkasbjdak'
// }

// let pdata2 = {
//     name: 'El3lo2 for courses',
//     email: '3lo24ever2@gmail.com',
//     phone: +201061091778,
//     password: 'asjdbaksjdbkasbjdak'
// }

// createProvider(pData)
// .then(console.log)
// .catch(console.log)

// createProvider(pdata2)
// .then(console.log)
// .catch(console.log)

// getProviderById('5f0ce47a827f4e298083f957')
// .then(console.log)
// .catch(console.log)

// add course
// const cm = require('../models/course.model')

// let cdata1 = {
//     courseName: 'course 2',
//     ownerId: '5f0cff810cac9837fc6e20bd',
//     courseRequirments: 'dksjankjndasddasnjkasndksjaaskjnasdkjnakjsdnd',
//     courseObjectives: ['test1','test3'],
//     description: 'dasjkbadsjkbadkjsdaasdabjad',
//     price: 1,
//     thumbnailId: '5f0cff810cac9837fc6e20bd',
//     type: false,
//     hours: 1,
//     address: ['address3','address2'],
//     startOfEnrollmentDate: new Date().toLocaleDateString(),
// }

// cm.createCourse(cdata1)
// .then(console.log)
// .catch(console.log)
// ids 5f0cfffb075bc72880795714 5f0cffda66c777396ca83aa1

// add ratings
// const m = require('../models/rating.model');
// let d = {
//     providerId: '5f0cff810cac9837fc6e20bc',
//     courseId: '5f0cffda66c777396ca83aa1',
//     studentId: '5f0cff5713a6cd428893598e',
//     rate: 4.5,
//     comment: 'test comment'
// }

// let d2 = {
//     providerId: '5f0cff810cac9837fc6e20bc',
//     courseId: '5f0cfffb075bc72880795714',
//     studentId: '5f0cff5713a6cd428893598f',
//     rate: 5,
//     comment: 'test comment2'
// }

// let d3 = {
//     providerId: '5f0cff810cac9837fc6e20bc',
//     courseId: '5f0cffda66c777396ca83aa1',
//     studentId: '5f0cff5713a6cd4288935990',
//     rate: 5,
//     comment: 'test comment2'
// }

// m.addRatingToCourse(d)
//     .then(console.log)
//     .catch(console.log)

// // m.addRatingToCourse(d2)
// //     .then(console.log)
// //     .catch(console.log)

// m.addRatingToCourse(d3)
//     .then(console.log)
//     .catch(console.log)

// let co
// let rate
// let r = require('../models/rating.model')

// cm.getCourseById('5f0cffda66c777396ca83aa1')
// .then(c => {
//     co = c
//     return r.getRatingsOfCourse('5f0cffda66c777396ca83aa1')
// })
// .then(e => {
//     rate = e

//     delete rate[0]._id
//     let result = Object.assign(co[0], rate[0])
//     console.log(result)

// })
// .catch(console.log)

// let lab = ['science', 'engineering','aaa']

// cm.addLabelsToCourse('5f0cffda66c777396ca83aa1', lab)
//     .then(console.log)
//     .catch(console.log)

const _EE = require('../services/event.service')

_EE.on('strike-student', console.log)
const m = require('../models/discussion.model')
const bw = require('bad-word-ar')
const { mongoose } = require('../services/mongodb.service')
const f = new bw('en')
let q = 'bitch bitch'

// m.Discussion.findOne({ courseId:  }, (err, doc) => {
//     console.log(doc)
// })

// let d = new m.Discussion({
//     providerId: new mongoose.mongo.ObjectId('5f0cff810cac9837fc6e20bd'),
//     courseId: new mongoose.mongo.ObjectID('5f0cfffb075bc72880795714'),
//     questions: []
// })
// d.save()
// .then(console.log)
// .catch(console.log)
// m.addQuestionToCourse('5f0cfffb075bc72880795714',q ,'5f0cff5713a6cd428893598f')
// .then(console.log)
// .catch( err => {})

const cm = require('../models/course.model')
const e = require('../models/enrollment.model')
const studentModel = require('../models/student.model')
// cm.getRelatedCourses('5f0cffda66c777396ca83a82')
// .then(console.log)
// .catch(console.log)

// let arr = ['5f0cffda66c777396ca83a82','5f0cffda66c777396ca83aa5']
// cm.getCoursesLabel(arr)
// .then(console.log)


// async function a () {
//     try {
//         let execluded = await e.getEnrolledCoursesForStudent("5f0cff5713a6cd428893598f")
//         execluded.forEach(el => execludeList.push(el.courseId))

//         let lb =  await cm.getCoursesLabel(execludeList)

//         lb.forEach(el => labelsArr.push(...el.metadata.labels))

//         let rec = await cm.getRelatedCourses(execludeList,labelsArr)

//         console.log(rec)
//     } catch(e) {

//     }
// }
// a()

const ab = require('../models/wishlist.model')

// ab.addCourseToStudentWishlist("5f0cff5713a6cd428893598e", "5f0cffda66c777396ca83a82").then(console.log).catch(console.log)
// ab.removeCourseFromStudentWishlist("5f0cff5713a6cd428893598e", "5f0cffda66c777396ca83a82").then(console.log).catch(console.log)

const exam = require('../models/exam.model')
const courseModel = require('../models/course.model')
let data = {
    examTime: "30",
    questions: [
        { question: "q1", options: ["a", "b", "c"], answer: "b" },
        { question: "q2", options: ["a", "b", "c"], answer: "c" },
        { question: "q3", options: ["a", "b", "c"], answer: "a" },
        { question: "q4", options: ["a", "b", "c"], answer: "a" },
        { question: "q5", options: ["a", "b", "c"], answer: "c" }
    ]
}

// exam.addExamToCourse("5f0cffda66c777396ca83a82", data)
// .then(console.log).catch(console.log)

let questions = [
    { question: "q1", options: ["a", "b", "c"], answer: "a" },
    { question: "q2", options: ["a", "b", "c"], answer: "b" },
    { question: "q3", options: ["a", "b", "c"], answer: "a" },
    { question: "q4", options: ["a", "b", "c"], answer: "a" },
    { question: "q5", options: ["a", "b", "c"], answer: "c" }
]

let score = 0
const qNo = questions.length

// exam.getCourseExamQuestions("5f0cffda66c777396ca83a82").then( r => console.log(r)).catch(console.log)
// exam.getCourseExamAnswers("5f0cffda66c777396ca83a82").then(r => {
//     for (let i = 0; i < r.exam.questions.length; i++) {
//         questions[i].answer == r.exam.questions[i].answer ? score = score + 1 : score = score
//     }
//     console.log((score/qNo) * 100)

// }).catch(console.log)

// e.updateStudentProgressForCourse("5f0cff5713a6cd428893598e","5f0cffda66c777396ca83aa5","5f1674506ec6d53f00445e0f","lecture", "5f16749c3f0b1e1e7cf54aec")
// .then(console.log)
// .catch(console.log)

// let users = [{type: 'student'},{type: 'student'},{type: 'student'},{type: 'student'}, {type: 'provider'},{type: 'provider'},{type: 'provider'},{type: 'provider'},{type: 'provider'}, {type: 'admin'},{type: 'admin'},{type: 'guest'},{type: 'guest'},{type: 'guest'},{type: 'guest'},{type: 'guest'},{type: 'guest'},{type: 'guest'},{type: 'guest'},{type: 'guest'}]


// function getActivity(users) {
//     let data = {students: 0, guests: 0, providers: 0 , admins: 0}

//     users.forEach(u => {
//         if(u.type == 'student') data.students = data.students + 1
//         if(u.type == 'provider') data.providers = data.providers + 1
//         if(u.type == 'guest') data.guests = data.guests + 1
//         if(u.type == 'admin') data.admins = data.admins + 1
//     })

//     return data

// }



// console.log(getActivity(users))



require('../services/payment.service')

// let c = 20

// let fee = (0.029 * c * 100) + 30
// let netPrice = c * 100 - fee

// let cut = netPrice * 0.15

// console.log(netPrice - cut)

var stripe = require('stripe')('sk_test_51H7VTbLWG3oeq10N3K8I0aLAD9tcbUL80XQKINlxgUnWC9GZ2mCnuinsidkvlF5bynHD1FyuN5MPxxAtoP3aLSXR00cR7TTW1W');

courseModel.Course.findById('5f0cffda66c777396ca83a82').select('ownerId -_id').populate('ownerId', 'stripe_id bank_id -_id').then(e => console.log(e.ownerId.stripe_id)).catch(console.log)
const createStripeAccountForProvider = (data = { email }) => {
    stripe.accounts.create({
        type: 'custom',
        country: 'US',
        email: data.email,
        business_type: 'individual',
        business_profile: {
            url: 'testurl.com'
        },
        individual: {
            first_name: 'ahmed',
            last_name: 'ashraf 2'
        },
        requested_capabilities: ['transfers'],

    }, async function (err, account) {
        if (err) return console.log(err.raw.message)
        const { id } = account

        try {
            let acc = await stripe.account.update(id, {
                tos_acceptance: {
                    date: Math.floor(Date.now() / 1000),
                    ip: '192.168.121.128'
                }
            })
            // create bank account for provider to recieve payments
            let d = await stripe.accounts.createExternalAccount(id, {
                external_account: {
                    object: 'bank_account',
                    country: 'US',
                    currency: 'usd',
                    routing_number: '110000000',
                    account_number: '000123456789'
                }
            })
            console.log(d)
        } catch (e) { console.log(e.message) }



    })
}

//  createStripeAccountForProvider({email: 'testEmail1234@gmaik.caas'})
// stripe.transfers.create({
//     amount: 5000,
//     currency: 'usd',
//     destination: 'acct_1H7wnRGyUtq7sfvd',


// }, async function (err, payout) {
//     if(err) return console.log(err.message)
//     console.log(payout.id)
// })

// stripe.paymentIntents.create({
//     payment_method_types: ['card'],
//     amount: 1000,
//     currency: 'usd',
//     application_fee_amount: 500,
//     description: 'test method'
// }, {
//     stripeAccount: 'acct_1H7wnRGyUtq7sfvd',

// }, (err, intent) => {
//     if (err) console.log(err.message)
//     console.log(intent)
// })

module.exports = async function t(req, res, next) {
    // transfer money to provider 
    stripe.paymentIntents.create({
        amount: 1000,
        currency: "usd",
        confirm: true,
        application_fee_amount: 150,
        payment_method_types: ['card'],
        payment_method_data:{type: 'card', card: {token: req.body.token}} , // payment token indecates creditcard and operation
        transfer_data: {
            destination: "acct_1H7yUgKGT9ErQ4Kp", // connected_account ID
        }
    }, (err, intent) => {
        if (err) return next(err)
        
    })



}
// createStripeAccountForProvider({email: 'testEmail12@donee.com'})
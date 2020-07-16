const mongoose = require('mongoose');
//admin VAE2H7P1Hq7yG15D
// student WImRfITrFni3903O
const options = {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
}
const DBURL = 'mongodb://localhost:27017/OctaCourses';

// module.exports.initConnection = mongoose.connect('mongodb+srv://user:WImRfITrFni3903O@cluster0-hfclw.mongodb.net/OctaCourses')
//     .then(() => {
//         console.log('Database connected successfully!');
//     })
//     .catch(() => {
//         console.log('Cannot connect to database!');
//     });
mongoose.connect(DBURL, options)
    .then(() => {
        // logger
        console.log('Database connected successfully!');
    })
    .catch(() => {
        console.log('Cannot connect to database!');
    });
let gridFS = () => {
    return new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'Courses'
    })
}

mongoose.connection.once('connected', () => {
    gridFS()
})


module.exports.mongoose = mongoose;
module.exports.dbURL = DBURL
module.exports.gridFS = gridFS;
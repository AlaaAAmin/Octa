const mongoose = require('mongoose');
//admin VAE2H7P1Hq7yG15D
// student WImRfITrFni3903O
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

module.exports.initConnection = mongoose.connect('mongodb+srv://user:WImRfITrFni3903O@cluster0-hfclw.mongodb.net/OctaCourses')
    .then(() => {
        console.log('Database connected successfully!');
    })
    .catch(() => {
        console.log('Cannot connect to database!');
    });

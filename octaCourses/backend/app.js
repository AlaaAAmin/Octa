const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/student.routes');
const providerRoutes = require('./routes/provider.routes');
const authenticationRoutes = require('./routes/auth.routes');
const cors = require('./middlewares/cors.middleware');
const CourseRoutes = require('./routes/course.routes');
const MediaRoutes = require('./routes/media.routes')
const EnrollmentRoutes = require('./routes/enrollment.routes');
const RatingRoutes = require('./routes/rating.routes')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors)

app.use(studentRoutes);
app.use(providerRoutes);
app.use(authenticationRoutes);
app.use(CourseRoutes);
app.use(MediaRoutes)
app.use(EnrollmentRoutes);
app.use(RatingRoutes)
module.exports = app;
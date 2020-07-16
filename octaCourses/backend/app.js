const app = require('express')();
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/student.routes');
const providerRoutes = require('./routes/provider.routes');
const authenticationRoutes = require('./routes/auth.routes');
const cors = require('./middlewares/cors.middleware');
const CourseRoutes = require('./routes/course.routes');
const MediaRoutes = require('./routes/media.routes')
const EnrollmentRoutes = require('./routes/enrollment.routes');
const RatingRoutes = require('./routes/rating.routes')
const AdminRoutes = require('./routes/admin.routes')
const DiscussionRoutes = require('./routes/discussion.routes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors)
const LoggerMiddleware = require('./middlewares/logger.middleware')
// logger middleware
app.use(LoggerMiddleware.logger)
// routing middleware
app.use(studentRoutes);
app.use(providerRoutes);
app.use(authenticationRoutes);
app.use(CourseRoutes);
app.use(MediaRoutes)
app.use(EnrollmentRoutes);
app.use(RatingRoutes)
app.use(DiscussionRoutes)

// admin routes
app.use(AdminRoutes)

// exception logger
app.use(LoggerMiddleware.ErrorLogger)

require('./middlewares/test')

// importing events
require('./events/student.events')
require('./events/provider.events')
require('./events/admin.events')
require('./events/course.events')
require('./events/video.events')
require('./events/error.events')

module.exports = app;
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
const { handleRoutes, handler } = require('./middlewares/error.handler.middleware')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors)
const { logger, stream, errorLogger } = require('./middlewares/logger.middleware')


// logger middleware
// app.use(LoggerMiddleware.logger)
logger.debug("Overriding 'Express' logger")
app.use(require('morgan')("combined", { "stream": stream }))

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

// handling route errors if not exists
app.use('*', handleRoutes)

// handle errors
app.use(handler)

// exception logger
app.use(errorLogger)



// importing events
require('./events/student.events')
require('./events/provider.events')
require('./events/course.events')
require('./events/video.events')
require('./events/error.events')

module.exports = app;
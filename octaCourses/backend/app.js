const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/student.routes');
const providerRoutes = require('./routes/provider.routes');
const authenticationRoutes = require('./routes/auth.routes');
const cors = require('./middlewares/cors.middleware');
const CourseRoutes = require('./routes/course.routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors)

app.use(studentRoutes);
app.use(providerRoutes);
app.use(authenticationRoutes);
app.use(CourseRoutes);

module.exports = app;
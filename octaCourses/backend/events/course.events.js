let _EventEmitter = require('../services/event.service')
const EnrollmentModel = require('../models/enrollment.model')
const RatingModel = require('../models/rating.model')
const DiscussionModel = require('../models/discussion.model')
const { mongoose } = require('../services/mongodb.service')

// event listner for new course
// when create new course, enrollment, discussion and rating will be created automatically
_EventEmitter.on('new-course', async (data) => {
    try {
        let enrollmentData = {
            courses: [{
                courseId: new mongoose.mongo.ObjectId(data.id),
                students: []
            }]
        }
        let enrollemnt = new EnrollmentModel.Enrollment(enrollmentData)
        await enrollemnt.save()

        let ratingData = {
            courseId: new mongoose.mongo.ObjectId(data.id),
            ratings: []
        }
        let rating = new RatingModel.Rating(ratingData)
        await rating.save()

        let discussionData = {
            courseId: new mongoose.mongo.ObjectId(data.id),
            providerId: new mongoose.mongo.ObjectId(data.ownerId),
            questions: []
        }

        let discussion = new DiscussionModel.Discussion(discussionData)
        await discussion.save()
    } catch (error) {
        // handle error
        _EventEmitter('error', err) 
    }
})



// Load the module dependencies
const Course = require('mongoose').model('Course');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 300;
const jwtKey =config.secretKey;

//
// Create a new error handling controller method
const getErrorMessage = function(err) {
	// Define the error message variable
	var message = '';

	// If an internal MongoDB error occurs get the error message
	if (err.code) {
		switch (err.code) {
			// If a unique index error occurs set the message error
			case 11000:
			case 11001:
				message = 'Course already exists?';
				break;
			// If a general error occurs set the message error
			default:
				message = 'Something went wrong';
		}
	} else {
		// Grab the first error message from a list of possible errors
		for (const errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	// Return the message error
	return message;
};
// Create a new course
exports.create = function (req, res, next) {
    // Create a new instance of the 'Course' Mongoose model
    var course = new Course(req.body); //get data from React form
    //console.log("body: " + req.body.studentNumber); //idk if this is needed
    
    // Use the 'Course' instance's 'save' method to save a new course document
    course.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(course);
            
        }
    });
};
//
// Returns all coursess
exports.list = function (req, res, next) {
    // Use the 'Courses' instance's 'find' method to retrieve a new course document
    Course.find({}, function (err, courses) {
        if (err) {
            return next(err);
        } else {
            res.json(courses);
        }
    });
};
//
//'read' controller method to display a course
exports.read = function(req, res) {
	// Use the 'response' object to send a JSON response
	res.json(req.course);
};
//
// 'courseByID' controller method to find a course by its id
exports.courseByID = function (req, res, next, id) {
	// Use the 'Course' static 'findOne' method to retrieve a specific course
	Course.findOne({
        _id: id
	}, (err, course) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Set the 'req.course' property
            req.course = course;
            console.log(course);
			// Call the next middleware
			next();
		}
	});
};
//update a course by id
exports.update = function(req, res, next) {
    console.log(req.body);
    Course.findByIdAndUpdate(req.course.id, req.body, function (err, course) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(course);
    });
};
// delete a course by id
exports.delete = function(req, res, next) {
    Course.findByIdAndRemove(req.course.id, req.body, function (err, course) {
      if (err) return next(err);
      res.json(course);
    });
};

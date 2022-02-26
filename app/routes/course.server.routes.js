// Load the 'course' controller
var courses = require('../../app/controllers/course.server.controller');
var express = require('express');
//var router = express.Router();
// Define the routes module' method
module.exports = function (app) {
    // handle a get request made to /courses path
    // and list courses when /courses link is selected
    app.get("/courses",courses.requiresLogin,courses.list); //go to http://localhost:3000/users to see the list
    //handle a post request made to root path
    app.post('/', courses.create);
    //
    // Set up the 'course' parameterized routes 
	app.route('/courses/:courseId')
    .get(courses.read)
    .put(courses.update)
    .delete(courses.delete)
   
    app.param('courseId', courses.courseByID);
    //authenticate user
    
    
};


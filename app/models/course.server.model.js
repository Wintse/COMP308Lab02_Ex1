// Load the module dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
//
// Define a new 'CourseSchema'
var CourseSchema = new Schema({
    courseCode: String,
	courseName: String,
    section: String,
    semester: String
	
});


// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
CourseSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'Course' model out of the 'UserSchema'
mongoose.model('Course', CourseSchema);
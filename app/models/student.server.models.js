// Load the module dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
//
// Define a new 'studentSchema'
var studentSchema = new Schema({
    firstName: String,
	lastName: String,
	email: {
		type: String,
		// Validate the email format
		match: [/.+\@.+\..+/, "Please fill a valid email address"]
	},
	studentNumber: {
		type: String,
		// Set a unique 'studentNumber' index
		unique: true,
		// Validate 'studentNumber' value existance
		required: 'studentNumber is required',
		// Trim the 'studentNumber' field
		trim: true
	},
	password: {
		type: String,
		// Validate the 'password' value length
		validate: [
			(password) => password && password.length > 6,
			'Password should be longer'
		]
	}
	
});

// Set the 'fullname' virtual property
studentSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
	const splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});

// Use a pre-save middleware to hash the password
// before saving it into database
studentSchema.pre('save', function(next){
	//hash the password before saving it
	this.password = bcrypt.hashSync(this.password, saltRounds);
	next();
});

// Create an instance method for authenticating student
studentSchema.methods.authenticate = function(password) {
	//compare the hashed password of the database 
	//with the hashed version of the password the student enters
	return this.password === bcrypt.hashSync(password, saltRounds);
};


// Configure the 'studentSchema' to use getters and virtuals when transforming to JSON
studentSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'student' model out of the 'studentSchema'
mongoose.model('student', studentSchema);
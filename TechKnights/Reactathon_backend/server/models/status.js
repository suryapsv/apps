// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var schema = new Schema({
  email: { type: Number, required: true},
  jobCode: { type: String, required: true},
  status: { type: String, required: true },
  interviewDetails: {
    date: Date,
    Venue: String,
    interviewer : String,
    Feedback : String
  }

});

// the schema is useless so far
// we need to create a model using it
var Jobpost = mongoose.model('Jobpost', schema);

// make this available to our users in our Node applications
module.exports = Jobpost;
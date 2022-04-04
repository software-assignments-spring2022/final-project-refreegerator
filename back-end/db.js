const mongoose = require('mongoose');

const passportLocalMongoose = require('passport-local-mongoose');
const User = new mongoose.Schema({
  username: String,
  password: String
});

User.plugin(passportLocalMongoose);

mongoose.model('User', User);
 
mongoose.connect('mongodb://localhost/refreegerator')

module.exports = {mongoose};

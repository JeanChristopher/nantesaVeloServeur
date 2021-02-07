var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({    
    admin: {
        type: Boolean,
        default: false
    }
});

// permit to have support in passport middleware for our user
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User)
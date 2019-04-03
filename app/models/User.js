const mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');
const SingleGame = require('./SingleGame');

const UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    console: String,
    password: String,
        games : [SingleGame.schema]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);

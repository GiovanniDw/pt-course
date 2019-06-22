const mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');


const UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    console: String,
    gamemode: String,
    playstyle: String,
    picture: String,
    about: String,
    password: String,
    games : [{ type: mongoose.Schema.Types.Number, ref:'SingleGame'}],
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema, 'users');


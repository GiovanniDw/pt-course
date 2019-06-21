const mongoose = require('mongoose');

const SingleGameSchema = new mongoose.Schema({
    _id: Number,
    title: String,
    cover: String
});
module.exports = mongoose.model('SingleGame', SingleGameSchema, 'game');

 
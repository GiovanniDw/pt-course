const mongoose = require('mongoose');

const SingleGameSchema = new mongoose.Schema({
    title: String,
    cover: String
});
module.exports = mongoose.model('SingleGame', SingleGameSchema);

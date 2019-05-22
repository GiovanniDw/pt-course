const User = require("../models/User");

let users = {};

// Restrict access to root page
users.list = function (req, res) {
    User.find({}, function (err, users) {
        var userMap = {};
        users.forEach(function (user) {
            userMap[user._id] = user;
        });
        res.send(userMap);
    });
};

module.exports = users;



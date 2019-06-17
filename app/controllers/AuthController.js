const passport = require("passport");
const User = require("../models/User");

const userController = {};

// Restrict access to root page
userController.home = function (req, res) {
    
    res.render('pages/index', {
        user: req.user
    });
};

// Go to registration page
userController.register = function (req, res) {
    res.render('pages/register');
};
// Post registration
userController.doRegister = function (req, res) {
    User.register(new User({
        name: req.body.name,
        username: req.body.username,
    }), req.body.password, function (err, user) {
        if (err) {
            return res.render('pages/register', {
                user: user
            });
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/profile/edit');
        });
    });
};

// Go to login page
userController.login = function (req, res) {
    res.render('pages/login');
};
// Post login
userController.doLogin = function (req, res) {
    passport.authenticate('local')(req, res, function () {
        res.redirect('/');
    });
};
// logout
userController.logout = function (req, res) {
    req.logout();
    res.redirect('/login');
};







module.exports = userController;


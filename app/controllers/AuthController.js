const passport = require("passport");


const User = require("../models/User");

const authController = {};

authController.isLoggedIn = function (req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}

// Restrict access to root page
authController.home = function (req, res) {
    if(req.user) {
        res.render('pages/index', {
            user: req.user
        });
    } else {
        res.redirect('/login');
    }
};

// Go to registration page
authController.register = function (req, res) {
    if(req.user) {
        res.redirect('/');
    } else {
    res.render('pages/register');
    }
};
// Post registration
authController.doRegister = function (req, res, next) {
    User.register(new User({
        name: req.body.name,
        username: req.body.username,
        games:[]
    }), req.body.password, function (err, user) {
        if (err) {
            next(err);
            return res.render('pages/register', {
                user: user
            });
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/profile/edit');
        })
    })  
};

// Go to login page
authController.login = function (req, res) {
   
    res.render('pages/login');
    
};
// Post login
authController.doLogin = passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    })


// logout
authController.logout = function (req, res) {
    req.logout();
    res.redirect('/login');
};







module.exports = authController;
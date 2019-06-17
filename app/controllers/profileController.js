const User = require("../models/User");

let profileController = {};

profileController.profile = function (req, res) {
    res.render('pages/profile', {
        user: req.user
    })
}
profileController.editProfile = function (req, res) {
    res.render('pages/edit', {
        user: req.user
    });
}

profileController.doEditProfile = function (req, res, next) {
    User.findOneAndUpdate({
        _id: req.user._id
    }, {
        $set: {
            // name: req.body.name,
            username: req.body.username,
            console: req.body.console,
            picture: req.file ? req.file.filename : null,
            about: req.body.about
        }
    }, done);

    function done(err) {
        if (err) {
            next(err)
        } else {

            res.redirect('/profile')
        }
    }
}



module.exports = profileController;

const User = require("../models/User");
const profileHelper = require('../helpers/profile');

let profileController = {};

profileController.profile = async function (req, res, next) {
    let myGames = [];
    try{ 
        const userID = req.user.id;
        myGames = await profileHelper.myGames(userID);
        res.render('pages/profile', {
            user: req.user, games: myGames
        })
    } catch (err) {
        next(err);
    }
    
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

const gamesHelper = require("../helpers/games");
const usersHelper = require('../helpers/users');
const gamesController = {};
const User = require("../models/User");

const games = [];

gamesController.list = async function (req, res) {
        res.render('pages/games', {
            popular: games
        })
    }
    

gamesController.search = function (req, res) {
    res.render('pages/games', {
        games: games
    })
}
gamesController.doSearch = async function (req, res, next) {
    try{
        const query = req.query.q;// query is the input to search of the user
        const response = await gamesHelper.search(query);// goes to gamesHelper search with the search querry. and saves results to response
        
        res.render('pages/search', {
            games: response// games rendered to view.
        })
    } catch(err) {
        res.redirect('/games')
        next(err);
    }
} 

gamesController.addGame = async function(req, res, next) {
    
    const id = req.params.id;
    const user = req.user.id;
    
    try {
        const check = await gamesHelper.findGameId(id);
        const game = await gamesHelper.findOne(id);  

        if (!check) {
            await gamesHelper.save(game);
        }
        await usersHelper.addGame(user, id);
        res.redirect('/profile');
    } catch (err){
        next(err)
    }
}



module.exports = gamesController;


// gamesController.addGame = function (req, res, next) {
//     User.findOneAndUpdate({
//         _id: req.user._id
//     }, {
//         $push: {
//             games: {
//                 id: req.params.id
//                 title: req.body.title,
//                 cover: req.file ? req.file.filename : null
//             }
//         }
//     }, done)

//     function done(err) {
//         if (err) {
//             next(err)
//         } else {

//             res.redirect('/profile')
//         }
//     }
// }

// function removeGame(req, res, next) {
//     var id = req.params.id

//     if (!req.session.user) {
//         res.status(401).send('Credentials required')
//         return
//     }

//     db.collection('game').deleteOne({
//         _id: mongo.ObjectID(id)
//     }, done)

//     function done(err) {
//         if (err) {
//             next(err)
//         } else {
//             res.json({
//                 status: 'ok'
//             })
//             res.redirect('/profile')
//         }
//     }
// }
const gamesHelper = require("../helpers/games");

const gamesController = {};
 
const games = [];

gamesController.list = function (req, res) {
    res.render('pages/games', {
        games: games
    })
}
gamesController.search = function (req, res) {
    res.render('pages/games', {
        games: games
    })
}
gamesController.doSearch = async function (req, res, next) {

    try{
        const query = req.query.q;
        const response = await gamesHelper.search(query);
        
    res.render('pages/search', {games: response});
    

} catch(err) {
    res.redirect('/games')
   next(err);
}
} 
module.exports = gamesController;


// function addGame(req, res, next) {
//     User.findOneAndUpdate({
//         _id: req.user._id
//     }, {
//         $push: {
//             games: {
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
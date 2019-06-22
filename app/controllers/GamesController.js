const gamesHelper = require("../helpers/games");
const profileHelper = require('../helpers/profile');

const gamesController = {};

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
        let checkDup = await gamesHelper.findGameId(id);
        const game = await gamesHelper.findOne(id);  
        

        if (checkDup == false || checkDup == null) {
            await gamesHelper.save(game);
            await profileHelper.addGame(user, id);
        } else {
            await profileHelper.addGame(user, id);
        }

        res.redirect('/profile');
    } catch (err){
        next(err)
    }
}

module.exports = gamesController;



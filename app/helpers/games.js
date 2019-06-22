const api = require('../helpers/api');
const mongoose = require('mongoose');

const SingleGame = require('../models/SingleGame');


const gamesHelper = {}

gamesHelper.search = async (query) => {
    try {
        const results = [];
        const games = await api.searchGames(query);
        for (let i = 0; i < games.length; i++) {
            results.push(
               new Promise(async function (resolve) {
                    const gameItem = {
                        id: games[i].id,
                        title: games[i].name,
                        cover: await api.findCover(games[i].cover, 'cover_big_2x')
                    };
                    resolve(gameItem);
               })   
            )
        }
        const gameItem = await Promise.all(results);
        return gameItem;
    } catch (err) {
        throw new Error('No search today');
    }
}
gamesHelper.findOne = async (id) => {
    try {
        const result = await api.findGameId(id);
        const game = result && result[0];

        if (game) {
            const gameItem = {
                id: game.id,
                    title: game.name,
                    cover: await api.findCover(game.cover, 'cover_big_2x')
            };
            return gameItem;
        } else {
            throw new Error;
        }
    } catch (err) {
        throw new Error('Game by id not found')
    }
}
gamesHelper.findGameId = (id) => {
    return new Promise((resolve, reject) => {

        mongoose.connect(process.env.MONGO_DB, {
            dbName: process.env.DB_NAME,
            useNewUrlParser: true
        });

        const db = mongoose.connection;

        db.on('error', (err) => reject(err));
        db.once('open', async function (){
                        try {
                            let game = await SingleGame.findById(id);
                            resolve(game);   
                        } catch (err) {
                            reject(err);
                        }
    })
})
}
gamesHelper.save = (game) => {
    return new Promise((resolve, reject) => {
        const {
            id,
            title,
            cover
        } = game;
        mongoose.connect(process.env.MONGO_DB, {
            dbName: process.env.DB_NAME,
            useNewUrlParser: true
        });

        const db = mongoose.connection;

        db.on('error', (err) => reject(err));
        db.once('open', async function () {
            try {
                let newSingleGame = new SingleGame({
                    _id: id,
                    title: title,
                    cover: cover
                });
                newSingleGame.save(function (err, game) { // save the game and use the callback if done
                if (err) reject(err); // if there is an error reject the promise and send the error back
                else resolve(game); // if there is not an error resolve the promise
                });
            } catch (err) {
                reject(err);
            }

        })
    })
};

// gamesHelper.addGame = async (userID, id) => {

//     try{
//         const gameID = await api.findGameId(id);



//     } catch (err) {
//         throw new Error('No add game for you');
//     }
// }
module.exports = gamesHelper;
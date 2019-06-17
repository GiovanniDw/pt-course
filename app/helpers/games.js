const api = require('../helpers/api');

const SingleGame = require('../models/SingleGame');

const gamesHelper = {}

gamesHelper.search = async (query) => {
    try {
        const promises = [];
        const games = await api.findGames(query)
        for (let i = 0; i < games.length; i++) {
            promises.push(
               new Promise(async function (resolve) {
                    const gameItem = {
                        id: games[i].id,
                        title: games[i].name,
                        cover: await api.findCover(games[i].cover, 'logo_med')
                    };
                    resolve(gameItem);
               })
                
            );
            }
                const gameItem = await Promise.all(promises);
                console.log(gameItem)
            return gameItem;
        } catch (err) {
            console.log(err);
        }
}


module.exports = gamesHelper;



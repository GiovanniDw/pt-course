const mongoose = require('mongoose');
const User = require('../models/User');

const profileHelper = {};

profileHelper.addGame = function (userID, gameID) {
    return new Promise(function (resolve, reject) {

        mongoose.connect(process.env.MONGO_DB, {
            dbName: process.env.DB_NAME,
            useNewUrlParser: true
        }); // make a connection to the database

        const db = mongoose.connection; // defines the connection

        db.on('error', (err) => reject(err)); // on event emitter error, reject and send the error back
        db.once('open', async function () {
            try {
                const user = await User.findById(userID);
                const checkDup = user.games.includes(gameID);
console.log(checkDup);
                if (!checkDup) {
                    user.games.push(gameID);
                    await user.save();
                }

                
                
                resolve('has resolved');
            } catch (err) {
                reject(err);
            }
        });
    });
};
profileHelper.myGames = (userID) => {
return new Promise(async function (resolve, reject){
    try {
        const user = await User.findById(userID).select('games').populate('games');
        resolve(user.games);
    } catch (err) {
        reject({ type: 'error'})
    }
})
}


module.exports = profileHelper;

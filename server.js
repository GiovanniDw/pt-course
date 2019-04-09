require('dotenv').config()
const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const multer = require('multer')
const mongo = require('mongodb')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy






const url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT

mongoose.connect(url , {useNewUrlParser: false,});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
console.log('were connected')
});
const index = require('./app/routes/index')
const users = require('./app/routes/users')




const upload = multer({
    dest: './app/static/uploads/'
})

const port = 3000
const app = express()
    app.set('view engine', 'ejs')
    app.set('views', path.join(__dirname, 'app/views'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(express.static(path.join(__dirname, 'app/static')))
    app.use(session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET
    }))
    app.use(passport.initialize())
    app.use(passport.session())

    

app.use('/', index);
app.use('/users', users);


const User = require('./app/models/User');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


    app.get('/chat', chat)
    app.get('/profile', profile)
    app.post('/profile', upload.single('cover'), addGame)
    app.delete('/profile:id', removeGame)
    app.use(function (req, res, next) {
        res.locals.user = null
        next()
    })
    
    app.get('*', error)
    app.listen(port)

function chat(req, res) {
    res.render('pages/chat')
}

function profile(req, res, next) {
   User.games.find().toArray(done)
    function done(err, game) {
        if (err) {
            next(err)
        } else {
            res.render('pages/profile', {
                game: game
            })
        }
    }
}

function addGame(req, res, next){

    User.findOneAndUpdate(
        {_id:req.user._id},
        {$push:
            {
                    games : {
                        title: req.body.title,
                        cover: req.file ? req.file.filename : null,
                        xp: req.body.xp
                    },
                    game : req.body.game

            }
        }, done)
        function done(err) {
            if (err) {
                next(err)
            } else {
                
                res.redirect('/profile')
            }
        }
    }


function removeGame(req, res, next) {
    var id = req.params.id

    if (!req.session.user) {
        res.status(401).send('Credentials required')
        return
    }

    db.collection('game').deleteOne({
        _id: mongo.ObjectID(id)
    }, done)

    function done(err) {
        if (err) {
            next(err)
        } else {
           res.json({status: 'ok'})
           res.redirect('/profile')
        }
    }   
}

// function register(req, res) {
// User.register(new User({
//     username: req.body.username
// }), req.body.password, function (err, user) {
//     if (err) {
//         console.log(err);
//         return res.redirect('sign-up');
//     } else {
//         passport.authenticate('local')(req, res, function () {
//             res.redirect('/profile');
//         });
//     }
// });
// }



// function signup(req, res, next) {

//     db.collection('user').insertOne({
//         username: req.body.username,
//         password: req.body.password,
//         console: req.body.description
//     }, done)

//     function done(err) {
//         if (err) {
//             next(err)
//         } else {
//             res.redirect('/profile')
//         }
//     }
// }
// function login(req, res) {
//     var username = req.body.username
//     var password = req.body.password

//     db.collection('user').findOne({
//         username: username,
//         password: password

//     }, done)

//     function done(err, user) {
//         if (user) {
//                 req.session.user = user
//                 res.render('pages/login', {
//                     id: user._id,
//                     username: user.username
//                 })
        
//         } else {
//             res.json({
//                 status: 'ok'
//             })
//             res.status(401).send('Password incorrect')
//         }
//     } 
// }

function error(req, res) {
    res.render('static' + req.url, function (err, html) {
        if (!err) {
            return res.send(html)
        }
        // Not super elegant the `indexOf` but useful
        if (err.message.indexOf('Failed to lookup view') !== -1) {
            return res.render('./pages/error.ejs')
        }
        throw err
    })

}



const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const multer = require('multer')
const mongo = require('mongodb')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
// const passportLocalMongoose = require('passport-local-mongoose')
// const slug = require('slug')

game = [];

require('dotenv').config()

var db = null
var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT

// mongo.MongoClient.connect(url, function (err, client) {
//     if (err) throw err
//     db = client.db(process.env.DB_NAME)
// })
mongoose.Promise = global.Promise;
mongoose.connect(url, function (err, client) {
                if (err) throw err
                db = client.db(process.env.DB_NAME)
            }, {
                useNewUrlParser: true
            })
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err))
    
var index = require('./app/routes/index')
var users = require('./app/routes/users')



var upload = multer({
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
    // app.get('/', renderHome)
    // app.get('/register', renderRegister)
    // app.get('/login', renderLogin)
    app.get('/profile', profile)
    // app.post('/sign-up', register)
    // // app.post('/login', login)
    // app.post('/login', passport.authenticate('local', {
    //     successRedirect: '/profile',
    //     failureRedirect: '/login'
    // }))
    app.post('/profile', upload.single('cover'), addGame)
    app.delete('/profile:id', removeGame)
    app.use(function (req, res, next) {
        res.locals.user = null
        next()
    })
    
    app.get('*', error)
    app.listen(port)





// function renderHome(req, res) {
//     res.render('pages/index')
// }
function chat(req, res) {
    res.render('pages/chat')
}
// function renderLogin(req, res) {
//     res.render('pages/login')
// }
// function renderRegister(req, res) {
//     res.render('pages/sign-up')
// }
function profile(req, res, next) {
   db.collection('game').find().toArray(done)
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

function addGame(req, res, next) {

db.collection('game').find().toArray(done)

    if (!req.session.user) {
        res.status(401).send('Credentials required')
        return
    } else {
        res.redirect('/sign-up')
    }
    db.collection('game').insertOne({
        title: req.body.title,
        cover: req.file ? req.file.filename : null,
        description: req.body.description
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

    // if (!req.session.user) {
    //     res.status(401).send('Credentials required')
    //     return
    // }

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


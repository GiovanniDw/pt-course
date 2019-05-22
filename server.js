require('dotenv').config()
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

const url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT

mongoose.connect(url , {useNewUrlParser: false,});
const db = mongoose.connection;
// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
// eslint-disable-next-line no-console
console.log('were connected')
});
const index = require('./app/routes/index')
const users = require('./app/routes/users')
const games = require('./app/routes/games')

const upload = multer({
    dest: './app/static/uploads/'
})

const port = 3000
const app = express()
    app.set('view engine', 'ejs')
    app.set('views', path.join(__dirname, 'app/views'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use('/', express.static('app/static/'))
    app.use(session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET
    }))
    app.use(passport.initialize())
    app.use(passport.session())

app.use('/', index);
app.use('/users', users);
app.use('/games', games);

const User = require('./app/models/User');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

    app.get('/chat', chat)
    
    
    app.get('/profile/edit', editProfile)
    app.post('/profile/edit', upload.single('picture'), doEditProfile)
    //app.post('/profile', upload.single('cover'), addGame)
    //app.delete('/profile:id', removeGame)

    app.use(function (req, res, next) {
        res.locals.user = null
        next()
    })
    app.get('*', error)
    app.listen(port)

function chat(req, res) {
    res.render('pages/chat')
}




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


function editProfile(req, res) {
    res.render('pages/edit', {
        user: req.user
    });
}

function doEditProfile(req, res, next) {
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

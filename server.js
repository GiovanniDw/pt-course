require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

mongoose.connect(process.env.MONGO_DB, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', error);
db.once('open', function(){});

const index = require('./app/routes/index')
const games = require('./app/routes/games')
const profile = require('./app/routes/profile')

const port = process.env.PORT;
const app = express()
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'app/views'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/', express.static('app/static/'));
    app.use(session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET
    }));
    app.use(passport.initialize());
    app.use(passport.session());

app.use('/', index);
app.use('/games', games);
app.use('/profile', profile);

const User = require('./app/models/User');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

    app.get('/chat', chat);
    
    app.get('*', error)
    app.listen(port)

function chat(req, res) {
    res.render('pages/chat', {
        user: req.user
    })
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




var express = require('express');
var router = express.Router();
var games = require("../controllers/GamesController.js");

router.get('/', games.list);
router.get('/search', games.search);
router.get('/search/:query?', games.doSearch);

module.exports = router;
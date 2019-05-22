var express = require('express');
var router = express.Router();
/* GET users listing. */
var users = require("../controllers/userController.js");

router.get('/', users.list);

module.exports = router;
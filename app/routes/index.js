let express = require('express');
let router = express.Router();
let auth = require("../controllers/AuthController.js");

router.get('/', auth.home);

router.get('/register', auth.register);
router.post('/register', auth.doRegister);

router.get('/onboarding', auth.onboarding);
router.post('/onboarding', auth.doOnboarding);

router.get('/login', auth.login);
router.post('/login', auth.doLogin);

router.get('/logout', auth.logout);

module.exports = router;



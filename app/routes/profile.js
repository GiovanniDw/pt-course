const express = require('express');
const router = express.Router();

const auth = require("../controllers/AuthController.js");
const profile = require("../controllers/profileController.js");

const multer = require('multer');
const upload = multer({
    dest: './app/static/uploads/'
})

router.get('/', auth.isLoggedIn, profile.profile);
router.get('/edit', auth.isLoggedIn, profile.editProfile);
router.post('/edit', upload.single('picture'), profile.doEditProfile);

module.exports = router;

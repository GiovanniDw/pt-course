const express = require('express');
const router = express.Router();

const profile = require("../controllers/profileController.js");
const multer = require('multer');

const upload = multer({
    dest: './app/static/uploads/'
})

router.get('/', profile.profile);
router.get('/edit', profile.editProfile);
router.post('/edit', upload.single('picture'), profile.doEditProfile);

module.exports = router;
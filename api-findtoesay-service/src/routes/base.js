const express = require('express');
const user = require("./user");
const classified = require("./classified");
const auth = require("./auth")
const chat = require("./chat");
router = express.Router();

router.use(user);
router.use(classified);
router.use(auth);
router.use(chat);

module.exports = router


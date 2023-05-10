const express = require('express');
const chat = require("./handler");
const { requestValidator } = require("../../middleware/validator/request.validator");
const { verifyJWT } = require("../../middleware/auth");
router = express.Router();

router.post("/v1/chat/init", requestValidator, verifyJWT, chat.chatInit);
router.post("/v1/chat/send", requestValidator, verifyJWT, chat.sendMsg);
router.get("/v1/chat/all", requestValidator, verifyJWT, chat.userChats);
router.get("/v1/chat/:id", requestValidator, verifyJWT, chat.chatMessages);


module.exports = router;
const express = require('express');
const loginHandler = require("./handler");
const { requestValidator } = require("../../middleware/validator/request.validator");

router = express.Router();

router.post("/v1/login", requestValidator, loginHandler.loginUser);

module.exports = router;
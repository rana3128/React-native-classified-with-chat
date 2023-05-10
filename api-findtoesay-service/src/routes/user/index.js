const express = require('express');
const userHandler = require("./handler");
const { requestValidator } = require("../../middleware/validator/request.validator");
router = express.Router();

router.post("/v1/user", requestValidator, userHandler.createUser);
router.get("/v1/user/:id", requestValidator, userHandler.getUser);

module.exports = router;



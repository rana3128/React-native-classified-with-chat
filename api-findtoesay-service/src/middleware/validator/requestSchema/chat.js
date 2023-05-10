const { body, param } = require("express-validator");

const bodyId = [body("id").isNumeric().not().isEmpty().withMessage("id cannot be empty")];
const paramsId = [param("id").isString().not().isEmpty().withMessage("id cannot be empty")];
const initChat = [
  body("adsId").isString().not().isEmpty().withMessage("adsId cannot be empty"),
  body("adsOwner").isString().not().isEmpty().withMessage("adsOwner cannot be empty")
]

const sendMsg = [
  body("chatId").isString().not().isEmpty().withMessage("chatId cannot be empty"),
  body("message").isString().not().isEmpty().withMessage("message cannot be empty"),
]

module.exports = {
  "/v1/chat/init": {
    POST: initChat
  },
  "/v1/chat/send": {
    POST: sendMsg
  },
  "/v1/chat/all": {
    GET: []
  },
  "/v1/chat/:id": {
    GET: paramsId
  },

}
const { body, param } = require("express-validator");

const bodyId = [body("id").isNumeric().not().isEmpty().withMessage("id cannot be empty")];
const paramsId = [param("id").isString().not().isEmpty().withMessage("id cannot be empty")];
const createUser = [
  body("username").isString().not().isEmpty().withMessage("username cannot be empty"),
  body("password").isString().not().isEmpty().withMessage("password cannot be empty"),
]

module.exports = {
  "/v1/user": {
    POST: createUser
  },
  "/v1/user/:id": {
    GET: paramsId
  },
  "/v1/login": {
    POST: createUser
  }
}
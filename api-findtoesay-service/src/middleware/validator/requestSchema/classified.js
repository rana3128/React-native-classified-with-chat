const { body, param } = require("express-validator");

const bodyId = [body("id").isNumeric().not().isEmpty().withMessage("id cannot be empty")];
const paramsId = [param("id").isString().not().isEmpty().withMessage("id cannot be empty")];
const paramsAction = [param("action").isString().not().isEmpty().withMessage("action cannot be empty")];
const createClassified = [
  body("title").isString().not().isEmpty().withMessage("title cannot be empty"),
  body("description").isString().not().isEmpty().withMessage("description cannot be empty"),
  body("phone").isString().not().isEmpty().withMessage("phone cannot be empty"),
  body("location").isObject().not().isEmpty().withMessage("location cannot be empty"),
  body("location.address").isString().not().isEmpty().withMessage("location.address cannot be empty"),
  body("location.coordinates").isArray().not().withMessage("location.coordinates cannot be empty"),
  body("city").isString().not().isEmpty().withMessage("city cannot be empty"),
  body("catagory").isString().not().isEmpty().withMessage("catagory cannot be empty"),
]

const updateClassified = [
  body("title").optional().isString().not().isEmpty().withMessage("title cannot be empty"),
  body("description").optional().isString().not().isEmpty().withMessage("description cannot be empty"),
  body("phone").optional().isString().not().isEmpty().withMessage("phone cannot be empty"),
  body("location").optional().isObject().not().isEmpty().withMessage("location cannot be empty"),
  body("location.address").optional().isString().not().isEmpty().withMessage("location.address cannot be empty"),
  body("location.coordinates").optional().isArray().not().withMessage("location.coordinates cannot be empty"),
  body("city").optional().isString().not().isEmpty().withMessage("city cannot be empty"),
  body("catagory").optional().isString().not().isEmpty().withMessage("catagory cannot be empty"),
]

module.exports = {
  "/v1/classified": {
    POST: createClassified
  },
  "/v1/classified/:id": {
    GET: paramsId
  },
  "/v1/classified/user": {
    GET: []
  },
  "/v1/classified/catagory/:cat": {
    GET: [param("cat").isString().not().isEmpty().withMessage("cat cannot be empty")]
  },
  "/v1/classified/search/:key": {
    GET: [param("key").isString().not().isEmpty().withMessage("key cannot be empty")]
  },
  "/v1/classified/active/:id/action/:action": {
    GET: [...paramsId, ...paramsAction]
  },
  "/v1/classified/update/:id": {
    POST: [...paramsId, ...updateClassified]
  },
  "/v1/classified/delete/:id": {
    DELETE: paramsId
  }
}
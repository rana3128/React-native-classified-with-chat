
import { body, param } from "express-validator";

const bodyId = [body("id").isNumeric().not().isEmpty().withMessage("id cannot be empty")];
const paramsId = [param("id").isNumeric().not().isEmpty().withMessage("id cannot be empty")];
const paramsTagName = [param("tagName").not().isEmpty().withMessage("id cannot be empty")];
const bodyUpdatedBy = [body("updated_by").isNumeric().not().isEmpty().withMessage("updated_by cannot be empty")];
const bodyDeletedBy = [body("deleted_by").isNumeric().not().isEmpty().withMessage("deleted_by cannot be empty")];
const bodyCreatedBy = [body("created_by").isNumeric().not().isEmpty().withMessage("created_by cannot be empty")];


const templateBase = [
    body("template_name").isString().not().isEmpty().withMessage("template_name cannot be empty"),
    body("template_desc").isString().not().isEmpty().withMessage("template_desc cannot be empty"),
    body("template_content").isString().not().isEmpty().withMessage("template_content cannot be empty"),
    body("template_script_type").isString().isIn(["ansible", "terraform"]).withMessage("template_script_type not valid"),
    body("tags").isArray().not().withMessage("tags cannot be empty")
];

const templateTagBase = [
    body("template_id").isNumeric().not().isEmpty().withMessage("template_id cannot be empty"),
    body("tag_name").isString().not().isEmpty().withMessage("tag_name cannot be empty"),
];


export = {
    "/v1/template": {
        POST: templateBase.concat(bodyCreatedBy),
        PATCH: templateBase.concat(bodyId, bodyUpdatedBy),
        DELETE: bodyId.concat(bodyDeletedBy),
        GET: [],
    },
    "/v1/template/:id": {
        GET: paramsId
    },
    "/v1/templateTag": {
        POST: templateTagBase.concat(bodyCreatedBy),
        PATCH: templateTagBase.concat(bodyId, bodyUpdatedBy),
        DELETE: bodyId.concat(bodyDeletedBy),
        GET: [],
    },
    "/v1/templateTag/:id": {
        GET: paramsId
    },
    "/v1/templateTagName/:tagName": {
        GET: paramsTagName
    }
};





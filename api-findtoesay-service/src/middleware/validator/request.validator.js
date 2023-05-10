const { validationResult, matchedData } = require("express-validator");
const userSchema = require("./requestSchema/user");
const classifiedSchema = require("./requestSchema/classified");
const chatSchema = require("./requestSchema/chat");

exports.requestValidator = async (req, res, next) => {
    try {
        const validations = routeConfig[req.route?.path] ? routeConfig[req.route?.path][req.method] : null;
        if (validations) {
            await Promise.all(validations.map(validation => validation.run(req)));

            req.body = matchedData(req, {
                onlyValidData: false,
                locations: ['body']
            });
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                return next();
            }
            return res.status(400).json({ errors: errors.array() });
        } else {
            return res.status(401).json({ errors: "Route not configured" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ errors: "Error in request validation" });
    }
};


const routeConfig = {
    ...userSchema,
    ...classifiedSchema,
    ...chatSchema
};





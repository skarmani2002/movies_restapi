const Joi = require("joi");
const errors = require("../errors/response-errors");
const debug = require("../libs/debug")('validation-middleware');
module.exports = (req, res, next, validations) => {
    let rules = Object.keys(validations);
    //check for available route in request
    for (var i = 0; i < rules.length; i++) {
        let rule = rules[i];
        //if a rule for that route is defined
        if (req.path.includes(rule)) {
            var data;
            if (req.method === 'POST') {
                data = req.body;
            }
            if (req.method === 'GET') {
                data = req.params;
            }

            const validation_rules = validations[rule].concat(Joi.object({
                api_version: Joi.string().optional()
              }))

            let valid = Joi.validate(data, validation_rules);
            if (valid.error) {
                console.log('Validation Error in %s : ', req.path, rule);
                return next(errors.validationError(valid.error.details));
            } else {
                return next();
            }
        } else {
            if (i === (rules.length - 1)) {
                console.log('Validation Rule not found in %s : ', req.path);
                return next(errors.getError('ESS50304'));
            }
        }
    }
};
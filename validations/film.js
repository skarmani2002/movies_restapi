const ValidationMiddleware = require('../libs/validation-middleware');
const Joi = require("joi");

const validations = {
    'films/create': Joi.compile({
        name            :  Joi.required(),
        photo           :  Joi.required(),
        description     :  Joi.required(),
        points          :  Joi.required(),
    }),
  
};

module.exports = (req, res, next) => {
    ValidationMiddleware(req, res, next, validations);
};

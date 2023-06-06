const Joi = require('joi');

exports.validateTokenId = Joi.object({
    id: Joi.string().required(),
    token: Joi.number().min(18).required()
}).unknown();
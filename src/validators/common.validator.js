const Joi = require('joi');

const {MONGO_ID} = require("../constants/regex.enum");

const IdValidator = Joi.string().regex(MONGO_ID)

module.exports = {
    IdValidator,
}
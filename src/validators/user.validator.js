const Joi = require('joi');
const {EMAIL, PASSWORD} = require("../constants/regex.enum");
const IdValidator = require("./common.validator");
const {ApiError} = require("../errors");
const {statusCode} = require("../constants");

const newUserValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(35).trim().required(),
    age: Joi.number().integer().min(1).max(120),
    email: Joi.string().regex(EMAIL).lowercase().trim().required().error(new ApiError('Email not valid', statusCode.BAD_REQUEST)),
    password: Joi.string().regex(PASSWORD).error(new ApiError('Password not valid', statusCode.BAD_REQUEST)),
    cars: Joi.array().items(IdValidator).optional(),
})

module.exports = {
    newUserValidator,
}
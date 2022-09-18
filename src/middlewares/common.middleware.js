const {isObjectIdOrHexString} = require('mongoose')

const {ApiError} = require("../errors");
const {statusCode} = require("../constants");

module.exports = {
    checkIsIdValid: (fieldName, from = 'params') => async (req, res, next) => {
        try {
            if (!isObjectIdOrHexString(req[from][fieldName])) {
                return next(new ApiError('Not valid ID', statusCode.BAD_REQUEST))
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsBodyValid: (validateType) => async (req, res, next) => {
        try {

            const validate = validateType.validate(req.body);

            if (validate.error) {
                return next(new ApiError(validate.error.message, statusCode.BAD_REQUEST));
            }

            req.body = validate.value;
            next();
        } catch (e) {
            next(e);
        }
    },
}
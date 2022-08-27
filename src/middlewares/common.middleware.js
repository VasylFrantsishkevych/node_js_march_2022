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
    }
}
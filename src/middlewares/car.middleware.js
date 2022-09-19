const {statusCode} = require('../constants');
const {ApiError} = require('../errors');
const {carService} = require('../services');

module.exports = {
    isCarPresent: async (req, res, next) => {
        try {
            const {carId} = req.params;

            const car = await carService.getById(carId);

            if (!car) {
                return next(new ApiError('Car with this id is not exist', statusCode.NOT_FOUND));
            }

            req.car = car;
            next();
        } catch (e) {
            next(e);
        }
    }
};

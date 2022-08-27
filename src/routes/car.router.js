const { Router } = require('express');

const { carController } = require("../controllers");
const { carMiddleware, commonMiddleware, userMiddleware} = require('../middlewares');

const carRouter = Router();

carRouter.post(
    '/',
    commonMiddleware.checkIsIdValid('userId', 'query'),
    carMiddleware.checkIsCarBodyValid,
    userMiddleware.isUserPresent('query'),
    carController.createCar
);
carRouter.get(
    '/:carId',
    commonMiddleware.checkIsIdValid('carId'),
    carMiddleware.isCarPresent,
    carController.getCarById
);
carRouter.put(
    '/:carId',
    commonMiddleware.checkIsIdValid('carId'),
    carMiddleware.isCarPresent,
    carController.updateCarByID
);
carRouter.delete(
    '/:carId',
    commonMiddleware.checkIsIdValid('carId'),
    carMiddleware.isCarPresent,
    carController.deleteCarById
);

module.exports = carRouter;
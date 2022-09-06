const { Router } = require('express');

const { carController } = require("../controllers");
const { carMiddleware, commonMiddleware, userMiddleware, authMiddleware} = require('../middlewares');

const carRouter = Router();

carRouter.post(
    '/',
    commonMiddleware.checkIsIdValid('userId', 'query'),
    carMiddleware.checkIsCarBodyValid,
    authMiddleware.checkIsAccessToken,
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
    authMiddleware.checkIsAccessToken,
    carMiddleware.isCarPresent,
    carController.updateCarByID
);
carRouter.delete(
    '/:carId',
    commonMiddleware.checkIsIdValid('carId'),
    authMiddleware.checkIsAccessToken,
    carMiddleware.isCarPresent,
    carController.deleteCarById
);

module.exports = carRouter;
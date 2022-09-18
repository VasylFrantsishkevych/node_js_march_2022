const { Router } = require('express');

const { carController } = require('../controllers');
const { carMiddleware, commonMiddleware, authMiddleware} = require('../middlewares');
const {newCarValidator, updateCarValidator} = require('../validators/car.validator');

const carRouter = Router();

carRouter.post(
  '/',
  commonMiddleware.checkIsBodyValid(newCarValidator),
  authMiddleware.checkIsAccessToken,
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
  commonMiddleware.checkIsBodyValid(updateCarValidator),
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

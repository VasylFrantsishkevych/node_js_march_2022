const { Router } = require('express');

const { userController } = require('../controllers');
const { userMiddleware, commonMiddleware, authMiddleware} = require('../middlewares');
const {newUserValidator, updateUserValidator} = require('../validators/user.validator');

const userRouter = Router();

userRouter.get(
  '/',
  userController.getAllUsers,
);
userRouter.post(
  '/',
  commonMiddleware.checkIsBodyValid(newUserValidator),
  userMiddleware.checkIsUserEmailUniq,
  userController.createUser,
);
userRouter.get(
  '/:userId',
  commonMiddleware.checkIsIdValid('userId'),
  userMiddleware.isUserPresent(),
  userController.getUserById,
);
userRouter.put(
  '/:userId',
  commonMiddleware.checkIsIdValid('userId'),
  commonMiddleware.checkIsBodyValid(updateUserValidator),
  authMiddleware.checkIsAccessToken,
  userMiddleware.isUserPresent(),
  userMiddleware.checkIsUserEmailUniq,
  userController.updateUserByID,
);
userRouter.delete(
  '/:userId',
  commonMiddleware.checkIsIdValid('userId'),
  authMiddleware.checkIsAccessToken,
  userMiddleware.isUserPresent(),
  userController.deleteUserById,
);

module.exports = userRouter;

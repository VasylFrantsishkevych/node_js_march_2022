const { Router } = require('express');

const { userController } = require("../controllers");
const { userMiddleware, commonMiddleware} = require('../middlewares');

const userRouter = Router();

userRouter.get(
    '/',
    userController.getAllUsers
);
userRouter.post(
    '/',
    userMiddleware.checkIsUserBodyValid,
    userMiddleware.checkIsUserEmailUniq,
    userController.createUser
);
userRouter.get(
    '/:userId',
    commonMiddleware.checkIsIdValid('userId'),
    userMiddleware.isUserPresent(),
    userController.getUserById
);
userRouter.put(
    '/:userId',
    commonMiddleware.checkIsIdValid('userId'),
    userMiddleware.isUserPresent(),
    userMiddleware.checkIsUserEmailUniq,
    userController.updateUserByID
);
userRouter.delete(
    '/:userId',
    commonMiddleware.checkIsIdValid('userId'),
    userMiddleware.isUserPresent(),
    userController.deleteUserById
);

module.exports = userRouter;
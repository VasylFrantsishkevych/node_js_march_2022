const { Router } = require('express');
const { authController } = require("../controllers");
const {userMiddleware, authMiddleware} = require("../middlewares");

const authRouter = Router();

authRouter.post(
    '/login',
    userMiddleware.getUserDynamicaly('body', 'email', 'email'),
    authController.login
);

authRouter.post(
    '/refresh',
    authMiddleware.checkIsRefreshToken,
    authController.refresh
);


module.exports = authRouter;
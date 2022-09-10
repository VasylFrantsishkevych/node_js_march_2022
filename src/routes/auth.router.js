const { Router } = require('express');
const { authController } = require("../controllers");
const {userMiddleware, authMiddleware} = require("../middlewares");

const authRouter = Router();

authRouter.post(
    '/login',
    userMiddleware.getUserDynamicaly('body', 'email'),
    authController.login
);

authRouter.post(
    '/logout',
    authMiddleware.checkIsAccessToken,
    authController.logout
);

authRouter.post(
    '/refresh',
    authMiddleware.checkIsRefreshToken,
    authController.refresh
);


module.exports = authRouter;
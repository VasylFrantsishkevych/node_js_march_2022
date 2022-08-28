const { Router } = require('express');
const { authController } = require("../controllers");
const {userMiddleware} = require("../middlewares");

const authRouter = Router();

authRouter.post(
    '/login',
    userMiddleware.getUserDynamicaly('body', 'email', 'email'),
    authController.login)

module.exports = authRouter;
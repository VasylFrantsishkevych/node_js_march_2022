const { Router } = require('express');

const { authController } = require('../controllers');
const {userMiddleware, authMiddleware, commonMiddleware} = require('../middlewares');
const {loginUserValidator} = require('../validators/user.validator');

const authRouter = Router();

authRouter.post(
  '/login',
  commonMiddleware.checkIsBodyValid(loginUserValidator),
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

const { Router } = require('express');

const { userController } = require("../controllers");
const userMiddleware = require('../middlewares/user.middleware');

const userRouter = Router();

userRouter.get('/', userController.getAllUsers)
userRouter.post('/',userMiddleware.checkIsUserBodyValid, userController.createUser)
userRouter.get('/:userId', userController.getUserById)
userRouter.put('/:userId', userController.updateUserByID)
userRouter.delete('/:userId', userController.deleteUserById)

module.exports = userRouter;
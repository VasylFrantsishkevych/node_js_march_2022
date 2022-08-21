const { Router } = require('express');

const userController = require("../controllers/user.controller");
const userMiddelware = require('../middlewares/user.middelware');

const userRouter = Router();

userRouter.get('/', userController.getAllUsers)
userRouter.post('/',userMiddelware.checkIsUserBodyValid, userController.createUser)
userRouter.get('/:userId', userController.getUserById)
userRouter.put('/:userId', userController.updateUserByID)
userRouter.delete('/:userId', userController.deleteUserById)

module.exports = userRouter;
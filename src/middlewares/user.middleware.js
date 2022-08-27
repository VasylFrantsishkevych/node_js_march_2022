const {statusCode} = require('../constants');
const {ApiError} = require("../errors");
const {userService} = require("../services");

module.exports = {
    checkIsUserBodyValid: async (req, res, next) => {
        try {
            const {age, name} = req.body;

            if (Number.isNaN(+age) || age <= 0) {
               return (new ApiError('Wrong user age', statusCode.BAD_REQUEST));
            }

            if (name.length < 2) {
                return (new ApiError('Wrong user name', statusCode.BAD_REQUEST));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    //перевіряємо чи існує такий емеіл в базі
    checkIsUserEmailUniq: async (req, res, next) => {
        try {
            const { email } = req.body;
            const { userId } = req.params;
            // шукаємо юзера по емейлу
            const userByEmail = await userService.getOneByParams( {email});
            // перевіряємо чи такий користувач є, якщо є то такий емеіл зайнятий
            if (userByEmail && userByEmail._id.toString() !== userId) {
                return next(new ApiError('Email is exist in database', statusCode.CONFLICT))
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    // перевіряємо чи існує юзер в базі
    isUserPresent: (from = 'params') => async (req, res, next) => {
        try {
            const {userId} = req[from];
            // шукаємо юзера по id
            const user = await userService.getById(userId);
            // перевіряємо чи існує юзер
            if (!user) {
                return next(new ApiError('User with this id is not exist', statusCode.NOT_FOUND))
            }
            // передаємо користувача далі в реквест
            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    }
}
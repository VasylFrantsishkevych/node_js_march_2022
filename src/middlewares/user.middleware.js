const {statusCode} = require('../constants');
const {ApiError} = require("../errors");
const {userService} = require("../services");
const {User} = require("../db");

module.exports = {
    //перевіряємо чи існує такий емеіл в базі
    checkIsUserEmailUniq: async (req, res, next) => {
        try {
            const { email } = req.body;
            const { userId } = req.params;
            // шукаємо юзера по емейлу
            const userByEmail = await userService.getOneByParams( { email, _id: { $ne: userId } });
            // перевіряємо чи такий користувач є, якщо є то такий емеіл зайнятий
            if (userByEmail) {
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
    },

    getUserDynamicaly: (from = 'body', fieldName = 'userId', dbField = fieldName) =>
        async (req, res, next) => {
        try {
            const fieldToSearch = req[from][fieldName];
            // шукаємо чи існує емейл
            const user = await User.findOne({ [dbField]: fieldToSearch});
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
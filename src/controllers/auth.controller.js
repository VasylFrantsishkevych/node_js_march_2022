const {authService, tokenService} = require('../services');
const {NO_CONTENT} = require('../constants/statusCode.enum');
const {sendEmail} = require('../services/email.service');
module.exports = {
    login: async (req, res, next) => {
        try {
            const { password, email } = req.body;
            const { password: hashPassword, _id } = req.user;
            // перевіряємо паролі на співпадіння
            await tokenService.comparePasswords(password, hashPassword);
            // створюємо пару токенів
            const authTokens = tokenService.createAuthTokens({_id});
            // зберагаємо токена в базу
            await authService.saveTokens({...authTokens, user: _id});
            //відсилаємо повідомлення на пошту
            await sendEmail(email);
            res.json({
                ...authTokens,
                user: req.user
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const { user, accessToken } = req.tokenInfo;
            //
            await authService.deleteOneByParams({user: user._id, accessToken});

            res.sendStatus(NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const { user, refreshToken } = req.tokenInfo;
            // видаляємо стару пару токенів
            await authService.deleteOneByParams({refreshToken});
            // створюємо пару токенів
            const authTokens = tokenService.createAuthTokens({_id: user});
            // зберагаємо токена в базу
            const newTokens = await authService.saveTokens({...authTokens, user});

            res.json(newTokens);
        } catch (e) {
            next(e);
        }
    },
};

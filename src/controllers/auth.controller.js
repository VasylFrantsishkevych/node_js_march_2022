const {authService, tokenService} = require("../services");
module.exports = {
    login: async (req, res, next) => {
        try {
            const { password: password } = req.body;
            const { password: hashPassword, _id } = req.user;
            // перевіряємо паролі на співпадіння
            await tokenService.comparePasswords(password, hashPassword);
            // створюємо пару токенів
            const authTokens = tokenService.createAuthTokens({_id});
            // зберагаємо токена в базу
            await authService.saveTokens({...authTokens, user: _id})

            res.json({
                ...authTokens,
                user: req.user
            });
        } catch (e) {
            next(e);
        }
    }
}
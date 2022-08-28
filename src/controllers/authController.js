const {authService} = require("../services");
module.exports = {
    login: async (req, res, next) => {
        try {
            const { password: password } = req.body;
            const { password: hashPassword, _id } = req.user;
            // перевіряємо паролі на співпадіння
            await authService.comparePasswords(password, hashPassword);
            // створюємо пару токенів
            const authTokens = authService.createAuthTokens({_id});

            res.json({
                ...authTokens,
                user: req.user
            });
        } catch (e) {
            next(e);
        }
    }
}
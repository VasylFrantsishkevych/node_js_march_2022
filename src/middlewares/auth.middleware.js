const {constant, statusCode} = require("../constants");
const {ApiError} = require("../errors");
const {authService, tokenService} = require("../services");

module.exports = {
    checkIsAccessToken: async (req, res, next) => {
        try {
            // дістаємо з реквесту, хедерів аксес токен
            const accessToken = req.get(constant.AUTHORIZATION);

            if (!accessToken) {
                return next(ApiError('No token', statusCode.UNAUTHORIZED))
            }

            tokenService.checkToken(accessToken);
            // перевіряємо токен на валідність
            const tokenInfo = authService.getOneWithUser({accessToken})

            if (!tokenInfo) {
                return next(ApiError('Not valid token', statusCode.UNAUTHORIZED));
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}
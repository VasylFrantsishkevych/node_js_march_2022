const {constant, statusCode, tokenTypeEnum} = require("../constants");
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
            const tokenInfo = await authService.getOneWithUser({accessToken})

            if (!tokenInfo) {
                return next(ApiError('Not valid token', statusCode.UNAUTHORIZED));
            }

            req.tokenInfo = tokenInfo;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsRefreshToken: async (req, res, next) => {
        try {
            // дістаємо з реквесту, хедерів аксес токен
            const refreshToken = req.get(constant.AUTHORIZATION);

            if (!refreshToken) {
                return next(ApiError('No token', statusCode.UNAUTHORIZED))
            }

            tokenService.checkToken(refreshToken, tokenTypeEnum.REFRESH);
            // перевіряємо токен на валідність
            const tokenInfo = await authService.getOneByParams({refreshToken})

            if (!tokenInfo) {
                return next(ApiError('Not valid token', statusCode.UNAUTHORIZED));
            }

            req.tokenInfo = tokenInfo;
            next();
        } catch (e) {
            next(e);
        }
    },
}
const bcrypt = require('bcrypt');
const {statusCode, tokenTypeEnum} = require("../constants");
const {ApiError} = require("../errors");
const jwt = require('jsonwebtoken');
const {
    ACCESS_SECRET_WORD,
    REFRESH_SECRET_WORD,
    ACCESS_TOKEN_LIFETIME,
    REFRESH_TOKEN_LIFETIME} = require('../configs/configs')

module.exports = {
    // хешуємо пароль
    hashPassword: (password) => bcrypt.hash(password, 10),
    // порівнюємо паролі
    comparePasswords: async (password, hashPassword) => {
        const isPasswordsSame = await bcrypt.compare(password, hashPassword);

        if (!isPasswordsSame) {
            throw new ApiError('Wrong email or password', statusCode.BAD_REQUEST)
        }
    },
    // генеруємо токени
    createAuthTokens: (payload = {}) => {
        const accessToken = jwt.sign(payload, ACCESS_SECRET_WORD, { expiresIn: ACCESS_TOKEN_LIFETIME})
        const refreshToken = jwt.sign(payload, REFRESH_SECRET_WORD, { expiresIn: REFRESH_TOKEN_LIFETIME})

        return {
            accessToken,
            refreshToken
        }
    },
    // перевіряємо токени по секретному слову
    checkToken: (token, tokenType = tokenTypeEnum.ACCESS) => {
        try {
            let word;

            if (tokenType === tokenTypeEnum.ACCESS) word = ACCESS_SECRET_WORD;
            if (tokenType === tokenTypeEnum.REFRESH) word = REFRESH_SECRET_WORD;

            return jwt.verify(token, word);
        }catch (e) {
            throw new ApiError('Token not valid', statusCode.UNAUTHORIZED);
        }
    },
}
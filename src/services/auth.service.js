const bcrypt = require('bcrypt');
const {statusCode} = require("../constants");
const {ApiError} = require("../errors");
const jwt = require('jsonwebtoken');

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
        const accessToken = jwt.sign(payload, 'ACCESS_WORD', { expiresIn: '15m'})
        const refreshToken = jwt.sign(payload, 'REFRESH_WORD', { expiresIn: '30d'})

        return {
            accessToken,
            refreshToken
        }
    }
}
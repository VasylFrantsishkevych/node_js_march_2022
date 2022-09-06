const {Auth} = require('../db')

module.exports = {
    saveTokens(tokens) {
        return Auth.create(tokens);
    },

    getOneWithUser(filter) {
        return Auth.findOne(filter).populate('user')
    },
}
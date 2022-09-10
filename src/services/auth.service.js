const {Auth} = require('../db')

module.exports = {
    saveTokens(tokens) {
        return Auth.create(tokens);
    },

    getOneWithUser(filter) {
        return Auth.findOne(filter).populate('user')
    },

    getOneByParams(filter) {
        return Auth.findOne(filter)
    },

    deleteOneByParams(filter) {
        return Auth.deleteOne(filter)
    }
}
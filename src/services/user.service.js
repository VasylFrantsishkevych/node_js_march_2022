const {User} = require('../db');

module.exports = {
    createUser(userObject) {
        return User.create(userObject)
    },

    getAllUsers(filter = {}) {
        return User.find(filter)
    },

    getOneByParams(filter) {
        return User.findOne(filter)
    },

    getById(id) {
        return User.findById(id).select(['+cars']).populate('cars');
    },

    updateUserById(userId, newObjectToUpdate) {
        return User.updateOne({ _id: userId }, newObjectToUpdate, { new: true })
    },

    deleteUserById(userId) {
        return User.deleteOne({ _id: userId })
    }
}
const {Car} = require('../db');

module.exports = {
    createCar(carObject) {
        return Car.create(carObject)
    },

    getCarsByParams(filter) {
        return Car.find(filter)
    },

    getOneByParams(filter) {
        return Car.findOne(filter)
    },

    getById(id) {
        return Car.findById(id).populate('user');
    },

    updateCarById(carId, newObjectToUpdate) {
        return Car.updateOne({ _id: carId }, newObjectToUpdate, { new: true })
    },

    deleteCarById(carId) {
        return Car.deleteOne({ _id: carId })
    }
}
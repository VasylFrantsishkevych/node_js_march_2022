const fileService = require("../services/file.service");

module.exports = {
    getAllUsers: async (req, res) => {
        const usersFromService = await fileService.getUser();
        res.json(usersFromService)
    },
    createUser: async (req, res) => {

        const setNewUser = await fileService.insertUser(req.body);

        res.status(201).json(setNewUser)
    },
    getUserById: async (req, res) =>{
        const {userId} = req.params;

        if (Number.isNaN(+userId) || +userId < 0) {
            res.status(400).json('Wrong user Id')
            return;
        }

        const user = await fileService.getById(+userId);

        if (!user) {
            res.status(404).json('User not found')
            return;
        }

        res.json(user)
    },
    updateUserByID: async (req, res) => {
        const {userId} = req.params;
        const {age, name} = req.body;

        if (Number.isNaN(+userId) || +userId < 0) {
            res.status(400).json('Wrong user Id')
            return;
        }

        const userObject = {};
        if (age) userObject.age = age;
        if (name) userObject.name = name;

        const user = await fileService.updateById(+userId, req.body);

        if (!user) {
            res.status(404).json('User not found')
            return;
        }

        res.status(201).json(user);
    },
    deleteUserById: async (req, res) => {
        const {userId} = req.params;

        if (Number.isNaN(+userId) || +userId < 0) {
            res.status(400).json('Wrong user Id')
            return;
        }

        const user = await fileService.deleteById(+userId);

        if (!user) {
            res.status(404).json('User not found')
            return;
        }

        res.sendStatus(204);
    }
}
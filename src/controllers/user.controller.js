const fileService = require("../services/file.service");
const {statusCode} = require("../constants");

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const usersFromService = await fileService.getUser();
            res.json(usersFromService)
        } catch (e) {
            res.status(400).json({ message: e.message})
        }

    },
    createUser: async (req, res) => {
        try {
            const setNewUser = await fileService.insertUser(req.body);
            res.status(statusCode.CREATE).json(setNewUser)
        } catch (e) {
            res.json(e)
        }

    },
    getUserById: async (req, res) =>{
        const {userId} = req.params;
            try {
                if (Number.isNaN(+userId) || +userId < 0) {
                    res.status(statusCode.BAD_REQUEST).json('Wrong user Id')
                    return;
                }

                const user = await fileService.getById(+userId);

                if (!user) {
                    res.status(statusCode.NOT_FOUND).json('User not found')
                    return;
                }

                res.json(user)
            } catch (e) {
                res.json(e)
            }

    },
    updateUserByID: async (req, res) => {
        const {userId} = req.params;
        const {age, name} = req.body;
            try {
                if (Number.isNaN(+userId) || +userId < 0) {
                    res.status(statusCode.BAD_REQUEST).json('Wrong user Id')
                    return;
                }

                const userObject = {};
                if (age) userObject.age = age;
                if (name) userObject.name = name;

                const user = await fileService.updateById(+userId, req.body);

                if (!user) {
                    res.status(statusCode.NOT_FOUND).json('User not found')
                    return;
                }

                res.status(statusCode.CREATE).json(user);
            } catch (e) {
                res.json(e)
            }

    },
    deleteUserById: async (req, res) => {
        const {userId} = req.params;
            try {
                if (Number.isNaN(+userId) || +userId < 0) {
                    res.status(statusCode.BAD_REQUEST).json('Wrong user Id')
                    return;
                }

                const user = await fileService.deleteById(+userId);

                if (!user) {
                    res.status(statusCode.NOT_FOUND).json('User not found')
                    return;
                }

                res.sendStatus(statusCode.NO_CONTENT);
            } catch (e) {
                res.json(e)
            }

    }
}
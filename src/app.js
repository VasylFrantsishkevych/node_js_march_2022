const express = require('express');

const fileService = require('./services/file.service')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.json('Hello world')
})

app.get('/users', async (req, res) =>{
    const usersFromService = await fileService.getUser();
    res.json(usersFromService)
})

app.get('/users/:userId', async (req, res) =>{
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
})

app.post('/users', async (req, res) => {
    const {age, name} = req.body;

    if (Number.isNaN(+age) || age <= 0 ) {
        res.status(400).json('Wrong user age');
        return;
    }

    const setNewUser = await fileService.insertUser({age, name})

    res.status(201).json(setNewUser)
})

app.delete('/users/:userId', async (req, res) => {
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
})

app.put('/users/:userId', async (req, res) => {
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
})


app.listen(5000, () => {
    console.log('App listen 5000')
})
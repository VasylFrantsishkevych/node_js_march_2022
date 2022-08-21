const express = require('express');
require('dotenv').config()

const { PORT } = require('./configs/configs');
const userRouter = require('./routes/user.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log('App listen ', PORT)
})
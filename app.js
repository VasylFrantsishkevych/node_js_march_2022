const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json('Hello world')
})

app.listen(5000, () => {
    console.log('App listen 5000')
})
const express = require('express')
require('dotenv').config()

const app = express()

app.get('/', (req, res) => {
    res.send('the server is running')
})

app.listen(3000, () => {
    console.log('listening on port 3000')
    console.log(`Your secret is ${process.env.SECRET_PASSWORD}`);
})
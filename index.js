const express = require('express');
const connectDB = require('./config/db');
const res = require('express/lib/response');

const app = express();

connectDB();

app.get('/',(req,res) => res.send('Hello World!') );

app.listen(8082,() => {
    console.log('Server is listening on port 3000')
});
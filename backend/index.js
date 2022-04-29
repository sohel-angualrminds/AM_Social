// 1)require express
const express = require('express');
const app = express();
app.use(express.json());
const { json } = require('body-parser');
app.use(json());
//2 require mongoose
const mongoose = require('mongoose');
//3 require .env
const dotenv = require('dotenv');
//4 get info from .env file
dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT;
//5
// require('./DB/DB');
const user = require('./Routes/User');

app.use('/user', user);

//checks server runs or not
app.listen(PORT, () => {
    console.log("app listening " + PORT);
})
// 1)require express
const express = require('express');
const app = express();
app.use(express.json());

//3 require .env
const dotenv = require('dotenv');
//4 get info from .env file
dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT;
//5
// require('./DB/DB');
const cors = require('cors');
//its neccesory for getting image to user
app.use("/uploads", express.static('uploads'))
app.use(cors());
//importing all imp routes
const user = require('./Routes/User');
const profile = require('./Routes/Profile');
const feed = require('./Routes/Posts');

app.use('/user', user);
app.use('/profile', profile);
app.use('/feed', feed);

//checks server runs or not
app.listen(PORT, () => {
    console.log("app listening " + PORT);
})
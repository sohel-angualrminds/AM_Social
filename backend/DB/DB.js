const mongoose = require('mongoose');
const DB = process.env.DATABASE_URI;

// 3 

const establishedConnection = async () => {
    try {
        const conn = await mongoose.connect(DB, {
            useNewUrlParser: true, useUnifiedTopology: true,
        });
        if (conn) {
            // console.log("if",conn);
            console.log("connection established");
        }
    } catch (e) {
        console.error(e);
    }
}
establishedConnection();
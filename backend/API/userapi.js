const exp = require('express');
const userApp = exp.Router();
const bcryptjs = require("bcryptjs");
const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
require('dotenv').config();

let userscollection;
//get userCollection this app level middleware--- it is required by every route
userApp.use((req, res, next) => {
    userscollection = req.app.get('userscollection');
    next();
});

//user login route
userApp.post('/login', expressAsyncHandler(async (req, res) => {
    //get cred obj from client
    const userCred = req.body;
    console.log(userCred);
    //check for username
    const dbuser = await userscollection.findOne({ name: userCred.username });
    if (dbuser === null) {
        res.send({ message: "User does not exist" });
    } else {
        //check for password
        if (userCred.password !== dbuser.password) {
            res.send({ message: "Invalid Password" });
        } else {
            //create jwt token and encode it
            const user = dbuser;
            const signedtoken = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "1d" });
            //send res
            res.send({ message: "Login successful", token: signedtoken, user: dbuser });
        }
    }
}));

//export userApp
module.exports = userApp;

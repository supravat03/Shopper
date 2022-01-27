require('dotenv').config();
// const util = require('util');
const express = require('express')
const cors = require('cors');
const mysql = require('mysql');
// const dbConnection = require('./db-connection/dbConnect');
// const query = util.promisify(dbConnection.query).bind(dbConnection);
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
// const nodemailer= require('nodemailer')
// const multer = require('multer');
// const { log } = require('console');
// const maxSize = 2 * 1024 * 1024;
// const basedir = __dirname;
// const path = require('path');



const Auth= require('./routes/Auth.Route');
const Product= require('./routes/Product.Route');
const RefreshToken= require('./routes/RefreshToken.Route')


const app = express();
const port = 3001;


const server= app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const io= require("socket.io")(server,{
    cors:{
        origin:["http://localhost:3000","http://localhost:3050"]
    },
});




// io.sockets.emit("hello","hello from server");


app.use( express.static('public'));
app.use(cors({ credentials: true, origin: ["http://localhost:3000","http://localhost:3050"] }));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//use socket as request property
app.use((req, res, next) => {
    req.io = io;
    return next();
  });


app.use('/api/user',Auth);
app.use('/api/product',Product);
app.use('/api/refresh_token',RefreshToken);




const dbConnection = mysql.createPool({
    connectionLimit:10,
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'root',
    database: process.env.MYSQL_DATABASE || 'shopper'
});



// dbConnection.connect(err => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Database Connected !");
//     }
// });








// app.post('/logout', (req, res) => {
//     res.clearCookie('refresh_token', { path: '/api/refresh_token' });
//     res.json({ message: "logged out successful" });
// })




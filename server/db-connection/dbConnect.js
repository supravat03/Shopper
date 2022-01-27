const mysql = require('mysql');


//
const dbConnection = mysql.createPool({
    connectionLimit:10,
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'root',
    database: process.env.MYSQL_DATABASE || 'shopper'
});

module.exports= dbConnection;
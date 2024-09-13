const mysql = require("mysql2"); //import mysql package
require('dotenv').config({ path: require('find-config')('.env') }) //find .env file

//create database connection parameters
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

//check if ddatabase connectin successful or not.
db.connect((ex) => {
    if(ex){
        console.error('error while connecting to database', ex);
        process.exit(1);
    }
    console.log('database connection success');
});

//export variables of db
module.exports = db;


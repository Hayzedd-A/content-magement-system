require("dotenv").config();
const mysql = require("mysql2/promise");

// Database connection configuration
const connect_db = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    console.log("Connected to the MySQL database");
    return connection;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

module.exports = connect_db;

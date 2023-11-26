var Sequelize = require('sequelize');

require('dotenv').config();

var db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialectOptions: {
      decimalNumbers: true
    },
    define: {
      timestamps: false
    }
});

module.exports = db;
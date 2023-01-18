require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
   
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_USER

    // dialect: 'postgres',
    // host: 'localhost',
    // port: '5432',
    // database: 'agric_1',
    // username: 'postgres',
    // password: 'cosmo!'

});

module.exports = sequelize


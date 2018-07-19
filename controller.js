const Sequelize = require('sequelize');

// create database
// give permissions to elf user

const sequelize = new Sequelize('postgresql', 'elf', 'ilikecookies', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
const Sequelize = require('sequelize');
const Config = require("../config/config");

const connection = new Sequelize(Config.DATABASE_NAME, Config.DATABASE_USERNAME, Config.DATABASE_PASSWORD, {
  host: Config.DATABASE_HOST,
  dialect: Config.DATABASE_DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false
});

connection.sync()
  .then(() => {
    console.log('Connection has been established successfully!');
  })
  .catch(err => {
    console.error('Unable to connect to the database! Error: ', err);
  });

module.exports = connection;

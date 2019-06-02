const Sequelize = require('sequelize');
const { config } = require('./../configs/config');

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  },
  define: {
    timestamps: false
  }
});


module.exports = { Sequelize, sequelize };
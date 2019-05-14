const { Sequelize, sequelize } = require('./../services/sequelize');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  stuid: Sequelize.STRING,
  name: Sequelize.STRING,
  password: Sequelize.STRING(500),
  email: Sequelize.STRING,
  phone: Sequelize.STRING,
  sex: Sequelize.STRING(20),
  college: Sequelize.STRING(500),
}, {
    timestamp: false
  });

User.sync();

module.exports = User;

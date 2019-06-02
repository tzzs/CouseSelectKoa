const { Sequelize, sequelize } = require('./../services/sequelize');
const { modelsConfig } = require('./../configs/config')

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
  profession: Sequelize.STRING,
  class: Sequelize.STRING
}, {
    timestamp: false
  });

//创建数据库
User.sync({ force: modelsConfig.force });

module.exports = User;

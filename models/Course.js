const { Sequelize, sequelize } = require('./../services/sequelize');
const { modelsConfig } = require('./../configs/config')

const Course = sequelize.define('course', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  cid: Sequelize.INTEGER,
  name: Sequelize.STRING,
  teacher: Sequelize.STRING,
  credit: Sequelize.INTEGER,
  rate: Sequelize.INTEGER,
  evaluation: Sequelize.STRING,// 考核方式
  number: Sequelize.INTEGER,
  week: Sequelize.INTEGER,
  time: Sequelize.STRING(5000),
  type: Sequelize.STRING, //课程性质
  college: Sequelize.STRING,
  class: Sequelize.STRING,
  status: Sequelize.STRING
}, {
    timestamp: false
  });

Course.sync({ force: modelsConfig.force })
// Course.sync({ force: true })

module.exports = Course

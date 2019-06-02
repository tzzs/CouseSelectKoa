const { Sequelize, sequelize } = require('./../services/sequelize');
const { modelsConfig } = require('./../configs/config')

const Course = sequelize.define('course', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  cid: Sequelize.STRING,
  name: Sequelize.STRING,
  teacher: Sequelize.STRING,
  credit: Sequelize.FLOAT,
  rate: Sequelize.FLOAT,
  evaluation: Sequelize.STRING,// 考核方式
  number: Sequelize.INTEGER,
  week: Sequelize.STRING(1000),
  time: Sequelize.STRING(1000),
  type: Sequelize.STRING, //课程类别
  nature: Sequelize.STRING,// 性质
  college: Sequelize.STRING,
  class: Sequelize.STRING,
  status: Sequelize.STRING
}, {
    timestamp: false
  });

Course.sync({ force: modelsConfig.force })
// Course.sync({ force: true })

module.exports = Course

const { Sequelize, sequelize } = require('../services/sequelize');
const { modelsConfig } = require('./../configs/config')


const Plan = sequelize.define('plan', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  grade: Sequelize.INTEGER,
  semester: Sequelize.INTEGER,
  course: Sequelize.INTEGER,
  profession: Sequelize.STRING,
  college: Sequelize.STRING
}, {
    timestamp: false
  })

Plan.sync({ force: modelsConfig.force });

module.exports = Plan
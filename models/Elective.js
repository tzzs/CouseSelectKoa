const { Sequelize, sequelize } = require('./../services/sequelize');
const { modelsConfig } = require('./../configs/config')

const Elective = sequelize.define('elective', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey:true
  },
  cid: Sequelize.STRING,
  stuid: Sequelize.STRING,
  rate: Sequelize.FLOAT,
  usual: Sequelize.FLOAT,
  testscore: Sequelize.FLOAT,
  grade:Sequelize.FLOAT
}, {
  timestamp:false
  })

Elective.sync({ force: modelsConfig.force })

module.exports = Elective
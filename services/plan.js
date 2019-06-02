const Plan = require('../models/Plan')
const Msg = require('./../models/Msg')

const getAll = async (ctx) => {
  let list = await Plan.findAll()
  console.log(JSON.stringify(list));
  let msg = new Msg()
  msg.code = 20000
  msg.data = { items: list }
  ctx.body = msg
}

module.exports = { getAll }
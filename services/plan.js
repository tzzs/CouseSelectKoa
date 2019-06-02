const Plan = require('../models/Plan')
const Msg = require('./../models/Msg')
const Course = require('./../models/Course')

const getAll = async (ctx) => {
  let params = ctx.request.query;
  if (JSON.stringify(params) === '{}') {
    parmas = ctx.request.body;
  }

  let list = await Plan.findAll()
  console.log(JSON.stringify(list));
  let msg = new Msg()
  msg.code = 20000
  msg.data = { items: list }
  ctx.body = msg
}

module.exports = { getAll }
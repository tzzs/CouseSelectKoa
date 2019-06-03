const Plan = require('../models/Plan')
const Msg = require('./../models/Msg')
const Course = require('./../models/Course')


const getCourse = async (ctx) => {
  let params = ctx.request.query;
  if (JSON.stringify(params) === '{}') {
    parmas = ctx.request.body;
  }
  let list = await Course.findAll()
  let msg = new Msg()
  msg.code = 20000
  msg.data = {
    items: list,
    total: list.length
  }
  ctx.body = msg
}

module.exports = { getCourse }
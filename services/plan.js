const Plan = require('../models/Plan')
const Msg = require('./../models/Msg')
const Course = require('./../models/Course')

const getAll = async (ctx) => {
  let params = ctx.request.query;
  if (JSON.stringify(params) === '{}') {
    parmas = ctx.request.body;
  }
  let where = {}
  if (params.grade) {
    where['grade'] = params.grade
  }
  let list = await Plan.findAll()
  console.log(JSON.stringify(list));
  let msg = new Msg()
  msg.code = 20000
  msg.data = { items: list }
  ctx.body = msg
}

const getPlan = async (ctx) => {
  let params = ctx.request.query;
  if (JSON.stringify(params) === '{}') {
    params = ctx.request.body;
  }
  console.log(params);
  let where = {}, find = {}
  if (params.grade) {
    where['grade'] = params.grade
  }
  if (params.college) {
    where['college'] = params.college
  }
  if (params.profession) {
    where['profession'] = params.profession
  }

  find['where'] = where
  let count = await Plan.findAll(find)
  //判断页数限制
  if (params.limit) {
    find['limit'] = parseInt(params.limit);
  }
  //当前页数
  if (params.page) {
    find['offset'] = params.limit * (params.page - 1);
  }


  let list = await Plan.findAll(find)

  let res = []

  list = JSON.parse(JSON.stringify(list))
  for (let l in list) {
    if (list[l].course) {
      let course = await Course.findOne({ where: { cid: list[l].course } });
      // console.log(res);
      if (course) {
        course = JSON.parse(JSON.stringify(course))
        let tmp = JSON.parse(JSON.stringify(list[l]))
        list[l] = Object.assign(course, tmp)
        list[l].id = tmp.id
      }
    }

  }
  // console.log(list, list[0]['college']);

  let msg = new Msg()

  let alllist = await Plan.findAll()
  let grades = []
  let colleges = []
  let professions = []

  for (l of alllist) {
    if (grades.indexOf(l.grade) < 0) {
      grades.push(l.grade)
    }
    if (colleges.indexOf(l.college) < 0) {
      colleges.push(l.college)
    }
    if (professions.indexOf(l.profession) < 0) {
      professions.push(l.profession)
    }
  }


  msg.code = 20000
  msg.data = {
    items: list,
    total: count.length,
    grades: grades,
    colleges: colleges,
    professions: professions
  }
  ctx.body = msg
}

const getTree = async (ctx) => {
  let list = await Plan.findAll()
  let tree = []
  for (l of list) {
    console.log(l);
    const res = tree.some(function (item) {
      if (item.college == l.college) {
        return ture
      }
    })

  }


  let msg = new Msg()
  msg.code = 20000
  msg.data = { items: list }
  ctx.body = msg
}

module.exports = { getAll, getPlan, getTree }
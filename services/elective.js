const Plan = require('../models/Plan')
const Msg = require('./../models/Msg')
const Course = require('./../models/Course')
const Elective = require('./../models/Elective')

// 修正余弦相似性函数 相似余弦距离
function calCosinDis(user1, user2) {
  // 用户对项目平均评分
  avg1 = 0.0
  avg2 = 0.0
  for (key in user1) {
    avg1 += user1[key]
  }
  avg1 = avg1 / user1.length

  for (key in user2) {
    avg2 += user2[key]
  }
  avg2 = avg2 / user2.length

  res = 0

  for (key1 in user1) {
    for (key2 in user2) {
      // 是相同项目
      if (key1 == key2) {
        res += (user1[key1] - avg1) * (user2[key2] - avg2)
      }
    }
  }

  res1 = 0
  for (key in user1) {
    res1 += Math.pow((user1[key] - avg1), 2)
  }
  res1 = Math.sqrt(res1)

  res2 = 0
  for (key in user2) {
    res2 += Math.pow((user2[key] - avg2), 2)
  }
  res2 = Math.sqrt(res2)

  return res / (res1 * res2)
}


const getRec = async (ctx) => {
  let params = ctx.request.query;
  if (JSON.stringify(params) === '{}') {
    parmas = ctx.request.body;
  }
  electives = await Elective.findAll()
  edic = {}
  for (e of electives) {
    if (!edic.hasOwnProperty(e.stuid)) {
      edic[e.stuid] = {}
    }
    edic[e.stuid][e.cid] = e.rate
  }
  console.log(edic);

  ctx.body = { electives, edic }
}


module.exports = { getRec }
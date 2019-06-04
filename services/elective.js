const Plan = require('../models/Plan')
const Msg = require('./../models/Msg')
const Course = require('./../models/Course')
const Elective = require('./../models/Elective')

// 修正余弦相似性函数 相似余弦距离
function calCosinDis(user1, user2) {
  // 用户对项目平均评分
  // console.log(user1, user2);
  avg1 = 0.0
  avg2 = 0.0
  for (key in user1) {
    avg1 += user1[key]
  }
  avg1 = avg1 / Object.keys(user1).length

  for (key in user2) {
    avg2 += user2[key]
  }
  avg2 = avg2 / Object.keys(user2).length

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
  // 评分矩阵
  edic = {}
  for (e of electives) {
    if (!edic.hasOwnProperty(e.stuid)) {
      edic[e.stuid] = {}
    }
    edic[e.stuid][e.cid] = e.rate
  }
  console.log(edic);

  // 相似度矩阵
  simMat = {}
  for (e1 in edic) {
    simMat[e1] = {}
    for (e2 in edic) {
      if (e1 != e2) {
        simMat[e1][e2] = calCosinDis(edic[e1], edic[e2])
      }
    }
  }

  stuid = '11503070301'
  // 可能推荐课程
  courses = []
  for (key in edic) {
    for (k in edic[key]) {
      if (Object.keys(edic[stuid]).indexOf(k) < 0 && courses.indexOf(k) < 0) {
        courses.push(k)
      }
    }
  }
  recList = {}
  let savg = 0
  for (e in edic[stuid]) {
    savg += edic[stuid][e]
  }
  savg /= Object.keys(edic[stuid]).length

  for (course of courses) {
    let res = 0, abs = 0
    for (user in simMat[stuid]) {
      if (edic[user].hasOwnProperty(course)) {
        // 计算平均评分
        let avg = 0
        for (e in edic[user]) {
          avg += edic[user][e]
        }
        avg /= Object.keys(edic[user]).length

        res += (edic[user][course] - avg) * simMat[stuid][user]

        abs += Math.abs(simMat[stuid][user])
      }
    }
    res = res / abs + savg
    if (Object.keys(recList).length >= 3) {
      let minkey = undefined, minvalue = undefined, flag = true
      for (r in recList) {
        if (flag) {
          minkey = r
          minvalue = recList[r]
          flag = false
        } else {
          if (recList[r] < minvalue) {
            minkey = r
            minvalue = recList[r]
          }
        }
      }
      if (res > minvalue) {
        delete recList[minkey]
        recList[course] = res
      }
    } else {
      recList[course] = res
    }
    // 推荐top 3
    // recList[course] = res
  }

  result = []
  for (rec in recList) {
    course = await Course.findOne({ where: { cid: rec } })
    result.push(course)
  }

  ctx.body = {
    code: 20000,
    data: {
      rec: recList,
      items: result,
      total: result.length
    }
  }
}


module.exports = { getRec }
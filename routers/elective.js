const router = require('koa-router')()

const elective = require('./../services/elective')


router.get('/list', elective.getRec)

router.get('/getElective', elective.getElective)

router.post('/add', elective.add)

router.get('/get', elective.get)

module.exports = router
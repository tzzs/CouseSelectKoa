const router = require('koa-router')()

const elective = require('./../services/elective')


router.get('/list', elective.getRec)

module.exports = router
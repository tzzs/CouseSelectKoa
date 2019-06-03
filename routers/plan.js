const router = require('koa-router')();

const plan = require('./../services/plan')


router.get('/list', plan.getAll);
router.get('/getList', plan.getPlan)
router.get('/getTree', plan.getTree)
router.post('/add', plan.addPlan)

module.exports = router
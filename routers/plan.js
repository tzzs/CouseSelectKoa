const router = require('koa-router')();

const plan = require('./../services/plan')


router.get('/list', plan.getAll);

module.exports = router
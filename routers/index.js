const router = require('koa-router')();

const demo = require('./demo');
const u = require('./user');
const user = require('./user');
const plan = require('./plan')

router.use('/demo', demo.routes(), demo.allowedMethods()); //测试接口

router.use('', u.routes(), u.allowedMethods()); //用户接口

// router.use('/user', user.routes(), user.allowedMethods());

router.use('/plan', plan.routes(), plan.allowedMethods())

module.exports = router;



const router = require('koa-router')();

const demo = require('./demo');
const u = require('./user');
const user = require('./user');
const messageBoard = require('./messageBoard');

router.use('/demo', demo.routes(), demo.allowedMethods()); //测试接口

router.use('', u.routes(), u.allowedMethods()); //用户接口

// router.use('/user', user.routes(), user.allowedMethods());


module.exports = router;



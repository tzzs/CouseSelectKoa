const router = require('koa-router')();
// const login = require('../services/user/login')
const user = require('./../services/user');

// router.post('/login', user.login);

// router.get('/login', user.login);

// router.post('/userlogin', user.userLogin);

router.post('/signup', user.register);//用户注册接口

// router.post('/sessionlogin', user.sessionlogin);//基于session的用户登录

// router.get('/testlogin', user.testlogin);//测试登录接口

// router.get('/logout', user.sessionlogout);//用户退出接口

router.post('/login', user.login);//登录接口

router.post('/register', user.register)

router.post('/info',user.info)

module.exports = router;
const router = require('koa-router')();

const course = require('./../services/course')


// router.get('/list', course.ge);
// router.get('/getList', course.getPlan)
router.get('/list', course.getCourse)
router.post('/addMock',course.addMock)

module.exports = router
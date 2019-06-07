import server from './../app.js'
import request from 'supertest'

afterEach(() => {
  server.close() //关闭服务器
})

// 用户名为admin，密码为admin2则无法登录。正确应为admin和admin。
test('login faild', async () => {
  const res = await request(server)
  F.post('/login')
    .send({
      name: 'admin',
      password: 'admin2'
    })
  expect(res.message).toBe("false")
})

PASS  test / user.test.js
✓ Failed to login if typing admin & 1234(248ms)

import { shallow } from 'vue-test-utils'
import Login from './../src/components/Login.vue'
import Vue from 'vue'
import eUI from 'element-ui'
import { mount } from 'vue-test-utils'

Vue.use(eUI)

let login

beforeEach(() => {
  login = shallow(Login)
})

test('Should have two input & one button', () => {
  const in = login.findAll('.el-input')  //获取输入框
  const lb = login.find('.el-button') //查找按钮
  expect(in.length).toBe(2) // 应该有两个输入框
  expect(lb).toBeTruthy() // 应该有一个登录按钮。 只要断言条件不为空或者false，toBeTruthy就能通过。
})

test('the expected html  tructure', () => {
  expect(wrapper.element).toMatchSnapshot() //比对快照
})




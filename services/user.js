const crypto = require('crypto');
const { query } = require('./mysql');
const Msg = require('./../models/Msg');
const auth = require('./auth');
const User = require('./../models/User');
const Plan = require('../models/Plan')


async function queryAll() {
  let sql = 'select * from user';
  return await query(sql);
}

const getAll = async (ctx) => {
  let list = await queryAll();
  console.log(list)
  await ctx.render('all', {
    list
  })
};

const register = async (ctx) => {
  let params = ctx.request.query;
  if (JSON.stringify(params) === '{}') {
    params = ctx.request.body;
  }
  console.log(params);
  let username = params.username;

  //查询当前用户是否存在
  let user = await User.findOne({ where: { stuid: username } });

  let msg = new Msg();
  if (user == null) {
    try {
      //不存在
      let password = params.password;

      if (!username || !password) {
        msg.code = 400;
        msg.message = 'false';
        msg.data = { error: `expected an object with username, password but got: ${params}` };
        ctx.body = msg;
        return;
      }

      //密码加密
      password = auth.getHash(password);
      let user = await User.create({
        stuid: username,
        password: password
      });
      msg.code = 20000;
      msg.message = 'success';
      msg.data = { token: auth.getToken({ username: username }) };
      // msg.data = auth.getToken({ username: username });
      ctx.body = msg
    } catch (error) {
      msg.code = 401;
      msg.message = "false";
      msg.data = { error: error };
      ctx.body = msg;
    }
  } else {
    //存在
    msg.code = 401;
    msg.message = "用户名已存在";
    msg.data = { data: '用户名已存在' };
    ctx.body = msg;
  }
};

const login = async (ctx) => {
  //query和body
  let params = ctx.request.query;
  if (JSON.stringify(params) === '{}') {
    params = ctx.request.body;
  }
  const username = params.username;
  const password = params.password;

  let msg = new Msg();
  try {
    if (!username || !password) {
      msg.code = 400;
      msg.message = 'false';
      msg.data = { error: `expected an object with username, password but got nothing` };
      ctx.body = msg;
      return;
    }
    const user = await User.findOne({ where: { stuid: username } });
    // console.log(user);
    if (user == null) {
      msg.code = 401;
      msg.message = '用户名错误';
    } else {
      if (auth.getHash(password) == user.password) {
        msg.message = '登录成功';
        msg.data = { token: auth.getToken({ username: username }) };
        ctx.body = msg;
      } else {
        msg.code = 401;
        msg.message = '密码错误123';
      }
    }
    console.log(msg);
    ctx.body = msg;
  } catch (error) {
    console.log('userLogin Error:', error);
    console.log(msg);
    msg.code = 401;
    msg.message = '登录时发生错误';
    msg.data = { error: error };
    ctx.body = msg;
  }
};

const testlogin = async (ctx) => {
  let msg = new Msg();
  if (!ctx.session.user) {
    msg.code = 201;
    msg.message = '未登录状态';
    msg.data = {
      "isLogin": false
    }
  } else {
    msg.code = 0;
    msg.message = '登录状态';
    msg.data = {
      "isLogin": false,
      "username": ctx.session.user
    }
  }
  ctx.body = msg;
};

const info = async (ctx) => {
  //query和body
  let params = ctx.request.query;
  if (JSON.stringify(params) === '{}') {
    params = ctx.request.body;
  }
  let token = params.token
  if (!token) {
    token = ctx.header['x-token']
  }
  let msg = new Msg();
  if (token) {
    try {
      token = auth.getPayload(token)
      const user = await User.findOne({ where: { stuid: token.username } });
      if (user == null) {
        msg.code = 401;
        msg.message = '用户名错误';
      } else {
        delete user.password
        roles = user.roles.split(' ')
        ctx.body = {
          roles: roles,
          introduction: 'I am a super administrator',
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          name: 'Super Admin',
          code: 20000,
          data: {
            user,
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            name: 'Super Admin'
          }
        }
        return
      }
      ctx.body = msg;
    } catch (error) {
      console.log('userLogin Error:', error);
      console.log(msg);
      msg.code = 401;
      msg.message = '登录时发生错误';
      msg.data = { error: error };
      ctx.body = msg;
    }
  } else {
    msg.code = 401;
    msg.message = '未找到token';
    ctx.body = msg;
  }
};


module.exports = { getAll, register, login, testlogin, info };